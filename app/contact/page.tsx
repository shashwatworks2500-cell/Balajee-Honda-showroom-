import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import { EnquiryBlock } from "@/components/forms/enquiry-block";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHead } from "@/components/ui/layout";
import { PlateRow, PlateRows, SpecPlate } from "@/components/ui/spec-plate";
import { formatTime } from "@/lib/format";
import { buildMetadata, CITY, pageTitle } from "@/lib/seo";
import {
  ADDRESS,
  ADDRESS_LINES,
  BUSINESS_NAME,
  CONTACT,
  DAY_NAMES,
  LANDMARKS,
  OPENING_HOURS,
  has,
  hasAnyContactChannel,
  phoneHref,
  whatsappHref,
} from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle(`Contact & Directions — ${ADDRESS.street}, ${CITY}`),
  description: `${BUSINESS_NAME} is on ${ADDRESS.street}, ${ADDRESS.locality}, ${CITY} — opposite Police Lines, near State Bank of India (Main Branch), Railway Ganj.`,
  path: "/contact",
});

/**
 * Optimised for speed of action: most visitors reach this page from a phone,
 * often already on the move. Call and Directions come first when available;
 * the verified address and landmarks always do.
 */
export default function ContactPage() {
  return (
    <>
      <Section ground="ink" compact>
        <Container>
          <span className="t-slug text-on-ink-2">visit/</span>
          <h1 className="t-display-l mt-4 max-w-[18ch] text-on-ink">
            Visit {BUSINESS_NAME}
          </h1>
          <p className="measure mt-5 text-[1.0625rem] text-on-ink-2">
            We are on {ADDRESS.street} in {ADDRESS.locality}. The landmarks below are usually
            the quickest way to find us.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
            <div className="space-y-5">
              {/* Actions first on mobile. */}
              {hasAnyContactChannel || has.map ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {has.phone ? (
                    <Button
                      href={phoneHref() ?? "#"}
                      external
                      size="block"
                      className="sm:w-auto"
                      aria-label={`Call ${BUSINESS_NAME} on ${CONTACT.phone}`}
                    >
                      <Phone aria-hidden="true" className="size-4" />
                      Call the showroom
                    </Button>
                  ) : null}
                  {has.map ? (
                    <Button
                      href={CONTACT.mapUrl ?? "#"}
                      external
                      target="_blank"
                      rel="noopener"
                      variant="secondary"
                      size="block"
                      className="sm:w-auto"
                    >
                      <MapPin aria-hidden="true" className="size-4" />
                      Get directions
                    </Button>
                  ) : null}
                  {has.whatsapp ? (
                    <Button
                      href={whatsappHref() ?? "#"}
                      external
                      target="_blank"
                      rel="noopener"
                      variant="secondary"
                      size="block"
                      className="sm:w-auto"
                    >
                      <MessageCircle aria-hidden="true" className="size-4" />
                      WhatsApp
                    </Button>
                  ) : null}
                </div>
              ) : null}

              <SpecPlate slug="address">
                <address className="not-italic">
                  <span className="t-data block text-[1.0625rem] font-medium text-fg">
                    {BUSINESS_NAME}
                  </span>
                  <span className="t-data mt-3 block text-[0.9375rem] leading-relaxed text-fg">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>

                <div className="mt-5 border-t border-rule-2 pt-5">
                  <span className="t-slug">Landmarks</span>
                  <p className="t-data mt-2 text-[0.9375rem] leading-relaxed text-fg-2">
                    {LANDMARKS.map((landmark) => (
                      <span key={landmark} className="block">
                        {landmark}
                      </span>
                    ))}
                  </p>
                </div>

                {has.phone || has.email ? (
                  <div className="mt-5 border-t border-rule-2 pt-5">
                    <PlateRows>
                      {has.phone ? (
                        <PlateRow
                          label="Phone"
                          value={
                            <a href={phoneHref() ?? undefined} className="hover:underline">
                              {CONTACT.phone}
                            </a>
                          }
                        />
                      ) : null}
                      {has.email ? (
                        <PlateRow
                          label="Email"
                          value={
                            <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                              {CONTACT.email}
                            </a>
                          }
                        />
                      ) : null}
                    </PlateRows>
                  </div>
                ) : null}
              </SpecPlate>

              {has.hours ? (
                <SpecPlate slug="opening hours">
                  <PlateRows>
                    {OPENING_HOURS.map((entry) => (
                      <PlateRow
                        key={entry.day}
                        label={DAY_NAMES[entry.day]}
                        value={`${formatTime(entry.opens)}–${formatTime(entry.closes)}`}
                      />
                    ))}
                  </PlateRows>
                </SpecPlate>
              ) : (
                <div className="flex items-start gap-3 border border-rule bg-band p-5">
                  <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fg-3" />
                  <p className="text-[0.9375rem] text-fg-2">
                    Opening hours will be listed here shortly. In the meantime, the showroom
                    is on {ADDRESS.street}, opposite Police Lines.
                  </p>
                </div>
              )}
            </div>

            <div>
              <SectionHead slug="enquire/" title="Send us a message" />
              <EnquiryBlock kind="enquiry" submitLabel="Send enquiry" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
