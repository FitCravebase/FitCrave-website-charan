import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { Note } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

// Wording carried over unchanged from the previous site (September 2026 version).
export default function PrivacyPage() {
  return (
    <LegalShell kicker="Legal" title="Privacy Policy" meta="Last updated: September 2026 · FitCrave Pvt. Ltd.">
      <p>
        FitCrave Pvt. Ltd. (&ldquo;FitCrave&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the FitCrave consumer
        app, the FitCrave Partner delivery app, Kitchen OS, and fitcrave.co.in. This Privacy Policy explains what personal
        data we collect, why we collect it, how we use and share it, and your choices. By using FitCrave products you
        agree to this policy.
      </p>

      <h2>1. Information we collect</h2>
      <h3>1.1 Account and profile</h3>
      <p>
        When you create an account we collect identifiers needed to sign you in and personalize the app: phone number
        (OTP), Google or Apple account details, email address if you provide one, display name, and profile photo if you
        upload one. Profile details you enter (age, sex, height, weight, goals, diet type, allergies, activity level,
        workout preferences) are stored to generate meal and workout plans.
      </p>
      <h3>1.2 Health and fitness data</h3>
      <p>
        If you connect Google Health Connect (Android) or Apple Health (iOS), we request read access to steps, active
        calories burned, sleep, heart rate, resting heart rate, and related health-history records needed to backfill
        recent days. We also read steps from the on-device pedometer when you allow activity recognition. You may enter
        steps, calories, sleep, and resting heart rate manually. Meal logs (including photos of food, barcode product
        data from Open Food Facts, and mess-menu photos), workout logs, and derived metrics such as calorie targets and
        health score are stored in your account. We use this data only to show your dashboard, plans, and AI coach
        context — not for advertising.
      </p>
      <h3>1.3 Location</h3>
      <p>
        In the consumer app, with your permission we collect precise or approximate location to show local weather on
        Home and to discover nearby community groups. Location is not used for ads. You can deny location; those
        features will be limited.
      </p>
      <h3>1.3a FitCrave Partner (delivery) app</h3>
      <p>If you use FitCrave Partner as a delivery rider, we collect the data needed to assign and complete bowl deliveries:</p>
      <ul>
        <li>
          Account: full name, 10-digit mobile number (Partner ID), vehicle type, assigned kitchen, and a hashed 4-digit
          PIN. The PIN is verified on our servers; we do not store it in plain text.
        </li>
        <li>
          Precise location while you have an active delivery (order status &ldquo;dispatched&rdquo;), typically every 10
          seconds, so the customer can track their order. Sharing stops when the delivery is completed or marked
          undeliverable. Location is requested only after an in-app explanation, and only while the app is in use for
          that delivery.
        </li>
        <li>
          Camera photos you take as proof of delivery or when a drop-off cannot be completed. We do not request access to
          your full photo library.
        </li>
        <li>
          Order events you submit (picked up, cash/UPI collected, delivered, undeliverable) and a push-notification token
          so we can alert you to assigned orders.
        </li>
      </ul>
      <p>
        Partner location and delivery photos are shared with the assigned kitchen and, for live tracking, with the
        customer for that order only. We do not use Partner data for advertising.
      </p>
      <h3>1.4 Camera and media you choose</h3>
      <p>
        Camera access is used for meal photos, barcode scanning, mess-menu scanning, and community posts. We do not get
        access to your full photo library. When you pick an image or video, you choose specific items through the system
        picker.
      </p>
      <h3>1.5 Community content</h3>
      <p>
        Posts, comments, likes, group membership, and media you upload to Community are stored on our servers so other
        members can see them. Other users can report content and block you.
      </p>
      <h3>1.6 Orders and payments</h3>
      <p>
        If you order food we collect delivery name, phone, address, city, pin code, cart contents, and order status.
        Payment is handled by Cashfree. We receive payment status and identifiers needed to confirm the order; we do not
        store your full card or UPI PIN.
      </p>
      <h3>1.7 Device, notifications, and diagnostics</h3>
      <p>
        We collect device type, OS version, app version, language, crash and performance logs, and Firebase Cloud
        Messaging tokens so we can send order, meal, and workout notifications if you allow them. Firebase Analytics may
        collect app-usage events. We do not sell this data.
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>Create and secure your account; send OTPs and sign-in emails.</li>
        <li>Generate and update meal plans, workout plans, grocery lists, and AI coach replies.</li>
        <li>Show calories, steps, sleep, heart-rate summaries, and progress on Home and in plans.</li>
        <li>Operate Community (groups, posts, reports, blocks) and food ordering / delivery tracking.</li>
        <li>Send notifications you enable; prevent fraud and abuse; debug crashes; improve the product.</li>
        <li>Comply with law and respond to account-deletion and support requests.</li>
      </ul>
      <p>
        We do not use Health Connect, Apple Health, or other health data to show ads, and we do not sell personal data.
      </p>

      <h2>3. Sharing</h2>
      <p>We share data with processors who help us run FitCrave, only as needed for their task:</p>
      <ul>
        <li>
          Google Firebase (Authentication, Firestore, Cloud Storage, Cloud Messaging, Analytics, App Check / Play
          Integrity).
        </li>
        <li>Google Cloud (API hosting) and MongoDB Atlas (community profiles, posts, comments).</li>
        <li>
          Google Gemini / generative AI providers to create plans, meal-photo estimates, and coach replies using the
          context you have in the app.
        </li>
        <li>Cashfree for payments; Google Maps for order tracking maps; Open Food Facts for packaged-food lookup.</li>
        <li>Kitchen and delivery partners, only order and drop-off details required to fulfill a bowl order.</li>
      </ul>
      <p>
        We may disclose information if required by law or to protect users from fraud or serious harm. Community posts
        you publish are visible to other members of that group.
      </p>

      <h2>4. Retention and security</h2>
      <p>
        We keep account and app data while your account is open. After a verified deletion request we delete or anonymize
        personal data as described on the <Link href="/account-deletion">account deletion page</Link>, typically within 7
        business days, except backups (up to 30 days) and data we must keep for legal, tax, or fraud reasons. We use HTTPS
        in transit and restrict staff access. No method of storage is 100% secure.
      </p>

      <h2>5. Your rights and choices</h2>
      <p>
        You can access and update profile, meal, and workout preferences in the consumer app. Delivery partners can go
        offline from FitCrave Partner. You can disconnect Health Connect or Apple Health, deny camera, location, or
        notification permission, and log out. You may request a copy or correction of personal data, or deletion of your
        account, from Profile → Delete account (consumer), the links in FitCrave Partner, this website, or{" "}
        <a href="mailto:charan@fitcrave.co">charan@fitcrave.co</a>. You can report community posts and comments and
        block users in the app.
      </p>

      <h2>6. Children</h2>
      <p>
        FitCrave is not directed at children under 18. We do not knowingly collect personal data from children under 18.
        If you believe we have, contact <a href="mailto:charan@fitcrave.co">charan@fitcrave.co</a> and we will delete
        it.
      </p>

      <h2>7. Health disclaimer</h2>
      <Note title="Not medical advice">
        FitCrave is a fitness and nutrition technology product. Plans, scores, and AI suggestions are informational. They
        are not medical advice. Talk to a qualified clinician before major diet or exercise changes.
      </Note>

      <h2>8. Changes</h2>
      <p>
        We may update this policy. The &ldquo;Last updated&rdquo; date will change. Continued use after an update means
        you accept the revised policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        FitCrave Pvt. Ltd., IIT Kharagpur, West Bengal, India ·{" "}
        <a href="mailto:charan@fitcrave.co">charan@fitcrave.co</a> · See also our <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalShell>
  );
}
