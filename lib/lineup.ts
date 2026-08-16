import { MODELS } from "./models";
import type { Model } from "./types";

/**
 * Structure for the lineup.
 *
 * Thirteen cards in one flat grid gives a buyer nothing to hold on to — the
 * scooter they came for looks identical to the machine they will never buy.
 * Grouping by engine size is the way people actually shop a commuter range,
 * and it is derived from Honda's own published displacement rather than from
 * anything we decided about the models.
 *
 * This lives outside models.ts because that file is generated: re-running the
 * scraper must not take the structure with it.
 */

/**
 * Honda publishes displacement as "109.51 cc". Parsed here for sorting and
 * grouping only — wherever a figure is shown, the published string is
 * rendered exactly as Honda wrote it.
 */
export function displacementCc(model: Model): number | undefined {
  const row = model.publishedSpecs?.find(
    (spec) => spec.label.toLowerCase() === "displacement",
  );
  if (!row) return undefined;
  const value = Number.parseFloat(row.value);
  return Number.isFinite(value) ? value : undefined;
}

export interface Tier {
  id: string;
  label: string;
  blurb: string;
  /** Upper bound, exclusive. The last tier leaves this open. */
  under?: number;
}

/**
 * Boundaries sit in the gaps between what Honda actually builds — 98.98,
 * 109.51, 123.9x, 162.71, 184.40 — so no model lands near an edge.
 */
export const TIERS: Tier[] = [
  {
    id: "light",
    label: "Up to 110cc",
    blurb: "The lightest, most frugal end of the range. A first bike, the school run, daily errands.",
    under: 115,
  },
  {
    id: "everyday",
    label: "125cc",
    blurb: "More pull for riding two-up or loaded, still built around running cost.",
    under: 145,
  },
  {
    id: "bigger",
    label: "160cc and above",
    blurb: "The largest engines in the range, for longer daily runs and highway speeds.",
  },
];

export interface TierGroup {
  tier: Tier;
  models: Model[];
}

/** Groups a set of models into tiers, dropping tiers nothing falls into. */
export function groupByTier(models: Model[]): TierGroup[] {
  const groups: TierGroup[] = TIERS.map((tier) => ({ tier, models: [] }));
  const ungrouped: Model[] = [];

  for (const model of models) {
    const cc = displacementCc(model);
    if (cc === undefined) {
      ungrouped.push(model);
      continue;
    }
    const index = TIERS.findIndex((tier) => tier.under === undefined || cc < tier.under);
    groups[index === -1 ? groups.length - 1 : index].models.push(model);
  }

  // A model Honda publishes no displacement for still belongs on the page.
  if (ungrouped.length > 0) {
    groups.push({
      tier: {
        id: "other",
        label: "Also in the range",
        blurb: "Honda publishes no displacement figure for these.",
      },
      models: ungrouped,
    });
  }

  return groups.filter((group) => group.models.length > 0);
}

export interface Showcase {
  model: Model;
  /** Why this machine is the one enlarged. Always something checkable. */
  note: string;
}

/**
 * The one model given a full-width slot.
 *
 * The dealership decides by setting `featured` on a model. Nothing is flagged
 * yet, so this falls back to the largest engine in the range — a fact off
 * Honda's own spec sheet, not a claim about what sells or what is in stock.
 */
export function getShowcase(): Showcase | undefined {
  const flagged = MODELS.find((model) => model.featured);
  if (flagged) return { model: flagged, note: "Picked out by the showroom" };

  let biggest: Model | undefined;
  let biggestCc = -1;
  for (const model of MODELS) {
    const cc = displacementCc(model);
    if (cc !== undefined && cc > biggestCc) {
      biggest = model;
      biggestCc = cc;
    }
  }
  return biggest ? { model: biggest, note: "Largest engine in the range" } : undefined;
}
