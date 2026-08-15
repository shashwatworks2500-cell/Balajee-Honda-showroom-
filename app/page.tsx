import { Hero } from "@/components/sections/hero";
import {
  CategorySplit,
  FeaturedModels,
  FinalConversion,
  ServiceBand,
  TestRideBand,
  VisitSection,
  WhyBalajee,
} from "@/components/sections/home-sections";
import { buildMetadata, CITY } from "@/lib/seo";
import { ADDRESS, BUSINESS_NAME } from "@/lib/site";

export const metadata = buildMetadata({
  title: `${BUSINESS_NAME} — Honda Two-Wheeler Showroom in ${CITY}`,
  description: `Honda scooters and motorcycles at ${BUSINESS_NAME}, ${ADDRESS.street}, ${CITY}. Book a test ride or visit the showroom.`,
  path: "/",
});

/**
 * Homepage section order follows the blueprint. The category split sits
 * directly after the hero because a two-wheeler audience separates into
 * scooter and motorcycle buyers immediately.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySplit />
      <FeaturedModels />
      <WhyBalajee />
      <TestRideBand />
      <ServiceBand />
      <VisitSection />
      <FinalConversion />
    </>
  );
}
