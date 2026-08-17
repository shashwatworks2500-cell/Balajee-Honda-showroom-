"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { CalendarCheck, Mail, MessageCircle, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/motion-kit";
import { Button, Container, Eyebrow, Section } from "@/components/ui/kit";
import { MODELS } from "@/lib/models";
import {
  ADDRESS,
  BUSINESS_NAME,
  CONTACT,
  ENQUIRY_TOPICS,
  HOURS,
  TEST_RIDE_HASH,
  TEST_RIDE_TOPIC,
  VISIT_SLOTS,
  WHATSAPP,
  whatsappHref,
} from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Enquiry.
 *
 * This site has no backend and no mail service, and inventing one it cannot
 * deliver on would be worse than having no form at all. So the form does not
 * submit anywhere: it composes the message and hands it to WhatsApp or to the
 * visitor's mail client, both of which the showroom already reads. Nothing is
 * transmitted or stored by this page, which is also the honest thing to be
 * able to tell someone before they type their phone number in.
 *
 * If a CRM or mail service is added later, only `send` below needs to change.
 */

const NOT_DECIDED = "Not decided yet";
const DEFAULT_TOPIC = ENQUIRY_TOPICS[1];

interface Fields {
  name: string;
  phone: string;
  topic: string;
  model: string;
  day: string;
  slot: string;
  message: string;
}

type Errors = Partial<Record<"name" | "phone" | "day", string>>;

/**
 * `#test-ride` opens the form asking for a ride; `#test-ride--sp-125` also
 * names the machine. Read from the URL rather than held in a store so the
 * link is shareable and survives a reload.
 */
function parseHash(hash: string): { topic?: string; model?: string } {
  const raw = hash.replace(/^#/, "");
  if (!raw.startsWith(TEST_RIDE_HASH)) return {};
  const slug = raw.slice(TEST_RIDE_HASH.length).replace(/^--/, "");
  const model = slug ? MODELS.find((m) => m.slug === slug) : undefined;
  return { topic: TEST_RIDE_TOPIC, model: model?.name };
}

/** Subscribes to the hash instead of syncing it into state in an effect,
 *  which would both trip the lint rule and mismatch on hydration. */
function useHash(): string {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    () => window.location.hash,
    () => "",
  );
}

