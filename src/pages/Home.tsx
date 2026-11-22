import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, Download, MapPin, HardHat, Building2, LandPlot, LayoutGrid, Home as HomeIcon, Megaphone } from "lucide-react";
import { BRAND, HERO_STATS, ABOUT, PURPOSE, SERVICES, REASONS, PROJECTS, AURORA_FULL, type Project, type ServiceIcon } from "@/data/site";
import SiteHeader from "@/brand/SiteHeader";
import SiteFooter from "@/brand/SiteFooter";
import HaloCanvas from "@/brand/HaloCanvas";
import ContactSection from "@/brand/ContactSection";
import LeadModal from "@/brand/LeadModal";
import PageLoader from "@/components/PageLoader";
import { ProjectCard, ProjectModal, projectTitle } from "@/brand/ProjectViews";
import { Reveal, Arch, VLink, VelDivider, HaloMotif, SectionHead } from "@/brand/ui";

const ICONS: Record<ServiceIcon, typeof HardHat> = {
  construction: HardHat, apartments: Building2, townships: LandPlot, layouts: LayoutGrid, villas: HomeIcon, marketing: Megaphone,
};
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export default function Home() {
  const markRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [lead, setLead] = useState<{ kind: "brochure" | "enquiry"; project: string } | null>(null);
  const [aurora, vcKolar] = PROJECTS.filter((p) => p.featured);
  const portfolio = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="v-site">
      <Helmet>
        <title>{BRAND.name} | Premium Construction & Development</title>
        <meta name="description" content={`${BRAND.name}: premium residential development and construction across Karnataka and Andhra Pradesh since 2013.`} />
      </Helmet>
      <PageLoader />
      <SiteHeader />

      {/* ── 1 · HERO ─────────────────────────────────────────────────── */}
      <section className="v-hero" aria-label={BRAND.name}>
        <HaloCanvas focusRef={markRef} />
        <div className="v-hero-inner">
          <img ref={markRef} src="/vedamala-mark.png" alt="" className="v-hero-mark" />
          <span className="v-eyebrow v-hero-eyebrow" style={{ color: "#C6A15B" }}>{BRAND.name} · Est. {BRAND.est}</span>
          <h1 className="v-display v-display-xl v-hero-title">
            <span>Building</span>
            <span className="v-hero-title-2">Excellence</span>
          </h1>
          <p className="v-hero-sub">{BRAND.intro}</p>
          <div className="v-hero-ctas">
            <VLink to="/projects" className="v-btn v-btn-brass">Explore projects <ArrowUpRight /></VLink>
            <VLink to="/#contact" className="v-btn v-btn-line">Enquire</VLink>
          </div>
        </div>
        <div className="v-hero-stats">
          {HERO_STATS.map((s) => (
            <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
      </section>

      {/* ── 2 · STATEMENT ────────────────────────────────────────────── */}
      <section className="v-section" style={{ paddingBottom: "clamp(60px,8vw,110px)" }}>
        <div className="v-kolam v-ivory-kolam" />
        <div className="v-wrap" style={{ position: "relative", textAlign: "center" }}>
          <Reveal>
            <VelDivider tone="gold" />
            <p className="v-serif v-statement" style={{ maxWidth: 980, margin: "34px auto 0", color: "#3B0D14" }}>
              “{PURPOSE.statement}”
            </p>
            <p className="v-eyebrow" style={{ marginTop: 34 }}>Our belief, since {BRAND.est}</p>
          </Reveal>
        </div>
      </section>

      {/* ── 3 · CODE NAME: THE AURORA ───────────────────────────────── */}
      <section className="v-section v-dark" aria-label={AURORA_FULL}>
        <div className="v-kolam" />
        <HaloMotif style={{ position: "absolute", width: 900, right: -320, top: -200 }} opacity={0.12} />
        <div className="v-wrap v-grid-2" style={{ position: "relative" }}>
          <Reveal mask>
            <div style={{ padding: "16px 16px 0" }}><Arch src={aurora.image} alt={projectTitle(aurora)} /></div>
          </Reveal>
          <Reveal delay={150}>
            <span className="v-eyebrow">{aurora.status} · {aurora.location}</span>
            <div style={{ marginTop: 26, fontSize: 12, fontWeight: 600, letterSpacing: "0.34em", textTransform: "uppercase", color: "#C6A15B" }}>{aurora.prefix}</div>
            <h2 className="v-display v-display-l" style={{ marginTop: 8 }}>{aurora.name}</h2>
            <p className="v-serif" style={{ fontSize: "clamp(1.4rem,2.4vw,2rem)", fontStyle: "italic", color: "#E3C98F", marginTop: 6 }}>{aurora.subtitle}</p>
            <p className="v-lead" style={{ marginTop: 24 }}>{aurora.summary}</p>
            <div className="v-facts" style={{ marginTop: 32 }}>
              {aurora.facts.map((f) => <div className="v-fact" key={f.label}><b>{f.value}</b><span>{f.label}</span></div>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
              <VLink to="/aurora" className="v-btn v-btn-brass">Explore {aurora.name} <ArrowUpRight /></VLink>
              <button className="v-btn v-btn-line" onClick={() => setLead({ kind: "brochure", project: projectTitle(aurora) })}><Download /> Brochure</button>
              {aurora.mapsHref && <a className="v-btn v-btn-line" href={aurora.mapsHref} target="_blank" rel="noreferrer"><MapPin /> Location</a>}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4 · VC ENCLAVE, KOLAR ───────────────────────────────────── */}
      <section className="v-section v-ivory2">
        <div className="v-wrap v-grid-2 v-reverse" style={{ position: "relative" }}>
          <Reveal>
            <span className="v-eyebrow">{vcKolar.status} · Kolar</span>
            <h2 className="v-display v-display-l" style={{ marginTop: 22, color: "#3B0D14" }}>{vcKolar.name}</h2>
            <p className="v-serif" style={{ fontSize: "clamp(1.3rem,2.2vw,1.8rem)", fontStyle: "italic", color: "#836329", marginTop: 6 }}>{vcKolar.subtitle}</p>
            <p className="v-lead" style={{ marginTop: 22 }}>{vcKolar.summary}</p>
            <div className="v-facts" style={{ marginTop: 30 }}>
              {vcKolar.facts.map((f) => <div className="v-fact" key={f.label}><b>{f.value}</b><span>{f.label}</span></div>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
              {vcKolar.highlights?.map((h) => <span className="v-chip" key={h}>{h}</span>)}
            </div>
            <button className="v-btn v-btn-maroon" style={{ marginTop: 32 }} onClick={() => setLead({ kind: "enquiry", project: "VC Enclave, Kolar" })}>Enquire about plots <ArrowUpRight /></button>
          </Reveal>
          <Reveal mask delay={120}>
            <div style={{ padding: "16px 16px 0" }}><Arch src={vcKolar.image} alt={vcKolar.name} wide /></div>
          </Reveal>
        </div>
      </section>

      {/* ── 5 · ALL PROJECTS ────────────────────────────────────────── */}
      <section className="v-section" id="projects">
        <div className="v-wrap">
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28 }}>
            <SectionHead eyebrow="Our projects" title="Homes we have" accent="built & delivered" />
            <Reveal><VLink to="/projects" className="v-btn v-btn-line-dark">All projects <ArrowUpRight /></VLink></Reveal>
          </div>
          <div className="v-proj-grid" style={{ marginTop: 64 }}>
            {portfolio.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 110}><ProjectCard project={p} onOpen={setActive} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · ABOUT / LEGACY ──────────────────────────────────────── */}
      <section className="v-section v-maroon" id="about">
        <div className="v-kolam" />
        <div className="v-wrap" style={{ position: "relative" }}>
          <div className="v-grid-2" style={{ alignItems: "start" }}>
            <Reveal>
              <span className="v-eyebrow">Who we are</span>
              <h2 className="v-display v-display-l" style={{ marginTop: 22 }}>A name built<br /><span className="v-accent">on trust</span></h2>
            </Reveal>
            <Reveal delay={120}>
              {ABOUT.paragraphs.map((p) => <p key={p} className="v-lead" style={{ marginBottom: 18 }}>{p}</p>)}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26 }}>
                {ABOUT.values.map((v) => <span className="v-chip" key={v}>{v}</span>)}
              </div>
            </Reveal>
          </div>
          <Reveal className="v-facts" style={{ marginTop: 72 }}>
            {ABOUT.stats.map((s) => <div className="v-fact" key={s.label} style={{ padding: "34px 28px" }}><b style={{ fontSize: "clamp(2.6rem,4.6vw,3.8rem)" }}>{s.value}</b><span>{s.label}</span></div>)}
          </Reveal>
        </div>
      </section>

      {/* ── 7 · PURPOSE ─────────────────────────────────────────────── */}
      <section className="v-section" style={{ textAlign: "center" }}>
        <HaloMotif style={{ position: "absolute", width: 760, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} opacity={0.1} />
        <div className="v-wrap" style={{ position: "relative" }}>
          <SectionHead eyebrow="Our purpose" title="Mission" accent="& vision" align="center" />
          <div className="v-purpose">
            <Reveal className="v-purpose-card">
              <h3 className="v-display v-display-s" style={{ color: "#5A1621" }}>Mission</h3>
              <VelDivider tone="gold" width={140} />
              <p className="v-lead">{PURPOSE.mission}</p>
            </Reveal>
            <Reveal className="v-purpose-card" delay={140}>
              <h3 className="v-display v-display-s" style={{ color: "#5A1621" }}>Vision</h3>
              <VelDivider tone="gold" width={140} />
              <p className="v-lead">{PURPOSE.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 8 · SERVICES ────────────────────────────────────────────── */}
      <section className="v-section v-ivory2" id="services">
        <div className="v-wrap">
          <SectionHead eyebrow="What we offer" title="Our" accent="services" />
          <div className="v-services">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={(i % 3) * 100} className="v-service">
                  <span className="v-service-icon"><Icon size={26} strokeWidth={1.2} /></span>
                  <span className="v-service-num">{ROMAN[i]}</span>
                  <h3 className="v-display v-display-s" style={{ color: "#3B0D14", marginTop: 26 }}>{s.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.75, color: "rgba(34,26,24,0.72)" }}>{s.description}</p>
                </Reveal>
              );
            })}
          </div>
          <Reveal style={{ marginTop: 56 }}><VLink to="/#contact" className="v-btn v-btn-maroon">Discuss your project <ArrowUpRight /></VLink></Reveal>
        </div>
      </section>

      {/* ── 9 · WHY VEDAMALA: five pillars ──────────────────────────── */}
      <section className="v-section v-dark">
        <div className="v-kolam" />
        <div className="v-wrap" style={{ position: "relative" }}>
          <SectionHead eyebrow="Our commitment" title="Five pillars" accent="of every home" align="center" />
          <div className="v-pillars">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 90} className="v-pillar">
                <span className="v-pillar-num">{ROMAN[i]}</span>
                <h3 className="v-display" style={{ fontSize: "1.15rem", letterSpacing: "0.08em", marginTop: 18 }}>{r.title}</h3>
                <p style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.7, color: "rgba(246,240,230,0.68)" }}>{r.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 · CONTACT ────────────────────────────────────────────── */}
      <ContactSection />
      <SiteFooter />

      <ProjectModal project={active} onClose={() => setActive(null)} />
      <LeadModal open={!!lead} onClose={() => setLead(null)} kind={lead?.kind ?? "enquiry"} project={lead?.project ?? ""} />
    </div>
  );
}
