import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from "lucide-react";
import { CONTACT, BRAND } from "@/data/site";
import { Reveal, HaloMotif } from "./ui";

/** Enquiry panel. Submits by opening WhatsApp with the message pre-filled (as on the current site). */
export default function ContactSection() {
  const [f, setF] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [ready, setReady] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(f).some((v) => !v.trim())) { setError("Please fill in every field."); return; }
    setError("");
    const msg = encodeURIComponent(
      `New enquiry from the ${BRAND.name} website\n\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nSubject: ${f.subject}\n\n${f.message}`,
    );
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${msg}`;
    setReady(url);
    const w = window.open(url, "_blank");
    if (w) setF({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const info = [
    { icon: Phone, k: "Call", v: CONTACT.phone, sub: CONTACT.phoneHours, href: CONTACT.phoneHref },
    { icon: Mail, k: "Email", v: CONTACT.email, sub: "Reply within 24 hours", href: `mailto:${CONTACT.email}` },
    { icon: Instagram, k: "Instagram", v: CONTACT.instagram, sub: "DM us anytime", href: CONTACT.instagramHref },
    { icon: MapPin, k: "Office", v: CONTACT.addressLine1, sub: "Indiranagar, Bengaluru 560038", href: CONTACT.mapsHref },
  ];

  return (
    <section id="contact" className="v-contact">
      <div className="v-maroon v-contact-left">
        <HaloMotif style={{ position: "absolute", width: 720, left: -280, bottom: -260 }} opacity={0.16} />
        <Reveal style={{ position: "relative" }}>
          <span className="v-eyebrow">Get in touch</span>
          <h2 className="v-display v-display-l" style={{ marginTop: 22 }}>Let's build<br /><span className="v-accent">something lasting</span></h2>
          <p className="v-lead" style={{ marginTop: 22, maxWidth: 440 }}>Have a project in mind, or want to visit one of ours? Tell us, and we'll bring your vision to life.</p>
          <div style={{ marginTop: 44, display: "grid", gap: 24 }}>
            {info.map(({ icon: Icon, k, v, sub, href }) => (
              <a key={k} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", gap: 18, textDecoration: "none", color: "inherit" }}>
                <span style={{ width: 44, height: 44, flex: "none", border: "1px solid rgba(198,161,91,0.5)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E3C98F" }}><Icon size={17} strokeWidth={1.5} /></span>
                <span>
                  <span style={{ display: "block", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "#C6A15B" }}>{k}</span>
                  <span style={{ display: "block", marginTop: 4, fontSize: 15, color: "#F6F0E6" }}>{v}</span>
                  <span style={{ display: "block", fontSize: 12.5, color: "rgba(246,240,230,0.55)" }}>{sub}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="v-contact-right">
        <Reveal delay={120}>
          <h3 className="v-display v-display-m" style={{ color: "#3B0D14" }}>Send us a message</h3>
          <form onSubmit={submit} noValidate style={{ marginTop: 36 }}>
            <div className="v-form-2">
              <div className="v-field"><label htmlFor="c-name">Full name</label><input id="c-name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
              <div className="v-field"><label htmlFor="c-email">Email</label><input id="c-email" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
              <div className="v-field"><label htmlFor="c-phone">Phone</label><input id="c-phone" inputMode="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
              <div className="v-field"><label htmlFor="c-sub">Subject</label><input id="c-sub" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} /></div>
            </div>
            <div className="v-field"><label htmlFor="c-msg">Your message</label><textarea id="c-msg" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></div>
            {error && <p className="v-err" style={{ marginBottom: 14 }}>{error}</p>}
            <button type="submit" className="v-btn v-btn-maroon">Send via WhatsApp <ArrowUpRight /></button>
            {ready && (
              <p style={{ marginTop: 14, fontSize: 13, color: "rgba(34,26,24,0.7)" }}>
                If WhatsApp didn't open, <a href={ready} target="_blank" rel="noreferrer" style={{ color: "#5A1621", fontWeight: 600 }}>tap here to send your message</a>.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
