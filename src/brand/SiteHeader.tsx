import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV, CONTACT } from "@/data/site";
import { VLink, HaloMotif } from "./ui";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
          padding: scrolled ? "12px 0" : "24px 0",
          background: scrolled ? "rgba(59,13,20,0.94)" : "linear-gradient(to bottom, rgba(34,7,12,0.55), rgba(34,7,12,0))",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(198,161,91,0.28)" : "transparent"}`,
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="v-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <VLink to="/" ariaLabel="Vedamala Group, home">
            <img src="/vedamala-logo-horizontal.png" alt="Vedamala Group" style={{ height: scrolled ? 40 : 50, width: "auto", transition: "height 0.5s ease", display: "block" }} />
          </VLink>

          <nav className="hidden lg:flex" style={{ alignItems: "center", gap: 38 }}>
            {NAV.map((n) => (
              <VLink
                key={n.label}
                to={n.href}
                className="v-navlink"
                style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase",
                  color: isActive(n.href) ? "#E3C98F" : "rgba(246,240,230,0.78)", textDecoration: "none",
                }}
              >
                {n.label}
              </VLink>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className="hidden md:inline-flex"><VLink to="/#contact" className="v-btn v-btn-brass" style={{ padding: "12px 22px" }}>Enquire</VLink></span>
            <span className="inline-flex lg:hidden"><button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              style={{ width: 44, height: 44, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, background: "none", border: "1px solid rgba(198,161,91,0.45)", cursor: "pointer", position: "relative", zIndex: 70 }}
            >
              <span style={{ width: 18, height: 1, background: "#E3C98F", transition: "transform .4s", transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }} />
              <span style={{ width: 18, height: 1, background: "#E3C98F", transition: "transform .4s", transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none" }} />
            </button></span>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed", inset: 0, zIndex: 55, background: "#3B0D14", color: "#F6F0E6",
          opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden", transition: "opacity .5s ease, visibility .5s",
          display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 32px 40px", overflow: "hidden",
        }}
      >
        <HaloMotif style={{ position: "absolute", width: 680, right: -260, top: "50%", transform: "translateY(-50%)" }} opacity={0.22} />
        <nav style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
          {NAV.map((n, i) => (
            <VLink
              key={n.label}
              to={n.href}
              onClick={() => setOpen(false)}
              className="v-display"
              style={{
                fontSize: "clamp(2rem, 9vw, 3.2rem)", color: isActive(n.href) ? "#E3C98F" : "#F6F0E6", textDecoration: "none",
                transform: open ? "none" : "translateY(18px)", opacity: open ? 1 : 0,
                transition: `all .7s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms`,
              }}
            >
              {n.label}
            </VLink>
          ))}
        </nav>
        <div style={{ position: "relative", marginTop: 48, fontSize: 13, lineHeight: 1.9, color: "rgba(246,240,230,0.7)" }}>
          <div>{CONTACT.phone}</div>
          <div>{CONTACT.email}</div>
        </div>
      </div>
    </>
  );
}
