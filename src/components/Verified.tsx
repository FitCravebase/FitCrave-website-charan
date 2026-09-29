"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./Motion";
import Clip from "./Clip";
import { BOWL_PARTS } from "@/lib/data";
import styles from "./Verified.module.css";

const TOTAL = BOWL_PARTS.reduce((a, x) => ({ grams: a.grams + x.grams, kcal: a.kcal + x.kcal, p: a.p + x.p }), {
  grams: 0,
  kcal: 0,
  p: 0,
});

// Each weighed component, its photo, and where it waits before landing in the bowl (% of the stage).
const ING = [
  { img: "/media/ing-rice.jpg", color: "#e2a63a", x: 14, y: 22, size: 150 },
  { img: "/media/ing-paneer.jpg", color: "#ef4f5f", x: 84, y: 18, size: 140 },
  { img: "/media/ing-chana.jpg", color: "#b8612d", x: 8, y: 74, size: 120 },
  { img: "/media/ing-greens.jpg", color: "#1f8a4c", x: 88, y: 72, size: 130 },
  { img: "/media/ing-curd.jpg", color: "#8a8a8a", x: 50, y: 92, size: 104 },
];

const R = 46;
const C = 2 * Math.PI * R;

// Ring segments: each ingredient's share of the bowl, by weight. Fixed, so computed once.
const ARCS = BOWL_PARTS.map((p, i) => {
  const before = BOWL_PARTS.slice(0, i).reduce((a, x) => a + x.grams, 0);
  const len = (p.grams / TOTAL.grams) * C;
  return { len: +(len - 1.2).toFixed(2), start: +((before / TOTAL.grams) * C).toFixed(2), color: ING[i].color };
});

export default function Verified() {
  const root = useRef<HTMLElement>(null);
  const [n, setN] = useState(BOWL_PARTS.length);
  const [grams, setGrams] = useState(TOTAL.grams);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    const build = (pin: boolean) => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: pin ? "[data-vpin]" : "[data-vstage]",
            start: pin ? "top top+=80" : "top 75%",
            end: pin ? "+=1600" : "bottom 40%",
            scrub: 0.6,
            pin,
            onUpdate: (self) => {
              // The last 12% of the scroll is the plated reveal; before that, one ingredient per slice.
              const t = Math.min(1, self.progress / 0.88);
              const exact = t * BOWL_PARTS.length;
              const count = Math.min(BOWL_PARTS.length, Math.floor(exact + 0.001));
              const partial = Math.min(1, exact - count);
              const base = BOWL_PARTS.slice(0, count).reduce((a, x) => a + x.grams, 0);
              setN(count);
              setGrams(base + (BOWL_PARTS[count]?.grams ?? 0) * partial);
            },
          },
        });
        tl.set("[data-plated]", { scale: 0.4, opacity: 0, rotate: -60 });
        tl.set("[data-arc]", { strokeDashoffset: (i, t: SVGCircleElement) => Number(t.dataset.len), opacity: 0 });
        ING.forEach((_, i) => {
          const at = i;
          // Fly from its waiting spot into the bowl, shrink, and hand its share to the ring.
          tl.to(`[data-ing="${i}"]`, { left: "50%", top: "50%", scale: 0.42, rotate: 200, duration: 0.8 }, at)
            .to(`[data-ing="${i}"]`, { opacity: 0, scale: 0.2, duration: 0.25, ease: "power2.in" }, at + 0.75)
            .to(`[data-arc="${i}"]`, { strokeDashoffset: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, at + 0.55);
        });
        tl.to("[data-plated]", { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.4)" }, ING.length)
          .from("[data-badge]", { scale: 0, rotate: -12, duration: 0.5, ease: "back.out(2)" }, ING.length + 0.4);
      }, el);
      return () => ctx.revert();
    };
    mm.add("(min-width: 901px)", () => build(true));
    mm.add("(max-width: 900px)", () => build(false));
    return () => mm.revert();
  }, []);

  const kcal = BOWL_PARTS.slice(0, n).reduce((a, x) => a + x.kcal, 0);
  const done = n === BOWL_PARTS.length;

  return (
    <section ref={root} className={`section ${styles.section}`} id="verified">
      <div className="wrap">
        <div className={styles.head}>
          <span className="sticker sticker-leaf" data-reveal>
            Verified nutrition
          </span>
          <h2 className="display h2" data-reveal>
            Weighed.
            <span className="red"> Not guessed.</span>
          </h2>
        </div>

        <div className={styles.pin} data-vpin>
          <div className={styles.side}>
            <div className={styles.scale}>
              <Clip name="scale" className={styles.scaleClip} position="50% 55%" />
              <span className={styles.scaleTag}>
                <span className="dot-live" /> 0.1 g scale
              </span>
            </div>
            <span className={`num ${styles.grams}`}>
              {grams.toFixed(1)}
              <small>g</small>
            </span>
            <span className={styles.now}>{done ? "Plated" : `+ ${BOWL_PARTS[n]?.name ?? ""}`}</span>
          </div>

          <div className={styles.stage} data-vstage>
            <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="2.4" strokeDasharray="0.6 1.6" />
              {ARCS.map((a, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeDasharray={`${a.len} ${C}`}
                  strokeDashoffset={0}
                  transform={`rotate(${(-90 + (a.start / C) * 360).toFixed(2)} 50 50)`}
                  data-arc={i}
                  data-len={a.len}
                />
              ))}
            </svg>
            <div className={styles.bowl}>
              <div className={styles.plated} data-plated>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/dish-paneer.jpg" alt="Charred paneer and brown rice, plated" />
              </div>
            </div>
            <span className={`${styles.badge} ${done ? styles.badgeOn : ""}`} data-badge>
              <b className="num">{kcal}</b> kcal
              <small>{done ? "Spec matched" : "adding up"}</small>
            </span>

            {ING.map((g, i) => (
              <div
                key={g.img}
                className={styles.ing}
                style={{ left: `${g.x}%`, top: `${g.y}%`, ["--s" as string]: g.size } as React.CSSProperties}
                data-ing={i}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img} alt="" />
                <span className={styles.ingLabel}>
                  <b className="num">{BOWL_PARTS[i].grams}g</b> {BOWL_PARTS[i].name}
                </span>
              </div>
            ))}
          </div>

          <ul className={styles.list}>
            {BOWL_PARTS.map((p, i) => (
              <li key={p.name} className={i < n ? styles.on : ""}>
                <i style={{ background: ING[i].color }} />
                <span>{p.name}</span>
                <b className="num">{p.grams}g</b>
              </li>
            ))}
            <li className={styles.totalRow}>
              <span>Total</span>
              <b className="num">
                {TOTAL.p}g <small>protein</small>
              </b>
            </li>
          </ul>
        </div>

        <div className={styles.steps}>
          {[
            ["Recipe in grams", "sticker"],
            ["Weighed at the kitchen", "sticker sticker-leaf"],
            ["Spot-checked weekly", "sticker sticker-gold"],
            ["Lab-tested quarterly", "sticker sticker-dark"],
          ].map(([t, c]) => (
            <span key={t} className={c} data-reveal>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
