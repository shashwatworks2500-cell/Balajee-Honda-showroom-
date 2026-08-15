import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button system from Design System V0.2.
 *
 * Geometry is identical across variants; only meaning changes. Signal Red is
 * the buy-side action, Workshop teal the owner-side one. 48px minimum height,
 * 4px radius, no gradients, no shadows.
 */
const button = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-[4px] border font-sans",
    "text-[0.9375rem] font-semibold leading-none",
    "cursor-pointer no-underline select-none",
    "transition-colors duration-150 ease-[var(--ease-enter)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /** Buy-side. The dominant conversion action for its viewport. */
        primary: "border-transparent bg-signal text-white hover:bg-signal-ink",
        /** Neutral. Inverts on hover so it stays legible over photography. */
        secondary: "border-ink bg-transparent text-ink hover:bg-ink hover:text-chrome",
        /** Neutral on dark grounds. */
        secondaryOnInk:
          "border-on-ink/60 bg-transparent text-on-ink hover:bg-on-ink hover:text-ink",
        /** Owner-side: service, parts, warranty. */
        service: "border-transparent bg-workshop text-white hover:bg-workshop-ink",
        /** A link that admits it is a link. */
        tertiary: [
          "border-transparent bg-transparent px-1 text-ink",
          "underline decoration-signal decoration-2 underline-offset-4",
          "hover:text-signal",
        ],
      },
      size: {
        /** Conversion-critical actions. */
        default: "min-h-12 px-6",
        /** Dense toolbars and card actions. Still above the 44px floor. */
        compact: "min-h-11 px-4 text-[0.875rem]",
        /** Mobile primary actions. */
        block: "min-h-12 w-full px-6",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonBaseProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  /** Set for tel:, wa.me and map links, which leave the app. */
  external?: boolean;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, children, ...rest } = props;
    const classes = cn(button({ variant, size }), className);

    /* tel:, wa.me and map links leave the app, so they bypass the router. */
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

export { button as buttonVariants };
