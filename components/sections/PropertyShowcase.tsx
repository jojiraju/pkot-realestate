import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "@/lib/data/properties";
import PropertyCard from "@/components/ui/PropertyCard";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";

export default function PropertyShowcase() {
  const properties = getFeaturedProperties();

  return (
    <section
      className="relative bg-[#f3efe5] py-24 lg:py-40"
      data-motion
      aria-labelledby="property-showcase-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
              <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">Properties</p>
            </div>
            <SplitReveal
              id="property-showcase-heading"
              lines={["Available", { text: "Residences", className: "italic text-[#a8891f]" }]}
              className="font-serif text-5xl md:text-6xl font-light text-[#1a3d2b] leading-[1.02]"
            />
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] text-[#1a3d2b] border-b border-[#1a3d2b]/30 pb-1 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 uppercase"
          >
            View All <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>

        {/* Property grid */}
        <Reveal stagger={0.12} y={80} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </Reveal>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8">
          <Link
            href="/properties"
            className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#1a3d2b] border-b border-[#1a3d2b]/30 pb-1 w-fit uppercase"
          >
            View All Properties <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
