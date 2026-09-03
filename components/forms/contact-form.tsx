"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry, type ContactState } from "@/app/contact/actions";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/icons";

const initialState: ContactState = { status: "idle" };

const needs = [
  "Managed IT services",
  "Cyber security",
  "Cloud & data centre",
  "Enterprise networking",
  "IT infrastructure",
  "Microsoft 365 & workplace",
  "Not sure yet",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group/s inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--scene-fg)] px-6 text-sm font-medium text-[var(--scene-bg)] transition-colors duration-500 hover:bg-[var(--scene-accent)] disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send it over"}
      <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/s:translate-x-1" />
    </button>
  );
}

const fieldClass =
  "mt-2 w-full border-b border-[var(--scene-line)] bg-transparent pb-3 text-[1.0625rem] " +
  "outline-none transition-colors duration-300 placeholder:text-[var(--scene-fg-muted)]/70 " +
  "focus:border-[var(--scene-accent)]";

export function ContactForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);
  const uid = useId();
  const v = state.values ?? {};

  if (state.status === "sent") {
    return (
      <div role="status" className="border-t border-[var(--scene-line)] pt-10">
        <p className="eyebrow">Received</p>
        <h2 className="display-sm mt-5 max-w-[18ch]">Thank you — that has reached us.</h2>
        <p className="lede mt-6 max-w-[46ch]">
          A real person reads every one of these. You will hear back within one
          working day, and it will be from somebody who has actually read what
          you wrote rather than an automated sequence.
        </p>
        <p className="mt-8 text-sm text-[var(--scene-fg-muted)]">
          If it is urgent, call the office nearest you — the numbers are at the
          bottom of this page.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="relative border-t border-[var(--scene-line)] pt-10">
      {/* Delivery or validation problems, announced to assistive technology. */}
      {(state.status === "unconfigured" || (state.status === "error" && state.message)) && (
        <p
          role="alert"
          className="mb-10 border-l-2 border-[var(--scene-accent)] pl-5 text-[0.9375rem] leading-relaxed"
        >
          {state.message}{" "}
          <a href={`mailto:${site.email}`} className="link-underline font-medium">
            {site.email}
          </a>
        </p>
      )}

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="eyebrow">
            Your name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby={state.errors?.name ? `${uid}-name-error` : undefined}
            className={fieldClass}
          />
          {state.errors?.name && (
            <p id={`${uid}-name-error`} className="mt-2 text-[0.8125rem] text-[var(--scene-accent)]">
              {state.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-email`} className="eyebrow">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? `${uid}-email-error` : undefined}
            className={fieldClass}
          />
          {state.errors?.email && (
            <p id={`${uid}-email-error`} className="mt-2 text-[0.8125rem] text-[var(--scene-accent)]">
              {state.errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${uid}-company`} className="eyebrow">
            Company <span className="normal-case">(optional)</span>
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={v.company}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={`${uid}-need`} className="eyebrow">
            What is this about?
          </label>
          <select
            id={`${uid}-need`}
            name="need"
            defaultValue={v.need || needs[needs.length - 1]}
            className={`${fieldClass} appearance-none`}
          >
            {needs.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${uid}-message`} className="eyebrow">
            What is not working?
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            defaultValue={v.message}
            placeholder="The more specific you are, the more useful our first reply will be."
            aria-invalid={state.errors?.message ? true : undefined}
            aria-describedby={state.errors?.message ? `${uid}-message-error` : undefined}
            className={`${fieldClass} resize-y`}
          />
          {state.errors?.message && (
            <p
              id={`${uid}-message-error`}
              className="mt-2 text-[0.8125rem] text-[var(--scene-accent)]"
            >
              {state.errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot. Hidden from sight, from the keyboard and from screen readers;
          only an automated submitter will ever fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <SubmitButton />
        <p className="text-[0.8125rem] text-[var(--scene-fg-muted)]">
          Or email{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-[var(--scene-fg)]">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
