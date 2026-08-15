"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced to the platform's logging; never shown to the visitor.
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container>
        <span className="t-slug">error/</span>
        <h1 className="t-display-l mt-4 max-w-[20ch]">Something went wrong</h1>
        <p className="measure mt-5 text-[1.0625rem] text-fg-2">
          That page did not load. Try again — and if it keeps happening, come and see us at
          the showroom on Station Road.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Back to the homepage
          </Button>
        </div>
      </Container>
    </Section>
  );
}
