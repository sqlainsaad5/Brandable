"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT } from "@/lib/constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Message is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  }

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-white/10 bg-surface/50 p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="font-medium text-foreground">{CONTACT.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Input
        label="Name"
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        error={errors.name}
        autoComplete="name"
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        error={errors.email}
        autoComplete="email"
      />
      <Textarea
        label="Message"
        placeholder="Tell us about your project..."
        value={form.message}
        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
        error={errors.message}
      />
      <Button type="submit" variant="primary" size="default">
        Send message
      </Button>
    </form>
  );
}
