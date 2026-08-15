import { EnquiryBlock } from "@/components/forms/enquiry-block";
import { Container, Section, SectionHead } from "@/components/ui/layout";
import { SpecPlate } from "@/components/ui/spec-plate";
import { buildMetadata, CITY, pageTitle } from "@/lib/seo";
import {
  ADDRESS,
  ADDRESS_LINES,
  BUSINESS_NAME,
  GENUINE_PARTS_TEXT,
  LANDMARKS,
  SERVICES,
  WARRANTY_TEXT,
  has,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle(`Honda Two-Wheeler Service in ${CITY}`),
  description: `Servicing, genuine parts and warranty work for Honda two-wheelers at ${BUSINESS_NAME}, ${ADDRESS.street}, ${CITY}.`,
  path: "/service",
});

/**
 * The owner path. Workshop teal throughout so it is visually distinct from the
 * moment it opens.
 *
 * Every factual section here is conditional. Nothing about turnaround times,
 * pickup and drop, bay counts or express tiers is stated, because none of it
 * has been verified.
 */
export default function ServicePage() {
  return (
    <>
      <Section ground="ink" compact>
        <Container>
          <span className="t-slug text-on-ink-2">service/</span>
          <h1 className="t-display-l mt-4 max-w-[20ch] text-on-ink">
            Honda service in {CITY}
          </h1>
          <p className="measure mt-5 text-[1.0625rem] text-on-ink-2">
            Servicing and genuine parts for your Honda two-wheeler, at the same address as
            the showroom.
          </p>
        </Container>
      </Section>

      {/* Booking first — it is the owner-side primary action. */}
      <Section id="book">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
            <div>
              <SectionHead slug="book/" title="Book a service" />
              <EnquiryBlock kind="service" submitLabel="Request a service booking" />
            </div>

            <SpecPlate slug="workshop" accent="own" className="self-start">
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
          </div>
        </Container>
      </Section>

      {/* Conditional: what the workshop handles. */}
      {has.services ? (
        <Section ground="band" labelledBy="services-head">
          <Container>
            <SectionHead id="services-head" slug="what we do/" title="What the workshop handles" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <SpecPlate accent="own" className="h-full">
                    <h3 className="t-h3">{service.title}</h3>
                    <p className="mt-2 text-[0.9375rem] text-fg-2">{service.description}</p>
                  </SpecPlate>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Conditional: genuine parts. */}
      {has.genuineParts ? (
        <Section id="genuine-parts" labelledBy="parts-head">
          <Container>
            <SectionHead id="parts-head" slug="parts/" title="Genuine parts" />
            <p className="measure text-fg-2">{GENUINE_PARTS_TEXT}</p>
          </Container>
        </Section>
      ) : null}

      {/* Conditional: warranty, reproduced verbatim. */}
      {has.warranty ? (
        <Section ground="band" labelledBy="warranty-head">
          <Container>
            <SectionHead id="warranty-head" slug="warranty/" title="Warranty" />
            <SpecPlate accent="own">
              <p className="measure whitespace-pre-line text-fg-2">{WARRANTY_TEXT}</p>
            </SpecPlate>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
