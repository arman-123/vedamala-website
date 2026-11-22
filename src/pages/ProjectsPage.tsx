import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BRAND, PROJECTS, type Project } from "@/data/site";
import SiteHeader from "@/brand/SiteHeader";
import SiteFooter from "@/brand/SiteFooter";
import { ProjectCard, ProjectModal } from "@/brand/ProjectViews";
import { Reveal, HaloMotif, VelDivider, VLink } from "@/brand/ui";

/** One page, every project together, no category labels. */
export default function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <div className="v-site">
      <Helmet><title>Projects | {BRAND.name}</title></Helmet>
      <SiteHeader />

      <section className="v-dark v-page-hero">
        <div className="v-kolam" />
        <HaloMotif style={{ position: "absolute", width: 820, right: -200, top: "50%", transform: "translateY(-50%)" }} opacity={0.2} />
        <div className="v-wrap" style={{ position: "relative" }}>
          <Reveal>
            <span className="v-eyebrow">{BRAND.name} · {BRAND.region}</span>
            <h1 className="v-display v-display-xl" style={{ marginTop: 24 }}>Our<br /><span className="v-accent">projects</span></h1>
            <p className="v-lead" style={{ marginTop: 26, maxWidth: 560 }}>
              Every home we have built, and the ones we are building now. {PROJECTS.length} addresses across Bengaluru, Kolar, Hoskote and Chittoor.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v-section" style={{ paddingTop: "clamp(70px,8vw,110px)" }}>
        <div className="v-wrap">
          <div className="v-proj-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 110}><ProjectCard project={p} onOpen={setActive} /></Reveal>
            ))}
          </div>
          <Reveal style={{ textAlign: "center", marginTop: 96 }}>
            <VelDivider tone="gold" />
            <p className="v-serif" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#3B0D14", marginTop: 22 }}>Interested in one of our homes?</p>
            <VLink to="/#contact" className="v-btn v-btn-maroon" style={{ marginTop: 26 }}>Talk to our team</VLink>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
