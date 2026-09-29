import Compare from "./Compare";
import FloatingPlates, { type Plate } from "./FloatingPlates";
import styles from "./Difference.module.css";

const DECOR: Plate[] = [
  { src: "/media/dish-fish.jpg", x: "-4%", y: "4%", size: 150, speed: -200, spin: 45 },
  { src: "/media/ing-rice.jpg", x: "90%", y: "10%", size: 120, speed: -140, spin: -40, blur: true },
];

export default function Difference() {
  return (
    <section className={`section ${styles.section}`} id="difference">
      <FloatingPlates plates={DECOR} />
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.head}>
          <span className="sticker sticker-dark" data-reveal>
            Drag it
          </span>
          <h2 className="display h2" data-reveal>
            Same doorstep.
            <br />
            <span className="red">Different rules.</span>
          </h2>
        </div>
        <Compare />
        <div className={styles.chips}>
          {["No paid rankings", "No coupon wall", "Macros on every box", "Auto-logged on arrival"].map((c) => (
            <span key={c} className={styles.chip} data-reveal>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
