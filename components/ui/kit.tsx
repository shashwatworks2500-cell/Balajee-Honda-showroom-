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
  ref,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
  ref?: React.Ref<HTMLElement>;
}) {
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        /* Anchor jumps must clear the fixed header — 64px condensed on a
           phone, 72px above that — or the eyebrow lands underneath it. */
        "relative scroll-mt-20 py-16 sm:scroll-mt-24 sm:py-24 lg:py-36",
        className,
      )}
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
    "group/btn relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden",
    "rounded-[4px] border font-sans text-[0.9375rem] font-semibold leading-none",
    "cursor-pointer select-none no-underline",
    "transition-[border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)]",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /* Buy-side. A deeper red wipes across on hover and the lamp glow lifts. */
        primary: [
          "border-transparent bg-signal text-white",
          "hover:shadow-[0_0_0_1px_rgba(224,25,51,0.5),0_10px_36px_-12px_rgba(224,25,51,0.85)]",
        ],
        /* Sits on photography without fighting it. */
        ghost: [
          "border-hair bg-white/[0.03] text-bright",
          "hover:border-bright/50",
        ],
        /* Quiet third option: the rule draws itself in. */
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

/** The wipe that runs under the label on hover. */
function Sweep({ variant }: { variant?: "primary" | "ghost" | "text" | null }) {
  if (variant === "text") {
    return (
      <span
        aria-hidden="true"
        className="absolute inset-x-1 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-400 ease-[var(--ease-out-expo)] group-hover/btn:scale-x-100 motion-reduce:transition-none"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-400 ease-[var(--ease-out-expo)]",
        "group-hover/btn:scale-x-100 motion-reduce:transition-none",
        variant === "ghost" ? "bg-white/[0.09]" : "bg-signal-deep",
      )}
    />
  );
}

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
          <Sweep variant={variant} />
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        <Sweep variant={variant} />
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, ...rest } = props;
  return (
    <button className={cn(button({ variant, size }), className)} {...rest}>
      <Sweep variant={variant} />
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
