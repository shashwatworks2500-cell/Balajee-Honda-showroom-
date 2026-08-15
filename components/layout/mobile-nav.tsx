"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { MapPin, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { PRIMARY_NAV } from "@/lib/nav";
import {
  ADDRESS_LINES,
  BUSINESS_DESCRIPTOR,
  BUSINESS_NAME,
  CONTACT,
  LANDMARKS,
  has,
  phoneDisplay,
  phoneHref,
} from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Full-height sheet, not a dropdown. Categories first, contact actions pinned
 * to the bottom within thumb reach.
 *
 * Radix Dialog supplies the focus trap, escape handling and aria wiring;
 * styling is entirely ours so the sheet stays square and unblurred.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  /* Closing on link click rather than watching the pathname: the click is the
     event, and reacting to a route change would mean setState inside an effect. */
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[4px] border border-rule text-fg transition-colors hover:border-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 lg:hidden" />
        <Dialog.Content
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-page lg:hidden",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          )}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            {BUSINESS_NAME} — {BUSINESS_DESCRIPTOR}
          </Dialog.Description>

          <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-rule px-5">
            <Logo height={36} />
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-[4px] border border-rule text-fg transition-colors hover:border-ink"
                aria-label="Close menu"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-2">
            <ul className="divide-y divide-rule-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "flex min-h-14 items-center text-[1.125rem] font-medium",
                      item.path === "own" ? "text-workshop" : "text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/models"
                  onClick={close}
                  className="flex min-h-14 items-center text-[1.125rem] font-medium text-fg"
                >
                  All models
                </Link>
              </li>
            </ul>

            <address className="t-data mt-8 not-italic text-[0.8125rem] leading-relaxed text-fg-3">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {LANDMARKS.map((landmark) => (
                <span key={landmark} className="mt-2 block first:mt-3">
                  {landmark}
                </span>
              ))}
            </address>
          </nav>

          {/* Contact actions pinned in thumb reach. */}
          <div className="shrink-0 space-y-3 border-t border-rule bg-band px-5 py-5">
            <Button href="/test-ride" size="block" onClick={close}>
              Book a test ride
            </Button>
            <div className="flex gap-3">
              {has.phone ? (
                <Button
                  href={phoneHref() ?? "#"}
                  external
                  variant="secondary"
                  size="block"
                  aria-label={`Call ${BUSINESS_NAME} on ${phoneDisplay()}`}
                >
                  <Phone aria-hidden="true" className="size-4" />
                  Call
                </Button>
              ) : null}
              {has.map ? (
                <Button
                  href={CONTACT.mapUrl ?? "#"}
                  external
                  variant="secondary"
                  size="block"
                  rel="noopener"
                  target="_blank"
                >
                  <MapPin aria-hidden="true" className="size-4" />
                  Directions
                </Button>
              ) : (
                <Button href="/contact" variant="secondary" size="block" onClick={close}>
                  <MapPin aria-hidden="true" className="size-4" />
                  Visit us
                </Button>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
