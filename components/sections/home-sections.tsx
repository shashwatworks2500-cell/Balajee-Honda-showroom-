import { MapPin, Phone } from "lucide-react";

import { EnquiryBlock } from "@/components/forms/enquiry-block";
import { CategoryCard } from "@/components/models/category-card";
import { ModelCard } from "@/components/models/model-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Container, Section, SectionHead } from "@/components/ui/layout";
import { SpecPlate } from "@/components/ui/spec-plate";
import { getFeaturedModels, getModelsByCategory, hasModels } from "@/lib/models";
import {
  ADDRESS,
  ADDRESS_LINES,
  BUSINESS_NAME,
  CATEGORIES,
  CONTACT,
  LANDMARKS,
  PROFILE,
  TEST_RIDE_NOTE,
  has,
  phoneHref,
} from "@/lib/site";

/** 02 — the audience splits here, immediately after the hero. */
export function CategorySplit() {
  return (
    <Section labelledBy="categories-head">
      <Container>
        <SectionHead
          id="categories-head"
          slug="models/"
          title="Scooters or motorcycles"
          intro="Two very different machines for two very different rides. Start with the one you came for."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CATEGORIES.map((category) => (
            <Reveal key={category.id}>
              <CategoryCard
                category={category}
                count={hasModels ? getModelsByCategory(category.id).length : undefined}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** 03 — real product with real numbers, or an honest empty state. */
export function FeaturedModels() {
  const models = getFeaturedModels(6);

  return (
    <Section ground="band" labelledBy="featured-head">
      <Container>
        <SectionHead
          id="featured-head"
          slug="lineup/"
          title="Two-wheelers at Balajee Honda"
          intro={
            models.length > 0
              ? "A selection from the showroom floor. Every price and specification here comes from Honda or from us."
              : undefined
          }
        />

        {models.length > 0 ? (
          <>
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((model) => (
                <RevealItem key={model.slug} className="h-full">
                  <ModelCard model={model} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="mt-10">
              <Button href="/models" variant="secondary">
                View all models
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            slug="lineup"
            title="Our model listings are on the way"
            body="We are putting together the full range of Honda scooters and motorcycles we stock, with prices and specifications. Until then, the showroom on Station Road has everything on the floor."
            primary={{ label: "Book a test ride", href: "/test-ride" }}
          />
        )}
      </Container>
    </Section>
  );
}

/**
 * 04 — the trust layer. Renders only with verified content: a "why choose us"
 * block of generic claims is the clearest tell of a template site.
 */
export function WhyBalajee() {
  if (!has.profileHighlights && !has.premisesImage) return null;

  return (
    <Section labelledBy="why-head">
      <Container>
        <SectionHead id="why-head" slug="showroom/" title={`Why ${BUSINESS_NAME}`} />
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
          {PROFILE.exteriorImage ? (
            <div className="relative aspect-[3/2] overflow-hidden border border-rule bg-band">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE.exteriorImage.src}
                alt={PROFILE.exteriorImage.alt}
                className="size-full object-cover"
              />
            </div>
          ) : null}

          {has.profileHighlights ? (
            <SpecPlate slug="the showroom">
              <ul className="grid gap-3">
                {PROFILE.highlights.map((point) => (
                  <li key={point} className="text-[0.9375rem] text-fg-2">
                    {point}
                  </li>
                ))}
              </ul>
            </SpecPlate>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/** 05 — the dedicated conversion moment. */
export function TestRideBand() {
  return (
    <Section ground="ink" compact labelledBy="testride-head">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-16">
          <div>
            <span className="t-slug text-on-ink-2">test ride/</span>
            <h2 id="testride-head" className="t-display-l mt-4 max-w-[18ch] text-on-ink">
              Ride it before you decide
            </h2>
            {TEST_RIDE_NOTE ? (
              <p className="measure mt-5 text-[1.0625rem] text-on-ink-2">{TEST_RIDE_NOTE}</p>
            ) : (
              <p className="measure mt-5 text-[1.0625rem] text-on-ink-2">
                Nothing on a specification sheet tells you how a two-wheeler feels at a
                standstill or in traffic. Come to the showroom on {ADDRESS.street} and ride one.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Button href="/test-ride" size="block">
              Book a test ride
            </Button>
            {has.phone ? (
              <Button
                href={phoneHref() ?? "#"}
                external
                variant="secondaryOnInk"
                size="block"
                aria-label={`Call ${BUSINESS_NAME} on ${CONTACT.phone}`}
              >
                <Phone aria-hidden="true" className="size-4" />
                Call the showroom
              </Button>
            ) : (
              <Button href="/contact" variant="secondaryOnInk" size="block">
                <MapPin aria-hidden="true" className="size-4" />
                Find the showroom
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** 06 — the owner path, visually distinct from the moment it opens. */
export function ServiceBand() {
  return (
    <Section ground="band" labelledBy="service-head">
      <Container>
        <SectionHead
          id="service-head"
          slug="owners/"
          title="Already ride a Honda?"
          intro="Servicing, genuine parts and warranty work happen at the same address. Owners have their own path through this site."
        />
        <div className="flex flex-wrap gap-3">
          <Button href="/service" variant="service">
            Book a service
          </Button>
          <Button href="/service#genuine-parts" variant="tertiary">
            Genuine parts
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/** 07 — converts intent into a visit, the first-ranked business goal. */
export function VisitSection() {
  return (
    <Section labelledBy="visit-head">
      <Container>
        <SectionHead
          id="visit-head"
          slug="visit/"
          title="Find the showroom"
          intro={`We are on ${ADDRESS.street} in ${ADDRESS.city}. The landmarks below are usually the quickest way to find us.`}
        />

        <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
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

            <div className="mt-6 flex flex-wrap gap-3">
              {has.map ? (
                <Button
                  href={CONTACT.mapUrl ?? "#"}
                  external
                  target="_blank"
                  rel="noopener"
                  size="compact"
                >
                  <MapPin aria-hidden="true" className="size-4" />
                  Get directions
                </Button>
              ) : null}
              {has.phone ? (
                <Button
                  href={phoneHref() ?? "#"}
                  external
                  variant="secondary"
                  size="compact"
                  aria-label={`Call ${BUSINESS_NAME} on ${CONTACT.phone}`}
                >
                  <Phone aria-hidden="true" className="size-4" />
                  Call
                </Button>
              ) : null}
              <Button href="/contact" variant="tertiary" size="compact">
                Showroom details
              </Button>
            </div>
          </SpecPlate>

          <div className="border border-rule bg-band p-6">
            <span className="t-slug">Getting here</span>
            <p className="mt-3 text-[0.9375rem] text-fg-2">
              {ADDRESS.locality} sits just off {ADDRESS.street}. If you are coming from
              Railway Ganj, the State Bank of India main branch is the nearest landmark;
              the showroom is opposite Police Lines.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** 08 — catches anyone who read to the end without acting. */
export function FinalConversion() {
  return (
    <Section ground="band" compact labelledBy="enquire-head">
      <Container>
        <SectionHead
          id="enquire-head"
          slug="enquire/"
          title="Still deciding?"
          intro="Tell us what you are looking at and we will pick it up from there."
        />
        <div className="max-w-2xl">
          <EnquiryBlock kind="enquiry" submitLabel="Send enquiry" />
        </div>
      </Container>
    </Section>
  );
}
