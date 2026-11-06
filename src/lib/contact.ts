import { interestOptions, type Interest } from "@/data/content";

export type ContactPayload = {
  name: string;
  email: string;
  interest: Interest;
  message: string;
  /** Honeypot: real visitors never fill this in. */
  company_website?: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "interest" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validation shared by the form (instant feedback) and the API route (the real check). */
export function validateContact(input: Partial<Record<keyof ContactPayload, unknown>>) {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data = {
    name: str(input.name),
    email: str(input.email),
    interest: str(input.interest) as Interest,
    message: str(input.message),
    company_website: str(input.company_website),
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  else if (data.name.length > 100) errors.name = "Name is too long.";
  if (!EMAIL.test(data.email) || data.email.length > 200) errors.email = "Please enter a valid email address.";
  if (!interestOptions.some((o) => o.value === data.interest)) errors.interest = "Please choose an area of interest.";
  if (data.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (data.message.length > 5000) errors.message = "Message is too long (5,000 characters max).";

  return { data, errors, ok: Object.keys(errors).length === 0 };
}

export const interestLabel = (value: Interest) =>
  interestOptions.find((o) => o.value === value)?.label ?? value;
