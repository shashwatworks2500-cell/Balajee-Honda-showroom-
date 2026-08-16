"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Dialog } from "radix-ui";
import { Clock, MapPin, Menu, Phone, X } from "lucide-react";

import { Button, Container, Logo } from "@/components/ui/kit";
import {
  ADDRESS,
  ADDRESS_LINES,
  BUSINESS_DESCRIPTOR,
  BUSINESS_NAME,
  CONTACT,
  HOURS,
  LANDMARKS,
  MAP_HREF,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "The range", href: "#lineup", id: "lineup" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Why us", href: "#why", id: "why" },
  { label: "Visit", href: "#visit", id: "visit" },
];

/** First focusable element on the page. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only inline-flex min-h-11 items-center rounded-[4px] bg-signal px-4 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
    >
      Skip to main content
    </a>
  );
}

/**
 * Header.
 *
 * Two tiers over the hero: a utility strip carrying the details a walk-in
 * customer actually wants, and the main bar. Past the hero the strip retracts,
 * the bar condenses onto a ground, and a hairline progress rule tracks reading
 * position. No floating pill, no permanent blur panel.
 */
export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight whichever section owns the upper half of the viewport. */
  useEffect(() => {
    const targets = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip — retracts once the hero is behind you. */}
      <div
        className={cn(
          "overflow-hidden border-b border-white/[0.06] bg-void/80 backdrop-blur-sm",
          "transition-[max-height,opacity] duration-500 ease-[var(--ease-out-expo)]",
          condensed ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
        aria-hidden={condensed}
      >
        <Container>
          <div className="flex h-10 items-center justify-between gap-6">
            <p className="t-data flex items-center gap-2 truncate text-[0.75rem] text-mute">
              <Clock aria-hidden="true" className="size-3.5 shrink-0 text-signal" />
              <span className="truncate">
                {HOURS.summary}, {HOURS.time}
              </span>
            </p>
            <p className="t-data hidden items-center gap-2 truncate text-[0.75rem] text-mute sm:flex">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-signal" />
              <span className="truncate">
                {ADDRESS.street}, {ADDRESS.city} — {LANDMARKS[0]}
              </span>
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="t-data hidden truncate text-[0.75rem] text-mute transition-colors hover:text-bright lg:block"
            >
              {CONTACT.email}
            </a>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "relative transition-colors duration-500 ease-[var(--ease-out-expo)]",
          condensed
            ? "border-b border-hair bg-void/94 backdrop-blur-lg"
            : "border-b border-transparent",
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-expo)]",
              condensed ? "h-[4.5rem]" : "h-24",
            )}
          >
            <a
              href="#top"
              aria-label={`${BUSINESS_NAME} — top of page`}
              className="flex min-h-11 shrink-0 items-center"
            >
              <Logo height={condensed ? 36 : 46} className="transition-all duration-500" />
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group relative inline-flex min-h-11 items-center px-4 text-[0.9375rem] font-medium transition-colors",
                          isActive ? "text-bright" : "text-mute hover:text-bright",
                        )}
                      >
                        {item.label}
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                            aria-hidden="true"
                            className="absolute inset-x-3 bottom-1.5 h-px bg-signal"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-hair transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={CONTACT.phoneHref}
                className="t-data hidden text-[0.875rem] text-mute transition-colors hover:text-bright xl:block"
              >
                {CONTACT.phoneDisplay}
              </a>
              <Button
                href={CONTACT.phoneHref}
                external
                size="compact"
                className="hidden sm:inline-flex"
              >
                <Phone aria-hidden="true" className="size-4" />
                Call now
              </Button>

              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex size-11 items-center justify-center rounded-[4px] border border-hair text-bright transition-colors hover:border-bright lg:hidden"
                  >
                    <Menu aria-hidden="true" className="size-5" />
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-50 bg-void/70 lg:hidden" />
                  <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-void lg:hidden">
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>
                    <Dialog.Description className="sr-only">
                      {BUSINESS_NAME} — {BUSINESS_DESCRIPTOR}
                    </Dialog.Description>

                    <div className="flex h-24 shrink-0 items-center justify-between border-b border-hair px-5">
                      <Logo height={40} />
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          aria-label="Close menu"
                          className="inline-flex size-11 items-center justify-center rounded-[4px] border border-hair text-bright"
                        >
                          <X aria-hidden="true" className="size-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
                      <ul className="divide-y divide-hair-2">
                        {NAV.map((item, i) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              onClick={close}
                              className="flex min-h-16 items-baseline gap-4 text-[1.375rem] font-semibold text-bright"
                            >
                              <span className="t-slug text-signal">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>

                      <address className="t-data mt-10 not-italic text-[0.8125rem] leading-relaxed text-faint">
                        {ADDRESS_LINES.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                        {LANDMARKS.map((l) => (
                          <span key={l} className="mt-1 block">
                            {l}
                          </span>
                        ))}
                        <span className="mt-3 block text-mute">
                          {HOURS.summary} · {HOURS.time}
                        </span>
                      </address>
                    </nav>

                    <div className="shrink-0 space-y-3 border-t border-hair bg-ink px-5 py-5">
                      <Button href={CONTACT.phoneHref} external size="block">
                        <Phone aria-hidden="true" className="size-4" />
                        Call {CONTACT.phoneDisplay}
                      </Button>
                      <Button
                        href={MAP_HREF}
                        external
                        target="_blank"
                        rel="noopener"
                        variant="ghost"
                        size="block"
                      >
                        <MapPin aria-hidden="true" className="size-4" />
                        Get directions
                      </Button>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </Container>

        {/* Reading position. Only meaningful once the page is moving. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left bg-signal transition-opacity duration-500",
            condensed ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </header>
  );
}
