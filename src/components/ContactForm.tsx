import { FormEvent, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import type { Locale } from "../content";
import type { ProjectType } from "../homeCopy";
import { homeCopy } from "../homeCopy";
import { trackEvent } from "../analytics";

const endpoint = "https://formspree.io/f/mpwdpqzk";
type Status = "idle" | "sending" | "success" | "error";
type FormData = {
  name: string; email: string; company: string; projectType: ProjectType; timeline: string; budget: string;
  reference: string; message: string; website: string; consent: boolean;
};

const emptyForm: FormData = { name: "", email: "", company: "", projectType: "", timeline: "", budget: "", reference: "", message: "", website: "", consent: false };

export default function ContactForm({ locale, initialProjectType, onProjectTypeChange }: { locale: Locale; initialProjectType: ProjectType; onProjectTypeChange: (value: ProjectType) => void }) {
  const copy = homeCopy[locale];
  const [form, setForm] = useState<FormData>({ ...emptyForm, projectType: initialProjectType });
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);

  useEffect(() => {
    setForm((current) => current.projectType === initialProjectType ? current : { ...current, projectType: initialProjectType });
  }, [initialProjectType]);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("inquiry_form_start", { locale, projectType: form.projectType || "unset" });
  };

  const updateProjectType = (value: ProjectType) => {
    setForm((current) => ({ ...current, projectType: value }));
    onProjectTypeChange(value);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.website) return;
    setStatus("sending");
    trackEvent("inquiry_submit", { locale, projectType: form.projectType, timeline: form.timeline, budget: form.budget });
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...form, locale, source: "lavalabs.co.kr inquiry" }) });
      if (!response.ok) throw new Error("submit failed");
      setStatus("success");
      setForm(emptyForm);
      onProjectTypeChange("");
      trackEvent("inquiry_success", { locale, projectType: form.projectType });
    } catch {
      setStatus("error");
      trackEvent("inquiry_error", { locale, projectType: form.projectType });
    }
  };

  return (
    <form className="contact-form enhanced-contact-form" onSubmit={submit} onFocusCapture={markStarted}>
      <div className="form-pair">
        <label><span>{locale === "ko" ? "이름" : locale === "en" ? "Name" : "お名前"}</span><input name="name" required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
        <label><span>{locale === "ko" ? "이메일" : locale === "en" ? "Email" : "メール"}</span><input name="email" type="email" required autoComplete="email" inputMode="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
      </div>
      <div className="form-pair">
        <label><span>{copy.company}</span><input name="company" autoComplete="organization" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label>
        <label><span>{copy.projectType}</span><select name="projectType" required value={form.projectType} onChange={(event) => updateProjectType(event.target.value as ProjectType)}><option value="">-</option>{Object.entries(copy.projectOptions).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      <div className="form-pair">
        <label><span>{copy.timeline}</span><select name="timeline" required value={form.timeline} onChange={(event) => setForm({ ...form, timeline: event.target.value })}><option value="">-</option>{copy.timelines.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label><span>{copy.budget}</span><select name="budget" required value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })}><option value="">-</option>{copy.budgets.map((value) => <option key={value}>{value}</option>)}</select></label>
      </div>
      <label><span>{copy.reference}</span><input name="reference" type="url" inputMode="url" placeholder="https://" value={form.reference} onChange={(event) => setForm({ ...form, reference: event.target.value })} /></label>
      <label><span>{locale === "ko" ? "문의 내용" : locale === "en" ? "Message" : "お問い合わせ内容"}</span><textarea name="message" rows={7} required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></label>
      <label className="honeypot" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label>
      <label className="consent-row"><input name="consent" type="checkbox" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} /><span>{copy.consent} <a href="/privacy/">Privacy</a></span></label>
      <button className="button primary submit-button" type="submit" disabled={status === "sending"}><Send aria-hidden="true" />{status === "sending" ? copy.sending : copy.submit}</button>
      {status !== "idle" && <div className={`form-status ${status}`} role="status"><p>{status === "success" ? copy.success : status === "error" ? copy.error : copy.sending}</p></div>}
    </form>
  );
}
