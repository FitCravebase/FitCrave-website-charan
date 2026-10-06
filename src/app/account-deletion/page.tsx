import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { Note } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Delete your account",
  alternates: { canonical: "/account-deletion" },
};

// Wording carried over unchanged from the previous site. Google Play links to this URL.
export default function AccountDeletionPage() {
  return (
    <LegalShell
      kicker="Account"
      title="Delete your FitCrave account"
      meta="FitCrave consumer app · FitCrave Partner · FitCrave Pvt. Ltd."
    >
      <p>
        This page explains how to request deletion of your FitCrave consumer account or your FitCrave Partner delivery
        account. You do not need to sign in to read this page.
      </p>

      <h2>How to request deletion</h2>
      <ol>
        <li>
          Send an email to <a href="mailto:charan@fitcrave.co">charan@fitcrave.co</a>.
        </li>
        <li>
          Use the subject line: <strong>FitCrave account deletion request (consumer)</strong> or{" "}
          <strong>FitCrave Partner account deletion request (delivery)</strong>.
        </li>
        <li>
          In your message, include how you sign in. Consumer: phone number, Google, or Apple. Partner: the 10-digit mobile
          number used as Partner ID, plus your name and kitchen if you know them.
        </li>
        <li>We will verify your request and complete account deletion within 7 business days.</li>
      </ol>

      <h2>FitCrave Partner accounts</h2>
      <p>
        Deleting a Partner account removes or anonymizes your delivery-partner profile (name, phone, PIN hash, vehicle,
        kitchen assignment, online status, and FCM token). Proof-of-delivery photos and location points already attached
        to completed orders may be retained with the order for food-safety, refund, and fraud records, or anonymized.
        Kitchen managers can also deactivate your login without a full deletion.
      </p>

      <Note title="Subscriptions">
        If you have an active subscription through Google Play or another store, cancel it separately in that
        store&rsquo;s settings. Deleting your FitCrave account does not automatically cancel billing.
      </Note>

      <h2>What we delete</h2>
      <p>After your request is verified, we delete or anonymize your account and associated data, including where applicable:</p>
      <ul>
        <li>Your authentication record and account credentials (Firebase Authentication).</li>
        <li>
          Your profile and app data stored for your account (for example, Cloud Firestore documents under your user ID,
          such as daily stats, workout logs, and chat sessions).
        </li>
        <li>
          Community data tied to your account on our servers (for example, MongoDB profile, posts, and comments linked to
          your Firebase user ID).
        </li>
        <li>
          Media you uploaded for community features, where stored in our storage systems (for example, Firebase Cloud
          Storage).
        </li>
        <li>Meal, workout, and health data associated with your account on our backend services.</li>
        <li>
          FitCrave Partner profile data (name, phone/Partner ID, PIN hash, vehicle, kitchen assignment, online status, and
          push token).
        </li>
      </ul>

      <h2>What we may retain</h2>
      <ul>
        <li>
          <strong>Backups and logs:</strong> Residual copies may remain in encrypted backups for up to 30 days before
          automatic rotation.
        </li>
        <li>
          <strong>Legal and security:</strong> We may retain minimal information if required to comply with law, resolve
          disputes, enforce our terms, or prevent fraud or abuse.
        </li>
      </ul>

      <h2>Questions</h2>
      <p>
        For general privacy practices, see our <Link href="/privacy">Privacy Policy</Link>. For help with your request,
        email <a href="mailto:charan@fitcrave.co">charan@fitcrave.co</a>.
      </p>
    </LegalShell>
  );
}
