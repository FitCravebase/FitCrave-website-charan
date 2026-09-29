"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./Motion";
import styles from "./FloatingPlates.module.css";

export type Plate = {
  src: string;
  x: string; // left, % of the section
  y: string; // top, % of the section
  size: number; // px at desktop; phones get ~55%
  speed: number; // px of vertical drift across the section's scroll
  spin: number; // degrees of rotation across the section's scroll
  blur?: boolean; // a soft, out-of-focus plate for depth
};

// Real dishes cropped to plates, drifting and turning at their own speeds as the section scrolls by.
// Drop inside any position:relative section; it fills the section and never takes pointer events.
export default function FloatingPlates({ plates, curve }: { plates: Plate[]; curve?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const section = el?.parentElement;
    if (!el || !section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-fp]").forEach((p, i) => {
        const cfg = plates[i];
        gsap.fromTo(
          p,
          { y: cfg.speed * -0.25, rotate: 0 },
          {
            y: cfg.speed,
            rotate: cfg.spin,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
        gsap.from(p.firstElementChild, {
          scale: 0,
          duration: 1.1,
          delay: i * 0.07,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });
      });
      const path = el.querySelector<SVGPathElement>("[data-fp-curve]");
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: section, start: "top 85%", end: "bottom 50%", scrub: true } },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [plates]);

  return (
    <div ref={root} className={styles.layer} aria-hidden="true">
      {curve ? (
        <svg className={styles.curve} viewBox="0 0 1200 700" preserveAspectRatio="none">
          <path data-fp-curve d={curve} fill="none" stroke="var(--red)" strokeOpacity="0.3" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        </svg>
      ) : null}
      {plates.map((p) => (
        <div
          key={p.src + p.x + p.y}
          className={styles.slot}
          style={{ left: p.x, top: p.y, ["--s" as string]: p.size } as React.CSSProperties}
          data-fp
        >
          <div className={`${styles.plate} ${p.blur ? styles.blur : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt="" loading="lazy" />
          </div>
        </div>
      ))}
    </div>
  );
}
