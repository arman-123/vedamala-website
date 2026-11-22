import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { CONTACT } from "@/data/site";

const API_BASE = (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE ?? "";
const CODES = ["+91", "+971", "+1", "+44", "+65", "+61", "+966", "+974", "+965", "+968", "+973"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadKind = "brochure" | "enquiry";

/**
 * Lead capture for brochure requests and project enquiries.
 * Posts to the existing backend: /api/brochure-download or /api/enquiry
 * with { name, email, phone, project }.
 */
export default function LeadModal({ open, onClose, kind, project, title }: {
  open: boolean; onClose: () => void; kind: LeadKind; project: string; title?: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", code: "+91", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    setStatus("idle"); setErrors({}); setServerMsg("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/${kind === "brochure" ? "brochure-download" : "enquiry"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), phone: `${form.code}${form.phone.replace(/\D/g, "")}`, project }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) { setServerMsg(json.message || ""); setStatus("success"); }
      else { setServerMsg(json.message || "Something went wrong. Please try again."); setStatus("error"); }
    } catch {
      setServerMsg("We couldn't reach our server just now. Please try again, or message us on WhatsApp.");
      setStatus("error");
    }
  };

  const heading = title ?? (kind === "brochure" ? "Request the brochure" : "Enquire about this project");

  return (
    <div
      role="dialog" aria-modal="true" aria-label={heading} data-lenis-prevent
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(25,5,9,0.72)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div onClick={(e) => e.stopPropagation()} className="v-site" style={{ width: "min(520px, 100%)", maxHeight: "92vh", overflowY: "auto", position: "relative", borderTop: "3px solid #C6A15B" }}>
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 14, right: 14, width: 38, height: 38, border: "1px solid rgba(90,22,33,0.25)", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#5A1621" }}>
          <X size={16} />
        </button>
        <div style={{ padding: "44px 40px 40px" }}>
          <span className="v-eyebrow">{project}</span>
          <h3 className="v-display v-display-m" style={{ marginTop: 16, color: "#5A1621" }}>{heading}</h3>

          {status === "success" ? (
            <div style={{ marginTop: 22 }}>
              <p className="v-lead">{serverMsg || (kind === "brochure" ? "Thank you. Our team will share the brochure shortly." : "Thank you. A member of our team will be in touch shortly.")}</p>
              <button onClick={onClose} className="v-btn v-btn-maroon" style={{ marginTop: 26 }}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate style={{ marginTop: 28 }}>
              <div className="v-field">
                <label htmlFor="lm-name">Full name</label>
                <input id="lm-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                {errors.name && <div className="v-err">{errors.name}</div>}
              </div>
              <div className="v-field">
                <label htmlFor="lm-email">Email</label>
                <input id="lm-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                {errors.email && <div className="v-err">{errors.email}</div>}
              </div>
              <div className="v-field">
                <label htmlFor="lm-phone">Mobile number</label>
                <div style={{ display: "flex", gap: 12 }}>
                  <select aria-label="Country code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} style={{ width: 86 }}>
                    {CODES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input id="lm-phone" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel-national" />
                </div>
                {errors.phone && <div className="v-err">{errors.phone}</div>}
              </div>
              {status === "error" && (
                <p className="v-err" style={{ marginBottom: 16 }}>
                  {serverMsg} <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" style={{ color: "#5A1621", fontWeight: 600 }}>WhatsApp {CONTACT.phone}</a>
                </p>
              )}
              <button type="submit" className="v-btn v-btn-maroon" disabled={status === "loading"} style={{ width: "100%", opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Sending…" : kind === "brochure" ? "Send me the brochure" : "Send enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
