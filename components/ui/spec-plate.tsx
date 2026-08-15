import { cn } from "@/lib/utils";

/**
 * The spec plate — the signature device of Design System V0.2.
 *
 * Drawn from the stamped chassis plate on a two-wheeler's frame neck: hairline
 * border, corner rivets, mono tabular values, left-aligned labels. Used for
 * specifications, price breakdowns, addresses and service information.
 */
export function SpecPlate({
  slug,
  children,
  className,
  accent,
  onInk = false,
}: {
  /** Mono label naming the data group. Omit for an unlabelled plate. */
  slug?: string;
  children: React.ReactNode;
  className?: string;
  /** Left edge marks which path this data belongs to. */
  accent?: "buy" | "own";
  onInk?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative border p-6",
        onInk ? "border-on-ink/25 bg-ink-2" : "border-rule bg-plate",
        accent === "buy" && "border-l-[3px] border-l-signal",
        accent === "own" && "border-l-[3px] border-l-workshop",
        className,
      )}
    >
      {/* Rivets. Decorative, so hidden from assistive technology. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-2 top-2 size-[3px] rounded-full",
          onInk ? "bg-on-ink/40" : "bg-rule",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute right-2 top-2 size-[3px] rounded-full",
          onInk ? "bg-on-ink/40" : "bg-rule",
        )}
      />
      {slug ? (
        <span className={cn("t-slug mb-4 block", onInk && "text-on-ink-2")}>{slug}</span>
      ) : null}
      {children}
    </div>
  );
}

/** Definition list inside a plate. Rows are separated by hairlines. */
export function PlateRows({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <dl className={cn("grid", className)}>{children}</dl>;
}

export function PlateRow({
  label,
  value,
  note,
  onInk = false,
}: {
  label: string;
  value: React.ReactNode;
  /** Secondary text under the value — qualifiers, source notes. */
  note?: string;
  onInk?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-1 border-t py-2 first:border-t-0 sm:grid-cols-[minmax(7rem,11rem)_1fr] sm:items-baseline",
        onInk ? "border-on-ink/15" : "border-rule-2",
      )}
    >
      <dt className={cn("t-slug", onInk && "text-on-ink-2")}>{label}</dt>
      <dd className={cn("t-data m-0 text-[0.9375rem]", onInk ? "text-on-ink" : "text-fg")}>
        {value}
        {note ? (
          <span className={cn("block font-sans text-[0.8125rem]", onInk ? "text-on-ink-2" : "text-fg-3")}>
            {note}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

/**
 * Horizontal spec strip used beneath the hero. Falls back to nothing when no
 * verified values exist — the strip never renders empty cells.
 */
export function SpecStrip({
  items,
  onInk = false,
  className,
}: {
  items: { label: string; value: string }[];
  onInk?: boolean;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl
      className={cn(
        "flex flex-wrap border-t",
        onInk ? "border-on-ink/25" : "border-rule",
        className,
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex-1 basis-[8rem] border-r px-4 py-3 last:border-r-0",
            onInk ? "border-on-ink/15" : "border-rule-2",
          )}
        >
          <dt className={cn("t-slug", onInk && "text-on-ink-2")}>{item.label}</dt>
          <dd
            className={cn(
              "t-data mt-1 text-[0.9375rem] font-medium",
              onInk ? "text-on-ink" : "text-fg",
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
