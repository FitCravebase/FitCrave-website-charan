"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Clip from "./Clip";
import { prefersReducedMotion } from "./Motion";
import { joinWaitlist } from "@/lib/firebase";
import { KONDAPUR_PINCODES } from "@/lib/data";
import { useSiteConfig } from "./SiteConfig";
import FloatingPlates, { type Plate } from "./FloatingPlates";
import styles from "./City.module.css";

const DECOR: Plate[] = [
  { src: "/media/dish-biryani.jpg", x: "-3%", y: "6%", size: 150, speed: -160, spin: 40 },
  { src: "/media/ing-paneer.jpg", x: "89%", y: "2%", size: 120, speed: -220, spin: -45, blur: true },
];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; inZone: boolean; place: string } | { kind: "error" };

const GOAL_OPTIONS = ["Lose fat", "Build muscle", "Stay on track", "Eat better at work"];

function isKondapur(place: string) {
  const p = place.trim().toLowerCase();
  return KONDAPUR_PINCODES.includes(p) || p.includes("kondapur");
}

export default function City() {
  const config = useSiteConfig();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [place, setPlace] = useState("");
  const [goal, setGoal] = useState("");
  const root = useRef<HTMLElement>(null);
  const typed = place.trim();
  const zone = typed.length === 0 ? "none" : isKondapur(typed) ? "in" : /^\d{1,5}$/.test(typed) ? "typing" : "out";

  useEffect(() => {
    // A pincode typed in the hero carries over here.
    const onPlace = (e: Event) => setPlace(String((e as CustomEvent).detail ?? ""));
    window.addEventListener("fc:place", onPlace);
    const el = root.current;
    let tween: gsap.core.Tween | null = null;
    if (el && !prefersReducedMotion()) {
      tween = gsap.fromTo(
        "[data-city-bg]",
        { scale: 1.25 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    }
    return () => {
      window.removeEventListener("fc:place", onPlace);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    if (!email) return;
    const p = place.trim();
    const inZone = isKondapur(p);
    setStatus({ kind: "sending" });
    try {
      await joinWaitlist({
        email,
        name: String(form.get("name") || "").trim() || "—",
        goal: goal || "—",
        pincode: /^\d{6}$/.test(p) ? p : "",
        city: /^\d{6}$/.test(p) ? "" : p,
        inZone,
      });
      setStatus({ kind: "done", inZone, place: p });
    } catch {
      setStatus({ kind: "error" });
    }
  }

  const store = [
    config.playstoreLink ? { href: config.playstoreLink, label: "Google Play" } : null,
    config.appstoreLink ? { href: config.appstoreLink, label: "App Store" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <section id="city" ref={root} className={`section ${styles.section}`}>
      <FloatingPlates plates={DECOR} />
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.head}>
          <span className="sticker" data-reveal>
            <span className="dot-live" /> Zone 1 · Kondapur
          </span>
          <h2 className="display h2" data-reveal>
            Kondapur first.
            <br />
            <span className="red">Your city next.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          <div className={styles.cityCard} data-reveal>
            <div className={styles.cityBg} data-city-bg>
              <Clip name="city" className={styles.fill} />
            </div>
            <div className={styles.cityShade} aria-hidden="true" />
            <svg className={`${styles.radar} ${zone === "in" ? styles.radarIn : ""}`} viewBox="0 0 300 300" aria-hidden="true">
              <circle cx="150" cy="150" r="60" className={styles.wave} />
              <circle cx="150" cy="150" r="60" className={`${styles.wave} ${styles.wave2}`} />
              <circle cx="150" cy="150" r="60" fill="rgba(239,79,95,.18)" stroke="#fff" strokeOpacity=".5" strokeDasharray="4 6" />
              <circle cx="150" cy="150" r="9" className={styles.core} />
            </svg>
            <div className={styles.pins}>
              {KONDAPUR_PINCODES.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.pin} ${typed === p ? styles.pinOn : ""}`}
                  onClick={() => setPlace(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className={`${styles.zone} ${styles["zone_" + zone]}`} aria-live="polite">
              {zone === "in"
                ? "You're in. Day-one delivery."
                : zone === "out"
                  ? `${typed}? Not yet. Your signup is a vote.`
                  : zone === "typing"
                    ? "Keep typing…"
                    : "2–4 km zones. 30-minute promise."}
            </p>
          </div>

          <div className={styles.formCard} data-reveal>
            {config.appLaunched && store.length ? (
              <div className={styles.store}>
                {store.map((s) => (
                  <a key={s.href} className="btn btn-ink" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            ) : null}

            {config.waitlistEnabled === false ? (
              <p className={`display h3`}>Waitlist closed for now.</p>
            ) : status.kind === "done" ? (
              <div className={styles.done} role="status">
                <span className={styles.doneBurst} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="40" height="40">
                    <path d="m5 12 5 5 9-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="display h3">{status.inZone ? "You're on the list." : "Vote counted."}</p>
                <p className={styles.doneText}>
                  {status.inZone
                    ? "5 days of Plus waiting for you at launch."
                    : `We'll ping you when we reach ${status.place || "you"}.`}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className={styles.form}>
                <p className="display h3">Get early access</p>
                <input className={styles.input} name="email" type="email" required autoComplete="email" placeholder="Email *" aria-label="Email" />
                <div className={styles.row}>
                  <input className={styles.input} name="name" type="text" autoComplete="given-name" placeholder="First name" aria-label="First name" />
                  <input
                    className={styles.input}
                    name="place"
                    type="text"
                    autoComplete="postal-code"
                    placeholder="Pincode or city"
                    aria-label="Pincode or city"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>
                <div className={styles.goals} role="radiogroup" aria-label="Your goal">
                  {GOAL_OPTIONS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      role="radio"
                      aria-checked={goal === g}
                      className={`${styles.goal} ${goal === g ? styles.goalOn : ""}`}
                      onClick={() => setGoal(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <button className="btn btn-red" type="submit" disabled={status.kind === "sending"}>
                  {status.kind === "sending" ? "Saving…" : "Join the waitlist"}
                </button>
                {status.kind === "error" ? (
                  <p className={styles.error} role="alert">
                    Didn&rsquo;t go through. Nothing saved. Try again?
                  </p>
                ) : null}
                <p className={styles.consent}>
                  Launch emails only. <Link href="/privacy">Privacy</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
