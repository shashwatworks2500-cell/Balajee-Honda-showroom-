import { ModelCard } from "@/components/models/model-card";
import { CategoryCard } from "@/components/models/category-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Container, Section } from "@/components/ui/layout";
import { CATEGORIES } from "@/lib/site";
import { getModelsByCategory } from "@/lib/models";
import type { CategoryDefinition, Model } from "@/lib/types";

/** Page masthead shared by the directory and both category routes. */
export function ListingHeader({
  slug,
  title,
  intro,
}: {
  slug: string;
  title: string;
  intro: string;
}) {
  return (
    <Section ground="ink" compact>
      <Container>
        <span className="t-slug text-on-ink-2">{slug}</span>
        <h1 className="t-display-l mt-4 max-w-[20ch] text-on-ink">{title}</h1>
        <p className="measure mt-5 text-[1.0625rem] text-on-ink-2">{intro}</p>
      </Container>
    </Section>
  );
}

/**
 * Model grid with an honest empty state. Cards degrade individually, and the
 * grid itself degrades to a routed empty state when no lineup is published.
 */
export function ModelGrid({
  models,
  emptyTitle,
  emptyBody,
}: {
  models: Model[];
  emptyTitle: string;
  emptyBody: string;
}) {
  if (models.length === 0) {
    return (
      <EmptyState
        slug="lineup"
        title={emptyTitle}
        body={emptyBody}
        primary={{ label: "Book a test ride", href: "/test-ride" }}
      />
    );
  }

  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => (
        <RevealItem key={model.slug} className="h-full">
          <ModelCard model={model} className="h-full" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Cross-links to the other categories, so a listing page is never a dead end. */
export function OtherCategories({ current }: { current?: CategoryDefinition }) {
  const others = CATEGORIES.filter((c) => c.id !== current?.id);
  if (others.length === 0) return null;

  return (
    <Section ground="band">
      <Container>
        <h2 className="t-h2">{current ? "Also at the showroom" : "Browse by type"}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={getModelsByCategory(category.id).length || undefined}
            />
          ))}
        </div>
        {current ? (
          <div className="mt-8">
            <Button href="/models" variant="secondary">
              View all models
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
