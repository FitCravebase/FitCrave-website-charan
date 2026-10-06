import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { Note } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
};

// Wording carried over unchanged from the previous site (August 2026 version).
export default function TermsPage() {
  return (
    <LegalShell kicker="Legal" title="Terms of Use" meta="Last updated: August 2026 · FitCrave Pvt. Ltd.">
      <p>
        These Terms of Use (&ldquo;Terms&rdquo;) govern your use of the FitCrave mobile application, website, and related
        services (the &ldquo;Service&rdquo;) operated by FitCrave Pvt. Ltd. (&ldquo;FitCrave&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;). By creating an account or using the Service, you agree to these Terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>1. Eligibility and account</h2>
      <p>
        You must be at least 18 years old to use FitCrave. You are responsible for the accuracy of information you provide
        and for activity on your account. Keep your phone, email, and Google sign-in secure. You may request deletion of
        your account at any time from the app or our <Link href="/account-deletion">account deletion page</Link>.
      </p>

      <h2>2. What FitCrave provides</h2>
      <p>
        FitCrave is a fitness and nutrition app. Features currently include personalized meal and workout plans, meal
        logging (photo, barcode, manual, and mess-menu scan), an AI coach, Health Connect / Apple Health sync, a
        location-based community, and ordering healthy bowls from FitCrave kitchens where delivery is available. Features
        may vary by region and may change as we improve the Service. Some items in the app (for example Market Place or
        FitCrave Plus) may be marked as coming soon and are not part of the live Service until we say they are.
      </p>

      <h2>3. Health disclaimer</h2>
      <Note title="Not medical advice">
        FitCrave is not a medical device and does not provide medical advice, diagnosis, or treatment. Meal plans,
        workouts, health scores, and AI suggestions are for general fitness and education only. Results vary. Consult a
        qualified clinician before changing diet or exercise, especially if you have a medical condition, are pregnant, or
        take medication.
      </Note>

      <h2>4. Food orders and payments</h2>
      <p>
        Where bowl delivery is offered, prices, delivery fees, taxes, and availability are confirmed at checkout. Payments
        are processed by our payment partner (currently Cashfree). You agree to provide accurate delivery details. Issues
        with an order (quality, delay, non-delivery) can be reported from Help &amp; Support in the app. Refunds for food
        orders are reviewed case by case. Deleting your FitCrave account does not cancel a charge already made through
        Google Play or a payment provider; cancel those separately if needed.
      </p>

      <h2>5. Community guidelines</h2>
      <p>
        Community groups, posts, comments, photos, and videos are user-generated. You must not post illegal content,
        harassment, hate speech, sexual content involving minors, spam, scams, or misleading health or medical claims. You
        grant FitCrave a license to host and display content you upload so the Service can function. You can report posts
        and comments and block users in the app. We may remove content or suspend accounts that violate these Terms. We do
        not guarantee that all content is reviewed before it appears.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        You agree not to misuse the Service, including attempting to access other users&rsquo; accounts or data, reverse
        engineer the app, overload our systems, scrape content, or use the Service for any unlawful purpose.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The FitCrave name, app, designs, and software are owned by or licensed to FitCrave Pvt. Ltd. You keep ownership of
        content you post. You give us a non-exclusive license to use that content only to operate and improve the Service.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo;. To the fullest extent allowed by law, FitCrave is not liable for
        indirect or consequential damages, or for health outcomes from following plans or AI suggestions. Our total
        liability for a claim related to the Service will not exceed the amount you paid us for food orders or other paid
        features in the 12 months before the claim (or INR 1,000 if you paid nothing).
      </p>

      <h2>9. Termination</h2>
      <p>
        We may suspend or end access if you break these Terms or if we reasonably believe your use harms other users or
        the Service. You may stop using FitCrave and delete your account at any time.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Courts in Kolkata, West Bengal, India have exclusive jurisdiction,
        except where consumer law in your state requires otherwise.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these Terms. The &ldquo;Last updated&rdquo; date will change. Continued use after an update means
        you accept the revised Terms. Material changes may also be noted in the app.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions: <a href="mailto:charan@fitcrave.co">charan@fitcrave.co</a> · FitCrave Pvt. Ltd., IIT Kharagpur, West
        Bengal, India.
      </p>
    </LegalShell>
  );
}
