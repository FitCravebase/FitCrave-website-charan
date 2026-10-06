import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { addDoc, collection, doc, getDoc, getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// The project enforces App Check on Firestore, so the site proves itself with Fraud Defense (reCAPTCHA Enterprise)
// (invisible, no puzzle). Both values are public; App Check only switches on when both are set.
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

let db: Firestore | null = null;

function getDb(): Firestore | null {
  if (!config.apiKey || !config.projectId) return null;
  if (db) return db;
  const fresh = !getApps().length;
  const app: FirebaseApp = fresh ? initializeApp(config) : getApp();
  if (fresh && typeof window !== "undefined" && RECAPTCHA_SITE_KEY && config.appId) {
    initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY), isTokenAutoRefreshEnabled: true });
  }
  db = getFirestore(app);
  return db;
}

// Mirrors the website/config document the current site already uses, so Ops keeps one switch.
export type SiteConfig = {
  appLaunched: boolean;
  playstoreLink: string;
  appstoreLink: string;
  announcement: string;
  waitlistEnabled: boolean;
};

export const DEFAULT_CONFIG: SiteConfig = {
  appLaunched: false,
  playstoreLink: "",
  appstoreLink: "",
  announcement: "",
  waitlistEnabled: true,
};

export async function loadSiteConfig(): Promise<SiteConfig> {
  const d = getDb();
  if (!d) return DEFAULT_CONFIG;
  try {
    const snap = await getDoc(doc(d, "website", "config"));
    return snap.exists() ? { ...DEFAULT_CONFIG, ...(snap.data() as Partial<SiteConfig>) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export type WaitlistEntry = {
  email: string;
  name: string;
  goal: string;
  pincode: string;
  city: string;
  inZone: boolean;
};

// Write-only: the site never reads the waitlist back.
export async function joinWaitlist(entry: WaitlistEntry): Promise<void> {
  const d = getDb();
  if (!d) throw new Error("not_configured");
  await addDoc(collection(d, "waitlist"), {
    ...entry,
    ts: new Date().toISOString(),
    source: "web-v12",
  });
}
