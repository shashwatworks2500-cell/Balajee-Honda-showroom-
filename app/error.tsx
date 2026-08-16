"use client";

import { useEffect } from "react";

import { Button, Container, Section } from "@/components/ui/kit";
import { CONTACT } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="pt-40">
      <Container>
        <p className="t-slug">Error</p>
        <h1 className="t-h2 mt-6 max-w-[20ch] text-bright">Something went wrong</h1>
        <p className="measure mt-5 text-mute">
          That did not load. Try again — or just call the showroom.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="block" className="sm:w-auto">
            Try again
          </Button>
          <Button href={CONTACT.phoneHref} external variant="ghost" size="block" className="sm:w-auto">
            Call {CONTACT.phoneDisplay}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
