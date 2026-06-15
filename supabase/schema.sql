-- Japan Workshop Schedule - Supabase setup
-- 1) Supabase Dashboard > SQL Editor > New query
-- 2) IMPORTANT: replace CHANGE_ADMIN_PIN and CHANGE_FAMILY_PIN below before running.
-- 3) Run this whole file once.

create extension if not exists pgcrypto;

create table if not exists public.workshop_pins (
  role text primary key check (role in ('admin', 'family')),
  pin_hash text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.workshop_sessions (
  token text primary key,
  role text not null check (role in ('admin', 'family')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create table if not exists public.workshop_state (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.workshop_pins enable row level security;
alter table public.workshop_sessions enable row level security;
alter table public.workshop_state enable row level security;

revoke all on public.workshop_pins from anon, authenticated;
revoke all on public.workshop_sessions from anon, authenticated;
revoke all on public.workshop_state from anon, authenticated;

insert into public.workshop_state (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Change these PINs before running.
insert into public.workshop_pins (role, pin_hash)
values
  ('admin', encode(digest('admin:CHANGE_ADMIN_PIN:japan-workshop-2026', 'sha256'), 'hex')),
  ('family', encode(digest('family:CHANGE_FAMILY_PIN:japan-workshop-2026', 'sha256'), 'hex'))
on conflict (role) do update
set pin_hash = excluded.pin_hash,
    updated_at = now();

create or replace function public.workshop_login(p_pin text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_token text;
begin
  delete from public.workshop_sessions where expires_at < now();

  select role into v_role
  from public.workshop_pins
  where pin_hash = encode(digest(role || ':' || p_pin || ':japan-workshop-2026', 'sha256'), 'hex')
  limit 1;

  if v_role is null then
    return jsonb_build_object('ok', false, 'message', 'PIN이 올바르지 않습니다.');
  end if;

  v_token := encode(gen_random_bytes(32), 'hex');

  insert into public.workshop_sessions(token, role, expires_at)
  values (v_token, v_role, now() + interval '14 days');

  return jsonb_build_object('ok', true, 'token', v_token, 'role', v_role);
end;
$$;

create or replace function public.workshop_logout(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.workshop_sessions where token = p_token;
  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.workshop_get_state(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
  v_data jsonb;
begin
  delete from public.workshop_sessions where expires_at < now();

  select role into v_role
  from public.workshop_sessions
  where token = p_token and expires_at > now();

  if v_role is null then
    return jsonb_build_object('ok', false, 'message', '세션이 만료되었습니다. 다시 로그인해주세요.');
  end if;

  select data into v_data from public.workshop_state where id = 'main';
  v_data := coalesce(v_data, '{}'::jsonb);

  if v_role = 'admin' then
    return jsonb_build_object('ok', true, 'role', v_role, 'data', v_data);
  end if;

  return jsonb_build_object(
    'ok', true,
    'role', v_role,
    'data', jsonb_build_object(
      'familyStatus', coalesce(v_data->'familyStatus', '{}'::jsonb),
      'checkins', coalesce(v_data->'checkins', '[]'::jsonb),
      'publicPhotos', coalesce(v_data->'publicPhotos', '[]'::jsonb),
      'visitDone', coalesce(v_data->'visitDone', '{}'::jsonb)
    )
  );
end;
$$;

create or replace function public.workshop_save_state(p_token text, p_data jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role text;
begin
  delete from public.workshop_sessions where expires_at < now();

  select role into v_role
  from public.workshop_sessions
  where token = p_token and expires_at > now();

  if v_role is null then
    return jsonb_build_object('ok', false, 'message', '세션이 만료되었습니다. 다시 로그인해주세요.');
  end if;

  if v_role <> 'admin' then
    return jsonb_build_object('ok', false, 'message', '관리자만 저장할 수 있습니다.');
  end if;

  insert into public.workshop_state(id, data, updated_at)
  values ('main', coalesce(p_data, '{}'::jsonb), now())
  on conflict (id) do update
    set data = excluded.data,
        updated_at = now();

  return jsonb_build_object('ok', true, 'updatedAt', now());
end;
$$;

grant execute on function public.workshop_login(text) to anon, authenticated;
grant execute on function public.workshop_logout(text) to anon, authenticated;
grant execute on function public.workshop_get_state(text) to anon, authenticated;
grant execute on function public.workshop_save_state(text, jsonb) to anon, authenticated;
