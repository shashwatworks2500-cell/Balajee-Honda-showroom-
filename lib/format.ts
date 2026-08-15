import type { Price, Specifications } from "./types";

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

/** The two or three specs shown on a card. Order reflects buyer priority. */
export function keySpecRows(specs: Specifications | undefined, limit = 3): SpecRow[] {
  if (!specs) return [];

  const rows: SpecRow[] = [];
  if (specs.displacementCc) rows.push({ label: "Engine", value: `${specs.displacementCc} cc` });
  if (specs.mileageKmpl) rows.push({ label: "Mileage", value: `${specs.mileageKmpl} km/l` });
  if (specs.kerbWeightKg) rows.push({ label: "Weight", value: `${specs.kerbWeightKg} kg` });
  if (specs.seatHeightMm) rows.push({ label: "Seat", value: `${specs.seatHeightMm} mm` });

  return rows.slice(0, limit);
}

/** "9:30 am" from "09:30". Used only for verified opening hours. */
export function formatTime(value: string): string {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${period}` : `${hour}:${String(m).padStart(2, "0")} ${period}`;
}
