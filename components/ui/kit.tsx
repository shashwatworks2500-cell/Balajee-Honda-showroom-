import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { BRAND_LOGO } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[82rem] px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-24 lg:py-36", className)}
    >
      {children}
    </section>
  );
}

/** Mono index label. The number encodes position in a real sequence. */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("t-slug flex items-center gap-3", className)}>
      {index ? (
        <>
          <span className="text-signal">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-hair" />
        </>
      ) : null}
      {children}
    </p>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  id,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 id={id} className="t-h2 mt-6 text-bright">
        {title}
      </h2>
      {intro ? <p className="measure mt-5 text-[1.0625rem] text-mute">{intro}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const button = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden",
    "rounded-[4px] border font-sans text-[0.9375rem] font-semibold leading-none",
    "cursor-pointer select-none no-underline",
    "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-out-expo)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /* The buy-side action. Red fill, subtle lift on hover. */
        primary: "border-transparent bg-signal text-white hover:bg-signal-deep",
        /* Sits on photography without fighting it. */
        ghost: "border-hair bg-white/[0.03] text-bright hover:border-bright/60 hover:bg-white/[0.07]",
        /* Quiet third option. */
        text: "border-transparent bg-transparent px-1 text-bright hover:text-signal",
      },
      size: {
        default: "min-h-12 px-6",
        compact: "min-h-11 px-5 text-[0.875rem]",
        block: "min-h-12 w-full px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type Base = VariantProps<typeof button> & { className?: string; children: React.ReactNode };

type AsLink = Base & { href: string; external?: boolean } & Omit<
    React.ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type AsButton = Base & { href?: undefined } & Omit<
    React.ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = AsLink | AsButton;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, children, ...rest } = props;
    const classes = cn(button({ variant, size }), className);

    /* tel:, mailto: and map links leave the app, so they skip the router. */
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, ...rest } = props;
  return (
    <button className={cn(button({ variant, size }), className)} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

/**
 * The supplied Balajee Honda artwork, used exactly as provided: object-contain
 * so the aspect ratio holds, no filters, no recolouring.
 */
export function Logo({
  height = 40,
  className,
  plate = true,
}: {
  height?: number;
  className?: string;
  /**
   * The supplied lockup sets "BALAJEE" in near-black, so on this dark site it
   * needs the light ground it was drawn for. The artwork is never recoloured —
   * it simply sits on a plate, the way it would on printed collateral.
   */
  plate?: boolean;
}) {
  const width = Math.round((BRAND_LOGO.width / BRAND_LOGO.height) * height);
  const img = (
    <Image
      src={BRAND_LOGO.src}
      alt={BRAND_LOGO.alt}
      width={width}
      height={height}
      priority
      className="w-auto object-contain"
      style={{ height }}
    />
  );

  if (!plate) return <span className={className}>{img}</span>;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[3px] bg-white px-3 py-2",
        className,
      )}
    >
      {img}
    </span>
  );
}
