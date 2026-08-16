import type { Model, Price, Specifications } from "./types";

/** Indian digit grouping, whole rupees. */
const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(price: Price): string {
  return rupees.format(price.amount);
}

/** The qualifier always travels with the figure. */
export function priceQualifierLabel(price: Price): string {
  return price.qualifier === "ex-showroom" ? "Ex-showroom" : "On-road";
}

export function formatEmi(amountPerMonth: number): string {
  return `${rupees.format(amountPerMonth)}/month`;
}

export interface SpecRow {
  label: string;
  value: string;
}

/**
 * Full specification rows for a model.
 *
 * Manufacturer-published entries are used as-is — Honda's own label and its own
 * value string, never reworded or converted. Structured `specs` supplied by the
 * dealership are appended after them.
 */
export function modelSpecRows(model: Model): SpecRow[] {
  const published = (model.publishedSpecs ?? []).map((entry) => ({
    label: entry.label,
    value: entry.value,
  }));
  const seen = new Set(published.map((r) => r.label.toLowerCase()));
  const structured = specRows(model.specs).filter(
    (r) => !seen.has(r.label.toLowerCase()),
  );
  return [...published, ...structured];
}

/**
 * Turns a partial specification object into display rows, omitting every
 * field without a verified value. Never emits a blank or an em-dash row.
 */
export function specRows(specs: Specifications | undefined): SpecRow[] {
  if (!specs) return [];

  const rows: SpecRow[] = [];
  const push = (label: string, value: string | undefined) => {
    if (value !== undefined) rows.push({ label, value });
  };

  push("Engine", specs.displacementCc ? `${specs.displacementCc} cc` : undefined);
  push("Mileage", specs.mileageKmpl ? `${specs.mileageKmpl} km/l` : undefined);
  push("Transmission", specs.transmission);
  push("Max power", specs.maxPowerPs ? `${specs.maxPowerPs} PS` : undefined);
  push("Max torque", specs.maxTorqueNm ? `${specs.maxTorqueNm} Nm` : undefined);
  push("Kerb weight", specs.kerbWeightKg ? `${specs.kerbWeightKg} kg` : undefined);
  push("Seat height", specs.seatHeightMm ? `${specs.seatHeightMm} mm` : undefined);
  push("Fuel capacity", specs.fuelCapacityL ? `${specs.fuelCapacityL} L` : undefined);
  push("Front brake", specs.brakesFront);
  push("Rear brake", specs.brakesRear);
  push("Starting", specs.startType);

  return rows;
}

/**
 * What a buyer actually compares, most decisive first.
 *
 * Honda publishes its full specification table in its own order, which opens
 * with physical dimensions — true, but nobody chooses a commuter on its width.
 * This ranks the labels for the card; anything unlisted keeps Honda's order
 * behind them. Labels are matched, never rewritten.
 */
const CARD_SPEC_PRIORITY = [
  "displacement",
  "max net power",
  "max engine output",
  "max net torque",
  "mileage",
  "live mileage",
  "kerb weight",
  "fuel tank capacity",
  "starting method",
  "no. of gears",
];

/**
 * The two or three specs shown on a card and in the hero strip.
 * Published values win, so a card never shows a number we derived.
 */
export function modelKeySpecs(model: Model, limit = 3): SpecRow[] {
  const rank = (row: SpecRow) => {
    const i = CARD_SPEC_PRIORITY.indexOf(row.label.toLowerCase());
    return i === -1 ? CARD_SPEC_PRIORITY.length : i;
  };
  // Stable: equal ranks keep the manufacturer's published order.
  return modelSpecRows(model)
    .map((row, i) => ({ row, i }))
    .sort((a, b) => rank(a.row) - rank(b.row) || a.i - b.i)
    .slice(0, limit)
    .map((e) => e.row);
}

/** "9:30 am" from "09:30". Used only for verified opening hours. */
export function formatTime(value: string): string {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}
