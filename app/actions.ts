"use server";

/**
 * Enquiry handling.
 *
 * The site does not pretend to accept enquiries it cannot deliver. Submission
 * is only possible when ENQUIRY_WEBHOOK_URL is configured; without a
 * destination a submitted enquiry would be silently lost, which is worse for a
 * customer than being told to visit instead.
 *
 * Pages check `enquiryDeliveryConfigured()` and render the visit-instead panel
 * when it returns false, so this path is unreachable in that state — the guard
 * here is defence in depth.
 */

export type EnquiryKind = "enquiry" | "test-ride" | "service";

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "phone" | "preferredDate", string>>;
}

export const initialEnquiryState: EnquiryState = { status: "idle" };

/** Indian mobile numbers: 10 digits starting 6-9, optionally +91 prefixed. */
function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

export async function submitEnquiry(
  kind: EnquiryKind,
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;

  const name = String(formData.get("name") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const model = String(formData.get("model") ?? "").trim();
  const preferredDate = String(formData.get("preferredDate") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const exchange = formData.get("exchange") === "on";

  const fieldErrors: NonNullable<EnquiryState["fieldErrors"]> = {};

  if (name.length < 2) {
    fieldErrors.name = "Enter your name so we know who to call back.";
  }

  const phone = normalisePhone(phoneRaw);
  if (!phone) {
    fieldErrors.phone = "Enter a 10-digit mobile number.";
  }

  if (preferredDate) {
    const chosen = new Date(`${preferredDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosen.getTime())) {
      fieldErrors.preferredDate = "Choose a valid date.";
    } else if (chosen < today) {
      fieldErrors.preferredDate = "Choose today or a later date.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  if (!endpoint) {
    return {
      status: "error",
      message:
        "Online enquiries are not being accepted yet. Please visit the showroom on Station Road.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        kind,
        name,
        phone,
        model: model || null,
        preferredDate: preferredDate || null,
        message: message || null,
        exchange,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "That did not send. Please try again, or visit the showroom.",
      };
    }
  } catch {
    return {
      status: "error",
      message: "That did not send. Please try again, or visit the showroom.",
    };
  }

  return {
    status: "success",
    message:
      kind === "service"
        ? "Service request sent. Someone from the workshop will call you back."
        : "Enquiry sent. Someone from the showroom will call you back.",
  };
}
