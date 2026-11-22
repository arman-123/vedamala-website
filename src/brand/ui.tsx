import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ── Scroll reveal ─────────────────────────────────────────────────────── */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    // failsafe so content never stays hidden
    const t = setTimeout(() => setInView(true), 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({ children, delay = 0, mask = false, className = "", style, as: Tag = "div" }: {
  children: ReactNode; delay?: number; mask?: boolean; className?: string; style?: CSSProperties; as?: "div" | "section" | "li" | "article";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={`${mask ? "v-reveal-mask" : "v-reveal"} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Comp>
  );
}

/* ── Internal links that work for routes and in-page sections ─────────── */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function VLink({ to, children, className, style, onClick, ariaLabel }: {
  to: string; children: ReactNode; className?: string; style?: CSSProperties; onClick?: () => void; ariaLabel?: string;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    const [path, hash] = to.split("#");
    const target = path || pathname;
    if (target === pathname) {
      if (hash) scrollToId(hash); else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(target);
    window.scrollTo(0, 0);
    if (hash) { setTimeout(() => scrollToId(hash), 150); setTimeout(() => scrollToId(hash), 700); }
  };
  return <a href={to} onClick={handle} className={className} style={style} aria-label={ariaLabel}>{children}</a>;
}

/* ── Motifs ────────────────────────────────────────────────────────────── */

/** Brass divider with the Vel (spear-tip) at its centre. */
export function VelDivider({ className = "", tone = "brass", width = 240 }: { className?: string; tone?: "brass" | "gold"; width?: number }) {
  const c = tone === "brass" ? "#C6A15B" : "#836329";
  return (
    <svg className={className} width={width} height={42} viewBox="0 0 240 42" fill="none" aria-hidden="true" style={{ display: "block", marginInline: "auto", maxWidth: "100%" }}>
      <path d="M0 30 H94" stroke={c} strokeWidth="1" />
      <path d="M146 30 H240" stroke={c} strokeWidth="1" />
      <path d="M120 3 C106 15 106 27 120 36 C134 27 134 15 120 3 Z" stroke={c} strokeWidth="1.1" />
      <path d="M120 11 V36" stroke={c} strokeWidth="1" />
      <ellipse cx="120" cy="21" rx="9" ry="2.2" stroke={c} strokeWidth="0.9" />
      <path d="M110 39 H130" stroke={c} strokeWidth="1" />
      <circle cx="94" cy="30" r="2" fill={c} />
      <circle cx="146" cy="30" r="2" fill={c} />
    </svg>
  );
}

/** Large decorative halo: the three rings and spear from the mark. */
export function HaloMotif({ className = "", style, opacity = 0.18 }: { className?: string; style?: CSSProperties; opacity?: number }) {
  return (
    <svg className={className} style={{ opacity, ...style }} viewBox="0 0 600 600" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="hm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E3C98F" />
          <stop offset="1" stopColor="#836329" />
        </linearGradient>
      </defs>
      <path d="M300 40 C210 150 190 300 300 520 C410 300 390 150 300 40 Z" stroke="url(#hm)" strokeWidth="1.2" />
      <path d="M300 120 V560" stroke="url(#hm)" strokeWidth="1" />
      <ellipse cx="300" cy="200" rx="70" ry="14" stroke="url(#hm)" strokeWidth="1.2" />
      <ellipse cx="300" cy="245" rx="105" ry="20" stroke="url(#hm)" strokeWidth="1.2" />
      <ellipse cx="300" cy="295" rx="140" ry="26" stroke="url(#hm)" strokeWidth="1.2" />
      <circle cx="300" cy="300" r="280" stroke="url(#hm)" strokeWidth="0.6" strokeDasharray="2 9" />
      <circle cx="300" cy="300" r="230" stroke="url(#hm)" strokeWidth="0.5" />
    </svg>
  );
}

/** Image in a temple-arch frame with the brand grade. */
export function Arch({ src, alt, wide = false, className = "", video, poster, eager }: {
  src: string; alt: string; wide?: boolean; className?: string; video?: boolean; poster?: string; eager?: boolean;
}) {
  return (
    <div className={`v-arch ${wide ? "wide" : ""} ${className}`}>
      <div className={`v-arch-img v-grade ${wide ? "wide" : ""}`}>
        {video ? (
          <video src={src} poster={poster} autoPlay muted loop playsInline />
        ) : (
          <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} />
        )}
      </div>
      <div className="v-arch-base" />
    </div>
  );
}

export function SectionHead({ eyebrow, title, accent, align = "left", children, className = "" }: {
  eyebrow: string; title: ReactNode; accent?: ReactNode; align?: "left" | "center"; children?: ReactNode; className?: string;
}) {
  return (
    <Reveal className={className} style={{ textAlign: align, maxWidth: align === "center" ? 820 : undefined, margin: align === "center" ? "0 auto" : undefined }}>
      <span className="v-eyebrow">{eyebrow}</span>
      <h2 className="v-display v-display-l" style={{ marginTop: 22 }}>
        {title}
        {accent && <><br /><span className="v-accent">{accent}</span></>}
      </h2>
      {children && <div className="v-lead" style={{ marginTop: 22, maxWidth: 620, marginInline: align === "center" ? "auto" : undefined }}>{children}</div>}
    </Reveal>
  );
}
