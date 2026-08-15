import type {
  CategoryDefinition,
  ContactChannels,
  DealershipProfile,
  OpeningHours,
  PostalAddress,
  ServiceOffering,
} from "./types";

/**
 * Verified business data for Balajee Honda.
 *
 * ONLY the name, address and landmarks below are verified. Every other field
 * is null or empty and MUST stay that way until the dealership supplies the
 * real value. Filling any of these with a plausible guess would put wrong
 * information in front of customers — a wrong phone number sends them to a
 * stranger, wrong hours send them to a closed showroom.
 *
 * When a value arrives, set it here. Every consuming section is already
 * conditional and will appear on its own.
 */

/* ---- verified ---------------------------------------------------- */

export const BUSINESS_NAME = "Balajee Honda";

/** What the business sells. Not a claim about dealer authorisation status. */
export const BUSINESS_DESCRIPTOR = "Honda two-wheelers";

export const ADDRESS: PostalAddress = {
  street: "Station Road",
  locality: "Avas Vikas Colony",
  city: "Hardoi",
  state: "Uttar Pradesh",
  postalCode: "241001",
  countryCode: "IN",
};

/**
 * Landmarks carry equal weight to the postal address. In a district town they
 * are how people actually navigate — often more useful than the pincode.
 */
export const LANDMARKS: string[] = [
  "Opposite Police Lines",
  "Near State Bank of India (Main Branch), Railway Ganj",
];

export const ADDRESS_LINES: string[] = [
  ADDRESS.street,
  ADDRESS.locality,
  `${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.postalCode}`,
];

/* ---- awaiting verification --------------------------------------- */

export const CONTACT: ContactChannels = {
  phone: null, // [REQUIRES VERIFIED CONTENT]
  whatsapp: null, // [REQUIRES VERIFIED CONTENT]
  email: null, // [REQUIRES VERIFIED CONTENT]
  mapUrl: null, // [REQUIRES VERIFIED CONTENT] — supplied URL only
  geo: null, // [REQUIRES VERIFIED CONTENT]
};

/** Empty until the dealership confirms opening hours. */
export const OPENING_HOURS: OpeningHours[] = []; // [REQUIRES VERIFIED CONTENT]

/** Empty until the dealership describes its premises in its own words. */
export const PROFILE: DealershipProfile = {
  establishedYear: null, // [REQUIRES VERIFIED CONTENT]
  highlights: [], // [REQUIRES VERIFIED CONTENT]
};

/** Empty until the dealership confirms which services it offers. */
export const SERVICES: ServiceOffering[] = []; // [REQUIRES VERIFIED CONTENT]

/** Honda's warranty wording, reproduced verbatim. Never summarised by us. */
export const WARRANTY_TEXT: string | null = null; // [REQUIRES VERIFIED CONTENT]

/** The dealership's own privacy policy text. Required before forms go live. */
export const PRIVACY_POLICY_TEXT: string | null = null; // [REQUIRES VERIFIED CONTENT]

/** Genuine parts statement, in the dealership's words. */
export const GENUINE_PARTS_TEXT: string | null = null; // [REQUIRES VERIFIED CONTENT]

/** What a test ride involves here — booking needed, what to bring. */
export const TEST_RIDE_NOTE: string | null = null; // [REQUIRES VERIFIED CONTENT]

/* ---- categories --------------------------------------------------- */

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: "scooter",
    slug: "scooters",
    label: "Scooters",
    labelSingular: "Scooter",
    blurb: "Automatic two-wheelers for everyday and family use.",
  },
  {
    id: "motorcycle",
    slug: "motorcycles",
    label: "Motorcycles",
    labelSingular: "Motorcycle",
    blurb: "Geared two-wheelers, from commuter models to larger engines.",
  },
];

export function getCategory(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/* ---- derived availability flags ----------------------------------- */
/* Sections read these instead of testing raw fields, so the intent is
   readable at the call site and a single field change lights up the UI. */

export const has = {
  phone: CONTACT.phone !== null,
  whatsapp: CONTACT.whatsapp !== null,
  email: CONTACT.email !== null,
  map: CONTACT.mapUrl !== null,
  geo: CONTACT.geo !== null,
  hours: OPENING_HOURS.length > 0,
  profileHighlights: PROFILE.highlights.length > 0,
  premisesImage: Boolean(PROFILE.exteriorImage ?? PROFILE.interiorImage),
  workshopImage: Boolean(PROFILE.workshopImage),
  services: SERVICES.length > 0,
  warranty: WARRANTY_TEXT !== null,
  genuineParts: GENUINE_PARTS_TEXT !== null,
  privacyPolicy: PRIVACY_POLICY_TEXT !== null,
  testRideNote: TEST_RIDE_NOTE !== null,
} as const;

/** True when any contact channel can actually be actioned by a visitor. */
export const hasAnyContactChannel = has.phone || has.whatsapp || has.email;

/**
 * Whether submitted enquiries have somewhere to go.
 *
 * Server-only — reads the environment at request time. Forms are not shown to
 * visitors until this is true, because an enquiry submitted into nothing is a
 * lost customer who believes they have been contacted.
 */
export function enquiryDeliveryConfigured(): boolean {
  return Boolean(process.env.ENQUIRY_WEBHOOK_URL);
}

/* ---- formatting helpers ------------------------------------------- */

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** Display form of a phone number. Returns null when unverified. */
export function phoneHref(): string | null {
  return CONTACT.phone ? `tel:${CONTACT.phone}` : null;
}

export function whatsappHref(): string | null {
  return CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : null;
}

/** Single-line address, used in metadata and structured data. */
export const ADDRESS_ONE_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.postalCode}`;
