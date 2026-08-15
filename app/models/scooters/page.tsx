import { notFound } from "next/navigation";

import { CategoryPage } from "@/components/pages/category-page";
import { buildMetadata, CITY, pageTitle } from "@/lib/seo";
import { BUSINESS_NAME, getCategory } from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle(`Honda Scooters in ${CITY}`),
  description: `Honda scooters available at ${BUSINESS_NAME}, Station Road, ${CITY}. Book a test ride at the showroom.`,
  path: "/models/scooters",
});

export default function ScootersPage() {
  const category = getCategory("scooters");
  if (!category) notFound();

  return <CategoryPage category={category} />;
}
