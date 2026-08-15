/**
 * Navigation model.
 *
 * Buy and own are separated at the top level: an owner booking a service should
 * never wade through model marketing to reach it.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Which customer path this belongs to, used for colour treatment. */
  path: "buy" | "own" | "neutral";
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "Scooters", href: "/models/scooters", path: "buy" },
  { label: "Motorcycles", href: "/models/motorcycles", path: "buy" },
  { label: "Service", href: "/service", path: "own" },
  { label: "Visit us", href: "/contact", path: "neutral" },
];

export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Two-wheelers",
    items: [
      { label: "All models", href: "/models", path: "buy" },
      { label: "Scooters", href: "/models/scooters", path: "buy" },
      { label: "Motorcycles", href: "/models/motorcycles", path: "buy" },
      { label: "Book a test ride", href: "/test-ride", path: "buy" },
    ],
  },
  {
    heading: "Owners",
    items: [
      { label: "Service", href: "/service", path: "own" },
      { label: "Genuine parts", href: "/service#genuine-parts", path: "own" },
      { label: "Book a service", href: "/service#book", path: "own" },
    ],
  },
  {
    heading: "Showroom",
    items: [
      { label: "Visit us", href: "/contact", path: "neutral" },
      { label: "Privacy", href: "/privacy", path: "neutral" },
    ],
  },
];
