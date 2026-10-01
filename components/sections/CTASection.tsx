"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CTASectionProps {
  heading?: string;
  subheading?: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  dark?: boolean;
  image?: string;
}

export default function CTASection({
  heading = "Ready to find your perfect property?",
  subheading = "Speak with our expert team about your real estate requirements. We're here to guide you every step of the way.",
  primaryCTA = { label: "Explore Projects", href: "/projects" },
  secondaryCTA = { label: "Contact Us", href: "/contact" },
  dark = true,
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
}: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Frame expands from an inset card to full-bleed as it scrolls into view
      gsap.fromTo(
        frameRef.current,
        { clipPath: "inset(12% 8% 12% 8% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top 20%", scrub: true },
        }
      );
      gsap.fromTo(
        imgRef.current,
        { scale: 1.3, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: sectionRef }
  );

  // Split heading into two lines so the second half can take the accent colour
  const words = heading.split(" ");
  const mid = Math.ceil(words.length / 2);
  const lineA = words.slice(0, mid).join(" ");
  const lineB = words.slice(mid).join(" ");

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${dark ? "bg-[#0f2d1e]" : "bg-[#f8f5ee]"}`}
      data-motion
    >
      <div ref={frameRef} className="relative py-32 lg:py-48 overflow-hidden">
        {/* Background image */}
        <div ref={imgRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
          <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[#0b2218]/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2218]/60 via-transparent to-[#0b2218]/70" aria-hidden="true" />
        <div className="grain absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] border border-[#c9a84c]/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-[#c9a84c]/10 rounded-full" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 text-center">
          <Reveal className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
            <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">P-KOT Real Estate &amp; Developers</p>
            <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
          </Reveal>
          <SplitReveal
            lines={lineB ? [lineA, { text: lineB, className: "italic text-gold-gradient" }] : [lineA]}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 text-[#f8f5ee] max-w-5xl mx-auto"
          />
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed text-[#e8d5a3]/75">
              {subheading}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={primaryCTA.href}
                className="btn-shine group relative overflow-hidden bg-[#c9a84c] text-[#0f2d1e] text-xs tracking-[0.25em] px-10 py-4 font-medium uppercase hover:bg-[#e8d5a3] transition-all duration-500 flex items-center gap-3"
              >
                {primaryCTA.label}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href={secondaryCTA.href}
                className="text-xs tracking-[0.25em] px-10 py-4 font-light uppercase border border-[#f8f5ee]/30 text-[#f8f5ee] backdrop-blur-sm hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-500"
              >
                {secondaryCTA.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
