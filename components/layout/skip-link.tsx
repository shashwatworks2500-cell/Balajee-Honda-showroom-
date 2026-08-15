/** First focusable element in the DOM, per the accessibility floor in V0.2. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only inline-flex min-h-11 items-center rounded-[4px] bg-ink px-4 text-sm font-semibold text-on-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
    >
      Skip to main content
    </a>
  );
}
