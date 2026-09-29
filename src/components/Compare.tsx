"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Clip from "./Clip";
import { EASE, prefersReducedMotion } from "./Motion";
import { BOWLS, formatINR } from "@/lib/data";
import styles from "./Compare.module.css";

const PICK = BOWLS[1];

// Drag (or use the arrow keys on the slider) to wipe between an endless-scroll app and FitCrave's one answer.
export default function Compare() {
  const root = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    // On first view the divider sweeps across once, so it reads as something to drag.
    const state = { v: 88 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      once: true,
      onEnter: () =>
        gsap.fromTo(state, { v: 88 }, { v: 50, duration: 1.4, ease: EASE.wipe, onUpdate: () => setPos(state.v) }),
    });
    return () => st.kill();
  }, []);

  const fromPointer = (clientX: number) => {
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={root}
      className={styles.compare}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      data-reveal
    >
      <div className={styles.side}>
        <Clip name="scroll" className={styles.fill} position="50% 50%" />
        <div className={styles.shadeLeft} />
        <div className={styles.tagLeft}>
          <span className="label">A typical delivery app</span>
          <p className={`display ${styles.caption}`}>Forty tiles. Six coupons. Keep scrolling.</p>
        </div>
      </div>

      <div className={styles.side} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/dish-bowl.jpg" alt="" className={styles.fill} />
        <div className={styles.shadeRight} />
        <div className={styles.card}>
          <span className="label">Lunch · 520 kcal left</span>
          <p className={`display ${styles.cardTitle}`}>{PICK.name}</p>
          <div className={styles.cardRow}>
            <span className="mono">{PICK.kcal} kcal</span>
            <span className="mono">{PICK.p} g protein</span>
            <span className={styles.verified}>Verified</span>
          </div>
          <div className={styles.cardFoot}>
            <span className="mono">{formatINR(PICK.memberPrice)}</span>
            <span className={styles.order}>Order · 2 taps</span>
          </div>
        </div>
        <div className={styles.tagRight}>
          <span className={`label ${styles.us}`}>FitCrave</span>
          <p className={`display ${styles.caption}`}>One answer. Your numbers.</p>
        </div>
      </div>

      <div className={styles.divider} style={{ left: `${pos}%` }} aria-hidden="true">
        <span className={styles.handle}>
          <i />
          <i />
        </span>
      </div>

      <input
        className={styles.range}
        type="range"
        min={4}
        max={96}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare a typical delivery app with FitCrave"
      />
    </div>
  );
}
