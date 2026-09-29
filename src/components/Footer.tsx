import Link from "next/link";
import Wordmark from "./Wordmark";
import { SUPPORT_EMAIL } from "@/lib/data";
import styles from "./Footer.module.css";

const TEAM = ["Charan Teja", "Raghuveer Patil", "Sharath S."];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.top}>
          <Wordmark size={40} className={styles.brand} />
          <span className={styles.tag}>Healthy, but make it crave. Built at IIT Kharagpur.</span>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <b>FitCrave</b>
            <a href="#match">Goal first</a>
            <a href="#kitchens">Kitchens</a>
            <a href="#plus">Plus</a>
            <a href="#city">Kondapur</a>
          </div>
          <div className={styles.col}>
            <b>For kitchens</b>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Kitchen partner, Kondapur")}`}>Get inspected</a>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Rider, Kondapur")}`}>Ride with us</a>
          </div>
          <div className={styles.col}>
            <b>Legal</b>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/account-deletion">Delete account</Link>
          </div>
          <div className={styles.col}>
            <b>Contact</b>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            <span>Grievance officer: Charan Teja</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.team}>
            {TEAM.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </span>
          <span>© 2026 FitCrave Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  );
}
