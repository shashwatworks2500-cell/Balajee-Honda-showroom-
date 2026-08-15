import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";

import { EnquiryBlock } from "@/components/forms/enquiry-block";
import { ModelCard } from "@/components/models/model-card";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHead } from "@/components/ui/layout";
import { PlateRow, PlateRows, SpecPlate, SpecStrip } from "@/components/ui/spec-plate";
import { formatEmi, formatPrice, keySpecRows, priceQualifierLabel, specRows } from "@/lib/format";
import { MODELS, getModel, getRelatedModels } from "@/lib/models";
import { modelMetadata, modelSchema } from "@/lib/seo";
import { BUSINESS_NAME, CATEGORIES, has, phoneDisplay, phoneHref } from "@/lib/site";

export function generateStaticParams() {
  return MODELS.map((model) => ({ model: model.slug }));
}

export async function generateMetadata({ params }: PageProps<"/models/[model]">) {
  const { model: slug } = await params;
  const model = getModel(slug);
  if (!model) return {};
  return modelMetadata(model);
}

/**
 * Model detail, ordered by decision sequence: see it, price it, book it.
 * Everything after the CTA exists to remove remaining objections.
 */
export default async function ModelPage({ params }: PageProps<"/models/[model]">) {
  const { model: slug } = await params;

  // Category routes are static siblings; guard in case a model ever collides.
  if (CATEGORIES.some((c) => c.slug === slug)) notFound();

  const model = getModel(slug);
  if (!model) notFound();

  const category = CATEGORIES.find((c) => c.id === model.category);
  const allSpecs = specRows(model.specs);
  const strip = [
    ...(model.startingPrice
      ? [
          {
            label: `${priceQualifierLabel(model.startingPrice)} from`,
            value: formatPrice(model.startingPrice),
          },
        ]
      : []),
    ...keySpecRows(model.specs, 3),
  ];
  const related = getRelatedModels(model);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modelSchema(model)) }}
      />

      {/* 1 — hero */}
      <section className="on-ink relative isolate overflow-hidden bg-ink text-on-ink">
        <Image
          src={model.image.src}
          alt={model.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
        />
        <Container className="relative">
          <div className="flex min-h-[26rem] flex-col justify-end pb-12 pt-24 lg:min-h-[34rem]">
            <Eyebrow onInk>{category?.labelSingular}</Eyebrow>
            <h1 className="t-display-xl mt-4 max-w-[14ch] text-on-ink">{model.name}</h1>
            {model.positioningLine ? (
              <p className="mt-5 max-w-[46ch] text-[1.125rem] text-on-ink-2">
                {model.positioningLine}
              </p>
            ) : null}
            {strip.length > 0 ? <SpecStrip items={strip} onInk className="mt-10" /> : null}
          </div>
        </Container>
      </section>

      {/* 2 + 3 — the numbers, then the conversion moment */}
      <Section compact>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
            <SpecPlate slug="specifications" accent="buy">
              {allSpecs.length > 0 ? (
                <PlateRows>
                  {allSpecs.map((row) => (
                    <PlateRow key={row.label} label={row.label} value={row.value} />
                  ))}
                </PlateRows>
              ) : (
                <p className="text-fg-2">
                  Full specifications for the {model.name} are being added. Ask us at the
                  showroom and we will go through them with you.
                </p>
              )}
            </SpecPlate>

            <div className="flex flex-col gap-4">
              {model.startingPrice ? (
                <SpecPlate slug="price">
                  <p className="t-data text-[1.75rem] font-medium leading-none text-fg">
                    {formatPrice(model.startingPrice)}
                  </p>
                  <p className="t-caption mt-2">
                    {priceQualifierLabel(model.startingPrice)} · {model.startingPrice.sourceNote}
                  </p>
                  {model.emiFrom ? (
                    <div className="mt-4 border-t border-rule-2 pt-4">
                      <span className="t-slug">EMI from</span>
                      <p className="t-data mt-1 text-[1.0625rem] text-fg">
                        {formatEmi(model.emiFrom.amountPerMonth)}
                      </p>
                      <p className="t-caption mt-1">{model.emiFrom.terms}</p>
                    </div>
                  ) : null}
                </SpecPlate>
              ) : null}

              <Button href="/test-ride" size="block">
                Book a test ride
              </Button>
              {has.phone ? (
                <Button
                  href={phoneHref() ?? "#"}
                  external
                  variant="secondary"
                  size="block"
                  aria-label={`Call ${BUSINESS_NAME} on ${phoneDisplay()}`}
                >
                  <Phone aria-hidden="true" className="size-4" />
                  Call the showroom
                </Button>
              ) : (
                <Button href="/contact" variant="secondary" size="block">
                  <MapPin aria-hidden="true" className="size-4" />
                  Visit the showroom
                </Button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* 4 — variants */}
      {model.variants && model.variants.length > 0 ? (
        <Section ground="band" compact labelledBy="variants-head">
          <Container>
            <SectionHead id="variants-head" slug="variants/" title="Variants" />
            <SpecPlate>
              <PlateRows>
                {model.variants.map((variant) => (
                  <PlateRow
                    key={variant.name}
                    label={variant.name}
                    value={variant.price ? formatPrice(variant.price) : "—"}
                    note={variant.note}
                  />
                ))}
              </PlateRows>
            </SpecPlate>
          </Container>
        </Section>
      ) : null}

      {/* 5 — colours */}
      {model.colours && model.colours.length > 0 ? (
        <Section compact labelledBy="colours-head">
          <Container>
            <SectionHead id="colours-head" slug="colours/" title="Colours" />
            <ul className="flex flex-wrap gap-6">
              {model.colours.map((colour) => (
                <li key={colour.name} className="w-40">
                  {colour.image ? (
                    <div className="relative aspect-square overflow-hidden border border-rule bg-band">
                      <Image
                        src={colour.image.src}
                        alt={colour.image.alt}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                  ) : colour.hex ? (
                    <span
                      className="block aspect-square border border-rule"
                      style={{ backgroundColor: colour.hex }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="mt-2 block text-[0.875rem] text-fg-2">{colour.name}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* 6 — features, Honda's wording */}
      {model.features && model.features.length > 0 ? (
        <Section ground="band" compact labelledBy="features-head">
          <Container>
            <SectionHead id="features-head" slug="features/" title="Features" />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {model.features.map((feature) => (
                <li key={feature} className="border-t border-rule pt-3 text-[0.9375rem] text-fg-2">
                  {feature}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* 7 — gallery */}
      {model.gallery && model.gallery.length > 0 ? (
        <Section compact labelledBy="gallery-head">
          <Container>
            <SectionHead id="gallery-head" slug="gallery/" title={`${model.name} in detail`} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {model.gallery.map((image) => (
                <li key={image.src} className="relative aspect-[3/2] overflow-hidden border border-rule bg-band">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* 10 — ownership bridge */}
      <Section ground="band" compact labelledBy="ownership-head">
        <Container>
          <SectionHead
            id="ownership-head"
            slug="ownership/"
            title="After you buy"
            intro={`Servicing, genuine parts and warranty work for your ${model.name} happen at the same address.`}
          />
          <Button href="/service" variant="service">
            Service and parts
          </Button>
        </Container>
      </Section>

      {/* 11 — related, never cross-category */}
      {related.length > 0 ? (
        <Section compact labelledBy="related-head">
          <Container>
            <SectionHead
              id="related-head"
              slug="related/"
              title={`Other ${category?.label.toLowerCase() ?? "models"}`}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <ModelCard key={other.slug} model={other} className="h-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 12 — final conversion */}
      <Section ground="ink" compact labelledBy="model-enquiry-head">
        <Container>
          <span className="t-slug text-on-ink-2">enquire/</span>
          <h2 id="model-enquiry-head" className="t-display-l mt-4 text-on-ink">
            Interested in the {model.name}?
          </h2>
          <div className="mt-8 max-w-2xl">
            <EnquiryBlock kind="enquiry" submitLabel="Send enquiry" defaultModel={model.name} />
          </div>
        </Container>
      </Section>
    </>
  );
}
