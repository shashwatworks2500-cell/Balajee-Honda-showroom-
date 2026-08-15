import type { Category, Model } from "./types";

/**
 * The model registry.
 *
 * EMPTY BY DESIGN. No Honda model, specification, price, variant or colour has
 * been verified for this dealership, so nothing is listed. Inventing a lineup
 * would put wrong prices and wrong specifications in front of customers.
 *
 * To publish a model, append an entry below. The minimum threshold is a name,
 * a slug, a category and an image — anything less produces a stub page that
 * harms both the visitor and the site's search standing. Every other field is
 * optional and the UI omits what is absent.
 *
 * Example shape (commented out — do not uncomment until every value here is
 * confirmed against Honda's published data and the dealership's own pricing):
 *
 *   {
 *     slug: "example-model",
 *     name: "Example Model",
 *     category: "scooter",
 *     image: {
 *       src: "/models/example-model.jpg",
 *       alt: "Honda Example Model in Pearl White, side profile",
 *       width: 1600,
 *       height: 900,
 *       source: "honda",
 *     },
 *     startingPrice: {
 *       amount: 000000,
 *       qualifier: "ex-showroom",
 *       sourceNote: "Balajee Honda",
 *     },
 *     specs: { displacementCc: 000, mileageKmpl: 00 },
 *   }
 */
export const MODELS: Model[] = [];

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
 * few models so the homepage still has product once a lineup exists.
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
 * Related models: same category, price-adjacent, never cross-category.
 * A scooter buyer is not shopping motorcycles.
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
