import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Home, Briefcase, Map, TrendingUp, Settings, Lightbulb, Ruler } from "lucide-react";
import { services } from "@/lib/data/services";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "P-KOT Real Estate and Developers offers comprehensive real estate services — from development and project management to investment advisory and property consultancy.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Home,
  Briefcase,
  Map,
  TrendingUp,
  Settings,
  Lightbulb,
  Ruler,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0f2d1e] min-h-[60vh] flex items-end pb-20 overflow-hidden" aria-label="Services hero">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
            alt="Real estate services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0f2d1e]/75" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-40">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">What We Offer</p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05]">
            Our
            <br />
            <em className="text-[#c9a84c] not-italic">Services</em>
          </h1>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[#f8f5ee] py-24 lg:py-36" aria-labelledby="services-heading">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <h2 id="services-heading" className="font-serif text-4xl font-light text-[#1a3d2b] mb-4">
              Comprehensive real estate expertise.
            </h2>
            <p className="text-base text-[#6b6b5a] font-light leading-relaxed">
              From land acquisition through design, development and delivery, our integrated services cover every stage of the real estate journey. We bring together expertise, experience and passion to create developments of lasting value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a3d2b]/10">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Building2;
              return (
                <article
                  key={service.id}
                  className="group bg-[#f8f5ee] p-10 hover:bg-[#1a3d2b] transition-colors duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] flex-shrink-0 group-hover:bg-[#c9a84c]/10 transition-colors duration-300">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.25em] text-[#c9a84c] opacity-60 mb-2 block">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-serif text-2xl font-light text-[#1a3d2b] group-hover:text-[#f8f5ee] mb-3 transition-colors duration-500">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#6b6b5a] group-hover:text-[#e8d5a3]/70 font-light leading-relaxed mb-4 transition-colors duration-500">
                        {service.description}
                      </p>
                      <ul className="space-y-1">
                        {service.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-xs text-[#6b6b5a] group-hover:text-[#e8d5a3]/60 font-light transition-colors duration-500">
                            <span className="text-[#c9a84c] mt-0.5" aria-hidden="true">—</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to start your project?"
        subheading="Talk to our team about how P-KOT can help you realise your real estate ambitions."
        primaryCTA={{ label: "Get in Touch", href: "/contact" }}
        secondaryCTA={{ label: "View Projects", href: "/projects" }}
      />
    </>
  );
}
