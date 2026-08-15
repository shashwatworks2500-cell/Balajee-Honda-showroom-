import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";
import { SpecPlate } from "@/components/ui/spec-plate";
import { ADDRESS_LINES, BUSINESS_NAME, LANDMARKS } from "@/lib/site";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <span className="t-slug">404/</span>
        <h1 className="t-display-l mt-4 max-w-[18ch]">This page does not exist</h1>
        <p className="measure mt-5 text-[1.0625rem] text-fg-2">
          The link may be out of date, or the model may not be listed yet. The showroom is
          still where it has always been.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/models">View models</Button>
          <Button href="/" variant="secondary">
            Back to the homepage
          </Button>
        </div>

        <SpecPlate slug="showroom" className="mt-10 max-w-md">
          <address className="t-data not-italic text-[0.9375rem] leading-relaxed text-fg">
            <span className="block font-medium">{BUSINESS_NAME}</span>
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="t-data mt-3 border-t border-rule-2 pt-3 text-[0.875rem] text-fg-3">
            {LANDMARKS.map((landmark) => (
              <span key={landmark} className="block">
                {landmark}
              </span>
            ))}
          </p>
        </SpecPlate>
      </Container>
    </Section>
  );
}
