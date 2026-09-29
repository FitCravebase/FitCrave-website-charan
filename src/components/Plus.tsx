"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EASE, prefersReducedMotion, scrollToId } from "./Motion";
import Clip from "./Clip";
import Icon from "./Icon";
import { PLANS, WEARABLES, formatINR, planPrice } from "@/lib/data";
import styles from "./Plus.module.css";

// The coach's reply as tokens; bold ones are numbers pulled from the day's data.
const REPLY: [string, boolean][] = [
  ["You've got", false], ["520 kcal", true], ["and", false], ["42 g", true], ["protein left. The tandoori millet bowl is", false],
  ["510 kcal,", true], ["46 g", true], ["protein. You slept", false], ["6 h 10,", true], ["so dinner stays light.", false],
];

const SYNC = [
  { label: "Steps", value: 11240, suffix: "" },
  { label: "Sleep", value: 6.2, suffix: "h", decimals: 1 },
  { label: "Rest HR", value: 58, suffix: "" },
  { label: "HRV", value: 62, suffix: "ms" },
];

const PERKS = [
  { icon: "chat", t: "AI coach" },
  { icon: "book", t: "Weekly plans" },
  { icon: "camera", t: "MealSnap" },
  { icon: "scan", t: "Menu scan" },
  { icon: "watch", t: "Watch sync" },
  { icon: "pin", t: "Free delivery" },
];

const TERM: Record<number, string> = { 1: "1 month", 3: "3 months", 6: "6 months" };

export default function Plus() {
  const [picked, setPicked] = useState("plus_6m");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-tok]", {
        opacity: 0,
        duration: 0.05,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: "[data-coach]", start: "top 70%", once: true },
      });
      gsap.from("[data-sync]", {
        opacity: 0,
        x: 40,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.15,
        ease: EASE.settle,
        scrollTrigger: { trigger: "[data-syncwrap]", start: "top 70%", once: true },
      });
      gsap.from("[data-perk]", {
        y: 30,
        opacity: 0,
        rotate: (i) => (i % 2 ? 6 : -6),
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: "[data-perks]", start: "top 80%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="plus" ref={root} className={`section ${styles.section}`}>
      <div className="wrap">
        <div className={styles.head}>
          <span className={styles.logo} data-reveal>
            fitcrave <b>plus</b>
          </span>
          <h2 className="display h2" data-reveal>
            Ordering is free.
            <br />
            <span className={styles.gold}>The coach is Plus.</span>
          </h2>
          <span className={styles.trial} data-reveal>
            5 days free · no card
          </span>
        </div>

        <div className={styles.top}>
          <div className={styles.coach} data-reveal data-coach>
            <div className={styles.coachHead}>
              <span className={styles.avatar}>
                <Icon name="chat" size={18} />
              </span>
              <b>Coach</b>
              <span className={styles.readsDay}>reads your day</span>
            </div>
            <div className={styles.me}>Why this bowl?</div>
            <div className={styles.bot}>
              {REPLY.map(([t, b], i) =>
                b ? (
                  <b key={i} data-tok>
                    {t}{" "}
                  </b>
                ) : (
                  <span key={i} data-tok>
                    {t}{" "}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className={styles.watch} data-reveal data-syncwrap>
            <Clip name="runner" className={styles.watchClip} position="40% 50%" />
            <div className={styles.watchShade} aria-hidden="true" />
            <span className={styles.syncTag}>
              <span className="dot-live" /> Synced 06:42
            </span>
            <div className={styles.readings}>
              {SYNC.map((r) => (
                <div key={r.label} className={styles.reading} data-sync>
                  <span className={`num ${styles.readingNum}`}>
                    <span data-count={r.value} data-decimals={r.decimals ?? 0}>
                      {r.value.toLocaleString("en-IN")}
                    </span>
                    <small>{r.suffix}</small>
                  </span>
                  <span className={styles.readingLabel}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.perks} data-perks>
          {PERKS.map((p) => (
            <div key={p.t} className={styles.perk} data-perk>
              <span className={styles.perkIcon}>
                <Icon name={p.icon} />
              </span>
              {p.t}
            </div>
          ))}
        </div>

        <div className={styles.brands} aria-label={`Syncs with ${WEARABLES.join(", ")}`}>
          <div className={styles.track}>
            {[...WEARABLES, ...WEARABLES].map((w, i) => (
              <span key={i} aria-hidden={i >= WEARABLES.length}>
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.plans} role="radiogroup" aria-label="Plus plans">
          {PLANS.map((p) => {
            const { total, perMonth } = planPrice(p.months, p.discount);
            const on = picked === p.id;
            return (
              <button
                key={p.id}
                role="radio"
                aria-checked={on}
                className={`${styles.plan} ${on ? styles.planOn : ""}`}
                onClick={() => setPicked(p.id)}
              >
                <span className={styles.planTop}>
                  {TERM[p.months]}
                  {p.discount > 0 ? <span className={styles.save}>-{Math.round(p.discount * 100)}%</span> : null}
                </span>
                <span className={`num ${styles.planPrice}`}>
                  {formatINR(perMonth)}
                  <small>/mo</small>
                </span>
                <span className={styles.planTotal}>{formatINR(total)} total</span>
              </button>
            );
          })}
        </div>
        <div className={styles.foot}>
          <button className="btn btn-red" onClick={() => scrollToId("city")}>
            Get 5 days of Plus
          </button>
          <span className={styles.fine}>Launch prices. Cancel any time.</span>
        </div>
      </div>
    </section>
  );
}
