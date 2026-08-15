import { MapPin, Phone } from "lucide-react";

import type { EnquiryKind } from "@/app/actions";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Button } from "@/components/ui/button";
import { SpecPlate } from "@/components/ui/spec-plate";
import { getModels } from "@/lib/models";
import {
  ADDRESS_LINES,
  BUSINESS_NAME,
  CONTACT,
  LANDMARKS,
  enquiryDeliveryConfigured,
  has,
  phoneDisplay,
  phoneHref,
} from "@/lib/site";

/**
 * Renders the form when enquiries can actually be delivered, and an honest
 * alternative when they cannot.
 *
 * Showing a form that silently discards submissions would be the single most
 * damaging thing on this site: a customer would believe they had been in touch.
 */
export function EnquiryBlock({
  kind,
  submitLabel,
  defaultModel,
  className,
}: {
  kind: EnquiryKind;
  submitLabel: string;
  defaultModel?: string;
  className?: string;
}) {
  if (enquiryDeliveryConfigured()) {
    const modelOptions = getModels().map((m) => ({ slug: m.slug, name: m.name }));
    return (
      <div className={className}>
        <EnquiryForm
          kind={kind}
          modelOptions={modelOptions}
          defaultModel={defaultModel}
          submitLabel={submitLabel}
        />
      </div>
    );
  }

  const isService = kind === "service";

  return (
    <SpecPlate
      slug={isService ? "book a service" : "get in touch"}
      accent={isService ? "own" : "buy"}
      className={className}
    >
      <h3 className="t-h3">
        {isService ? "Bring your Honda to the workshop" : "Come and see us"}
      </h3>
      <p className="measure mt-3 text-fg-2">
        {isService
          ? `${BUSINESS_NAME} takes service bookings at the showroom on Station Road. Online booking will open here once it is set up.`
          : `${BUSINESS_NAME} takes enquiries and test-ride bookings at the showroom on Station Road. Online booking will open here once it is set up.`}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <span className="t-slug">Showroom</span>
          <address className="t-data mt-3 not-italic text-[0.875rem] leading-relaxed text-fg">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div>
          <span className="t-slug">Landmarks</span>
          <p className="t-data mt-3 text-[0.875rem] leading-relaxed text-fg-3">
            {LANDMARKS.map((landmark) => (
              <span key={landmark} className="block">
                {landmark}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {has.phone ? (
          <Button
            href={phoneHref() ?? "#"}
            external
            variant={isService ? "service" : "primary"}
            size="compact"
            aria-label={`Call ${BUSINESS_NAME} on ${phoneDisplay()}`}
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
            size="compact"
          >
            <MapPin aria-hidden="true" className="size-4" />
            Get directions
          </Button>
        ) : (
          <Button href="/contact" variant="secondary" size="compact">
            <MapPin aria-hidden="true" className="size-4" />
            Showroom details
          </Button>
        )}
      </div>
    </SpecPlate>
  );
}
