"use client";

import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Menu, Phone, X } from "lucide-react";

import { Button, Container, Logo } from "@/components/ui/kit";
import {
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
  { label: "The range", href: "#lineup" },
  { label: "Services", href: "#services" },
  { label: "Why us", href: "#why" },
  { label: "Visit", href: "#visit" },
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
 * Header sits over the hero photograph and only takes on a ground once the
 * page has scrolled past it. No blur panel, no floating pill.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[var(--ease-out-expo)]",
        solid ? "border-b border-hair bg-void/92 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-6 transition-[height] duration-300",
            solid ? "h-20" : "h-24 lg:h-28",
          )}
        >
          <a href="#top" className="flex min-h-11 shrink-0 items-center" aria-label={`${BUSINESS_NAME} — top of page`}>
            <Logo height={solid ? 34 : 44} className="transition-all duration-300" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-mute transition-colors hover:text-bright"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
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

                  <div className="flex h-20 shrink-0 items-center justify-between border-b border-hair px-5">
                    <Logo height={38} />
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
                      {NAV.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={close}
                            className="flex min-h-16 items-center text-[1.375rem] font-semibold text-bright"
                          >
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
                      Get directions
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hair bg-ink">
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[6fr_3fr_3fr] lg:py-20">
          <div>
            <Logo height={56} />
            <p className="t-slug mt-5">{BUSINESS_DESCRIPTOR}</p>
            <address className="t-data mt-6 not-italic text-[0.875rem] leading-relaxed text-mute">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div>
            <h2 className="t-slug">Sections</h2>
            <ul className="mt-4">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-mute transition-colors hover:text-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="t-slug">Contact</h2>
            <ul className="mt-4">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="t-data inline-flex min-h-11 items-center text-[0.9375rem] text-bright hover:text-signal"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="t-data inline-flex min-h-11 items-center break-all text-[0.875rem] text-mute hover:text-bright"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="t-data pt-2 text-[0.8125rem] text-faint">
                {HOURS.summary}, {HOURS.time}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-hair-2 py-6 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="t-data text-faint">
            © {new Date().getFullYear()} {BUSINESS_NAME}
          </p>
          <p className="t-data text-faint">
            Honda and the Honda marks are trademarks of their respective owner.
          </p>
        </div>
      </Container>
    </footer>
  );
}
