import { Container, Section } from "@/components/ui/layout";

/**
 * Skeleton reserves the same vertical rhythm as a real page so the transition
 * does not shift layout.
 */
export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="animate-pulse space-y-6" role="status" aria-label="Loading">
          <div className="h-3 w-24 bg-band" />
          <div className="h-12 w-3/4 max-w-xl bg-band" />
          <div className="h-4 w-full max-w-lg bg-band" />
          <div className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-64 bg-band" />
            <div className="h-64 bg-band" />
            <div className="h-64 bg-band" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
