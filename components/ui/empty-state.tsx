import { Button } from "@/components/ui/button";
import { SpecPlate } from "@/components/ui/spec-plate";
import { ADDRESS_LINES, LANDMARKS } from "@/lib/site";

/**
 * Honest empty state.
 *
 * Used where a section's real content has not been supplied yet. It never
 * fabricates stock, prices or availability — it says what is true and routes
 * the visitor to the one thing that is verified: the showroom address.
 */
export function EmptyState({
  slug,
  title,
  body,
  primary,
  className,
}: {
  slug: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  className?: string;
}) {
  return (
    <SpecPlate slug={slug} className={className}>
      <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-12">
        <div>
          <h3 className="t-h3">{title}</h3>
          <p className="measure mt-3 text-fg-2">{body}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {primary ? (
              <Button href={primary.href} size="compact">
                {primary.label}
              </Button>
            ) : null}
            <Button href="/contact" variant="secondary" size="compact">
              Visit the showroom
            </Button>
          </div>
        </div>

        <div className="border-t border-rule-2 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <span className="t-slug">Showroom</span>
          <address className="t-data mt-3 not-italic text-[0.875rem] leading-relaxed text-fg">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="t-data mt-3 text-[0.8125rem] leading-relaxed text-fg-3">
            {LANDMARKS.map((landmark) => (
              <span key={landmark} className="block">
                {landmark}
              </span>
            ))}
          </p>
        </div>
      </div>
    </SpecPlate>
  );
}
