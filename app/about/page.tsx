import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTASection from "@/components/sections/CTASection";
import { stats } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about P-KOT Real Estate and Developers — our history, vision, mission and commitment to building better tomorrows.",
};

const values = [
  { title: "Quality", text: "We never compromise on materials, workmanship or design. Every detail matters." },
  { title: "Integrity", text: "Honest, transparent and accountable in every interaction and transaction." },
  { title: "Innovation", text: "Embracing progressive design and construction practices for superior results." },
  { title: "Excellence", text: "Setting the benchmark in every project, every community, every delivery." },
  { title: "Trust", text: "Built over years of keeping promises, honouring commitments and delivering results." },
  { title: "Vision", text: "Developing with the long-term in mind — for our clients, our communities and the future." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0f2d1e] min-h-[60vh] flex items-end pb-20 overflow-hidden" aria-label="About hero">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Architectural design studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0f2d1e]/75" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-40">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">About P-KOT</p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05]">
            Building with
            <br />
            <em className="text-[#c9a84c] not-italic">purpose &amp; pride.</em>
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-[#f8f5ee] py-24 lg:py-36" aria-labelledby="about-intro-heading">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Who We Are</p>
              <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
              <h2 id="about-intro-heading" className="font-serif text-4xl md:text-5xl font-light text-[#1a3d2b] mb-6 leading-tight">
                A legacy of excellence in real estate development.
              </h2>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed mb-5">
                P-KOT Real Estate and Developers was founded with a singular conviction — that every home, office and community should be built to the highest possible standard. We believe that great real estate is not just about construction; it is about creating environments where people thrive. [REPLACE WITH ACTUAL COMPANY HISTORY]
              </p>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed mb-5">
                Over the years, we have grown from a passionate idea into a respected developer, delivering landmark projects across residential, commercial and mixed-use categories. Our portfolio reflects our commitment to design excellence, engineering quality and customer satisfaction. [REPLACE WITH ACTUAL COMPANY STORY]
              </p>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed">
                Today, P-KOT stands as a name synonymous with trust, quality and innovation in real estate. We continue to build not just structures, but communities — and not just for today, but for better tomorrows.
              </p>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden" style={{ height: '500px' }}>
                <Image
                  src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=80"
                  alt="P-KOT Real Estate development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border border-[#c9a84c]/30 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a3d2b] py-20" aria-label="Company statistics">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#c9a84c]/10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#1a3d2b] text-center py-12 px-6">
                <p className="font-serif text-5xl font-light text-[#c9a84c] leading-none mb-2">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-xs tracking-[0.3em] text-[#f8f5ee] uppercase mb-1">{stat.label}</p>
                <p className="text-xs text-[#e8d5a3]/60 font-light">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#f8f5ee] py-24 lg:py-36">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="border-t-2 border-[#c9a84c] pt-8">
              <h3 className="font-serif text-2xl font-light text-[#1a3d2b] mb-4">Our Vision</h3>
              <p className="text-sm text-[#6b6b5a] font-light leading-relaxed">
                To be the most trusted and respected real estate developer in our markets, recognised for architectural excellence, development integrity and the lasting communities we create. [REPLACE WITH ACTUAL VISION STATEMENT]
              </p>
            </div>
            <div className="border-t-2 border-[#c9a84c] pt-8">
              <h3 className="font-serif text-2xl font-light text-[#1a3d2b] mb-4">Our Mission</h3>
              <p className="text-sm text-[#6b6b5a] font-light leading-relaxed">
                To develop premium real estate that enhances the quality of life for our residents, delivers value for our investors, and contributes positively to the communities where we build. [REPLACE WITH ACTUAL MISSION STATEMENT]
              </p>
            </div>
            <div className="border-t-2 border-[#c9a84c] pt-8">
              <h3 className="font-serif text-2xl font-light text-[#1a3d2b] mb-4">Our Philosophy</h3>
              <p className="text-sm text-[#6b6b5a] font-light leading-relaxed">
                Every brick we lay, every space we design and every community we build is guided by a simple philosophy: build it better. Better for today. Better for tomorrow. [REPLACE WITH ACTUAL PHILOSOPHY]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#1a3d2b] py-24 lg:py-36">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Core Values</p>
            <div className="w-10 h-px bg-[#c9a84c] mb-5 mx-auto" aria-hidden="true" />
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#f8f5ee]">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="border border-[#c9a84c]/20 p-8 hover:border-[#c9a84c]/60 transition-colors duration-500">
                <h3 className="font-serif text-2xl font-light text-[#c9a84c] mb-4">{v.title}</h3>
                <p className="text-sm text-[#e8d5a3]/70 font-light leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Ready to explore our developments?"
        subheading="Discover our portfolio of premium projects or speak to our expert team about your property requirements."
        primaryCTA={{ label: "View Projects", href: "/projects" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
