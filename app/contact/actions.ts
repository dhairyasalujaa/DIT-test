"use server";

export type ContactState = {
  status: "idle" | "sent" | "error" | "unconfigured";
  message?: string;
  /** Field-level errors, keyed by input name. */
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back so the form can repopulate after a failed submit. */
  values?: Record<string, string>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles a contact submission.
 *
 * There is no mail provider wired up, and pretending otherwise would mean
 * silently dropping real enquiries — the worst possible failure for this page.
 * So delivery goes to whatever endpoint `CONTACT_WEBHOOK_URL` names (a form
 * service, an automation webhook, an internal API), and if that is not
 * configured the visitor is told plainly and given the email address instead.
 *
 * See README.md for the expected payload.
 */
export async function submitEnquiry(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const values = {
    name: get("name"),
    email: get("email"),
    company: get("company"),
    need: get("need"),
    message: get("message"),
  };

  // Honeypot: a field no human ever sees, so anything in it is a bot. Reported
  // as success so the bot does not learn to work around it.
  if (get("website")) return { status: "sent" };

  const errors: ContactState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!values.email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(values.email)) errors.email = "That does not look like an email address.";
  if (!values.message) errors.message = "Tell us a little about what you need.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    return {
      status: "unconfigured",
      message:
        "This form is not connected to a mailbox yet — please email us directly and we will pick it up straight away:",
      values,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        source: "decodingit.com/contact",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(`Endpoint responded ${response.status}`);
    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message:
        "We could not send that just now. Please email us directly and we will reply the same working day:",
      values,
    };
  }
}
