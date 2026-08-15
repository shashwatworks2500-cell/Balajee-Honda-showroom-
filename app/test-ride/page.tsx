import { EnquiryBlock } from "@/components/forms/enquiry-block";
import { Container, Section } from "@/components/ui/layout";
import { SpecPlate } from "@/components/ui/spec-plate";
import { buildMetadata, CITY, pageTitle } from "@/lib/seo";
import { ADDRESS, ADDRESS_LINES, BUSINESS_NAME, LANDMARKS, TEST_RIDE_NOTE } from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle(`Book a Honda Test Ride in ${CITY}`),
  description: `Book a test ride on a Honda scooter or motorcycle at ${BUSINESS_NAME}, ${ADDRESS.street}, ${CITY}.`,
  path: "/test-ride",
});

/**
 * Single-purpose page. No model marketing, no cross-sell — the only competing
 * action is visiting or calling instead, because for a share of this audience
 * that is genuinely the easier path.
 */
export default function TestRidePage() {
  return (
    <>
      <Section ground="ink" compact>
        <Container>
          <span className="t-slug text-on-ink-2">test ride/</span>
          <h1 className="t-display-l mt-4 max-w-[18ch] text-on-ink">Book a test ride</h1>
          <p className="measure mt-5 text-[1.0625rem] text-on-ink-2">
            {TEST_RIDE_NOTE ??
              `Tell us which Honda you would like to ride and when suits you. We will take it from there at the showroom on ${ADDRESS.street}.`}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
            <EnquiryBlock kind="test-ride" submitLabel="Request a test ride" />

            <div className="space-y-5">
              <SpecPlate slug="where">
                <address className="not-italic">
                  <span className="t-data block text-[0.9375rem] font-medium text-fg">
                    {BUSINESS_NAME}
                  </span>
                  <span className="t-data mt-2 block text-[0.9375rem] leading-relaxed text-fg-2">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
                <div className="mt-4 border-t border-rule-2 pt-4">
                  <span className="t-slug">Landmarks</span>
                  <p className="t-data mt-2 text-[0.875rem] leading-relaxed text-fg-2">
                    {LANDMARKS.map((landmark) => (
                      <span key={landmark} className="block">
                        {landmark}
                      </span>
                    ))}
                  </p>
                </div>
              </SpecPlate>

              <div className="border border-rule bg-band p-6">
                <span className="t-slug">Before you ride</span>
                <p className="mt-3 text-[0.9375rem] text-fg-2">
                  Bring your driving licence. Wear a helmet — we will not send you out
                  without one.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
