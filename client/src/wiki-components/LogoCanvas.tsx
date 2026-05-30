import { useEffect, useRef } from 'react';

/**
 * Animated halo behind the hero logo: a soft pulsing gold radial glow, a faint
 * slow-rotating dashed ring, and ~16 gold particles orbiting the centre at
 * varying radii/speeds. Honors prefers-reduced-motion (renders the static glow
 * only) and cancels its rAF loop / clears the canvas on unmount.
 */
const SIZE = 300;
const C = SIZE / 2;
const GOLD = '200, 146, 42'; // rgb of #c8922a
const COUNT = 16;

export function LogoCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crisp on hi-DPI while keeping a 300x300 CSS footprint.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: COUNT }, (_, i) => ({
      radius: 46 + Math.random() * 70, // 46–116px orbit
      angle0: (i / COUNT) * Math.PI * 2 + Math.random() * 0.8,
      speed: (0.12 + Math.random() * 0.22) * (Math.random() < 0.5 ? 1 : -1),
      size: 2 + Math.random() * 1.4, // 2–3.4px
      opacity: 0.35 + Math.random() * 0.5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const drawGlow = (pulse: number) => {
      const k = 0.7 + pulse * 0.6; // 0.7–1.3
      const g = ctx.createRadialGradient(C, C, 0, C, C, C);
      g.addColorStop(0, `rgba(${GOLD}, ${0.15 * k})`);
      g.addColorStop(0.45, `rgba(${GOLD}, ${0.05 * k})`);
      g.addColorStop(1, `rgba(${GOLD}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SIZE, SIZE);
    };

    const drawRing = (rot: number) => {
      ctx.save();
      ctx.translate(C, C);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${GOLD}, 0.1)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 9]);
      ctx.stroke();
      ctx.restore();
    };

    const drawParticles = (t: number) => {
      for (const p of particles) {
        const a = p.angle0 + t * p.speed;
        const x = C + Math.cos(a) * p.radius;
        const y = C + Math.sin(a) * p.radius;
        const op = Math.max(0, p.opacity * (0.55 + 0.45 * Math.sin(t * 1.8 + p.twinkle)));
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD}, ${op})`;
        ctx.shadowColor = `rgba(${GOLD}, 0.7)`;
        ctx.shadowBlur = 5;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      drawGlow(0.5);
      drawRing(0);
      return () => ctx.clearRect(0, 0, SIZE, SIZE);
    }

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, SIZE, SIZE);
      const pulse = (Math.sin((t / 3) * Math.PI * 2) + 1) / 2; // ~3s pulse
      drawGlow(pulse);
      drawRing(t * 0.18);
      drawParticles(t);
      raf = requestAnimationFrame(frame);
    };
    frame(start); // draw the first frame immediately, then keep animating

    return () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, SIZE, SIZE);
    };
  }, []);

  return <canvas ref={ref} className="logo-canvas" width={SIZE} height={SIZE} aria-hidden="true" />;
}
