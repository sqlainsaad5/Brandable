export const SITE = {
  name: "BRANDABLE",
  logo: "/images/logo.png",
  tagline: "Make your brand unforgettable.",
  description:
    "Brandable helps you build a distinctive, memorable brand that stands out. From strategy to identity to guidelines—we bring your vision to life.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const CTAs = {
  primary: "Get started",
  contact: "Let's talk",
  learnMore: "Learn more",
} as const;

export const HERO = {
  headline: "Make your brand unforgettable.",
  subhead:
    "We craft distinctive identities and strategies that help you stand out—so your audience remembers you.",
  cta: "Get started",
  ctaHref: "/contact",
} as const;

export const FEATURES = [
  {
    title: "Brand strategy",
    description:
      "Clarify your position, audience, and story so every touchpoint feels intentional.",
    icon: "compass",
  },
  {
    title: "Identity design",
    description:
      "Logo, palette, typography, and visual language that capture who you are.",
    icon: "palette",
  },
  {
    title: "Brand experience",
    description:
      "From digital to print, we ensure your brand feels consistent and premium.",
    icon: "layers",
  },
  {
    title: "Guidelines",
    description:
      "Clear rules and assets so your team can scale your brand without losing quality.",
    icon: "book-open",
  },
] as const;

export const PROCESS_STEPS = [
  { step: 1, title: "Discover", description: "We learn your goals, audience, and market." },
  { step: 2, title: "Define", description: "Strategy and creative direction come together." },
  { step: 3, title: "Design", description: "Identity and assets are crafted and refined." },
  { step: 4, title: "Deliver", description: "Guidelines, files, and support for launch." },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Brandable gave us more than a logo—they gave us a clear story and a system we can grow with.",
    author: "Alex Chen",
    role: "Founder, Studio A",
  },
  {
    quote:
      "Professional, thoughtful, and fast. Our new identity has already opened doors with clients.",
    author: "Jordan Lee",
    role: "CEO, Northbound",
  },
  {
    quote:
      "Finally, a partner who gets both strategy and design. The guidelines alone were worth it.",
    author: "Sam Rivera",
    role: "Marketing Director",
  },
] as const;

export const TRUSTED_BY = ["Studio A", "Northbound", "Lumina", "Pivot"] as const;

export const CTA_SECTION = {
  headline: "Ready to build a brand that lasts?",
  subhead: "Tell us about your project and we'll get back within 24 hours.",
  cta: "Get started",
  ctaHref: "/contact",
} as const;

export const ABOUT = {
  title: "About Brandable",
  mission:
    "We believe every business has a story worth telling. Our job is to turn that story into a brand that looks, feels, and sounds unmistakably like you—so you can focus on what you do best.",
  values: [
    { title: "Clarity", description: "No jargon, no fluff. We make the complex simple." },
    { title: "Craft", description: "Every detail matters. We sweat the small stuff." },
    { title: "Partnership", description: "We work with you, not for you. Your input shapes everything." },
  ],
} as const;

export const OWNERS = [
  {
    name: "Javed Anwer",
    role: "CEO",
    bio: "Driving vision and strategy for BRANDABLE.",
    image: "/images/team/javed-anwer.png",
  },
  {
    name: "Amjad Javed Saqlain",
    role: "Co-Founder",
    bio: "Leading product and growth at BRANDABLE.",
    image: "/images/team/amjad-javed-saqlain.png",
  },
] as const;

export const SERVICES_LIST = [
  {
    title: "Brand strategy",
    description:
      "Positioning, messaging, and narrative so your brand has a clear, compelling story.",
  },
  {
    title: "Visual identity",
    description:
      "Logo, color system, typography, and visual language tailored to your brand.",
  },
  {
    title: "Brand guidelines",
    description:
      "Documented rules and assets so your team and partners stay on brand.",
  },
  {
    title: "Ongoing support",
    description:
      "Refinements, extensions, and advice as your brand evolves.",
  },
] as const;

export const CONTACT = {
  title: "Get in touch",
  subhead: "Share your project or question. We'll respond within 24 hours.",
  successMessage: "Thanks for reaching out. We'll get back to you soon.",
} as const;
