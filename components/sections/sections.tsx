import { Banknote, MapPin, Phone, Wrench } from "lucide-react";

import { MapPanel } from "@/components/sections/map-panel";
import { MODELS } from "@/lib/models";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/motion-kit";
import { Button, Container, Eyebrow, Section, SectionHead } from "@/components/ui/kit";
import {
  ADDRESS_LINES,
  CONTACT,
  HOURS,
  LANDMARKS,
  MAP_HREF,
  NOT_OFFERED,
  PAYMENT_METHODS,
  RATING,
  SERVICES,
} from "@/lib/site";

/* ------------------------------------------------------------------ */
/* 02 — what the dealership actually does                              */
/* ------------------------------------------------------------------ */

export function Services() {
  return (
    /* The one light movement in the page. Placed at the centre of the scroll
       so eight viewports of near-black are broken exactly where attention
       starts to flatten — and this is the densest reading on the page, which
       is easier on paper than on black. */
    <Section id="services" labelledBy="services-head" className="on-paper">
      <Container>
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[6fr_5fr] lg:items-end lg:gap-20">
          <SectionHead
            index="02"
            eyebrow="Under one roof"
            id="services-head"
            title={
              <>
                Buy it, finance it,
                <br />
                insure it, service it.
              </>
            }
          />
          {/* Balances the heading instead of leaving the right half empty. */}
          <p className="measure text-[0.9375rem] leading-relaxed text-mute sm:text-[1.0625rem] lg:pb-2">
            Everything a two-wheeler needs over its life happens at the same counter on Station
            Road — from the first test ride to the parts it wears through years later.
          </p>
        </div>

        {/* An indexed list, not a card grid. The numerals carry the rhythm. */}
        <ol className="mt-10 border-b border-hair sm:mt-16">
          {SERVICES.map((service, i) => (
            <RevealItem key={service.id}>
              {/* Two columns on a phone — numeral in the gutter, everything
                  else indented under the title, so the row reads as one entry
                  instead of four stacked blocks. The 12-column desktop row is
                  unchanged; the explicit placements just reset at md. */}
              <li className="group grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-2 border-t border-hair py-6 transition-colors duration-300 hover:bg-ink sm:py-8 md:grid-cols-12 md:gap-x-8 md:gap-y-4 md:py-10">
                <p
                  aria-hidden="true"
                  className="t-data col-start-1 row-start-1 text-[1.125rem] leading-tight text-faint transition-colors duration-300 group-hover:text-signal md:col-auto md:row-auto md:col-span-1 md:text-[2rem] md:leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3 className="t-h3 col-start-2 row-start-1 self-start text-[1.0625rem] text-bright sm:text-[1.25rem] md:col-auto md:row-auto md:col-span-3">
                  {service.title}
                </h3>

                <p className="col-start-2 row-start-2 text-[0.875rem] leading-relaxed text-mute sm:text-[0.9375rem] md:col-auto md:row-auto md:col-span-4">
                  {service.body}
                </p>

                <ul className="col-start-2 row-start-3 flex flex-wrap gap-x-4 gap-y-1.5 md:col-auto md:row-auto md:col-span-4 md:gap-x-5 md:gap-y-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-[0.8125rem] text-mute sm:text-[0.875rem]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.4rem] size-1 shrink-0 rounded-full bg-signal sm:mt-[0.45rem]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            </RevealItem>
          ))}
        </ol>

        {/* Said plainly so nobody drives over for something we don't do. */}
        <Reveal className="mt-8">
          <p className="t-data text-[0.8125rem] text-faint">
            Not offered here: {NOT_OFFERED.join(" \u00b7 ")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — the reasons to trust the place                                 */
/* ------------------------------------------------------------------ */

export function Trust() {
  /* Every figure here is either published by someone else and attributed, or
     a count of something on this page. Nothing is asserted about the business
     that cannot be checked from the page itself. */
  const figures = [
    { value: RATING.value, label: `Rated on ${RATING.source}`, sub: `out of ${RATING.scale}` },
    { value: "9\u20139", label: "Open every day", sub: HOURS.time },
    { value: String(MODELS.length), label: "Honda models", sub: "in the range shown" },
    { value: String(SERVICES.length), label: "Services", sub: "under one roof" },
  ];

  return (
    <Section id="why" labelledBy="why-head" className="border-t border-hair-2">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow index="03">Why here</Eyebrow>
          {/* Set larger than the other section heads: this is the argument the
              page is making, so it is allowed to be the loudest line on it. */}
          <h2
            id="why-head"
            className="t-display mt-6 text-[clamp(2.25rem,5.4vw,4.25rem)] text-bright"
          >
            An authorised dealer,
            <br />
            <span className="text-mute">not a middleman.</span>
          </h2>
          <p className="measure mt-8 text-[1.125rem] leading-relaxed text-mute">
            Honda-trained staff, official parts, and the paperwork handled in the same building
            you bought the bike in.
          </p>
        </div>

        {/* Figures at display scale. The page has one other numeral treatment
            and it is small and mono — this is deliberately the opposite. */}
        <RevealGroup className="mt-20 grid gap-px bg-hair sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((figure) => (
            <RevealItem key={figure.label}>
              <div className="group h-full bg-void px-6 py-10 transition-colors duration-300 hover:bg-ink">
                <p className="t-display text-[clamp(2.5rem,4.5vw,3.5rem)] text-bright transition-colors duration-300 group-hover:text-signal">
                  {figure.value}
                </p>
                <p className="t-slug mt-5">{figure.label}</p>
                <p className="t-data mt-1.5 text-[0.8125rem] text-faint">{figure.sub}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6">
          <p className="t-data text-[0.8125rem] text-faint">
            Rating as published on {RATING.source}. Customers most often mention staff knowledge
            and punctual service.
          </p>
        </Reveal>

        {/* Payments as a run of type rather than a boxed panel — it is a
            footnote to the argument, not a third card grid. */}
        <Reveal className="mt-16">
          <div className="flex flex-col gap-5 border-t border-hair pt-8 md:flex-row md:items-baseline md:gap-10">
            <Eyebrow className="shrink-0">
              <Banknote aria-hidden="true" className="size-4 text-signal" />
              Ways to pay
            </Eyebrow>
            <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              {PAYMENT_METHODS.map((method, i) => (
                <li key={method} className="flex items-baseline gap-3 text-[1rem] text-bright">
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-hair">
                      /
                    </span>
                  ) : null}
                  {method}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Wrench aria-hidden="true" className="size-4 shrink-0 text-faint" />
            <p className="text-[0.875rem] text-mute">
              Service and genuine parts are billed at the same counter.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — visit                                                          */
/* ------------------------------------------------------------------ */

export function Visit() {
  return (
    <Section id="visit" labelledBy="visit-head" className="border-t border-hair-2 bg-ink">
      <Container>
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <SectionHead
              index="04"
              eyebrow="Find us"
              id="visit-head"
              title="Station Road, Hardoi."
              intro="Opposite Police Lines, a minute from the State Bank of India main branch at Railway Ganj."
            />

            <address className="mt-8 not-italic sm:mt-10">
              <span className="t-slug">Showroom</span>
              <p className="t-data mt-3 text-[1.0625rem] leading-relaxed text-bright">
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>

            <dl className="mt-8 divide-y divide-hair-2 border-y border-hair-2">
              <div className="flex items-baseline gap-4 py-3.5 sm:gap-6 sm:py-4">
                <dt className="t-slug w-20 shrink-0 sm:w-24">Phone</dt>
                <dd className="t-data text-[0.9375rem]">
                  <a
                    href={CONTACT.phoneHref}
                    className="link-sweep inline-flex min-h-11 items-center text-bright transition-colors hover:text-signal"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-4 py-3.5 sm:gap-6 sm:py-4">
                <dt className="t-slug w-20 shrink-0 sm:w-24">Email</dt>
                <dd className="t-data text-[0.9375rem]">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="link-sweep inline-flex min-h-11 items-center text-bright transition-colors hover:text-signal"
                  >
                    {/* Break at the @, not mid-word: "…hdi / @gmail.com" reads
                        as an address, "…gmai / l.com" reads as a typo. */}
                    {CONTACT.email.split("@")[0]}
                    <wbr />
                    {`@${CONTACT.email.split("@")[1]}`}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-4 py-3.5 sm:gap-6 sm:py-4">
                <dt className="t-slug w-20 shrink-0 sm:w-24">Hours</dt>
                <dd className="t-data text-[0.9375rem] text-bright">
                  {HOURS.time}
                  <span className="block text-[0.8125rem] text-faint">{HOURS.summary}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={MAP_HREF} external target="_blank" rel="noopener" size="block" className="sm:w-auto">
                <MapPin aria-hidden="true" className="size-4" />
                Get directions
              </Button>
              <Button
                href={CONTACT.phoneHref}
                external
                variant="ghost"
                size="block"
                className="sm:w-auto"
              >
                <Phone aria-hidden="true" className="size-4" />
                Call the showroom
              </Button>
            </div>
          </div>

          {/* The map itself. Landmarks sit under it, because in Hardoi that is
              how people actually navigate the last hundred metres. */}
          <Reveal>
            <figure className="m-0 h-full">
              <MapPanel />

              <figcaption className="mt-px grid gap-px bg-hair sm:grid-cols-2">
                {LANDMARKS.map((landmark) => (
                  <span
                    key={landmark}
                    className="flex items-start gap-3 bg-void px-5 py-4 text-[0.875rem] text-mute"
                  >
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal" />
                    {landmark}
                  </span>
                ))}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
