import { notFound } from "next/navigation";

import { CategoryPage } from "@/components/pages/category-page";
import { buildMetadata, CITY, pageTitle } from "@/lib/seo";
import { BUSINESS_NAME, getCategory } from "@/lib/site";

export const metadata = buildMetadata({
  title: pageTitle(`Honda Bikes in ${CITY}`),
  description: `Honda motorcycles available at ${BUSINESS_NAME}, Station Road, ${CITY}. Book a test ride at the showroom.`,
  path: "/models/motorcycles",
});

export default function MotorcyclesPage() {
  const category = getCategory("motorcycles");
  if (!category) notFound();

  return <CategoryPage category={category} />;
}
