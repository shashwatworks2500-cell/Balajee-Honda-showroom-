import { Button, Container, Section } from "@/components/ui/kit";
import { ADDRESS_LINES, BUSINESS_NAME, CONTACT } from "@/lib/site";

export default function NotFound() {
  return (
    <Section className="pt-40">
      <Container>
        <p className="t-slug">404</p>
        <h1 className="t-h2 mt-6 max-w-[18ch] text-bright">This page does not exist</h1>
        <p className="measure mt-5 text-mute">
          The link may be out of date. The showroom has not moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="block" className="sm:w-auto">
            Back to the homepage
          </Button>
          <Button href={CONTACT.phoneHref} external variant="ghost" size="block" className="sm:w-auto">
            Call {CONTACT.phoneDisplay}
          </Button>
        </div>
        <address className="t-data mt-12 not-italic text-[0.875rem] leading-relaxed text-faint">
          <span className="block text-bright">{BUSINESS_NAME}</span>
          {ADDRESS_LINES.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </address>
      </Container>
    </Section>
  );
}
