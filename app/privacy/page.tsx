import { Container, Section } from "@/components/ui/layout";
import { SpecPlate } from "@/components/ui/spec-plate";
import { buildMetadata, pageTitle } from "@/lib/seo";
import {
  ADDRESS_LINES,
  BUSINESS_NAME,
  PRIVACY_POLICY_TEXT,
  enquiryDeliveryConfigured,
  has,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle("Privacy"),
  description: `How ${BUSINESS_NAME} handles the personal information you share through this website.`,
  path: "/privacy",
  // Not indexed until the policy text itself is supplied.
  index: has.privacyPolicy,
});

/**
 * Required before any form goes live: the enquiry forms collect a name and a
 * phone number, which brings obligations under India's DPDP Act.
 *
 * The policy text must come from the business — a privacy policy written by us
 * would be a statement of the dealership's legal commitments that nobody at the
 * dealership has agreed to.
 */
export default function PrivacyPage() {
  const formsLive = enquiryDeliveryConfigured();

  return (
    <Section>
      <Container>
        <span className="t-slug">privacy/</span>
        <h1 className="t-display-l mt-4 max-w-[18ch]">Privacy</h1>

        {PRIVACY_POLICY_TEXT ? (
          <div className="measure mt-8 whitespace-pre-line text-fg-2">
            {PRIVACY_POLICY_TEXT}
          </div>
        ) : (
          <div className="mt-8 max-w-2xl">
            <p className="measure text-[1.0625rem] text-fg-2">
              {BUSINESS_NAME} has not yet published a privacy policy for this website.
            </p>

            <SpecPlate slug="what this site collects" className="mt-6">
              <p className="text-[0.9375rem] text-fg-2">
                {formsLive
                  ? "When you send an enquiry or request a test ride, this site collects the name, mobile number and message you enter, so that someone from the showroom can call you back. It is not used for anything else."
                  : "This site is not currently collecting any personal information. The enquiry forms are not accepting submissions, so nothing you type is stored or sent anywhere."}
              </p>
              <p className="mt-4 text-[0.9375rem] text-fg-2">
                This site sets no advertising or analytics cookies.
              </p>
            </SpecPlate>

            <div className="mt-6 border border-rule bg-band p-6">
              <span className="t-slug">Questions</span>
              <p className="mt-3 text-[0.9375rem] text-fg-2">
                Speak to us at the showroom:
              </p>
              <address className="t-data mt-3 not-italic text-[0.875rem] leading-relaxed text-fg">
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
