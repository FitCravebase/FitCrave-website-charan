"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./Motion";
import Icon from "./Icon";
import Ring from "./Ring";
import { BOWLS, formatINR } from "@/lib/data";
import FloatingPlates, { type Plate } from "./FloatingPlates";
import styles from "./AppShowcase.module.css";

const TILES = [
  { icon: "camera", label: "MealSnap", sub: "Photo → macros", tone: "red", side: "l", y: 4, depth: 60 },
  { icon: "chat", label: "AI coach", sub: "Reads your day", tone: "leaf", side: "l", y: 34, depth: 120 },
  { icon: "scan", label: "Menu scan", sub: "Mess or restaurant", tone: "gold", side: "l", y: 64, depth: 90 },
  { icon: "check", label: "Verified", sub: "±100 kcal", tone: "leaf", side: "r", y: 2, depth: 110 },
  { icon: "watch", label: "Watch sync", sub: "12 brands", tone: "ink", side: "r", y: 30, depth: 70 },
  { icon: "pin", label: "Live track", sub: "Every 10 s", tone: "gold", side: "r", y: 60, depth: 140 },
] as const;

const ORBIT: Plate[] = [
  { src: "/media/dish-tandoori.jpg", x: "14%", y: "30%", size: 150, speed: -200, spin: 50 },
  { src: "/media/dish-rajma.jpg", x: "74%", y: "22%", size: 120, speed: -120, spin: -40, blur: true },
  { src: "/media/dish-tikka.jpg", x: "78%", y: "70%", size: 170, speed: -240, spin: -30 },
  { src: "/media/dish-paneer.jpg", x: "8%", y: "76%", size: 120, speed: -150, spin: 45, blur: true },
];

const BOWLS_ON_SCREEN = [BOWLS[1], BOWLS[5]];

export default function AppShowcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-tile-pop]", {
        scale: 0.3,
        opacity: 0,
        rotate: (i) => (i % 2 ? 14 : -14),
        duration: 0.7,
        stagger: 0.06,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: "[data-stage]", start: "top 70%", once: true },
      });
      // Depth parallax only where the tiles float around the phone (desktop).
      gsap.matchMedia().add("(min-width: 901px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-tile]").forEach((t, i) => {
          gsap.to(t, {
            y: -TILES[i].depth,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
        gsap.fromTo(
          "[data-phone]",
          { y: 120, rotate: -6 },
          { y: -40, rotate: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={`section ${styles.section}`} id="app">
      <div className={styles.glow} aria-hidden="true" />
      <FloatingPlates plates={ORBIT} />
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.head}>
          <h2 className="display h2" data-reveal>
            Everything your goal needs.
            <br />
            <span className="red">One app.</span>
          </h2>
        </div>

        <div className={styles.stage} data-stage>
          <div className={styles.phone} data-phone>
            <div className={styles.notch} />
            <div className={styles.screen}>
              <div className={styles.top}>
                <span className={styles.hi}>Hey Aarav</span>
                <span className="sticker sticker-gold">
                  <Icon name="flame" size={14} /> 6-day streak
                </span>
              </div>
              <div className={styles.budget}>
                <div className={styles.ringWrap}>
                  <Ring size={96} stroke={9} value={1320 / 1840} color="var(--leaf)" track="var(--line)" />
                  <span className={`num ${styles.ringNum}`}>72%</span>
                </div>
                <div>
                  <span className={styles.slot}>Lunch</span>
                  <p className={`num ${styles.left}`}>
                    <span data-count="520">520</span>
                    <small> kcal left</small>
                  </p>
                </div>
              </div>
              <p className={styles.fits}>2 bowls that fit</p>
              {BOWLS_ON_SCREEN.map((b) => (
                <div key={b.id} className={styles.bowl}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt="" />
                  <div className={styles.bowlBody}>
                    <span className={styles.bowlName}>{b.name}</span>
                    <span className={styles.bowlMeta}>
                      {b.kcal} kcal · {b.p}g P
                    </span>
                  </div>
                  <span className={styles.add}>{formatINR(b.memberPrice)}</span>
                </div>
              ))}
            </div>
          </div>

          {TILES.map((t) => (
            // Outer element carries the scroll parallax; inner one carries the pop-in, so the two never fight.
            <div
              key={t.label}
              className={`${styles.tileSlot} ${t.side === "l" ? styles.left_ : styles.right_}`}
              style={{ top: `${t.y}%` }}
              data-tile
            >
              <div className={`${styles.tile} ${styles[`tone_${t.tone}`]}`} data-tile-pop>
                <span className={styles.tileIcon}>
                  <Icon name={t.icon} />
                </span>
                <span className={styles.tileText}>
                  <b>{t.label}</b>
                  <small>{t.sub}</small>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
