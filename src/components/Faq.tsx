import styles from "./Faq.module.css";

const QA: [string, string][] = [
  ["What's FitCrave?", "Kondapur's inspected healthy kitchens in one app. Set a goal, get what fits, delivered in 30 min. It logs itself."],
  ["How are macros true?", "Recipes in grams, weighed at the kitchen, spot-checked weekly, lab-tested quarterly. Off by 100+ kcal? Paused."],
  ["Is ordering free?", "Yes. Plus adds the coach, plans, MealSnap, watch sync, member prices and free delivery. From ₹299/mo."],
  ["Where do you deliver?", "Kondapur first: 500084, 500081, 500032, 500033. Sign up from anywhere and vote for your area."],
];

export default function Faq() {
  return (
    <section className={`section ${styles.section}`} id="faq">
      <div className={`wrap ${styles.wrap}`}>
        <h2 className="display h2 center" data-reveal>
          Quick <span className="red">FAQs</span>
        </h2>
        <div className={styles.list}>
          {QA.map(([q, a]) => (
            <details key={q} className={styles.item} data-reveal>
              <summary>
                {q}
                <i aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
