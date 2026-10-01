"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Shield, Award, Lightbulb, Ruler, Heart, TrendingUp } from "lucide-react";
import SplitReveal from "@/components/motion/SplitReveal";
import TiltCard from "@/components/motion/TiltCard";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pillars = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Every commitment we make is honoured. Transparent dealings, honest communication and ethical business practices form the foundation of who we are.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "From material selection to construction methodology, we uphold the highest standards of quality throughout the development lifecycle.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace progressive design thinking and construction techniques to create developments that are ahead of their time.",
  },
  {
    icon: Ruler,
    title: "Design Excellence",
    description:
      "Architectural beauty meets functional precision in every project. Our designs are both visually compelling and enduringly liveable.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Our clients are partners in the journey. From the first enquiry to handover, we ensure an experience that exceeds expectations.",
  },
  {
    icon: TrendingUp,
    title: "Long-Term Value",
    description:
      "We develop with a long horizon. Our projects are crafted to appreciate in value, contributing lasting worth to their locations and owners.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".pillar").forEach((el, i) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          rotateX: -15,
          transformPerspective: 1000,
          duration: 1.2,
          delay: (i % 2) * 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Columns drift at different speeds for depth (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(".pillar-col-b", {
          y: -80,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.to(".why-orbit", {
        rotate: 360,
        duration: 80,
        repeat: -1,
        ease: "none",
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const colA = pillars.filter((_, i) => i % 2 === 0);
  const colB = pillars.filter((_, i) => i % 2 === 1);

  const renderPillar = (p: (typeof pillars)[number]) => {
    const index = pillars.indexOf(p);
    const Icon = p.icon;
    return (
      <TiltCard key={p.title} className="pillar" max={7}>
        <div className="group relative overflow-hidden border border-[#c9a84c]/15 bg-gradient-to-br from-[#1f4a35]/60 to-[#0f2d1e]/60 p-8 lg:p-10 hover:border-[#c9a84c]/50 transition-colors duration-700">
          {/* Gold fill on hover */}
          <span
            className="absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-[#c9a84c]/15 to-transparent group-hover:h-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between mb-10">
            <div className="w-14 h-14 rounded-full border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#0f2d1e] group-hover:scale-110 transition-all duration-500">
              <Icon size={20} aria-hidden="true" />
            </div>
            <span className="font-serif text-5xl font-light text-outline leading-none" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="relative font-serif text-2xl lg:text-3xl font-light text-[#f8f5ee] mb-4">{p.title}</h3>
          <div className="relative w-8 h-px bg-[#c9a84c]/60 mb-4 group-hover:w-16 transition-all duration-700" aria-hidden="true" />
          <p className="relative text-sm text-[#e8d5a3]/60 font-light leading-relaxed">{p.description}</p>
        </div>
      </TiltCard>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#1a3d2b] py-24 lg:py-40 overflow-hidden"
      aria-labelledby="why-heading"
      data-motion
    >
      {/* Decorative orbit lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="why-orbit absolute -top-60 -left-60 w-[760px] h-[760px] rounded-full border border-dashed border-[#c9a84c]/10" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full border border-[#c9a84c]/[0.07]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Sticky heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
              <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">Our Promise</p>
            </div>
            <SplitReveal
              id="why-heading"
              by="chars"
              lines={["Why Choose", { text: "P-KOT?", className: "italic text-gold-gradient" }]}
              className="font-serif text-5xl md:text-6xl font-light text-[#f8f5ee] leading-[1] mb-8"
            />
            <p className="text-sm md:text-base text-[#e8d5a3]/65 font-light leading-relaxed max-w-sm">
              Six principles guide every decision we make — from the first sketch on paper to the day we hand you the keys.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: 1200 }}>
          <div className="flex flex-col gap-6">{colA.map(renderPillar)}</div>
          <div className="pillar-col-b flex flex-col gap-6 md:mt-24">{colB.map(renderPillar)}</div>
        </div>
      </div>
    </section>
  );
}
