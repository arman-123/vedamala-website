import { CONTACT, NAV, SERVICES, BRAND } from "@/data/site";
import { VLink, VelDivider } from "./ui";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="v-dark" style={{ position: "relative", overflow: "hidden", paddingTop: 96 }}>
      <div className="v-kolam" />
      <div className="v-wrap" style={{ position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <img src="/vedamala-logo.png" alt="Vedamala Group" style={{ height: 150, width: "auto" }} loading="lazy" />
          <p className="v-serif" style={{ fontSize: "clamp(1.3rem,2.4vw,1.8rem)", maxWidth: 620, marginTop: 28, color: "rgba(246,240,230,0.86)" }}>
            Building dreams, creating landmarks and delivering excellence in every square foot since {BRAND.est}.
          </p>
          <VelDivider className="mt-8" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginTop: 64, paddingBottom: 56, borderBottom: "1px solid rgba(198,161,91,0.22)" }}>
          <div>
            <p className="v-eyebrow">Explore</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", lineHeight: 2.2, fontSize: 14 }}>
              {NAV.map((n) => <li key={n.label}><VLink to={n.href} style={{ color: "rgba(246,240,230,0.75)", textDecoration: "none" }}>{n.label}</VLink></li>)}
            </ul>
          </div>
          <div>
            <p className="v-eyebrow">Services</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", lineHeight: 2.2, fontSize: 14, color: "rgba(246,240,230,0.75)" }}>
              {SERVICES.map((s) => <li key={s.title}>{s.title}</li>)}
            </ul>
          </div>
          <div>
            <p className="v-eyebrow">Contact</p>
            <div style={{ marginTop: 20, fontSize: 14, lineHeight: 2, color: "rgba(246,240,230,0.75)" }}>
              <a href={CONTACT.phoneHref} style={{ color: "inherit", textDecoration: "none", display: "block" }}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} style={{ color: "inherit", textDecoration: "none", display: "block" }}>{CONTACT.email}</a>
            </div>
          </div>
          <div>
            <p className="v-eyebrow">Office</p>
            <a href={CONTACT.mapsHref} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 20, fontSize: 14, lineHeight: 1.8, color: "rgba(246,240,230,0.75)", textDecoration: "none" }}>
              {BRAND.name}<br />{CONTACT.addressLine1}<br />{CONTACT.addressLine2}
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", padding: "28px 0 36px", fontSize: 12, color: "rgba(246,240,230,0.5)" }}>
          <span>© {year} {BRAND.name}. All rights reserved.</span>
          <span style={{ display: "flex", gap: 22 }}>
            {CONTACT.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ color: "rgba(246,240,230,0.7)", textDecoration: "none", letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 11 }}>{s.label}</a>)}
          </span>
        </div>
      </div>
    </footer>
  );
}
