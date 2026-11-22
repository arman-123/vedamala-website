import { useEffect, useRef, useState } from "react";

/**
 * Brand intro: plays the Vedamala logo motion poster once per session,
 * then lifts away to reveal the site. Skippable, and falls back to the
 * final logo frame if the browser blocks autoplay.
 */
const SEEN_KEY = "vedamala_intro_seen";
const MAX_MS = 13000;

function alreadySeen() {
  try { return sessionStorage.getItem(SEEN_KEY) === "1"; } catch { return false; }
}
function markSeen() {
  try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* storage unavailable */ }
}

export default function PageLoader() {
  const [phase, setPhase] = useState<"playing" | "leaving" | "hidden">(
    alreadySeen() ? "hidden" : "playing"
  );
  const [fallback, setFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = () => {
    setPhase((p) => (p === "playing" ? "leaving" : p));
  };

  useEffect(() => {
    if (phase === "hidden") return;
    if (phase === "leaving") {
      markSeen();
      const t = setTimeout(() => setPhase("hidden"), 1100);
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "hidden";
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        setFallback(true);
        setTimeout(finish, 1800);
      });
    }
    const cap = setTimeout(finish, MAX_MS);
    return () => {
      clearTimeout(cap);
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{
        background: "#3B0D14",
        transform: phase === "leaving" ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 1.1s cubic-bezier(0.87, 0, 0.13, 1)",
      }}
      aria-label="Vedamala Group"
    >
      {fallback ? (
        <img
          src="/vedamala-intro-end.jpg"
          alt="Vedamala Group"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src="/vedamala-intro.mp4"
          poster="/vedamala-intro-end.jpg"
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={finish}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ background: "#000" }}
        />
      )}

      <button
        onClick={finish}
        className="absolute bottom-8 right-8 font-body"
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(246,240,230,0.7)",
          border: "1px solid rgba(198,161,91,0.45)",
          padding: "10px 18px",
          background: "rgba(59,13,20,0.35)",
          cursor: "pointer",
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
