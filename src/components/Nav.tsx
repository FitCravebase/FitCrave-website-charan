"use client";

import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { scrollToId } from "./Motion";
import { useSiteConfig } from "./SiteConfig";
import styles from "./Nav.module.css";

const LINKS = [
  { id: "match", label: "Goal first" },
  { id: "kitchens", label: "Kitchens" },
  { id: "plus", label: "Plus" },
  { id: "city", label: "Kondapur" },
];

export default function Nav() {
  const config = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const storeLink = config.playstoreLink || config.appstoreLink;
  const cta = config.appLaunched && storeLink ? (
    <a className={`btn btn-red ${styles.cta}`} href={storeLink} target="_blank" rel="noopener noreferrer">
      Get the app
    </a>
  ) : (
    <button className={`btn btn-red ${styles.cta}`} onClick={() => go("city")}>
      Get early access
    </button>
  );

  return (
    <>
      {config.announcement ? (
        <div className={styles.announce} role="status">
          <span className="mono">{config.announcement}</span>
        </div>
      ) : null}
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`wrap ${styles.inner}`}>
          <a href="#top" className={styles.brand} onClick={(e) => { e.preventDefault(); go("top"); }} aria-label="FitCrave, back to top">
            <Wordmark size={30} />
          </a>
          <nav className={styles.links} aria-label="Sections">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className={styles.link}>
                {l.label}
              </button>
            ))}
          </nav>
          <div className={styles.right}>
            {cta}
            <button
              className={styles.burger}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`}>
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className={styles.sheetLink} tabIndex={open ? 0 : -1}>
              {l.label}
            </button>
          ))}
        </div>
      </header>
    </>
  );
}
