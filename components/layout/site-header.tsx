"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Logo } from "@/components/ui/logo";
import { PRIMARY_NAV } from "@/lib/nav";
import { ADDRESS, BUSINESS_NAME, OPENING_HOURS, has, phoneDisplay, phoneHref } from "@/lib/site";
import { DAY_NAMES } from "@/lib/site";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Two-tier header, flush to the top edge — not a floating pill.
 *
 * Past 120px the utility bar collapses and the main bar condenses, leaving a
 * hairline rule. No blur, no floating card, no shadow.
 */
export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const todayHours = OPENING_HOURS.length > 0 ? OPENING_HOURS[new Date().getDay()] : undefined;

  return (
    <header className="sticky top-0 z-40 bg-page">
      {/* Utility bar. Always carries the verified location; phone and hours
          appear only once verified. */}
      <div
        className={cn(
          "on-ink overflow-hidden bg-ink text-on-ink-2 transition-[max-height,opacity] duration-250 ease-[var(--ease-enter)]",
          condensed ? "max-h-0 opacity-0" : "max-h-20 opacity-100",
        )}
        aria-hidden={condensed}
      >
        <Container>
          <div className="flex h-11 items-center justify-between gap-6 text-[0.75rem] sm:h-9">
            <p className="t-data flex min-w-0 items-center gap-2 truncate">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">
                {ADDRESS.street}, {ADDRESS.city}
              </span>
            </p>

            <div className="flex items-center gap-5">
              {has.hours && todayHours ? (
                <span className="t-data hidden sm:inline">
                  {DAY_NAMES[todayHours.day]} {formatTime(todayHours.opens)}–
                  {formatTime(todayHours.closes)}
                </span>
              ) : null}

              {has.phone ? (
                <a
                  href={phoneHref() ?? undefined}
                  className="t-data -mr-2 flex min-h-11 items-center gap-2 px-2 text-on-ink hover:underline sm:min-h-0"
                >
                  <Phone aria-hidden="true" className="size-3.5" />
                  {phoneDisplay()}
                </a>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div className={cn("border-b border-rule bg-page")}>
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-6 transition-[height] duration-250 ease-[var(--ease-enter)]",
              condensed ? "h-14" : "h-[4.5rem]",
            )}
          >
            {/* Lockup: the supplied brand mark, or a typographic fallback. */}
            <Link
              href="/"
              aria-label={`${BUSINESS_NAME} — home`}
              /* min-h keeps the lockup tap target at the 44px floor. */
              className="group flex min-h-11 shrink-0 items-center"
            >
              <Logo height={condensed ? 32 : 40} descriptorHidden={condensed} />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {PRIMARY_NAV.map((item) => {
                  const active =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative py-2 text-[0.9375rem] font-medium transition-colors",
                          item.path === "own" ? "hover:text-workshop" : "hover:text-signal",
                          active ? "text-fg" : "text-fg-2",
                        )}
                      >
                        {item.label}
                        {active ? (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute inset-x-0 -bottom-px block h-0.5",
                              item.path === "own" ? "bg-workshop" : "bg-signal",
                            )}
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Button href="/test-ride" size="compact" className="hidden sm:inline-flex">
                Book a test ride
              </Button>
              <MobileNav />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
