import FloatingPlates, { type Plate } from "./FloatingPlates";
import styles from "./Plates.module.css";

const PLATES: Plate[] = [
  { src: "/media/dish-paneer.jpg", x: "4%", y: "6%", size: 190, speed: -140, spin: 40 },
  { src: "/media/dish-rajma.jpg", x: "80%", y: "0%", size: 170, speed: -220, spin: -30 },
  { src: "/media/dish-tikka.jpg", x: "-3%", y: "58%", size: 150, speed: -80, spin: 25 },
  { src: "/media/dish-biryani.jpg", x: "84%", y: "56%", size: 200, speed: -170, spin: -45 },
  { src: "/media/dish-bowl.jpg", x: "20%", y: "86%", size: 110, speed: -260, spin: 60, blur: true },
  { src: "/media/dish-fish.jpg", x: "68%", y: "90%", size: 120, speed: -120, spin: -50 },
];

const CURVE = "M-20 120 C 220 40, 260 420, 520 360 S 900 60, 1220 260";

const STATS = [
  { n: 60, label: "point kitchen check" },
  { n: 100, prefix: "±", label: "kcal, max drift" },
  { n: 30, suffix: " min", label: "to your door" },
  { n: 0, label: "coupons. ever." },
];

export default function Plates() {
  return (
    <section id="plates" className={`section ${styles.plates}`}>
      <FloatingPlates plates={PLATES} curve={CURVE} />

      <div className={`wrap ${styles.inner}`}>
        <h2 className="display h2 red" data-reveal>
          Healthy,
          <br />
          but make it crave.
        </h2>
        <p className="sub center" data-reveal>
          Kondapur&rsquo;s best healthy kitchens. One app. Numbers you can trust.
        </p>

        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat} data-reveal>
              <span className={`num ${styles.statNum}`}>
                {s.prefix}
                <span data-count={s.n}>{s.n}</span>
                {s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
