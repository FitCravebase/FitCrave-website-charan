// Small line icons for feature tiles. 24px grid, 2px stroke, currentColor.
const PATHS: Record<string, React.ReactNode> = {
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.6" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
      <path d="M7 12h10" />
    </>
  ),
  watch: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="3" />
      <path d="M9 6l1-3h4l1 3M9 18l1 3h4l1-3M10 12h2v-2" />
    </>
  ),
  flame: <path d="M12 21c-4 0-6.5-2.6-6.5-6 0-3.2 2.5-5 3.5-8 1.8 1.3 2.4 3 2.5 4.2C13 10 13.5 8 13 5c3.5 2.2 5.5 5.6 5.5 9.6 0 3.6-2.6 6.4-6.5 6.4Z" />,
  book: (
    <>
      <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z" />
      <path d="M9 9h6M9 13h4" />
    </>
  ),
  check: (
    <>
      <path d="M12 3l2.4 1.8 3 .1.9 2.9 2.2 2-1 2.9 1 2.9-2.2 2-.9 2.9-3 .1L12 21l-2.4-1.8-3-.1-.9-2.9-2.2-2 1-2.9-1-2.9 2.2-2 .9-2.9 3-.1z" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11.5a7 7 0 1 0-14 0C5 15 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

export default function Icon({ name, size = 26 }: { name: keyof typeof PATHS | string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
