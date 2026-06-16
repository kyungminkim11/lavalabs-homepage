const $=s=>document.querySelector(s);
const fmt=n=>Number(n||0).toLocaleString('ko-KR');
const store='matchal-checker-state-v1';
let data={following:[],followers:[],mutual:[],non:[],fans:[]};
let tab='non';
let query='';
let hideDone=false;
let current=null;
let state=JSON.parse(localStorage.getItem(store)||'{}');
const tabs=[['non','검토 대상'],['mutual','맞팔'],['following','팔로잉 전체'],['followers','팔로워 전체'],['fans','팔로워만']];
function save(){localStorage.setItem(store,JSON.stringify(state))}
function setStatus(t){$('#status').textContent=t}
function cleanName(v){return String(v||'').replace('https://www.instagram.com/','').replace(/\/$/,'').replace('@','').trim().toLowerCase()}
function userFromObj(o){
  if(typeof o==='string')return cleanName(o);
  let d=o?.string_list_data?.[0]||o?.string_map_data?.Username||o?.title||o?.value||o;
  return cleanName(d?.value||d?.href||d?.string_value||d);
}
function unique(a){return [...new Set(a.map(cleanName).filter(Boolean))].sort()}
function compute(following,followers){
  data.following=unique(following);
  data.followers=unique(followers);
  let fs=new Set(data.followers);
  let gs=new Set(data.following);
  data.mutual=data.following.filter(x=>fs.has(x));
  data.non=data.following.filter(x=>!fs.has(x));
  data.fans=data.followers.filter(x=>!gs.has(x));
  current=data.non.find(x=>!state[x])||data.non[0]||null;
  render();
}
function extract(j){
  let root=Array.isArray(j)?j:(j.relationships_following||j.relationships_followers||j.following||j.followers||j.data||[]);
  if(Array.isArray(root))return root.map(userFromObj).filter(Boolean);
  let out=[];
  Object.values(root||{}).forEach(v=>{
    if(Array.isArray(v))out.push(...v.map(userFromObj));
    else out.push(userFromObj(v));
  });
  return out.filter(Boolean);
}
async function parseFile(file){
  try{
    setStatus('파일 분석 중입니다...');
    let following=[];
    let followers=[];
    if(file.name.toLowerCase().endsWith('.json')){
      let j=JSON.parse(await file.text());
      following=extract(j);
      followers=extract(j);
    }else{
      let zip=await JSZip.loadAsync(file);
      let files=Object.values(zip.files).filter(f=>!f.dir&&f.name.toLowerCase().endsWith('.json'));
      for(const f of files){
        let name=f.name.toLowerCase();
        let j;
        try{j=JSON.parse(await f.async('text'))}catch(e){continue}
        if(name.includes('following'))following.push(...extract(j));
        if(name.includes('followers'))followers.push(...extract(j));
      }
    }
    if(!following.length||!followers.length){
      setStatus('필요한 followers/following 데이터를 찾지 못했습니다. Instagram 다운로드 시 팔로워 및 팔로잉 항목을 포함했는지 확인하세요.');
      compute(following,followers);
      return;
    }
    compute(following,followers);
    setStatus('분석 완료. 검토 대상부터 확인해보세요.');
  }catch(e){
    console.error(e);
    setStatus('파일을 읽지 못했습니다. ZIP/JSON 형식과 다운로드 항목을 다시 확인하세요.');
  }
}
function sample(){
  let following=['moon_snap','blueblack_daily','tokyo_pen','daily_lava','photo_365','pen_shop_jp','camera_walk','stationery_lover','old_account','travel_desk','mystic_note','ink_fountain','snap_friend','private_box','summer_roll','city_stroll','kevin_lens','quiet_album','paper_road','archive_user'];
  let followers=['blueblack_daily','daily_lava','photo_365','camera_walk','snap_friend','paper_road','new_fan','hello_tokyo','friend_only','ink_fountain'];
  compute(following,followers);
  setStatus('샘플 데이터가 적용됐습니다. 실제 사용 시 Instagram ZIP을 업로드하세요.');
}
function mark(u,v){
  if(v)state[u]=v;
  else delete state[u];
  save();
  current=data.non.find(x=>!state[x])||current;
  render();
}
function openUser(u){
  if(!u)return;
  window.open('https://www.instagram.com/'+u+'/','_blank','noopener');
}
function rows(){
  let arr=data[tab]||[];
  if(query)arr=arr.filter(x=>x.includes(query));
  if(hideDone)arr=arr.filter(x=>!state[x]);
  return arr;
}
function render(){
  $('#sFollowing').textContent=fmt(data.following.length);
  $('#sFollowers').textContent=fmt(data.followers.length);
  $('#sMutual').textContent=fmt(data.mutual.length);
  $('#sNon').textContent=fmt(data.non.length);
  let done=data.non.filter(x=>state[x]==='done').length;
  $('#prog').style.width=data.non.length?Math.round(done/data.non.length*100)+'%':'0%';
  $('#current').textContent=current?('@'+current):'없음';
  $('#tabs').innerHTML=tabs.map(t=>`<button class='tab ${tab===t[0]?'active':''}' data-tab='${t[0]}'>${t[1]} ${fmt(data[t[0]].length)}</button>`).join('');
  let arr=rows();
  $('#list').innerHTML=arr.length?arr.map(u=>{
    let st=state[u]||'todo';
    let label=st==='done'?'완료':st==='keep'?'유지':'검토';
    return `<div class='row ${st}'><div class='user'><span class='avatar'>${u[0]}</span><div><div class='name'>@${u}</div><div class='sub'><span class='badge'>${label}</span> ${tab==='non'?'나를 팔로우하지 않음':'분류: '+tab}</div></div></div><div class='actions compact'><button class='btn primary' data-act='open' data-u='${u}'>프로필</button><button class='btn ok' data-act='done' data-u='${u}'>완료</button><button class='btn' data-act='keep' data-u='${u}'>유지</button><button class='btn ghost' data-act='clear' data-u='${u}'>해제</button></div></div>`;
  }).join(''):'<div class=empty>표시할 계정이 없습니다.</div>';
  document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});
  $('#hideDone').textContent='완료 숨김: '+(hideDone?'켜짐':'꺼짐');
}
function csv(){
  let lines=['username,category,status,url'];
  data.non.forEach(u=>lines.push(`${u},non_mutual,${state[u]||'todo'},https://www.instagram.com/${u}/`));
  let blob=new Blob(['\ufeff'+lines.join('\n')],{type:'text/csv;charset=utf-8'});
  let a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='matchal-checker-non-mutual.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
document.addEventListener('click',e=>{
  let b=e.target.closest('[data-act]');
  if(!b)return;
  let u=b.dataset.u;
  let a=b.dataset.act;
  if(a==='open')openUser(u);
  if(a==='done')mark(u,'done');
  if(a==='keep')mark(u,'keep');
  if(a==='clear')mark(u,'');
});
$('#file').onchange=e=>e.target.files[0]&&parseFile(e.target.files[0]);
$('#sample').onclick=sample;
$('#sampleTop').onclick=sample;
$('#search').oninput=e=>{query=e.target.value.toLowerCase().replace('@','').trim();render()};
$('#next').onclick=()=>{let n=data.non.find(x=>!state[x]);current=n||current;openUser(current);render()};
$('#openCurrent').onclick=()=>openUser(current);
$('#doneCurrent').onclick=()=>current&&mark(current,'done');
$('#hideDone').onclick=()=>{hideDone=!hideDone;render()};
$('#exportCsv').onclick=csv;
$('#reset').onclick=()=>{if(confirm('진행 상태를 초기화할까요?')){state={};save();render()}};
['dragenter','dragover'].forEach(ev=>$('#drop').addEventListener(ev,e=>{e.preventDefault();$('#drop').classList.add('drag')}));
['dragleave','drop'].forEach(ev=>$('#drop').addEventListener(ev,e=>{e.preventDefault();$('#drop').classList.remove('drag')}));
$('#drop').addEventListener('drop',e=>{let f=e.dataTransfer.files[0];if(f)parseFile(f)});
render();
