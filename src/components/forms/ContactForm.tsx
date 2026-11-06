"use client";

import Image from "next/image";
import { useState } from "react";
import { interestOptions, type Interest } from "@/data/content";
import { validateContact, type FieldErrors } from "@/lib/contact";
import { img } from "@/lib/design";

const fieldClass =
  "block w-full border-b-2 bg-transparent pb-[14px] text-[20px] leading-[20px] tracking-[-0.03em] text-forest placeholder:text-forest focus:border-sage focus:outline-none";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="mt-2 block text-[14px] leading-[1.3] text-[#a3412f]">
      {message}
    </span>
  );
}

export function ContactForm({ defaultInterest }: { defaultInterest?: Interest }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const check = validateContact(values);
    setErrors(check.errors);
    if (!check.ok) {
      setStatus({ state: "idle" });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  const border = (field: keyof FieldErrors) => (errors[field] ? "border-[#a3412f]" : "border-white");
  const describedBy = (field: keyof FieldErrors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative rounded-[8px] border border-white bg-paper px-6 pt-[49px] pb-[46px] text-forest sm:pr-[51px] sm:pl-[53px]"
    >
      <h3 className="text-[clamp(32px,3.44vw,66px)] leading-[1.15] tracking-[-1.12px] sm:whitespace-nowrap">
        <span className="block font-medium">Have a Question</span>
        <span className="block font-light">Get In Touch</span>
      </h3>

      {status.state === "sent" ? (
        <div role="status" className="mt-[49px] flex min-h-[380px] flex-col items-start justify-center gap-6">
          <span className="flex size-[64px] items-center justify-center rounded-full bg-sage text-[30px] text-white">✓</span>
          <p className="max-w-[460px] text-[24px] leading-[1.3] tracking-[-0.02em]">
            Thank you! Your message is on its way. Our team will get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus({ state: "idle" })}
            className="text-[16px] underline underline-offset-4 hover:text-sage"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          {/* Honeypot, hidden from people and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="mt-[49px] flex flex-col gap-[49px]">
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                required
                aria-invalid={!!errors.name}
                aria-describedby={describedBy("name")}
                className={`${fieldClass} ${border("name")}`}
              />
              <FieldError id="name-error" message={errors.name} />
            </label>
            <label className="block">
              <span className="sr-only">Company Email</span>
              <input
                type="email"
                name="email"
                placeholder="Company Email"
                autoComplete="email"
                required
                aria-invalid={!!errors.email}
                aria-describedby={describedBy("email")}
                className={`${fieldClass} ${border("email")}`}
              />
              <FieldError id="email-error" message={errors.email} />
            </label>
            <label className="relative block">
              <span className="sr-only">Area of Interest</span>
              <select
                name="interest"
                defaultValue={defaultInterest ?? ""}
                required
                aria-invalid={!!errors.interest}
                aria-describedby={describedBy("interest")}
                className={`${fieldClass} ${border("interest")} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Area of Interest
                </option>
                {interestOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <Image
                src={img("chevron-down.svg")}
                alt=""
                width={21}
                height={12}
                className="pointer-events-none absolute top-[3px] right-[13px] h-[12px] w-[21px]"
              />
              <FieldError id="interest-error" message={errors.interest} />
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea
                name="message"
                rows={3}
                placeholder="Briefly tell us what you’re looking for."
                required
                aria-invalid={!!errors.message}
                aria-describedby={describedBy("message")}
                className={`${fieldClass} ${border("message")} h-[110px] resize-none`}
              />
              <FieldError id="message-error" message={errors.message} />
            </label>
          </div>

          {status.state === "error" && (
            <p role="alert" className="mt-6 rounded-[6px] bg-[#a3412f]/10 px-4 py-3 text-[15px] text-[#a3412f]">
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={status.state === "sending"}
            className="mt-[37px] h-[51px] min-w-[146px] rounded-[6px] bg-sage px-6 font-[Helvetica,Arial,sans-serif] text-[20px] leading-[20px] text-white capitalize transition-colors hover:bg-forest disabled:cursor-wait disabled:opacity-70"
          >
            {status.state === "sending" ? "sending…" : "submit"}
          </button>
        </>
      )}
    </form>
  );
}
