import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/site";
import { Arch, VLink } from "./ui";
import LeadModal from "./LeadModal";

export function projectTitle(p: Project) {
  return p.prefix ? `${p.prefix}: ${p.name}` : p.name;
}

/** Card used for every project: one look, no category labels. */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <button
      onClick={() => onOpen(project)}
      className="v-pcard"
      style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
      aria-label={`View ${projectTitle(project)}`}
    >
      <div style={{ padding: "12px 12px 0" }}>
        <Arch src={project.image} alt={projectTitle(project)} />
      </div>
      <div style={{ paddingTop: 22 }}>
        <span className="v-status">{project.status}</span>
        {project.prefix && <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#836329" }}>{project.prefix}</div>}
        <h3 className="v-display v-display-s" style={{ marginTop: project.prefix ? 6 : 12, color: "#3B0D14" }}>{project.name}</h3>
        <p style={{ marginTop: 8, fontSize: 14, color: "rgba(34,26,24,0.7)" }}>{project.subtitle} · {project.location}</p>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5A1621" }}>
          View project <ArrowUpRight size={14} />
        </span>
      </div>
    </button>
  );
}

/** Detail view for a project. The Aurora links through to its own page. */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [lead, setLead] = useState(false);
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !lead && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [project, onClose, lead]);
  if (!project) return null;
  const name = projectTitle(project);

  return (
    <>
      <div
        role="dialog" aria-modal="true" aria-label={name} data-lenis-prevent onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(25,5,9,0.78)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(10px,3vw,40px)" }}
      >
        <div onClick={(e) => e.stopPropagation()} className="v-site v-pmodal" style={{ width: "min(1100px,100%)", maxHeight: "92vh", overflowY: "auto", position: "relative" }}>
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", zIndex: 5, top: 16, right: 16, width: 40, height: 40, border: "1px solid rgba(198,161,91,0.6)", background: "rgba(59,13,20,0.85)", color: "#E3C98F", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={17} />
          </button>
          <div className="v-pmodal-grid">
            <div className="v-dark" style={{ padding: "56px 44px 44px", display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden" }}>
              <div className="v-kolam" />
              <Arch src={project.image} alt={name} className="w-full" eager />
            </div>
            <div style={{ padding: "52px clamp(24px,4vw,52px) 44px" }}>
              <span className="v-status">{project.status}</span>
              {project.prefix && <div style={{ marginTop: 16, fontSize: 11, fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#836329" }}>{project.prefix}</div>}
              <h3 className="v-display v-display-m" style={{ marginTop: project.prefix ? 6 : 16, color: "#3B0D14" }}>{project.name}</h3>
              <p style={{ marginTop: 8, fontSize: 14, letterSpacing: "0.04em", color: "#836329", fontWeight: 600 }}>{project.subtitle} · {project.location}</p>
              <p className="v-lead" style={{ marginTop: 20 }}>{project.summary}</p>
              {project.details && <p className="v-lead" style={{ marginTop: 12 }}>{project.details}</p>}
              <div className="v-facts" style={{ marginTop: 28 }}>
                {project.facts.map((f) => <div className="v-fact" key={f.label}><b style={{ fontSize: "1.6rem" }}>{f.value}</b><span>{f.label}</span></div>)}
              </div>
              {project.highlights && (
                <ul style={{ listStyle: "none", padding: 0, margin: "26px 0 0", display: "grid", gap: 10 }}>
                  {project.highlights.map((h) => (
                    <li key={h} style={{ display: "flex", gap: 12, fontSize: 14.5, color: "rgba(34,26,24,0.82)" }}>
                      <span style={{ width: 7, height: 7, marginTop: 7, border: "1px solid #836329", transform: "rotate(45deg)", flex: "none" }} />{h}
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                {project.page && <VLink to={project.page} onClick={onClose} className="v-btn v-btn-maroon">Explore {project.name} <ArrowUpRight /></VLink>}
                <button className={`v-btn ${project.page ? "v-btn-line-dark" : "v-btn-maroon"}`} onClick={() => setLead(true)}>
                  {project.lead === "brochure" ? "Request brochure" : "Enquire"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeadModal open={lead} onClose={() => setLead(false)} kind={project.lead === "brochure" ? "brochure" : "enquiry"} project={name} />
    </>
  );
}
