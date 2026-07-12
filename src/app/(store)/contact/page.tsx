import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ContactForm } from "@/components/sections/ContactForm";
import { CONTACT } from "@/lib/constants";
import { defaultOgImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact BRANDABLE for order help, sizing questions, or wholesale enquiries. Fast replies for our women's western wear store in Pakistan.",
  openGraph: {
    title: "Contact Us | BRANDABLE",
    description:
      "Get in touch with BRANDABLE for support, sizing help, or product questions about women's western wear.",
    images: defaultOgImages,
  },
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
