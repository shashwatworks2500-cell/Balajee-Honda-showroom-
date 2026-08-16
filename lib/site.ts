import type { CategoryDefinition, ImageAsset } from "./types";

/**
 * Every piece of business information on this site lives here.
 *
 * Components never hardcode a phone number, an address, an opening time or a
 * service. Change a value in this file and it changes everywhere it appears.
 */

/* ---- identity ----------------------------------------------------- */

export const BUSINESS_NAME = "Balajee Honda";
export const BUSINESS_DESCRIPTOR = "Authorised Honda Motorcycle & Scooter Dealer";
export const BUSINESS_SHORT = "Honda two-wheelers · Hardoi";

export const BRAND_LOGO: ImageAsset = {
  src: "/brand/balajee-honda-logo-trimmed.png",
  alt: "Balajee Honda",
  width: 872,
  height: 661,
  source: "dealership",
};

/* ---- location ----------------------------------------------------- */

export const ADDRESS = {
  plot: "106-106/3, Line Purwa",
  street: "Station Road",
  locality: "Avas Vikas Colony",
  city: "Hardoi",
  state: "Uttar Pradesh",
  postalCode: "241001",
  countryCode: "IN",
} as const;

export const ADDRESS_LINES: string[] = [
  `${ADDRESS.plot}`,
  `${ADDRESS.street}, ${ADDRESS.locality}`,
  `${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.postalCode}`,
];

export const ADDRESS_ONE_LINE = `${ADDRESS.plot}, ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.postalCode}`;

/** How people actually navigate here — often better than the pincode. */
export const LANDMARKS: string[] = [
  "Opposite Police Lines",
  "Near State Bank of India (Main Branch), Railway Ganj",
];

/* ---- contact ------------------------------------------------------ */

export const CONTACT = {
  phoneDisplay: "+91 95541 13333",
  phoneHref: "tel:+919554113333",
  phoneE164: "+919554113333",
  email: "balaji.autopointhdi@gmail.com",
} as const;

/** Maps search on the verified address. No coordinates are invented. */
export const MAP_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${BUSINESS_NAME}, ${ADDRESS_ONE_LINE}`,
)}`;

/**
 * Embeddable map for the same address.
 *
 * Points straight at /maps/embed rather than the friendlier /maps?q=…&output=embed
 * form. That form answers with a 301 carrying `X-Frame-Options: SAMEORIGIN`,
 * and browsers enforce that header on every hop of a redirect chain — so the
 * frame is refused at the redirect, before reaching the destination, which
 * itself sets no such header and frames fine. Going direct also saves a
 * round trip.
 *
 * `pb` is Google's embed parameter: !1m3!2m1!1s<query> is a place lookup and
 * !6i16 is the zoom level. Google resolves the address itself, so no API key
 * is needed and no coordinates are invented here. Swap in a place-ID embed
 * later if you want the pin on the exact shopfront.
 */
const MAP_QUERY = encodeURIComponent(`${BUSINESS_NAME}, ${ADDRESS_ONE_LINE}`)
  .replace(/%20/g, "+")
  .replace(/%2C/g, ",")
  .replace(/%2F/g, "/");

export const MAP_EMBED = `https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${MAP_QUERY}!6i16`;

/* ---- hours -------------------------------------------------------- */

export const HOURS = {
  summary: "Open every day",
  time: "9:00 AM – 9:00 PM",
  /** Machine form for structured data. */
  opens: "09:00",
  closes: "21:00",
} as const;

/* ---- reputation --------------------------------------------------- */

/** Attributed, not claimed as our own metric. */
export const RATING = {
  value: "4.3–4.4",
  scale: "5",
  source: "Justdial",
} as const;

/* ---- what the dealership does ------------------------------------- */

export interface Service {
  id: string;
  title: string;
  body: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    id: "sales",
    title: "New Honda sales",
    body: "The current Honda motorcycle and scooter range, on the floor at Station Road.",
    points: ["Scooters and motorcycles", "Test rides before you buy", "Booking at the counter"],
  },
  {
    id: "finance",
    title: "Finance",
    body: "In-house loan processing with multiple partner banks, handled at the showroom.",
    points: ["Instant approval options", "Low down-payment options", "Paperwork done here"],
  },
  {
    id: "exchange",
    title: "Exchange",
    body: "Bring your old two-wheeler in. Its valuation goes straight against your new Honda.",
    points: ["Valuation at the showroom", "Applied to the new purchase"],
  },
  {
    id: "insurance",
    title: "Insurance",
    body: "New vehicle enrolment and annual renewal, without a second trip anywhere.",
    points: ["New vehicle enrolment", "Annual renewal"],
  },
  {
    id: "service",
    title: "Service & repairs",
    body: "Expert repair and service for Honda two-wheelers, by the people who sell them.",
    points: ["Periodic service", "Repairs", "Honda-trained staff"],
  },
  {
    id: "parts",
    title: "Genuine parts & accessories",
    body: "Official Honda parts and accessories over the counter.",
    points: ["Honda genuine spares", "Helmets", "Crash guards", "Seat covers"],
  },
];

/** Stated plainly so nobody makes a wasted trip. */
export const NOT_OFFERED = ["Driving classes", "Vehicle customisation"];

export const PAYMENT_METHODS = [
  "Cash",
  "UPI / QR",
  "Debit card",
  "Credit card",
  "Online bank transfer",
];

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
    blurb: "Geared two-wheelers, from commuter models upward.",
  },
];

/** Shown with the lineup: the range is Honda's, the stock is a phone call away. */
export const AVAILABILITY_NOTE =
  "Models shown are from Honda's current range. Call the showroom to confirm what is on the floor today.";
