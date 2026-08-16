import { Container, Logo } from "@/components/ui/kit";
import {
  ADDRESS_LINES,
  BUSINESS_DESCRIPTOR,
  BUSINESS_NAME,
  CONTACT,
  HOURS,
  WHATSAPP,
  whatsappHref,
} from "@/lib/site";

const NAV = [
  { label: "The range", href: "#lineup" },
  { label: "Services", href: "#services" },
  { label: "Why us", href: "#why" },
  { label: "Visit", href: "#visit" },
  { label: "Enquire", href: "#enquire" },
];

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
                    className="link-sweep inline-flex min-h-11 items-center text-[0.9375rem] text-mute transition-colors hover:text-bright"
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
                  className="link-sweep t-data inline-flex min-h-11 items-center text-[0.9375rem] text-bright transition-colors hover:text-signal"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              {WHATSAPP ? (
                <li>
                  <a
                    href={whatsappHref() ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep t-data inline-flex min-h-11 items-center text-[0.9375rem] text-mute transition-colors hover:text-bright"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="link-sweep t-data inline-flex min-h-11 items-center break-all text-[0.875rem] text-mute transition-colors hover:text-bright"
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
