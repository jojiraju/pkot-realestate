import type { Testimonial, Stat } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "P-KOT delivered our home with an attention to detail and quality that exceeded every expectation. The entire journey — from enquiry to handover — was seamless, transparent and professional.",
    name: "[CLIENT NAME]",
    role: "[Designation / Profession]",
    project: "Emerald Heights",
    image: undefined,
  },
  {
    id: "2",
    quote:
      "What sets P-KOT apart is their integrity. Every commitment they made was honoured on time. Our villa is everything we dreamed of and more. I would recommend them without hesitation.",
    name: "[CLIENT NAME]",
    role: "[Designation / Profession]",
    project: "Golden Villas",
    image: undefined,
  },
  {
    id: "3",
    quote:
      "As an investor, I was looking for a developer I could trust with long-term vision. P-KOT's approach to development, quality standards and market positioning gave me complete confidence.",
    name: "[CLIENT NAME]",
    role: "[Designation / Profession]",
    project: "Commercial Investment",
    image: undefined,
  },
  {
    id: "4",
    quote:
      "The craftsmanship and architectural quality of our apartment is exceptional. P-KOT has created a genuine community here, not just a building. We feel at home in every sense of the word.",
    name: "[CLIENT NAME]",
    role: "[Designation / Profession]",
    project: "Parkview Residences",
    image: undefined,
  },
];

// NOTE: Replace [ACTUAL VALUES] with real company statistics before launch
export const stats: Stat[] = [
  {
    value: "10",
    suffix: "+",
    label: "Years",
    description: "Of Excellence in Real Estate",
  },
  {
    value: "50",
    suffix: "+",
    label: "Projects",
    description: "Completed & Ongoing",
  },
  {
    value: "1000",
    suffix: "+",
    label: "Happy Clients",
    description: "Families & Investors",
  },
  {
    value: "5",
    suffix: "M+",
    label: "Sq. Ft.",
    description: "Developed & Delivered",
  },
];
