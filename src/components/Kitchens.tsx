"use client";

import { useState } from "react";
import Ring from "./Ring";
import Clip from "./Clip";
import { CRITERIA_GROUPS, OPS_METRICS, SUPPORT_EMAIL } from "@/lib/data";
import FloatingPlates, { type Plate } from "./FloatingPlates";
import styles from "./Kitchens.module.css";

const TOTAL = CRITERIA_GROUPS.reduce((a, g) => a + g.count, 0);
const PASSED = CRITERIA_GROUPS.reduce((a, g) => a + g.passed, 0);

// Footage that stands in as evidence for each check group (sample until real inspection photos exist).
const EVIDENCE: Record<string, { clip: string; caption: string }> = {
  "Food safety": { clip: "pan", caption: "Core temp above 75 °C" },
  Facility: { clip: "kitchen", caption: "Clean pass, working exhaust" },
  Operations: { clip: "line", caption: "12 orders in the rail, on time" },
  "Packaging and handover": { clip: "line", caption: "Sealed and labelled with kcal" },
  People: { clip: "sauce", caption: "Gloves on. Named line lead." },
  "Nutrition accuracy": { clip: "sauce", caption: "Sauce dosed, not eyeballed" },
};
const DEFAULT = { clip: "kitchen", caption: "Onboarding inspection · K-07" };
const CLIPS = ["kitchen", "pan", "line", "sauce"];

const DECOR: Plate[] = [
  { src: "/media/ing-greens.jpg", x: "88%", y: "3%", size: 130, speed: -180, spin: 40 },
  { src: "/media/ing-chana.jpg", x: "-3%", y: "12%", size: 110, speed: -120, spin: -35, blur: true },
];

export default function Kitchens() {
  const [active, setActive] = useState<string | null>(null);
  const ev = (active && EVIDENCE[active]) || DEFAULT;

  return (
    <section id="kitchens" className={`section ${styles.section}`}>
      <FloatingPlates plates={DECOR} />
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.head}>
          <span className="sticker" data-reveal>
            {TOTAL}-point check
          </span>
          <h2 className="display h2" data-reveal>
            Every kitchen, inspected.
            <br />
            <span className="red">In public.</span>
          </h2>
        </div>

        <div className={styles.stage}>
          <div className={styles.evidence} data-reveal>
            {CLIPS.map((c) => (
              <Clip key={c} name={c} className={`${styles.clip} ${ev.clip === c ? styles.clipOn : ""}`} />
            ))}
            <div className={styles.shade} aria-hidden="true" />
            <span className={`sticker sticker-dark ${styles.evTag}`}>
              <span className="dot-live" style={{ color: "var(--red)" }} /> {active ?? "Live evidence"}
            </span>
            <p key={ev.caption} className={`display ${styles.caption}`}>
              {ev.caption}
            </p>
          </div>

          <article className={styles.profile} data-reveal aria-label="Sample kitchen profile">
            <header className={styles.profileHead}>
              <div>
                <span className={styles.kitchen}>Kitchen K-07 · Kondapur</span>
                <span className="sticker sticker-leaf">Certified</span>
              </div>
              <div className={styles.score}>
                <Ring size={96} stroke={9} value={0.91} color="var(--leaf)" track="var(--line)" />
                <span className={`num ${styles.scoreNum}`}>
                  <span data-count="91">91</span>
                </span>
              </div>
            </header>

            <p className={styles.passLine}>
              <b className="num">{PASSED}</b>/{TOTAL} passed · inspected 12 Sep
            </p>

            <ul className={styles.groups}>
              {CRITERIA_GROUPS.map((g) => (
                <li
                  key={g.group}
                  tabIndex={0}
                  className={`${styles.group} ${active === g.group ? styles.groupOn : ""}`}
                  onMouseEnter={() => setActive(g.group)}
                  onFocus={() => setActive(g.group)}
                  onMouseLeave={() => setActive(null)}
                  onBlur={() => setActive(null)}
                >
                  <span className={styles.groupName}>{g.group}</span>
                  <span className={styles.bar} aria-hidden="true">
                    <i style={{ width: `${(g.passed / g.count) * 100}%` }} className={g.passed < g.count ? styles.barWarn : ""} />
                  </span>
                  <span className={`num ${styles.groupNum}`}>
                    {g.passed}/{g.count}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.ops}>
              {OPS_METRICS.map((m) => (
                <div key={m.label} className={styles.op}>
                  <span className={`num ${styles.opNum}`}>
                    <span data-count={m.value} data-decimals={m.decimals ?? 0}>
                      {m.value}
                    </span>
                    <small>{m.suffix}</small>
                  </span>
                  <span className={styles.opLabel}>{m.label}</span>
                </div>
              ))}
            </div>
            <span className={styles.sample}>Sample profile</span>
          </article>
        </div>

        <a
          className={styles.partner}
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Kitchen partner, Kondapur")}`}
          data-reveal
        >
          Run a healthy kitchen in Kondapur? <b>Get inspected →</b>
        </a>
      </div>
    </section>
  );
}
