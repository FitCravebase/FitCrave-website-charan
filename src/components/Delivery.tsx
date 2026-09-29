"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./Motion";
import Clip, { type ClipHandle } from "./Clip";
import styles from "./Delivery.module.css";

const STATES = [
  { key: "Placed", time: "12:41", line: "Kitchen's on it", eta: "25–32 min" },
  { key: "Cooking", time: "12:42", line: "Cooked to spec", eta: "24–30 min" },
  { key: "Rider", time: "12:47", line: "Ravi's heading in", eta: "20–26 min" },
  { key: "Packed", time: "12:53", line: "Sealed #40218", eta: "18–22 min" },
  { key: "On the way", time: "12:55", line: "Arriving in 9 min", eta: "9 min" },
  { key: "Delivered", time: "13:04", line: "510 kcal logged", eta: "Done" },
];

const ROUTE = "M40 250 L40 190 L130 190 L130 120 L230 120 L230 60 L330 60 L330 24";

export default function Delivery() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const ride = useRef<ClipHandle>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = root.current;
    const p = path.current;
    const d = dot.current;
    if (!el || !p || !d) return;
    const len = p.getTotalLength();
    const place = (t: number) => {
      const pt = p.getPointAtLength(len * t);
      d.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    };
    p.style.strokeDasharray = `${len}`;

    if (prefersReducedMotion()) {
      p.style.strokeDashoffset = "0";
      place(1);
      const id = requestAnimationFrame(() => setStep(STATES.length - 1));
      return () => cancelAnimationFrame(id);
    }

    p.style.strokeDashoffset = `${len}`;
    place(0);

    const mm = gsap.matchMedia();
    const build = (pin: boolean) => {
      const state = { t: 0 };
      const tween = gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pin ? "[data-dpin]" : el,
          start: pin ? "top top+=80" : "top 65%",
          end: pin ? "+=1400" : "bottom 60%",
          scrub: 0.5,
          pin,
        },
        onUpdate: () => {
          // The route and the ride footage run only while the order is "On the way" (step 5 of 6).
          const route = gsap.utils.clamp(0, 1, (state.t - 4 / 6) / (1 / 6));
          p.style.strokeDashoffset = `${len * (1 - route)}`;
          place(route);
          const v = ride.current?.video;
          if (v && v.duration) v.currentTime = Math.min(v.duration - 0.05, route * v.duration);
          setStep(Math.min(STATES.length - 1, Math.floor(state.t * STATES.length)));
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };
    mm.add("(min-width: 901px)", () => build(true));
    mm.add("(max-width: 900px)", () => build(false));
    return () => mm.revert();
  }, []);

  const current = STATES[step];
  const scene = step <= 3 ? "pan" : step === 4 ? "ride" : "handover";

  return (
    <section ref={root} className={`section ${styles.section}`} id="delivery">
      <div className="wrap">
        <div className={styles.head}>
          <span className="sticker sticker-dark" data-reveal>
            <span className="dot-live" style={{ color: "var(--red)" }} /> Live tracking
          </span>
          <h2 className="display h2" data-reveal>
            Cooked 12:53.
            <br />
            <span className="red">At your door 13:04.</span>
          </h2>
        </div>

        <div className={styles.stage} data-dpin>
          <Clip name="pan" className={`${styles.scene} ${scene === "pan" ? styles.on : ""}`} />
          <Clip ref={ride} name="ride" scrub className={`${styles.scene} ${scene === "ride" ? styles.on : ""}`} />
          <Clip name="handover" className={`${styles.scene} ${scene === "handover" ? styles.on : ""}`} position="60% 40%" />
          <div className={styles.shade} aria-hidden="true" />

          <div className={styles.status} aria-live="polite">
            <span className={styles.eta}>
              ETA <b className="num">{current.eta}</b>
            </span>
            <p key={current.line} className={`display ${styles.line}`}>
              {current.line}
            </p>
          </div>

          <div className={styles.map}>
            <svg viewBox="0 0 370 270" role="img" aria-label="Route from the kitchen to your door">
              <path d={ROUTE} fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <path ref={path} d={ROUTE} fill="none" stroke="var(--red)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <g transform="translate(40 250)">
                <circle r="12" fill="var(--ink)" />
                <text x="20" y="5" className={styles.pinText}>K-03</text>
              </g>
              <g transform="translate(330 24)">
                <circle r="12" fill="var(--leaf)" />
                <text x="-20" y="5" textAnchor="end" className={styles.pinText}>You</text>
              </g>
              <g ref={dot}>
                <circle r="18" fill="var(--red)" opacity="0.2" className={styles.halo} />
                <circle r="9" fill="#fff" stroke="var(--red)" strokeWidth="4" />
              </g>
            </svg>
          </div>

          <ol className={styles.steps}>
            {STATES.map((s, i) => (
              <li key={s.key} className={i <= step ? styles.done : ""}>
                <i />
                <span>{s.key}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
