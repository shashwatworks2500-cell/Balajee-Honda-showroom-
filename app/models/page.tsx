import {
  ListingHeader,
  ModelGrid,
  OtherCategories,
} from "@/components/pages/model-listing";
import { Container, Section, SectionHead } from "@/components/ui/layout";
import { getModels, getModelsByCategory } from "@/lib/models";
import { buildMetadata, CITY, pageTitle } from "@/lib/seo";
import { AVAILABILITY_NOTE, BUSINESS_NAME, CATEGORIES } from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle(`Honda Bikes & Scooters in ${CITY}`),
  description: `The Honda two-wheelers available at ${BUSINESS_NAME} in ${CITY} — scooters and motorcycles, with prices and specifications.`,
  path: "/models",
});

/**
 * The directory groups by category rather than presenting one flat mixed grid:
 * a scooter buyer and a motorcycle buyer share almost no consideration set.
 */
export default function ModelsPage() {
  const all = getModels();

  return (
    <>
      <ListingHeader
        slug="models/"
        title={`Honda two-wheelers in ${CITY}`}
        intro={`Honda's current two-wheeler range, grouped by type. ${AVAILABILITY_NOTE}`}
      />

      {all.length === 0 ? (
        <Section>
          <Container>
            <ModelGrid
              models={[]}
              emptyTitle="Our model listings are on the way"
              emptyBody="We are putting together the full range of Honda scooters and motorcycles we stock, with prices and specifications. Until then, the showroom on Station Road has everything on the floor."
            />
          </Container>
        </Section>
      ) : (
        CATEGORIES.map((category, index) => {
          const models = getModelsByCategory(category.id);
          if (models.length === 0) return null;

          return (
            <Section key={category.id} ground={index % 2 === 0 ? "page" : "band"}>
              <Container>
                <SectionHead
                  slug={`${category.slug}/`}
                  title={category.label}
                  intro={category.blurb}
                />
                <ModelGrid
                  models={models}
                  emptyTitle={`${category.label} listings are on the way`}
                  emptyBody="Come to the showroom on Station Road to see what is on the floor."
                />
              </Container>
            </Section>
          );
        })
      )}

      <OtherCategories />
    </>
  );
}