/** Ten digits, optionally with +91, spaces or dashes in between. */
function normalisePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!normalisePhone(fields.phone)) {
    errors.phone = "Please enter a 10-digit mobile number.";
  }
  // Optional, but a date already gone is a typo rather than a request.
  if (fields.day) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${fields.day}T00:00:00`);
    if (Number.isNaN(chosen.getTime())) errors.day = "That date does not look right.";
    else if (chosen < today) errors.day = "Please pick today or a later date.";
  }
  return errors;
}

/** "2026-08-20" as the showroom would read it back. */
function readableDay(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
}

function compose(fields: Fields): string {
  const lines = [
    `Hello ${BUSINESS_NAME},`,
    "",
    `Name: ${fields.name.trim()}`,
    `Phone: +91 ${normalisePhone(fields.phone)}`,
    `About: ${fields.topic}`,
  ];
  if (fields.model !== NOT_DECIDED) lines.push(`Model: ${fields.model}`);
  if (fields.topic === TEST_RIDE_TOPIC) {
    if (fields.day) lines.push(`Preferred day: ${readableDay(fields.day)}`);
    if (fields.slot) lines.push(`Preferred time: ${fields.slot}`);
  }
  if (fields.message.trim()) lines.push("", fields.message.trim());
  return lines.join("\n");
}

export function Enquire() {
  const formId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const hash = useHash();
  const fromHash = parseHash(hash);

  const [entered, setEntered] = useState({
    name: "",
    phone: "",
    day: "",
    slot: "",
    message: "",
  });
  /**
   * Topic and model come from the hash unless the visitor has picked
   * something else. The choice is keyed to the hash it was made under, so
   * arriving from a different model's button re-applies rather than being
   * silently overridden by an earlier pick.
   */
  const [picked, setPicked] = useState<{ hash: string; topic?: string; model?: string }>({
    hash: "",
  });
  const active = picked.hash === hash ? picked : { hash };

  const fields: Fields = {
    ...entered,
    topic: active.topic ?? fromHash.topic ?? DEFAULT_TOPIC,
    model: active.model ?? fromHash.model ?? NOT_DECIDED,
  };
  const bookingRide = fields.topic === TEST_RIDE_TOPIC;

  const [errors, setErrors] = useState<Errors>({});
  const [handedOff, setHandedOff] = useState<"whatsapp" | "email" | null>(null);

  /* `#test-ride--<slug>` matches no element id, so the browser will not scroll
     to it on its own. Only the scroll happens here — no state is synced. */
  useEffect(() => {
    if (!hash.replace(/^#/, "").startsWith(`${TEST_RIDE_HASH}--`)) return;
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  const set = <K extends keyof typeof entered>(key: K, value: string) => {
    setEntered((prev) => ({ ...prev, [key]: value }));
    if (key === "name" || key === "phone" || key === "day") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const send = (via: "whatsapp" | "email") => {
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = found.name ? "name" : found.phone ? "phone" : "day";
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }

    const body = compose(fields);
    if (via === "whatsapp") {
      const href = whatsappHref(body);
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const subject = `Enquiry: ${fields.topic}${
        fields.model !== NOT_DECIDED ? ` — ${fields.model}` : ""
      }`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    }
    setHandedOff(via);
  };

  return (
    <Section
      ref={sectionRef}
      id="enquire"
      labelledBy="enquire-head"
      className="border-t border-hair-2 bg-ink"
    >
      {/* Real anchor, so #test-ride scrolls here even with JS unavailable.
          Offset clears the fixed header. */}
      <span id={TEST_RIDE_HASH} aria-hidden="true" className="absolute -top-24" />
      <Container>
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* The ask, and the two ways to skip the form entirely. */}
          <div>
            <Eyebrow index="05">Tell us what you need</Eyebrow>
            <h2 id="enquire-head" className="t-h2 mt-6 text-bright">
              Book a test ride, or just ask.
            </h2>
            <p className="measure mt-5 text-[1.0625rem] text-mute">
              Tell us the model and when suits you, and the showroom can have the answer — and
              the bike — ready before you arrive.
            </p>

            <div className="mt-8 space-y-px overflow-hidden border border-hair sm:mt-10">
              <a
                href={CONTACT.phoneHref}
                className="group flex min-h-16 items-center gap-4 bg-void px-6 transition-colors duration-300 hover:bg-ink-2"
              >
                <Phone aria-hidden="true" className="size-5 shrink-0 text-signal" />
                <span>
                  <span className="t-slug block">Call the showroom</span>
                  <span className="t-data text-[0.9375rem] text-bright">
                    {CONTACT.phoneDisplay}
                  </span>
                </span>
              </a>
              {WHATSAPP ? (
                <a
                  href={whatsappHref() ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center gap-4 bg-void px-6 transition-colors duration-300 hover:bg-ink-2"
                >
                  <MessageCircle aria-hidden="true" className="size-5 shrink-0 text-signal" />
                  <span>
                    <span className="t-slug block">Message on WhatsApp</span>
                    <span className="t-data text-[0.9375rem] text-bright">
                      {WHATSAPP.display}
                    </span>
                  </span>
                </a>
              ) : null}
            </div>

            <p className="t-data mt-6 text-[0.8125rem] leading-relaxed text-faint">
              Open {HOURS.time.toLowerCase()}, every day · {ADDRESS.street}, {ADDRESS.city}
            </p>
          </div>

          {/* The form. */}
          <Reveal>
            <form
              noValidate
              onSubmit={(e) => e.preventDefault()}
              className="border border-hair bg-void p-5 sm:p-7 lg:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <Field
                  id={`${formId}-name`}
                  label="Your name"
                  error={errors.name}
                  required
                >
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                    className={inputClass(Boolean(errors.name))}
                  />
                </Field>

                <Field
                  id={`${formId}-phone`}
                  label="Mobile number"
                  error={errors.phone}
                  required
                >
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    value={fields.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                    className={inputClass(Boolean(errors.phone))}
                  />
                </Field>

                <Field id={`${formId}-topic`} label="What do you need?">
                  <select
                    id={`${formId}-topic`}
                    name="topic"
                    value={fields.topic}
                    onChange={(e) => setPicked({ ...active, hash, topic: e.target.value })}
                    className={inputClass(false)}
                  >
                    {ENQUIRY_TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={`${formId}-model`} label="Which model?">
                  <select
                    id={`${formId}-model`}
                    name="model"
                    value={fields.model}
                    onChange={(e) => setPicked({ ...active, hash, model: e.target.value })}
                    className={inputClass(false)}
                  >
                    <option value={NOT_DECIDED}>{NOT_DECIDED}</option>
                    {MODELS.map((model) => (
                      <option key={model.slug} value={model.name}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Only asked for when it is actually relevant. */}
                {bookingRide ? (
                  <>
                    <Field
                      id={`${formId}-day`}
                      label="Preferred day (optional)"
                      error={errors.day}
                    >
                      <input
                        id={`${formId}-day`}
                        name="day"
                        type="date"
                        value={entered.day}
                        onChange={(e) => set("day", e.target.value)}
                        aria-invalid={Boolean(errors.day)}
                        aria-describedby={errors.day ? `${formId}-day-error` : undefined}
                        className={inputClass(Boolean(errors.day))}
                      />
                    </Field>

                    <Field id={`${formId}-slot`} label="Preferred time (optional)">
                      <select
                        id={`${formId}-slot`}
                        name="slot"
                        value={entered.slot}
                        onChange={(e) => set("slot", e.target.value)}
                        className={inputClass(false)}
                      >
                        <option value="">Any time</option>
                        {VISIT_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </>
                ) : null}

                <div className="sm:col-span-2">
                  <Field id={`${formId}-message`} label="Anything else? (optional)">
                    <textarea
                      id={`${formId}-message`}
                      name="message"
                      rows={3}
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={cn(inputClass(false), "min-h-24 resize-y py-3")}
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {WHATSAPP ? (
                  <Button size="block" className="sm:w-auto" onClick={() => send("whatsapp")}>
                    {bookingRide ? (
                      <CalendarCheck aria-hidden="true" className="size-4" />
                    ) : (
                      <MessageCircle aria-hidden="true" className="size-4" />
                    )}
                    {bookingRide ? "Request on WhatsApp" : "Send on WhatsApp"}
                  </Button>
                ) : null}
                <Button
                  variant="ghost"
                  size="block"
                  className="sm:w-auto"
                  onClick={() => send("email")}
                >
                  <Mail aria-hidden="true" className="size-4" />
                  Send by email
                </Button>
              </div>

              {/* Worth saying before someone types their number in. */}
              <p className="t-data mt-6 text-[0.75rem] leading-relaxed text-faint">
                {bookingRide
                  ? "This fills in a WhatsApp or email message for you to send. The showroom confirms the slot and which bikes are free to ride — nothing is booked or stored by this site."
                  : "This fills in a WhatsApp or email message for you to send — nothing is submitted to or stored on this site."}
              </p>

              <p role="status" aria-live="polite" className="sr-only">
                {handedOff === "whatsapp"
                  ? "WhatsApp opened with your enquiry filled in."
                  : handedOff === "email"
                    ? "Your email app opened with the enquiry filled in."
                    : ""}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block min-h-12 w-full rounded-[4px] border bg-ink px-4 text-[0.9375rem] text-bright",
    "transition-colors duration-300 placeholder:text-faint",
    "focus:border-lamp focus:outline-none",
    invalid ? "border-signal" : "border-hair hover:border-hair",
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-slug mb-2.5 block">
        {label}
        {required ? <span className="ml-1 text-signal">*</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[0.8125rem] text-signal">
          {error}
        </p>
      ) : null}
    </div>
  );
}
