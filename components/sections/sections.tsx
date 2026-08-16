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

import { Parallax, Reveal, RevealGroup, RevealItem } from "@/components/motion/motion-kit";
import { Button, Container, Eyebrow, Section, SectionHead } from "@/components/ui/kit";
import {
  ADDRESS,
  ADDRESS_LINES,
  BUSINESS_NAME,
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
              <article className="group flex h-full flex-col bg-void p-7 transition-colors duration-300 hover:bg-ink-2">
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
                  <div className="h-full bg-void p-6">
                    <stat.icon aria-hidden="true" className="size-5 text-signal" />
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
                    className="inline-flex min-h-11 items-center text-bright hover:text-signal"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline gap-6 py-4">
                <dt className="t-slug w-24 shrink-0">Email</dt>
                <dd className="t-data break-all text-[0.9375rem]">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="inline-flex min-h-11 items-center text-bright hover:text-signal"
                  >
                    {CONTACT.email}
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

          {/* Landmark card — how people in Hardoi actually navigate. */}
          <Reveal>
            <div className="relative h-full min-h-[22rem] overflow-hidden border border-hair bg-void">
              <Parallax distance={26} className="absolute inset-0">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-hair) 1px, transparent 1px), linear-gradient(90deg, var(--color-hair) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />
              </Parallax>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(224,25,51,0.12),transparent_70%)]"
              />

              <div className="relative flex h-full flex-col justify-between p-8">
                <Eyebrow index="—">Landmarks</Eyebrow>
                <ul className="space-y-5">
                  {LANDMARKS.map((landmark) => (
                    <li key={landmark} className="flex items-start gap-4">
                      <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-signal" />
                      <span className="t-data text-[1.0625rem] leading-snug text-bright">
                        {landmark}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="t-data text-[0.8125rem] text-faint">
                  {ADDRESS.city} · {ADDRESS.state} {ADDRESS.postalCode}
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
