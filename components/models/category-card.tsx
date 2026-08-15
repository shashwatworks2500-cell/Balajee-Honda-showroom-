import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { CategoryDefinition } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Category tile. The audience splits into scooter and motorcycle buyers
 * immediately, so this is the highest-value navigation decision on the
 * homepage and the tile is the CTA.
 *
 * Works with or without imagery: without a verified photograph it falls back
 * to an Ink panel rather than a broken or placeholder image.
 */
export function CategoryCard({
  category,
  count,
  className,
}: {
  category: CategoryDefinition;
  /** Model count, shown only when a lineup exists. */
  count?: number;
  className?: string;
}) {
  const href = `/models/${category.slug}`;
  const hasImage = Boolean(category.image);

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-[16rem] flex-col justify-end overflow-hidden border border-rule transition-colors duration-250 hover:border-ink sm:min-h-[20rem]",
        hasImage ? "bg-ink" : "bg-ink",
        className,
      )}
    >
      {category.image ? (
        <>
          <Image
            src={category.image.src}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-250 ease-[var(--ease-enter)] group-hover:scale-[1.02] motion-reduce:transform-none"
          />
          {/* Scrim for legibility — not a decorative overlay. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent"
          />
        </>
      ) : null}

      <div className="on-ink relative p-6 sm:p-8">
        <span className="t-slug text-on-ink-2">
          {count === undefined ? "Browse" : `${count} ${count === 1 ? "model" : "models"}`}
        </span>
        <h3 className="t-display-l mt-2 text-on-ink">{category.label}</h3>
        <p className="mt-3 max-w-[36ch] text-[0.9375rem] text-on-ink-2">{category.blurb}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-on-ink">
          View {category.label.toLowerCase()}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-250 ease-[var(--ease-enter)] group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </span>
      </div>
    </Link>
  );
}
