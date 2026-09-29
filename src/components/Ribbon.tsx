import { BOWLS } from "@/lib/data";
import styles from "./Ribbon.module.css";

// Two tilted rows of real dishes sliding in opposite directions. Pure CSS motion; paused for reduced motion.
function Row({ reverse }: { reverse?: boolean }) {
  const items = reverse ? [...BOWLS].reverse() : BOWLS;
  return (
    <div className={`${styles.row} ${reverse ? styles.rowAlt : ""}`}>
      <div className={styles.track}>
        {[...items, ...items].map((b, i) => (
          <span key={`${b.id}-${i}`} className={styles.pill} aria-hidden={i >= items.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt="" loading="lazy" />
            <b>{b.name}</b>
            <em className="num">{b.kcal} kcal</em>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Ribbon() {
  return (
    <div className={styles.ribbon} aria-label="Sample dishes from Kondapur kitchens">
      <Row />
      <Row reverse />
    </div>
  );
}
