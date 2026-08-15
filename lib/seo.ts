import type { Metadata } from "next";
import {
  ADDRESS,
  ADDRESS_ONE_LINE,
  BUSINESS_NAME,
  CONTACT,
  LANDMARKS,
  OPENING_HOURS,
  has,
} from "./site";
import type { Model } from "./types";

export const CITY = ADDRESS.city;

/**
 * Title pattern from the blueprint: page name, then the business.
 * The homepage carries the full descriptor; every other page is suffixed.
 */
export function pageTitle(title: string): string {
  return `${title} | ${BUSINESS_NAME}`;
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  /** Set false on pages that should not be indexed. */
  index?: boolean;
}): Metadata {
  const { title, description, path, index = true } = input;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BUSINESS_NAME,
      locale: "en_IN",
      type: "website",
    },
  };
}

/** Model page title. Only mentions price when a verified price exists. */
export function modelMetadata(model: Model): Metadata {
  const hasPrice = Boolean(model.startingPrice);
  const title = hasPrice
    ? pageTitle(`${model.name} in ${CITY} — Price & Specifications`)
    : pageTitle(`${model.name} in ${CITY}`);

  const specBits: string[] = [];
  if (model.specs?.displacementCc) specBits.push(`${model.specs.displacementCc} cc`);
  if (model.specs?.mileageKmpl) specBits.push(`${model.specs.mileageKmpl} km/l`);

  const description =
    specBits.length > 0
      ? `${model.name} at ${BUSINESS_NAME}, ${CITY}. ${specBits.join(", ")}. Book a test ride.`
      : `${model.name} at ${BUSINESS_NAME}, ${CITY}. Book a test ride at our Station Road showroom.`;

  return buildMetadata({ title, description, path: `/models/${model.slug}` });
}

/* ---------------------------------------------------------------- */
/* Structured data — only ever emits verified fields                 */
/* ---------------------------------------------------------------- */

type JsonLd = Record<string, unknown>;

/**
 * schema.org MotorcycleDealer. Optional properties are added only when the
 * underlying value is verified, so the payload never asserts a phone number,
 * coordinates or opening hours we do not have.
 */
export function dealerSchema(siteUrl?: string): JsonLd {
  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    name: BUSINESS_NAME,
    description: `Honda two-wheeler showroom in ${CITY}, ${ADDRESS.state}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS.street}, ${ADDRESS.locality}`,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.countryCode,
    },
    areaServed: { "@type": "City", name: CITY },
  };

  if (siteUrl) schema.url = siteUrl;
  if (LANDMARKS.length > 0) {
    schema.publicAccess = true;
    schema.location = {
      "@type": "Place",
      name: `${BUSINESS_NAME}, ${ADDRESS_ONE_LINE}`,
      description: LANDMARKS.join(". "),
    };
  }
  if (has.phone) schema.telephone = CONTACT.phone;
  if (has.email) schema.email = CONTACT.email;
  if (has.map) schema.hasMap = CONTACT.mapUrl;
  if (has.geo && CONTACT.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    };
  }
  if (has.hours) {
    schema.openingHoursSpecification = OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][h.day],
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return schema;
}

/**
 * Product schema for a model. Emits `offers` only with a verified price —
 * a Product without an offer is valid, a Product with a guessed price is not.
 */
export function modelSchema(model: Model): JsonLd {
  const schema: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Motorcycle",
    name: model.name,
    brand: { "@type": "Brand", name: "Honda" },
    image: model.image.src,
    seller: { "@type": "MotorcycleDealer", name: BUSINESS_NAME },
  };

  if (model.positioningLine) schema.description = model.positioningLine;
  if (model.specs?.displacementCc) {
    schema.vehicleEngine = {
      "@type": "EngineSpecification",
      engineDisplacement: {
        "@type": "QuantitativeValue",
        value: model.specs.displacementCc,
        unitCode: "CMQ",
      },
    };
  }
  if (model.specs?.fuelCapacityL) {
    schema.fuelCapacity = {
      "@type": "QuantitativeValue",
      value: model.specs.fuelCapacityL,
      unitCode: "LTR",
    };
  }
  if (model.startingPrice) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "INR",
      price: model.startingPrice.amount,
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
}
