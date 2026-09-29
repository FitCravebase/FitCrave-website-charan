export default function Wordmark({ size, className }: { size?: number; className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--display)",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.05em",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      fitcrave
      <span style={{ color: "var(--red)" }} aria-hidden="true">
        .
      </span>
    </span>
  );
}
