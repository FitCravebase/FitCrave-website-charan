type RingProps = {
  size: number;
  stroke?: number;
  value: number; // 0..1
  color?: string;
  track?: string;
  className?: string;
  animate?: boolean;
};

// The signature FIT move. With animate, Motion closes it on enter; otherwise it renders closed.
export default function Ring({
  size,
  stroke = 6,
  value,
  color = "var(--leaf)",
  track = "var(--line)",
  className,
  animate = true,
}: RingProps) {
  const r = (size - stroke) / 2;
  const len = +(2 * Math.PI * r).toFixed(2);
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={animate ? len : len * (1 - clamped)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: animate ? undefined : "stroke-dashoffset 600ms cubic-bezier(.16,1,.3,1)" }}
        {...(animate ? { "data-ring": clamped, "data-len": len } : {})}
      />
    </svg>
  );
}
