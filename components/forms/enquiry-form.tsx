"use client";

import { useActionState, useId } from "react";
import { CheckCircle2, TriangleAlert } from "lucide-react";

import {
  initialEnquiryState,
  submitEnquiry,
  type EnquiryKind,
} from "@/app/actions";
import { CheckboxField, Field, SelectInput, TextArea, TextInput } from "@/components/forms/fields";
import { Button } from "@/components/ui/button";

/**
 * Enquiry, test-ride and service forms share one implementation — the fields
 * differ, the mechanics do not.
 *
 * Kept to four or five fields: every extra field costs completions, and all we
 * need is enough to call the customer back.
 */
export function EnquiryForm({
  kind,
  modelOptions = [],
  defaultModel,
  submitLabel,
}: {
  kind: EnquiryKind;
  /** Populated only when a verified lineup exists. */
  modelOptions?: { slug: string; name: string }[];
  defaultModel?: string;
  submitLabel: string;
}) {
  const action = submitEnquiry.bind(null, kind);
  const [state, formAction, pending] = useActionState(action, initialEnquiryState);
  const uid = useId();

  const nameId = `${uid}-name`;
  const phoneId = `${uid}-phone`;
  const modelId = `${uid}-model`;
  const dateId = `${uid}-date`;
  const messageId = `${uid}-message`;

  const wantsDate = kind === "test-ride" || kind === "service";
  const isService = kind === "service";

  if (state.status === "success") {
    return (
      <div className="border border-workshop bg-plate p-6" role="status">
        <CheckCircle2 aria-hidden="true" className="size-6 text-workshop" />
        <h3 className="t-h3 mt-3">
          {isService ? "Service request sent" : "Enquiry sent"}
        </h3>
        <p className="measure mt-2 text-fg-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-5">
      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="flex items-start gap-3 border border-signal bg-plate p-4 text-[0.9375rem]"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
          <p className="text-fg">{state.message}</p>
        </div>
      ) : null}

      <Field id={nameId} label="Your name" required error={state.fieldErrors?.name}>
        <TextInput
          id={nameId}
          name="name"
          autoComplete="name"
          required
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          aria-describedby={state.fieldErrors?.name ? `${nameId}-error` : undefined}
        />
      </Field>

      <Field
        id={phoneId}
        label="Mobile number"
        required
        hint="We call back on this number."
        error={state.fieldErrors?.phone}
      >
        <TextInput
          id={phoneId}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={14}
          required
          aria-invalid={state.fieldErrors?.phone ? true : undefined}
          aria-describedby={
            state.fieldErrors?.phone ? `${phoneId}-error` : `${phoneId}-hint`
          }
        />
      </Field>

      {modelOptions.length > 0 ? (
        <Field id={modelId} label={isService ? "Your two-wheeler" : "Model you're interested in"}>
          <SelectInput id={modelId} name="model" defaultValue={defaultModel ?? ""}>
            <option value="">Not sure yet</option>
            {modelOptions.map((option) => (
              <option key={option.slug} value={option.name}>
                {option.name}
              </option>
            ))}
          </SelectInput>
        </Field>
      ) : (
        <Field
          id={modelId}
          label={isService ? "Your two-wheeler" : "Model you're interested in"}
        >
          <TextInput
            id={modelId}
            name="model"
            defaultValue={defaultModel}
            placeholder={isService ? "Which Honda do you ride?" : "Leave blank if you're not sure"}
          />
        </Field>
      )}

      {wantsDate ? (
        <Field
          id={dateId}
          label="Preferred date"
          error={state.fieldErrors?.preferredDate}
        >
          <TextInput
            id={dateId}
            name="preferredDate"
            type="date"
            aria-invalid={state.fieldErrors?.preferredDate ? true : undefined}
            aria-describedby={
              state.fieldErrors?.preferredDate ? `${dateId}-error` : undefined
            }
          />
        </Field>
      ) : null}

      {kind === "enquiry" ? (
        <CheckboxField
          id={`${uid}-exchange`}
          name="exchange"
          label="I have a two-wheeler to exchange"
        />
      ) : null}

      <Field id={messageId} label={isService ? "What needs looking at?" : "Anything else?"}>
        <TextArea id={messageId} name="message" rows={3} />
      </Field>

      <Button
        type="submit"
        disabled={pending}
        variant={isService ? "service" : "primary"}
        size="block"
        className="sm:w-auto"
      >
        {pending ? "Sending…" : submitLabel}
      </Button>

      <p className="t-caption">
        We use your number only to respond to this {isService ? "request" : "enquiry"}.
      </p>
    </form>
  );
}
