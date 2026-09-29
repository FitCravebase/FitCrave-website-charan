import Link from "next/link";
import Wordmark from "./Wordmark";
import styles from "./LegalShell.module.css";

export function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.note}>
      <strong>{title}</strong>
      {children}
    </div>
  );
}

export default function LegalShell({
  kicker,
  title,
  meta,
  children,
}: {
  kicker: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={`wrap ${styles.top}`}>
        <Link href="/" className={styles.brand} aria-label="FitCrave home">
          <Wordmark size={28} />
        </Link>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>
      </header>
      <main className={`wrap ${styles.main}`}>
        <span className="sticker">{kicker}</span>
        <h1 className={`display ${styles.title}`}>{title}</h1>
        <p className={styles.meta}>{meta}</p>
        <article className={styles.body}>{children}</article>
      </main>
    </div>
  );
}
