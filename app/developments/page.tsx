import type { Metadata } from "next";
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Developments",
  description:
    "Explore P-KOT's development journey — from land acquisition through design, construction and delivery.",
};

const stages = [
  {
    number: "01",
    title: "Land Acquisition",
    description:
      "Every great development begins with the right land. We conduct rigorous due diligence — location analysis, legal verification, market assessment and feasibility studies — to identify land with genuine long-term potential.",
    icon: "🌿",
  },
  {
    number: "02",
    title: "Design & Planning",
    description:
      "Our design philosophy merges architectural ambition with practical excellence. Working with leading architects and urban planners, we craft master plans that balance beauty, functionality and sustainability.",
    icon: "✏️",
  },
  {
    number: "03",
    title: "Development",
    description:
      "From regulatory approvals to infrastructure planning, our experienced development team navigates every stage with precision. We coordinate across disciplines to keep projects on time, on budget and on vision.",
    icon: "⚙️",
  },
  {
    number: "04",
    title: "Construction",
    description:
      "We work with trusted construction partners who share our commitment to quality. Regular quality audits, material verification and construction supervision ensure every structure is built to last.",
    icon: "🏗️",
  },
  {
    number: "05",
    title: "Quality & Finishing",
    description:
      "The details matter. From the finishes on a wall to the fixtures in a kitchen, we obsess over quality at every level. Rigorous quality checks are conducted before any property is prepared for handover.",
    icon: "✨",
  },
  {
    number: "06",
    title: "Delivery",
    description:
      "Handover is the culmination of our promise. We ensure every home, every office, every community is delivered on time, in pristine condition, with full documentation — and with the care our clients deserve.",
    icon: "🏠",
  },
];

export default function DevelopmentsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-[#0f2d1e] min-h-[60vh] flex items-end pb-20 overflow-hidden"
        aria-label="Developments hero"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Construction and development"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0f2d1e]/80" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-40">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">
            How We Build
          </p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05]">
            The Development
            <br />
            <em className="text-[#c9a84c] not-italic">Journey</em>
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-[#f8f5ee] py-24 lg:py-36">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-20">
            <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">
              Our Process
            </p>
            <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a3d2b] mb-6 leading-tight">
              From vision to reality —<br />every step, done right.
            </h2>
            <p className="text-base text-[#6b6b5a] font-light leading-relaxed">
              At P-KOT, development is not just about construction. It is a
              disciplined, thoughtful process that begins long before the first
              brick is laid and continues long after the last key is handed
              over. Here is how we bring our developments to life.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px bg-[#c9a84c]/20 hidden md:block"
              aria-hidden="true"
            />

            <div className="space-y-0" role="list" aria-label="Development stages">
              {stages.map((stage, index) => (
                <div
                  key={stage.number}
                  role="listitem"
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 py-12 ${
                    index < stages.length - 1
                      ? "border-b border-[#1a3d2b]/10"
                      : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute left-5 w-7 h-7 rounded-full border-2 border-[#c9a84c] bg-[#f8f5ee] items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                  </div>

                  {/* Stage number */}
                  <div className="md:pl-20 flex-shrink-0 flex md:block items-center gap-4">
                    <span
                      className="font-serif text-5xl md:text-7xl font-light text-[#1a3d2b]/10 leading-none"
                      aria-hidden="true"
                    >
                      {stage.number}
                    </span>
                    <span className="md:hidden text-2xl">{stage.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:pt-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-[#1a3d2b] mb-4">
                      {stage.title}
                    </h3>
                    <p className="text-base text-[#6b6b5a] font-light leading-relaxed max-w-2xl">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy section */}
      <section className="bg-[#1a3d2b] py-24 lg:py-36">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">
                Philosophy
              </p>
              <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#f8f5ee] mb-6 leading-tight">
                Built with purpose. Delivered with pride.
              </h2>
              <p className="text-base text-[#e8d5a3]/70 font-light leading-relaxed mb-5">
                Our development philosophy is guided by a deep sense of
                responsibility — to the land we develop, the communities we
                create and the families and businesses that call our spaces
                home. We build not for today alone, but for generations.
              </p>
              <p className="text-base text-[#e8d5a3]/70 font-light leading-relaxed">
                Every decision we make in the development process is filtered
                through the lens of long-term value, sustainability and
                excellence. This is what it means to truly build better
                tomorrows.
              </p>
            </div>
            <div className="relative overflow-hidden" style={{ height: "460px" }}>
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
                alt="Architectural development"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#1a3d2b]/20" />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Explore our current developments."
        subheading="Discover projects across residential, commercial and mixed-use categories — all built to the P-KOT standard of excellence."
        primaryCTA={{ label: "View Projects", href: "/projects" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
