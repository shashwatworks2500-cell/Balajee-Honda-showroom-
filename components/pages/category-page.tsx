import {
  ListingHeader,
  ModelGrid,
  OtherCategories,
} from "@/components/pages/model-listing";
import { Container, Section } from "@/components/ui/layout";
import { getModelsByCategory } from "@/lib/models";
import { CITY } from "@/lib/seo";
import { AVAILABILITY_NOTE } from "@/lib/site";
import type { CategoryDefinition } from "@/lib/types";

/**
 * Shared body for /models/scooters and /models/motorcycles.
 *
 * These exist as their own routes because "Honda scooters Hardoi" and "Honda
 * bikes Hardoi" are different searches by different buyers — one page cannot
 * serve or rank for both.
 */
export function CategoryPage({ category }: { category: CategoryDefinition }) {
  const models = getModelsByCategory(category.id);

  return (
    <>
      <ListingHeader
        slug={`${category.slug}/`}
        title={`Honda ${category.label.toLowerCase()} in ${CITY}`}
        intro={`${category.blurb} ${AVAILABILITY_NOTE}`}
      />

      <Section>
        <Container>
          <ModelGrid
            models={models}
            emptyTitle={`Our ${category.label.toLowerCase()} listings are on the way`}
            emptyBody={`We are putting together the Honda ${category.label.toLowerCase()} we stock, with prices and specifications. Until then, come to the showroom on Station Road and see them in person.`}
          />
        </Container>
      </Section>

      <OtherCategories current={category} />
    </>
  );
}
