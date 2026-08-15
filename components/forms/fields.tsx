import { cn } from "@/lib/utils";

/**
 * Form primitives.
 *
 * Every input has a real <label> tied by id. Errors sit adjacent to the field,
 * are announced, and say what to fix — they never apologise or stay vague.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label htmlFor={id} className="t-label text-fg-2">
        {label}
        {required ? (
          <span className="ml-1 text-signal" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 normal-case tracking-normal text-fg-3">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="t-caption">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-[0.875rem] font-medium text-signal">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const control =
  "w-full rounded-[2px] border border-rule bg-plate px-3 py-3 text-[1rem] text-fg " +
  "placeholder:text-fg-3 transition-colors focus:border-ink " +
  "aria-[invalid=true]:border-signal";

export function TextInput({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return <input className={cn(control, "min-h-12", className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(control, "min-h-28 resize-y", className)} {...props} />;
}

export function SelectInput({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(control, "min-h-12 appearance-none", className)} {...props}>
      {children}
    </select>
  );
}

export function CheckboxField({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="mt-1 size-5 shrink-0 rounded-[2px] border border-rule accent-signal"
      />
      <label htmlFor={id} className="text-[0.9375rem] text-fg-2">
        {label}
      </label>
    </div>
  );
}
