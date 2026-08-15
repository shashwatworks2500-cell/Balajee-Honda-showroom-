import type { Category, Model } from "./types";

/**
 * The model catalogue.
 *
 * Every value here comes from Honda's own published product pages
 * (honda2wheelersindia.com) and is reproduced verbatim — nothing is inferred,
 * converted or rounded. Product photography is Honda's official press image for
 * each model, stored under /public/models.
 *
 * What is deliberately ABSENT, and must stay absent until the dealership
 * supplies it: prices, EMI, variants, colours, mileage figures, feature lists
 * and stock availability. Add them per-model below; every consuming component
 * already renders them conditionally.
 *
 * To publish a model the minimum is a slug, name, category and image.
 */
export const MODELS: Model[] = [
  {
    slug: "activa110",
    name: "Honda Activa 110",
    category: "scooter",
    image: {
      src: "/models/activa110.jpg",
      alt: "Honda Activa 110, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    specs: { displacementCc: 109.51 },
    publishedSpecs: [
      { label: "Displacement", value: "109.51 cc" },
      { label: "Max Net Torque", value: "9.05 Nm @ 5500 rpm" },
      { label: "Starting Method", value: "Smart- Self" },
    ],
  },
  {
    slug: "activa125",
    name: "Honda Activa 125",
    category: "scooter",
    image: {
      src: "/models/activa125.jpg",
      alt: "Honda Activa 125, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    specs: { displacementCc: 123.92 },
    publishedSpecs: [
      { label: "Displacement", value: "123.92 cc" },
      { label: "Headlamp", value: "LED DC" },
      { label: "Battery", value: "12 V, 5.0 Ah" },
    ],
  },
  {
    slug: "shine-125",
    name: "Honda Shine 125",
    category: "motorcycle",
    image: {
      src: "/models/shine-125.jpg",
      alt: "Honda Shine 125, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    specs: { displacementCc: 123.94 },
    publishedSpecs: [
      { label: "Displacement", value: "123.94 cc" },
      { label: "Fuel System", value: "PGM-FI" },
      { label: "Headlamp", value: "Halogen Bulb, DC" },
    ],
  },
  {
    slug: "livo",
    name: "Honda Livo",
    category: "motorcycle",
    image: {
      src: "/models/livo.jpg",
      alt: "Honda Livo, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    specs: { displacementCc: 109.51 },
    publishedSpecs: [
      { label: "Displacement", value: "109.51 cc" },
      { label: "Battery", value: "12 V, 4 Ah" },
      { label: "Headlamp", value: "Halogen Bulb, DC" },
    ],
  },
  {
    slug: "sp-125",
    name: "Honda SP 125",
    category: "motorcycle",
    image: {
      src: "/models/sp-125.jpg",
      alt: "Honda SP 125, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    specs: { displacementCc: 123.94 },
    publishedSpecs: [
      { label: "Displacement", value: "123.94 cc" },
      { label: "Headlamp", value: "LED, DC" },
      { label: "Fuel Tank Capacity", value: "11 L" },
    ],
  },
  {
    slug: "unicorn",
    name: "Honda Unicorn 160",
    category: "motorcycle",
    image: {
      src: "/models/unicorn.jpg",
      alt: "Honda Unicorn 160, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    specs: { displacementCc: 162.71 },
    publishedSpecs: [
      { label: "Displacement", value: "162.71 cc" },
      { label: "Headlamp", value: "LED" },
    ],
  },
  {
    slug: "hornet-2-0",
    name: "Honda Hornet 2.0",
    category: "motorcycle",
    image: {
      src: "/models/hornet-2-0.jpg",
      alt: "Honda Hornet 2.0, side profile",
      width: 1200,
      height: 630,
      source: "honda",
    },
    publishedSpecs: [
      { label: "Battery", value: "12 V, 5.0 Ah" },
      { label: "Fuel Tank Capacity", value: "12 L" },
      { label: "Headlamp", value: "LED" },
      { label: "Max Net Torque", value: "15.7 Nm @ 6000 rpm" },
    ],
  },
];

/* ---- queries ------------------------------------------------------ */

export function getModels(): Model[] {
  return MODELS;
}

export function getModelsByCategory(category: Category): Model[] {
  return MODELS.filter((m) => m.category === category);
}

export function getModel(slug: string): Model | undefined {
  return MODELS.find((m) => m.slug === slug);
}

/**
 * Curated by the dealership via the `featured` flag. Falls back to the first
 * few models so the homepage still has product before curation happens.
 */
export function getFeaturedModels(limit = 6): Model[] {
  const curated = MODELS.filter((m) => m.featured);
  return (curated.length > 0 ? curated : MODELS).slice(0, limit);
}

/** The single model used in the homepage hero, if one is available. */
export function getHeroModel(): Model | undefined {
  return getFeaturedModels(1)[0];
}

/**
 * Related models: same category, price-adjacent where prices exist, never
 * cross-category — a scooter buyer is not shopping motorcycles.
 */
export function getRelatedModels(model: Model, limit = 3): Model[] {
  const sameCategory = MODELS.filter(
    (m) => m.category === model.category && m.slug !== model.slug,
  );

  const price = model.startingPrice?.amount;
  if (price === undefined) return sameCategory.slice(0, limit);

  return [...sameCategory]
    .sort((a, b) => {
      const da = a.startingPrice ? Math.abs(a.startingPrice.amount - price) : Infinity;
      const db = b.startingPrice ? Math.abs(b.startingPrice.amount - price) : Infinity;
      return da - db;
    })
    .slice(0, limit);
}

export const hasModels = MODELS.length > 0;
