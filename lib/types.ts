/**
 * Domain types for Balajee Honda.
 *
 * Everything a manufacturer or the dealership owns is optional. The site is
 * built to render honestly from a partial dataset: a field with no verified
 * value is absent from the type instance, and the UI omits the row, the block,
 * or the whole section rather than showing a placeholder to a visitor.
 */

export type Category = "scooter" | "motorcycle";

/** Categories are data, so a future one needs no new route logic. */
export interface CategoryDefinition {
  id: Category;
  /** URL segment under /models. */
  slug: string;
  /** Plural label used in navigation and headings. */
  label: string;
  /** Singular label used in running copy. */
  labelSingular: string;
  /** Short factual description of the category. Never a sales claim. */
  blurb: string;
  /** Representative image. Category tile does not render without one. */
  image?: ImageAsset;
}

export interface ImageAsset {
  src: string;
  /** Descriptive alt naming model, variant and colour where applicable. */
  alt: string;
  width: number;
  height: number;
  /** Who supplied the image, so provenance survives into the codebase. */
  source: "honda" | "dealership";
}

/**
 * A price with its qualifier attached. The qualifier is never inferred —
 * an ex-showroom figure shown as on-road is a compliance problem.
 */
export interface Price {
  /** Whole rupees. */
  amount: number;
  qualifier: "ex-showroom" | "on-road";
  /** Where the figure came from, e.g. "Balajee Honda, Jan 2026". */
  sourceNote: string;
}

export interface Emi {
  amountPerMonth: number;
  /** Full terms behind the figure. Required — an EMI without terms cannot ship. */
  terms: string;
}

/** Two-wheeler specifications. Every field optional; omit rather than guess. */
export interface Specifications {
  displacementCc?: number;
  mileageKmpl?: number;
  transmission?: string;
  kerbWeightKg?: number;
  seatHeightMm?: number;
  fuelCapacityL?: number;
  maxPowerPs?: number;
  maxTorqueNm?: number;
  brakesFront?: string;
  brakesRear?: string;
  startType?: string;
}

export interface Variant {
  name: string;
  price?: Price;
  /** What distinguishes this variant. Honda's wording, not ours. */
  note?: string;
}

export interface Colour {
  /** Official colour name exactly as published. */
  name: string;
  /** Only set when supplied officially — never sampled from a photograph. */
  hex?: string;
  image?: ImageAsset;
}

export interface Model {
  slug: string;
  name: string;
  category: Category;
  /** Required: a model without an image does not list and does not get a page. */
  image: ImageAsset;
  /** One factual line. No superlatives. */
  positioningLine?: string;
  startingPrice?: Price;
  emiFrom?: Emi;
  specs?: Specifications;
  variants?: Variant[];
  colours?: Colour[];
  /** Honda's published feature list, reproduced not paraphrased. */
  features?: string[];
  gallery?: ImageAsset[];
  /** Curated onto the homepage by the dealership. */
  featured?: boolean;
}

/* ---------------------------------------------------------------- */
/* Business data                                                     */
/* ---------------------------------------------------------------- */

export interface PostalAddress {
  street: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface OpeningHours {
  /** 0 = Sunday, matching Date#getDay. */
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** 24h "HH:MM". */
  opens: string;
  closes: string;
}

export interface ContactChannels {
  /** National 10-digit number as supplied by the dealership. Null until verified. */
  phone: string | null;
  /** Same number in E.164, used for structured data. */
  phoneE164: string | null;
  /** E.164 digits for wa.me. Null until a business number is verified. */
  whatsapp: string | null;
  email: string | null;
  /** Supplied map URL. Never constructed from guessed coordinates. */
  mapUrl: string | null;
  /** Supplied coordinates, used only for structured data. */
  geo: { latitude: number; longitude: number } | null;
}

/** A service the workshop offers. Only ever populated by the dealership. */
export interface ServiceOffering {
  title: string;
  description: string;
}

export interface DealershipProfile {
  /** Year established, if the dealership confirms it. */
  establishedYear: number | null;
  /** Factual points about the premises. Never generic trust claims. */
  highlights: string[];
  exteriorImage?: ImageAsset;
  interiorImage?: ImageAsset;
  workshopImage?: ImageAsset;
}
