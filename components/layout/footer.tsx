import Link from "next/link";

import { Container } from "@/components/ui/layout";
import { FOOTER_NAV } from "@/lib/nav";
import { formatTime } from "@/lib/format";
import {
  ADDRESS_LINES,
  BUSINESS_DESCRIPTOR,
  BUSINESS_NAME,
  CONTACT,
  DAY_NAMES,
  LANDMARKS,
  OPENING_HOURS,
  has,
  phoneHref,
} from "@/lib/site";

/**
 * Ink footer carrying the full NAP block. The address and landmarks are the
 * only content here that is verified, so they get the prominence.
 */
export function Footer() {
  return (
    <footer className="on-ink border-t-[3px] border-signal bg-ink text-on-ink-2">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:py-24">
          {/* NAP */}
          <div>
            <p className="t-h3 text-on-ink">{BUSINESS_NAME}</p>
            <p className="t-slug mt-1 text-on-ink-2">{BUSINESS_DESCRIPTOR}</p>

            <address className="t-data mt-6 not-italic text-[0.875rem] leading-relaxed">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block text-on-ink">
                  {line}
                </span>
              ))}
            </address>

            {LANDMARKS.length > 0 ? (
              <div className="mt-4 border-t border-on-ink/20 pt-4">
                <span className="t-slug">Landmarks</span>
                <p className="t-data mt-2 text-[0.875rem] leading-relaxed">
                  {LANDMARKS.map((landmark) => (
                    <span key={landmark} className="block">
                      {landmark}
                    </span>
                  ))}
                </p>
              </div>
            ) : null}

            {has.phone || has.email ? (
              <div className="mt-4 border-t border-on-ink/20 pt-4">
                {has.phone ? (
                  <a
                    href={phoneHref() ?? undefined}
                    className="t-data block text-[0.875rem] text-on-ink hover:underline"
                  >
                    {CONTACT.phone}
                  </a>
                ) : null}
                {has.email ? (
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="t-data block text-[0.875rem] text-on-ink hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                ) : null}
              </div>
            ) : null}

            {has.hours ? (
              <div className="mt-4 border-t border-on-ink/20 pt-4">
                <span className="t-slug">Opening hours</span>
                <dl className="mt-2 grid gap-1">
                  {OPENING_HOURS.map((entry) => (
                    <div key={entry.day} className="flex gap-4 text-[0.8125rem]">
                      <dt className="w-24 shrink-0">{DAY_NAMES[entry.day]}</dt>
                      <dd className="t-data text-on-ink">
                        {formatTime(entry.opens)}–{formatTime(entry.closes)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((group) => (
              <div key={group.heading}>
                <h2 className="t-slug">{group.heading}</h2>
                <ul className="mt-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        /* 44px tap target, matching the floor set in Design System V0.2. */
                        className="inline-flex min-h-11 items-center text-[0.9375rem] text-on-ink-2 transition-colors hover:text-on-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-on-ink/20 py-6 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="t-data">
            © {new Date().getFullYear()} {BUSINESS_NAME}
          </p>
          <p className="t-data">
            Honda is a trademark of its respective owner.
          </p>
        </div>
      </Container>
    </footer>
  );
}
