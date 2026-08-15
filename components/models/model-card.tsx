import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice, modelKeySpecs, priceQualifierLabel } from "@/lib/format";
import type { Model } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Model card — square corners, hairline border, no shadow or gradient.
 *
 * Degrades honestly: a card with only a name and image must read as complete,
 * so every optional row is omitted rather than filled. The action row anchors
 * to the card bottom so a grid of uneven cards still aligns.
 *
 * The card is not a single wrapping link: it carries two real actions, so the
 * image and title link to details and the actions are their own controls.
 */
export function ModelCard({
  model,
  className,
  priority = false,
}: {
  model: Model;
  className?: string;
  priority?: boolean;
}) {
  const specs = modelKeySpecs(model);
  const href = `/models/${model.slug}`;

  return (
    <article
      className={cn(
        "group flex flex-col border border-rule bg-plate transition-colors duration-250 hover:border-ink",
        className,
      )}
    >
      <Link href={href} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[3/2] overflow-hidden bg-band">
          <Image
            src={model.image.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-250 ease-[var(--ease-enter)] group-hover:scale-[1.02] motion-reduce:transform-none"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="t-h3">
          <Link
            href={href}
            /* Block-level with a 44px minimum so the title is a real target. */
            className="inline-flex min-h-11 items-center transition-colors hover:text-signal"
          >
            {model.name}
          </Link>
        </h3>

        {model.positioningLine ? (
          <p className="mt-2 text-[0.9375rem] text-fg-2">{model.positioningLine}</p>
        ) : null}

        {model.startingPrice ? (
          <p className="mt-4">
            <span className="t-data text-[1.125rem] font-medium text-fg">
              {formatPrice(model.startingPrice)}
            </span>
            <span className="t-caption ml-2">
              {priceQualifierLabel(model.startingPrice)}
            </span>
          </p>
        ) : null}

        {specs.length > 0 ? (
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule-2 pt-4">
            {specs.map((row) => (
              <div key={row.label}>
                <dt className="t-slug">{row.label}</dt>
                <dd className="t-data mt-0.5 text-[0.875rem] text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {model.variants && model.variants.length > 0 ? (
          <p className="t-caption mt-3">
            {model.variants.length} {model.variants.length === 1 ? "variant" : "variants"}
          </p>
        ) : null}

        {/* Actions anchor to the bottom regardless of content height. */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <Button href="/test-ride" size="compact">
            Book a test ride
          </Button>
          <Button href={href} variant="tertiary" size="compact">
            View details
          </Button>
        </div>
      </div>
    </article>
  );
}
