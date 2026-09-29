import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (latin subset, variable weights) so builds never depend on reaching Google Fonts.
const display = localFont({
  src: "./fonts/bricolage.woff2",
  weight: "200 800",
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const body = localFont({
  src: "./fonts/outfit.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const mono = localFont({
  src: "./fonts/jetbrains.woff2",
  weight: "500",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const title = "FitCrave: Kondapur's inspected healthy kitchens, in one app";
const description =
  "Tell us your goal. We tell you what to eat. It arrives in 30 minutes, and the numbers on the box are true. Starting in Kondapur, Hyderabad.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fitcrave.co.in"),
  title: { default: title, template: "%s · FitCrave" },
  description,
  applicationName: "FitCrave",
  openGraph: {
    type: "website",
    url: "https://www.fitcrave.co.in",
    siteName: "FitCrave",
    title,
    description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before paint, so reveal targets start hidden only when they will animate. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
