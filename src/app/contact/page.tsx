import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ContactForm } from "@/components/sections/ContactForm";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Brandable. Share your project or question—we'll respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <SectionWrapper className="pt-16">
      <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
        {CONTACT.title}
      </h1>
      <p className="mt-4 text-muted">{CONTACT.subhead}</p>
      <div className="mt-10 max-w-xl">
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
