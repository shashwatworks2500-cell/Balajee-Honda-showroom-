import { cn } from "@/lib/utils";

/** Content container. 1280px max, fluid gutter from the V0.2 spacing scale. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-14", className)}>
      {children}
    </div>
  );
}

type Ground = "page" | "band" | "ink";

const grounds: Record<Ground, string> = {
  page: "bg-page text-fg",
  band: "bg-band text-fg",
  /* `on-ink` scopes the focus-ring colour override in globals.css. */
  ink: "on-ink bg-ink text-on-ink",
};

/**
 * Section rhythm: 96px mobile, 160px desktop. Grounds alternate
 * Chrome -> Concrete -> Ink to segment the page without boxes.
 */
export function Section({
  ground = "page",
  className,
  children,
  id,
  compact = false,
  labelledBy,
}: {
  ground?: Ground;
  className?: string;
  children: React.ReactNode;
  id?: string;
  /** Conversion bands use tighter rhythm so they don't become dead screens. */
  compact?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        grounds[ground],
        compact ? "py-16 lg:py-24" : "py-24 lg:py-40",
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * Section head: hairline top rule with a mono slug, matching the spec-plate
 * language. The slug names the content group — it is not decoration.
 */
export function SectionHead({
  slug,
  title,
  intro,
  id,
  onInk = false,
  className,
}: {
  slug: string;
  title: string;
  intro?: string;
  id?: string;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 lg:mb-14", className)}>
      <div
        className={cn(
          "flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-baseline sm:gap-6",
          onInk ? "border-on-ink/25" : "border-rule",
        )}
      >
        <span className={cn("t-slug shrink-0", onInk && "text-on-ink-2")}>{slug}</span>
        <h2 id={id} className={cn("t-h2 flex-1", onInk && "text-on-ink")}>
          {title}
        </h2>
      </div>
      {intro ? (
        <p className={cn("measure mt-5 text-[1.0625rem]", onInk ? "text-on-ink-2" : "text-fg-2")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

/** Uppercase mono eyebrow used above headings in bands and hero. */
export function Eyebrow({
  children,
  onInk = false,
  className,
}: {
  children: React.ReactNode;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("t-slug block", onInk && "text-on-ink-2", className)}>{children}</span>
  );
}
