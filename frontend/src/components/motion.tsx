import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SmoothScroll() {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      const loop = (t: number) => { lenis?.raf(t); frame = requestAnimationFrame(loop); };
      frame = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(frame); lenis?.destroy(); };
  }, []);
  return null;
}

export function Reveal({ children, delay = 0, y = 34, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.9, ease, delay }}>
      {children}
    </motion.div>
  );
}

export function MaskLines({ lines, className = "", delay = 0, as = "h1" }: { lines: ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" }) {
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <motion.span className="mask-inner" variants={{ hidden: { y: "108%" }, show: { y: "0%" } }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}>{line}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = items.flatMap((item, i) => [<span key={`t${i}`}>{item}</span>, <span key={`s${i}`} className="marquee-star" aria-hidden="true">✦</span>]);
  return (
    <div className={`marquee ${className}`} data-testid="editorial-marquee">
      <div className="marquee-track"><div className="marquee-row">{row}</div><div className="marquee-row" aria-hidden="true">{row}</div></div>
    </div>
  );
}
