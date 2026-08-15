import Image from "next/image";

import { BRAND_LOGO, BUSINESS_DESCRIPTOR, BUSINESS_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The Balajee Honda brand lockup.
 *
 * When the supplied logo file is present in `public/brand/` and registered as
 * BRAND_LOGO in lib/site.ts, it renders as-is — no recolouring, no filters, no
 * effects, and `object-contain` so it is never distorted.
 *
 * Until the file is committed, this falls back to a typographic lockup rather
 * than a broken image or an approximation of the artwork. The supplied mark is
 * the dealership's own and must not be redrawn.
 */
export function Logo({
  className,
  height = 40,
  showDescriptor = true,
  descriptorHidden = false,
  onInk = false,
}: {
  className?: string;
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  showDescriptor?: boolean;
  /** Visually hides the descriptor while keeping it for assistive tech. */
  descriptorHidden?: boolean;
  onInk?: boolean;
}) {
  if (BRAND_LOGO) {
    const width = Math.round((BRAND_LOGO.width / BRAND_LOGO.height) * height);
    return (
      <Image
        src={BRAND_LOGO.src}
        alt={BRAND_LOGO.alt}
        width={width}
        height={height}
        priority
        className={cn("h-auto w-auto object-contain", className)}
        style={{ height, width: "auto" }}
      />
    );
  }

  return (
    <span className={cn("flex flex-col justify-center leading-none", className)}>
      <span
        className={cn(
          "t-h3 text-[1.125rem] leading-none tracking-tight",
          onInk && "text-on-ink",
        )}
      >
        {BUSINESS_NAME}
      </span>
      {showDescriptor ? (
        <span
          className={cn(
            "t-slug mt-1 text-[0.625rem]",
            onInk && "text-on-ink-2",
            descriptorHidden && "sr-only",
          )}
        >
          {BUSINESS_DESCRIPTOR}
        </span>
      ) : null}
    </span>
  );
}
