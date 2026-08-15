import Image from "next/image";

import { Phone } from "lucide-react";

import { Ignition } from "@/components/motion/ignition";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { SpecStrip } from "@/components/ui/spec-plate";
import { formatPrice, modelKeySpecs, priceQualifierLabel } from "@/lib/format";
import { getHeroModel } from "@/lib/models";
import { ADDRESS, BUSINESS_NAME, has, phoneDisplay, phoneHref } from "@/lib/site";

/**
 * Hero.
 *
 * With a verified featured model it is a full-bleed photograph with the model
 * name, a spec strip and one dominant CTA. Without one it is typographic —
 * still Ink, still precise, carrying the verified location instead of invented
 * product. It is never a placeholder image or a fabricated model name.
 */
export function Hero() {
  const model = getHeroModel();

  const stripItems = model
    ? [
        ...(model.startingPrice
          ? [
              {
                label: `${priceQualifierLabel(model.startingPrice)} from`,
                value: formatPrice(model.startingPrice),
              },
            ]
          : []),
        ...modelKeySpecs(model, 3).map((s) => ({ label: s.label, value: s.value })),
      ]
    : [];

  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink text-on-ink">
      {model ? (
        <>
          <Image
            src={model.image.src}
            alt={model.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Scrim for legibility, not decoration. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
          />
        </>
      ) : null}

      <Ignition />

      <Container className="relative">
        <div className="flex min-h-[32rem] flex-col justify-end pb-14 pt-24 lg:min-h-[40rem] lg:pb-20 lg:pt-32">
          <Eyebrow onInk>
            Honda two-wheelers · {ADDRESS.city}, {ADDRESS.state}
          </Eyebrow>

          <h1 className="t-display-xl mt-5 max-w-[16ch] text-on-ink">
            {model ? model.name : BUSINESS_NAME}
          </h1>

          <p className="mt-6 max-w-[46ch] text-[1.125rem] leading-relaxed text-on-ink-2">
            {model?.positioningLine ??
              `Scooters and motorcycles at our showroom on ${ADDRESS.street}, ${ADDRESS.city}. Come and ride one.`}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/test-ride" className="sm:w-auto" size="block">
              Book a test ride
            </Button>
            <Button
              href="/models"
              variant="secondaryOnInk"
              size="block"
              className="sm:w-auto"
            >
              View models
            </Button>
            {has.phone ? (
              <Button
                href={phoneHref() ?? "#"}
                external
                variant="secondaryOnInk"
                size="block"
                className="sm:w-auto"
                aria-label={`Call ${BUSINESS_NAME} on ${phoneDisplay()}`}
              >
                <Phone aria-hidden="true" className="size-4" />
                {phoneDisplay()}
              </Button>
            ) : null}
          </div>

          {stripItems.length > 0 ? (
            <SpecStrip items={stripItems} onInk className="mt-12" />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
