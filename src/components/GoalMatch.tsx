"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { EASE, prefersReducedMotion } from "./Motion";
import { GOALS, SLOTS, rankBowls, formatINR, type GoalKey, type SlotKey } from "@/lib/data";
import FloatingPlates, { type Plate } from "./FloatingPlates";
import styles from "./GoalMatch.module.css";

gsap.registerPlugin(Flip);

const DECOR: Plate[] = [
  { src: "/media/dish-chilla.jpg", x: "-4%", y: "8%", size: 150, speed: -160, spin: 35, blur: true },
  { src: "/media/dish-bhurji.jpg", x: "90%", y: "4%", size: 130, speed: -220, spin: -40 },
  { src: "/media/dish-soya.jpg", x: "93%", y: "78%", size: 110, speed: -120, spin: 30, blur: true },
];

function Pills<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T;
  options: { key: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className={styles.pills} role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o.key}
          role="radio"
          aria-checked={value === o.key}
          className={`${styles.pill} ${value === o.key ? styles.pillOn : ""}`}
          onClick={() => onChange(o.key)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function GoalMatch() {
  const [goal, setGoal] = useState<GoalKey>("fat");
  const [slot, setSlot] = useState<SlotKey>("lunch");
  const [veg, setVeg] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const lastTop = useRef<string | null>(null);

  const { kcal, protein, ranked } = useMemo(() => rankBowls(goal, slot, veg ? "veg" : "any"), [goal, slot, veg]);
  const top = ranked[0];
  const rest = ranked.slice(1, 4);
  const fit = Math.max(0, 1 - Math.abs(top.kcal - kcal) / kcal);

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    if (plate.current && lastTop.current !== null && lastTop.current !== top.id && !reduce) {
      // New best fit: the plate spins in like it was just slid across the counter.
      gsap.fromTo(
        plate.current.querySelector("[data-plate-img]"),
        { rotate: -140, scale: 0.6, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 0.9, ease: EASE.settle },
      );
      gsap.fromTo(
        plate.current.querySelectorAll("[data-tag]"),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.25, ease: "back.out(2)" },
      );
    }
    lastTop.current = top.id;

    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.6,
      ease: EASE.settle,
      absolute: false,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.45, ease: EASE.settle }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
    });
    flipState.current = null;
  }, [goal, slot, veg, top.id]);

  const pick = (apply: () => void) => {
    if (list.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(list.current.querySelectorAll("[data-flip-id]"));
    }
    apply();
  };

  const R = 46;
  const C = 2 * Math.PI * R;

  return (
    <section id="match" className={`section ${styles.section}`}>
      <FloatingPlates plates={DECOR} />
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.head}>
          <span className="sticker" data-reveal>Goal first</span>
          <h2 className="display h2" data-reveal>
            Pick a goal.
            <br />
            <span className="red">Watch the plate change.</span>
          </h2>
        </div>

        <div className={styles.stage}>
          <div className={styles.plateCol} ref={plate}>
            <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r={R} fill="none" stroke="var(--line)" strokeWidth="2.2" />
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="var(--leaf)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - fit)}
                transform="rotate(-90 50 50)"
                className={styles.ringArc}
              />
            </svg>
            <div className={styles.plate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={top.id} src={top.image} alt={top.name} data-plate-img />
            </div>
            <span className={`${styles.tag} ${styles.tag1}`} data-tag>
              <b className="num">{top.kcal}</b> kcal
            </span>
            <span className={`${styles.tag} ${styles.tag2}`} data-tag>
              <b className="num">{top.p}g</b> protein
            </span>
            <span className={`${styles.tag} ${styles.tag3}`} data-tag>
              Kitchen {top.kitchen} · <b className="num">{top.kitchenScore}</b>
            </span>
            <span className={`${styles.tag} ${styles.tag4}`} data-tag>
              <b className="num">{Math.round(fit * 100)}%</b> fit
            </span>
          </div>

          <div className={styles.panel}>
            <Pills
              name="Goal"
              value={goal}
              onChange={(v) => pick(() => setGoal(v))}
              options={(Object.keys(GOALS) as GoalKey[]).map((k) => ({ key: k, label: GOALS[k].label }))}
            />
            <div className={styles.row2}>
              <Pills
                name="Meal"
                value={slot}
                onChange={(v) => pick(() => setSlot(v))}
                options={(Object.keys(SLOTS) as SlotKey[]).map((k) => ({ key: k, label: SLOTS[k].label }))}
              />
              <button
                role="switch"
                aria-checked={veg}
                className={`${styles.veg} ${veg ? styles.vegOn : ""}`}
                onClick={() => pick(() => setVeg((x) => !x))}
              >
                <span className={styles.vegKnob} />
                Veg
              </button>
            </div>

            <div className={styles.budget}>
              <span className={styles.budgetLabel}>{SLOTS[slot].label} budget</span>
              <span className={`num ${styles.budgetNum}`}>
                {kcal} <small>kcal</small> · {protein}
                <small>g P</small>
              </span>
            </div>

            <div className={styles.best}>
              <span className="sticker sticker-leaf">Best fit</span>
              <p className={`display h3 ${styles.bestName}`} aria-live="polite">
                {top.name}
              </p>
              <div className={styles.bestFoot}>
                <span className={styles.price}>
                  <s>{formatINR(top.price)}</s> <b>{formatINR(top.memberPrice)}</b>
                </span>
                <span className={styles.why}>{top.reason}</span>
              </div>
            </div>

            <ol ref={list} className={styles.list}>
              {rest.map((b, i) => (
                <li key={b.id} data-flip-id={b.id} className={styles.item}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.image} alt="" />
                  <span className={styles.itemName}>
                    <span className={styles.itemRank}>#{i + 2}</span> {b.name}
                  </span>
                  <span className={`num ${styles.itemKcal}`}>{b.kcal}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className={styles.note}>Sample menu</p>
      </div>
    </section>
  );
}
