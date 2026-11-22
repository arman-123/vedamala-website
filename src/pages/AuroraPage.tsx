import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Download, MapPin } from "lucide-react";
import { AURORA, AURORA_NAME, AURORA_FULL, BRAND } from "@/data/site";
import SiteHeader from "@/brand/SiteHeader";
import SiteFooter from "@/brand/SiteFooter";
import LeadModal from "@/brand/LeadModal";
import { Reveal, Arch, VLink, VelDivider, HaloMotif, SectionHead } from "@/brand/ui";

export default function AuroraPage() {
  const [lead, setLead] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLead = () => setLead(true);

  return (
    <div className="v-site">
      <Helmet>
        <title>{AURORA_FULL} | {BRAND.name}</title>
        <meta name="description" content={`${AURORA_FULL} by ${BRAND.name}: 2 & 3 bedroom residences on the Hoskote corridor, Bangalore. Pre-launch now.`} />
      </Helmet>
      <SiteHeader />

      {/* HERO */}
      <section className="v-aurora-hero v-dark">
        <video className="v-aurora-video" src={AURORA.heroVideo} poster={AURORA.heroPoster} autoPlay muted loop playsInline />
        <div className="v-aurora-tint" />
        <HaloMotif style={{ position: "absolute", width: 760, right: -120, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} opacity={0.32} />
        <div className="v-wrap" style={{ position: "relative", zIndex: 3, width: "100%" }}>
          <VLink to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(246,240,230,0.75)", textDecoration: "none" }}>
            <ArrowLeft size={14} /> All projects
          </VLink>
          <div style={{ marginTop: "clamp(40px,10vh,110px)" }}>
            <span className="v-eyebrow">{BRAND.name} · {AURORA.location}</span>
            <div style={{ marginTop: 26, fontSize: "clamp(12px,1.3vw,15px)", fontWeight: 600, letterSpacing: "0.42em", textTransform: "uppercase", color: "#E3C98F" }}>{AURORA_NAME.prefix}</div>
            <h1 className="v-display v-display-xl" style={{ marginTop: 6 }}>{AURORA_NAME.name}</h1>
            <p className="v-serif" style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", fontStyle: "italic", color: "#E3C98F", marginTop: 4 }}>{AURORA_NAME.subtitle}</p>
            <p style={{ marginTop: 18, fontSize: 15, color: "rgba(246,240,230,0.8)" }}>“{AURORA.quote}”</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
              <button className="v-btn v-btn-brass" onClick={openLead}><Download /> Download brochure</button>
              <a className="v-btn v-btn-line" href={AURORA.mapsHref} target="_blank" rel="noreferrer"><MapPin /> View location</a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="v-section">
        <div className="v-kolam v-ivory-kolam" />
        <div className="v-wrap v-grid-2" style={{ position: "relative", alignItems: "start" }}>
          <Reveal>
            <span className="v-eyebrow">About {AURORA_NAME.name}</span>
            <h2 className="v-display v-display-l" style={{ marginTop: 22, color: "#3B0D14" }}>{AURORA.introTitle[0]}<br /><span className="v-accent">{AURORA.introTitle[1]}</span></h2>
          </Reveal>
          <Reveal delay={120}>
            {AURORA.intro.map((p) => <p key={p} className="v-lead" style={{ marginBottom: 18 }}>{p}</p>)}
          </Reveal>
        </div>
        <div className="v-wrap" style={{ position: "relative", marginTop: 64 }}>
          <Reveal className="v-facts">
            {AURORA.highlights.map((h) => <div className="v-fact" key={h.label} style={{ padding: "32px 26px" }}><b style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)" }}>{h.value}</b><span>{h.label}</span></div>)}
          </Reveal>
        </div>
      </section>

      {/* RESIDENCES */}
      <section className="v-section v-maroon">
        <div className="v-kolam" />
        <div className="v-wrap" style={{ position: "relative" }}>
          <SectionHead eyebrow="The residences" title="Four residences." accent="One standard." align="center" />
          <div className="v-residences">
            {AURORA.residences.map((r, i) => (
              <Reveal key={r.name} delay={i * 100} className="v-residence">
                <div className="v-residence-arch">
                  <span className="v-residence-type">{r.type}</span>
                  <span className="v-display" style={{ fontSize: "clamp(1.4rem,2vw,1.75rem)", color: "#F6F0E6", marginTop: 14, display: "block" }}>{r.name}</span>
                  <span style={{ display: "block", marginTop: 16, fontFamily: "var(--v-display)", fontSize: "1.9rem", color: "#E3C98F" }}>{r.area}</span>
                </div>
                <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.7, color: "rgba(246,240,230,0.72)", textAlign: "center" }}>{r.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS + AMENITIES */}
      <section className="v-section v-ivory2">
        <div className="v-wrap v-grid-2" style={{ alignItems: "start" }}>
          <Reveal>
            <span className="v-eyebrow">Specifications</span>
            <h2 className="v-display v-display-m" style={{ marginTop: 20, color: "#3B0D14" }}>Engineered to last</h2>
            <dl style={{ marginTop: 30 }}>
              {AURORA.specs.map((s) => (
                <div key={s.k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 18, padding: "16px 0", borderBottom: "1px solid rgba(131,99,41,0.25)" }}>
                  <dt style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#836329", paddingTop: 3 }}>{s.k}</dt>
                  <dd style={{ margin: 0, fontSize: 15, color: "rgba(34,26,24,0.85)" }}>{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <span className="v-eyebrow">45+ curated amenities</span>
            <h2 className="v-display v-display-m" style={{ marginTop: 20, color: "#3B0D14" }}>Nobody waits</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
              {AURORA.amenities.map((a) => <span className="v-chip" key={a}>{a}</span>)}
            </div>
            <p style={{ marginTop: 20, fontSize: 13.5, fontStyle: "italic", color: "rgba(34,26,24,0.6)" }}>Forty-five amenities. One rule: nobody waits.</p>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="v-section">
        <div className="v-wrap">
          <SectionHead eyebrow="Gallery" title="The architect's" accent="first drawing">
            CGI representations of the project. Indicative in nature.
          </SectionHead>
          <div className="v-gallery">
            {AURORA.gallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 4) * 80} className={`v-gal v-gal-${i}`}>
                <button onClick={() => setLightbox(i)} style={{ all: "unset", cursor: "zoom-in", display: "block", width: "100%", height: "100%" }} aria-label={`Open ${g.caption}`}>
                  {i === 0 ? <Arch src={g.src} alt={g.caption} /> : (
                    <div className="v-grade" style={{ height: "100%", overflow: "hidden" }}><img src={g.src} alt={g.caption} loading="lazy" /></div>
                  )}
                </button>
                <span className="v-gal-cap">{g.caption}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="v-section v-dark">
        <div className="v-kolam" />
        <div className="v-wrap v-grid-2" style={{ position: "relative" }}>
          <Reveal>
            <span className="v-eyebrow">The location</span>
            <h2 className="v-display v-display-l" style={{ marginTop: 22 }}>On the Hoskote<br /><span className="v-accent">corridor</span></h2>
            <p className="v-lead" style={{ marginTop: 22 }}>{AURORA_NAME.name} sits at the intersection of Bangalore's fastest-appreciating corridor and its most dependable social infrastructure: beside MVJ Hospital, minutes from the upcoming metro, 25 minutes to the airport.</p>
            <div style={{ marginTop: 30, display: "grid", gap: 18 }}>
              {AURORA.anchors.map((a) => (
                <div key={a.k} style={{ display: "flex", gap: 16 }}>
                  <span style={{ width: 8, height: 8, marginTop: 6, border: "1px solid #C6A15B", transform: "rotate(45deg)", flex: "none" }} />
                  <div><div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C6A15B" }}>{a.k}</div><div style={{ marginTop: 3, fontSize: 15, color: "rgba(246,240,230,0.85)" }}>{a.v}</div></div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            {AURORA.mapEmbed ? (
              <div className="v-arch">
                <div className="v-arch-img" style={{ aspectRatio: "4/5", background: "#22070C" }}>
                  <iframe title={`${AURORA_NAME.name} location`} src={AURORA.mapEmbed} loading="lazy" style={{ width: "100%", height: "100%", border: 0, filter: "grayscale(0.4) sepia(0.3) contrast(1.05)" }} />
                </div>
                <div className="v-arch-base" />
              </div>
            ) : (
              <Arch src={AURORA.mapFallback} alt={`${AURORA_NAME.name} masterplan`} />
            )}
            <a className="v-btn v-btn-line" href={AURORA.mapsHref} target="_blank" rel="noreferrer" style={{ marginTop: 22, width: "100%" }}><MapPin /> Open in Google Maps</a>
          </Reveal>
        </div>
      </section>

      {/* CLOSING */}
      <section className="v-section v-maroon" style={{ textAlign: "center" }}>
        <HaloMotif style={{ position: "absolute", width: 820, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} opacity={0.18} />
        <div className="v-wrap" style={{ position: "relative" }}>
          <Reveal>
            <span className="v-eyebrow">{AURORA.closing.eyebrow}</span>
            <h2 className="v-display v-display-xl" style={{ marginTop: 22 }}>{AURORA.closing.title}</h2>
            <p className="v-lead" style={{ marginTop: 20, maxWidth: 560, marginInline: "auto" }}>{AURORA.closing.body}</p>
            <div style={{ marginTop: 30 }}><VelDivider /></div>
            <button className="v-btn v-btn-brass" style={{ marginTop: 26 }} onClick={openLead}><Download /> Download brochure</button>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      <LeadModal open={lead} onClose={() => setLead(false)} kind="brochure" project={AURORA_FULL} />

      {lightbox !== null && (
        <div role="dialog" aria-modal="true" data-lenis-prevent onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(25,5,9,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}>
          <figure style={{ margin: 0, maxWidth: "min(1200px,100%)" }}>
            <img src={AURORA.gallery[lightbox].src} alt={AURORA.gallery[lightbox].caption} style={{ maxWidth: "100%", maxHeight: "82vh", display: "block", border: "1px solid rgba(198,161,91,0.5)" }} />
            <figcaption style={{ marginTop: 12, textAlign: "center", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#C6A15B" }}>{AURORA.gallery[lightbox].caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
