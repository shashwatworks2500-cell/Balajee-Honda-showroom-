import {
  BadgeCheck,
  Banknote,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
  Wrench,
} from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/motion-kit";
import { Spotlight } from "@/components/motion/spotlight";
import { Button, Container, Eyebrow, Section, SectionHead } from "@/components/ui/kit";
import {
  ADDRESS,
  ADDRESS_LINES,
  BUSINESS_NAME,
  CONTACT,
  HOURS,
  LANDMARKS,
  MAP_EMBED,
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
    <Section id="services" labelledBy="services-head" className="border-t border-hair-2 bg-ink">
      <Container>
        <SectionHead
          index="02"
          eyebrow="Under one roof"
          id="services-head"
          title="Buy it, finance it, insure it, service it."
          intro="Everything a two-wheeler needs over its life happens at the same counter on Station Road."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <RevealItem key={service.id} className="h-full">
              <Spotlight className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden bg-void p-7 transition-colors duration-300 hover:bg-ink-2">
                  {/* Accent draws down the left edge on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                  />
                <h3 className="t-h3 text-bright">{service.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{service.body}</p>
                <ul className="mt-5 space-y-2 border-t border-hair-2 pt-5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[0.875rem] text-mute">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-signal"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                </article>
              </Spotlight>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Said plainly so nobody drives over for something we don't do. */}
        <Reveal className="mt-8">
          <p className="t-data text-[0.8125rem] text-faint">
            Not offered here: {NOT_OFFERED.join(" · ")}
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
  return (
    <Section id="why" labelledBy="why-head" className="border-t border-hair-2">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div>
            <SectionHead
              index="03"
              eyebrow="Why here"
              id="why-head"
              title="An authorised dealer, not a middleman."
              intro="Honda-trained staff, official parts, and the paperwork handled in the same building you bought the bike in."
            />

            <RevealGroup className="mt-12 grid gap-px overflow-hidden border border-hair bg-hair sm:grid-cols-3">
              {[
                { icon: Star, k: `${RATING.source} rating`, v: `${RATING.value}`, s: `out of ${RATING.scale}` },
                { icon: Clock, k: "Open", v: HOURS.time, s: "every day" },
                { icon: BadgeCheck, k: "Status", v: "Authorised", s: "Honda dealer" },
              ].map((stat) => (
                <RevealItem key={stat.k}>
                  <div className="group h-full bg-void p-6 transition-colors duration-300 hover:bg-ink-2">
                    <stat.icon
                      aria-hidden="true"
                      className="size-5 text-signal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 motion-reduce:transform-none"
                    />
                    <p className="t-slug mt-4">{stat.k}</p>
                    <p className="t-data mt-1.5 text-[1.25rem] font-medium text-bright">{stat.v}</p>
                    <p className="t-data text-[0.75rem] text-faint">{stat.s}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-8">
              <p className="t-data text-[0.8125rem] text-faint">
                Rating as published on {RATING.source}. Customers most often mention staff
                knowledge and punctual service.
              </p>
            </Reveal>
          </div>

          {/* Payments — a real question for a walk-in customer. */}
          <Reveal className="lg:pt-24">
            <div className="border border-hair bg-ink p-7">
              <Eyebrow>
                <Banknote aria-hidden="true" className="size-4 text-signal" />
                Ways to pay
              </Eyebrow>
              <ul className="mt-6 divide-y divide-hair-2">
                {PAYMENT_METHODS.map((method) => (
                  <li key={method} className="py-3 text-[0.9375rem] text-bright first:pt-0 last:pb-0">
                    {method}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3 border-t border-hair-2 pt-6">
                <Wrench aria-hidden="true" className="size-4 shrink-0 text-faint" />
                <p className="text-[0.875rem] text-mute">
                  Service and genuine parts are billed at the same counter.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
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
        <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <SectionHead
              index="04"
              eyebrow="Find us"
              id="visit-head"
              title="Station Road, Hardoi."
              intro="Opposite Police Lines, a minute from the State Bank of India main branch at Railway Ganj."
            />

            <address className="mt-10 not-italic">
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
              <div className="flex items-baseline gap-6 py-4">
                <dt className="t-slug w-24 shrink-0">Phone</dt>
                <dd className="t-data text-[0.9375rem]">
                  <a
                    href={CONTACT.phoneHref}
                    className="link-sweep inline-flex min-h-11 items-center text-bright transition-colors hover:text-signal"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-6 py-4">
                <dt className="t-slug w-24 shrink-0">Email</dt>
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
              <div className="flex items-baseline gap-6 py-4">
                <dt className="t-slug w-24 shrink-0">Hours</dt>
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
              <div className="relative overflow-hidden border border-hair bg-ink-2">
                {/* Privacy extensions block Google embeds routinely. When that
                    happens the iframe paints its own error page over this, so
                    the fallback exists to make that page dark rather than a
                    grey void — the address and directions are already to the
                    left, so nothing load-bearing is lost. */}
                <iframe
                  src={MAP_EMBED}
                  title={`Map showing ${BUSINESS_NAME}, ${ADDRESS.street}, ${ADDRESS.city}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ colorScheme: "dark" }}
                  className="block h-[22rem] w-full border-0 lg:h-[30rem]"
                />
              </div>

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

/* ------------------------------------------------------------------ */
/* 05 — closing action                                                 */
/* ------------------------------------------------------------------ */

export function ClosingCta() {
  return (
    <Section id="contact" labelledBy="cta-head" className="relative overflow-hidden border-t border-hair-2">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(224,25,51,0.10),transparent_70%)]"
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow index="05" className="justify-center">
            Come and see it
          </Eyebrow>
          <h2 id="cta-head" className="t-h2 mt-6 text-bright">
            The quickest way to buy a Honda in Hardoi is to walk in.
          </h2>
          <p className="measure mx-auto mt-5 text-[1.0625rem] text-mute">
            We are open {HOURS.time.toLowerCase()}, every day. Call ahead and we will have the
            model you want ready to ride.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={CONTACT.phoneHref} external size="block" className="sm:w-auto">
              <Phone aria-hidden="true" className="size-4" />
              Call {CONTACT.phoneDisplay}
            </Button>
            <Button
              href={`mailto:${CONTACT.email}`}
              external
              variant="ghost"
              size="block"
              className="sm:w-auto"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email us
            </Button>
          </div>

          <p className="t-data mt-8 text-[0.8125rem] text-faint">
            {HOURS.time} · {BUSINESS_NAME} · {ADDRESS.street}, {ADDRESS.city}
          </p>
        </div>
      </Container>
    </Section>
  );
}
