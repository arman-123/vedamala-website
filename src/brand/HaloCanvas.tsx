import { useEffect, useRef } from "react";

/**
 * Hero background animation, drawn from the Vedamala mark:
 *  - the three halo rings around the Vel, breathing and slowly turning
 *  - temple-lamp rays radiating from the centre
 *  - brass embers rising like diya sparks
 *  - a faint mandala of dotted circles turning the other way
 * Everything is Temple Brass on a Deep Maroon field. Static under reduced motion.
 */
type Ember = { x: number; y: number; r: number; vy: number; sway: number; phase: number; life: number };

export default function HaloCanvas({ focusRef }: { focusRef?: React.RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, cx = 0, cy = 0, R = 0;
    let embers: Ember[] = [];
    let raf = 0;
    let visible = true;

    const spawn = (anywhere: boolean): Ember => ({
      x: cx + (Math.random() - 0.5) * w * 0.9,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.5 + Math.random() * 1.6,
      vy: 0.15 + Math.random() * 0.45,
      sway: 8 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      life: 0.35 + Math.random() * 0.65,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const host = canvas.getBoundingClientRect();
      const f = focusRef?.current?.getBoundingClientRect();
      cx = f ? f.left - host.left + f.width / 2 : w / 2;
      cy = f ? f.top - host.top + f.height * 0.42 : h * 0.36;
      R = Math.min(w, h) * (w < 700 ? 0.62 : 0.5);
      const count = Math.round(Math.min(110, (w * h) / 14000));
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const brass = (a: number) => `rgba(198,161,91,${a})`;
    const brassHi = (a: number) => `rgba(227,201,143,${a})`;

    const draw = (t: number) => {
      const s = t / 1000;
      ctx.clearRect(0, 0, w, h);

      // field: deep maroon with a warm core behind the mark
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.85);
      g.addColorStop(0, "#6E1E2A");
      g.addColorStop(0.32, "#4A1119");
      g.addColorStop(0.7, "#3B0D14");
      g.addColorStop(1, "#22070C");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // rays
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s * 0.012);
      const rays = 64;
      for (let i = 0; i < rays; i++) {
        const a = (i / rays) * Math.PI * 2;
        const flick = 0.5 + 0.5 * Math.sin(s * 0.7 + i * 1.7);
        const len = R * (1.3 + 0.35 * flick);
        ctx.strokeStyle = brass(0.025 + 0.035 * flick);
        ctx.lineWidth = i % 4 === 0 ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * R * 0.22, Math.sin(a) * R * 0.22);
        ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
        ctx.stroke();
      }
      ctx.restore();

      // mandala: dotted circles turning the other way
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-s * 0.03);
      [1.05, 1.32, 1.62].forEach((k, i) => {
        ctx.setLineDash(i === 1 ? [] : [1.5, 10 + i * 4]);
        ctx.strokeStyle = brass(i === 1 ? 0.07 : 0.16);
        ctx.lineWidth = i === 1 ? 0.6 : 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, R * k, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();

      // halo rings (tilted ellipses, like the three rings around the Vel)
      const rings = [
        { k: 0.42, dy: -0.16, tilt: 0.2 },
        { k: 0.6, dy: 0.0, tilt: 0.21 },
        { k: 0.8, dy: 0.17, tilt: 0.22 },
      ];
      rings.forEach((ring, i) => {
        const breathe = 1 + 0.025 * Math.sin(s * 0.9 + i * 1.3);
        const rx = R * ring.k * breathe;
        const ry = rx * ring.tilt;
        const y = cy + R * ring.dy;
        // soft glow pass
        ctx.strokeStyle = brass(0.08);
        ctx.lineWidth = 6;
        ctx.beginPath(); ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
        // gradient stroke
        const lg = ctx.createLinearGradient(cx - rx, y, cx + rx, y);
        lg.addColorStop(0, brass(0.15));
        lg.addColorStop(0.5, brassHi(0.75));
        lg.addColorStop(1, brass(0.15));
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
        // a travelling spark on each ring
        const a = s * (0.35 + i * 0.12) + i * 2.1;
        const px = cx + Math.cos(a) * rx, py = y + Math.sin(a) * ry;
        const sg = ctx.createRadialGradient(px, py, 0, px, py, 14);
        sg.addColorStop(0, brassHi(0.9)); sg.addColorStop(1, brassHi(0));
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2); ctx.fill();
      });

      // embers
      for (const e of embers) {
        if (!reduce) {
          e.y -= e.vy;
          e.phase += 0.01;
          if (e.y < -10) Object.assign(e, spawn(false));
        }
        const x = e.x + Math.sin(e.phase) * e.sway;
        const fade = Math.min(1, e.y / (h * 0.35)) * e.life;
        ctx.fillStyle = brassHi(0.55 * fade);
        ctx.beginPath(); ctx.arc(x, e.y, e.r, 0, Math.PI * 2); ctx.fill();
        if (e.r > 1.4) {
          ctx.fillStyle = brass(0.12 * fade);
          ctx.beginPath(); ctx.arc(x, e.y, e.r * 4, 0, Math.PI * 2); ctx.fill();
        }
      }

      // vignette
      const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
      v.addColorStop(0, "rgba(20,4,8,0)");
      v.addColorStop(1, "rgba(20,4,8,0.55)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [focusRef]);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
