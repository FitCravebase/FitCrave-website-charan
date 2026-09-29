"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EASE, prefersReducedMotion, scrollToId } from "./Motion";
import Clip from "./Clip";
import { KONDAPUR_PINCODES } from "@/lib/data";
import styles from "./Hero.module.css";

const WORDS = ["Eat", "for", "your", "goal."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const steam = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState("");
  const [checked, setChecked] = useState<null | "in" | "out">(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap
        .timeline({ defaults: { ease: EASE.settle } })
        .fromTo("[data-hero-bg]", { scale: 1.25 }, { scale: 1.05, duration: 2.2 }, 0)
        .from("[data-hero-sticker]", { y: -20, opacity: 0, duration: 0.6, ease: EASE.crave }, 0.2)
        .from("[data-word]", { yPercent: 115, rotate: 6, duration: 0.9, stagger: 0.07 }, 0.3)
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.8);

      const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-bg]", { scale: 1.35, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-copy]", { yPercent: 30, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to("[data-hero-cue]", { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "20% top" } });
    }, el);

    const s = steam.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      if (!s) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(s, { x: x * 80, y: y * 40, duration: 1.6, ease: EASE.settle });
    };
    if (fine && !reduce) el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const p = pin.trim();
    if (!p) return;
    setChecked(KONDAPUR_PINCODES.includes(p) ? "in" : "out");
    // The waitlist form picks this up so nobody types it twice.
    window.dispatchEvent(new CustomEvent("fc:place", { detail: p }));
  };

  return (
    <section id="top" ref={root} className={styles.hero}>
      <div className={styles.bg} data-hero-bg>
        <Clip name="hero" eager className={styles.fill} position="55% 60%" />
      </div>
      <div ref={steam} className={styles.steam}>
        <Clip name="steam" eager className={styles.fill} />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={`wrap ${styles.copy}`} data-hero-copy>
        <span className="sticker sticker-dark" data-hero-sticker>
          <span className="dot-live" style={{ color: "var(--red)" }} /> Launching in Kondapur
        </span>
        <h1 className={`display h1 ${styles.title}`}>
          {WORDS.map((w) => (
            <span key={w} className={styles.mask}>
              <span data-word className={styles.word}>
                {w}
              </span>
            </span>
          ))}
        </h1>
        <p className={styles.sub} data-hero-fade>
          Inspected kitchens. True macros. 30 minutes.
        </p>

        <form className={styles.search} onSubmit={check} data-hero-fade>
          <span className={styles.pinIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="10" r="2.6" fill="currentColor" />
            </svg>
          </span>
          <label htmlFor="hero-pin" className="sr-only">
            Your pincode
          </label>
          <input
            id="hero-pin"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter your pincode"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setChecked(null);
            }}
          />
          <button type="submit" className="btn btn-red">
            Check
          </button>
        </form>
        <div className={styles.result} aria-live="polite" data-hero-fade>
          {checked === "in" ? (
            <button className={`sticker sticker-leaf ${styles.resultBtn}`} onClick={() => scrollToId("city")}>
              You&rsquo;re in zone 1. Grab early access →
            </button>
          ) : checked === "out" ? (
            <button className={`sticker ${styles.resultBtn}`} onClick={() => scrollToId("city")}>
              Not yet. Vote for {pin} →
            </button>
          ) : (
            <span className={styles.hint}>Try 500084</span>
          )}
        </div>
      </div>

      <button className={styles.cue} onClick={() => scrollToId("plates")} data-hero-cue>
        Scroll down
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      </button>
    </section>
  );
}
