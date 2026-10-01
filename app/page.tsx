import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import PropertyShowcase from "@/components/sections/PropertyShowcase";
import Marquee from "@/components/motion/Marquee";

export const metadata: Metadata = {
  title: "P-KOT Real Estate and Developers | Building Better Tomorrows",
  description:
    "P-KOT Real Estate and Developers — premium residential, commercial and mixed-use developments. Experience architectural excellence and enduring design.",
};

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic hero */}
      <Hero />

      {/* Service ticker */}
      <Marquee
        items={["Residential", "Commercial", "Luxury Villas", "Mixed-Use", "Investment Advisory", "Premium Apartments"]}
        className="bg-[#0b2218] border-y border-[#c9a84c]/15 py-6 lg:py-8"
        itemClassName="font-serif text-3xl md:text-5xl font-light text-[#f8f5ee]/85 italic"
      />

      {/* 2–4. Brand introduction & company vision */}
      <AboutSection />

      {/* 5. Featured projects horizontal gallery */}
      <ProjectsShowcase />

      {/* 6–7. Why P-KOT */}
      <WhyChooseUs />

      {/* 8. Property showcase */}
      <PropertyShowcase />

      {/* Brand ticker */}
      <Marquee
        items={["Building Better Tomorrows", "Quality", "Integrity", "Innovation", "Design Excellence"]}
        reverse
        duration={40}
        className="bg-[#f8f5ee] border-y border-[#1a3d2b]/10 py-8 lg:py-12"
        itemClassName="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-outline-dark"
      />

      {/* 9–10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Strong CTA */}
      <CTASection
        heading="Ready to build your better tomorrow?"
        subheading="Speak with the P-KOT team about your real estate aspirations. We are here to guide, advise and deliver beyond your expectations."
        primaryCTA={{ label: "Explore Projects", href: "/projects" }}
        secondaryCTA={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}
