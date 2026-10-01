"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { stats } from "@/lib/data/testimonials";
import SplitReveal from "@/components/motion/SplitReveal";
import ScrubText from "@/components/motion/ScrubText";
import Reveal from "@/components/motion/Reveal";
import ParallaxImage from "@/components/motion/ParallaxImage";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numericValue)) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.textContent = value;
      return;
    }

    const obj = { val: 0 };
    el.textContent = "0";
    const tween = gsap.to(obj, {
      val: numericValue,
      duration: 2.4,
      ease: "expo.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString();
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [numericValue, value]);

  return (
    <>
      <span ref={ref} className="tabular-nums">{value}</span>
      <span className="text-[#c9a84c]">{suffix}</span>
    </>
  );
}

export default function AboutSection() {
  return (
    <section
      className="relative bg-[#f8f5ee] overflow-hidden py-24 lg:py-40"
      aria-labelledby="about-heading"
      data-motion
    >
      {/* Background watermark */}
      <p
        className="absolute top-10 -right-6 text-[clamp(6rem,16vw,18rem)] font-serif font-bold text-[#1a3d2b]/[0.035] leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        P-KOT
      </p>

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Manifesto */}
        <div className="max-w-5xl mb-28 lg:mb-40">
          <Reveal className="flex items-center gap-4 mb-10">
            <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
            <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">Our Philosophy</p>
          </Reveal>
          <ScrubText
            text="We don't just build structures. We shape the places where families grow, businesses flourish and communities thrive — crafted with integrity and designed to endure for generations."
            highlight={["structures", "families", "businesses", "communities", "generations"]}
            className="font-serif font-light text-[clamp(1.9rem,4.2vw,3.9rem)] leading-[1.15] text-[#1a3d2b]"
            accentClassName="italic text-[#a8891f]"
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Layered images */}
          <div className="relative lg:col-span-6 pb-16 lg:pb-0" aria-hidden="true">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1100&q=80"
              alt=""
              className="h-[440px] md:h-[580px] w-[88%]"
              speed={16}
            />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
              alt=""
              className="absolute right-0 -bottom-4 lg:-bottom-16 w-[48%] h-[220px] md:h-[300px] border-[10px] border-[#f8f5ee] shadow-2xl"
              speed={24}
              reveal="left"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            {/* Experience badge */}
            <Reveal className="absolute top-8 -left-3 md:-left-6 bg-[#0f2d1e] text-[#f8f5ee] px-6 py-5 shadow-2xl" delay={0.6}>
              <p className="font-serif text-5xl font-light text-[#c9a84c] leading-none">10+</p>
              <p className="text-[10px] tracking-[0.25em] mt-2 text-[#e8d5a3]/70">YEARS OF EXCELLENCE</p>
            </Reveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
              <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">About P-KOT</p>
            </Reveal>
            <SplitReveal
              id="about-heading"
              lines={["Creating spaces", { text: "designed for tomorrow.", className: "italic text-[#2d6a4f]" }]}
              className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] font-light leading-[1.08] text-[#1a3d2b] mb-8"
            />
            <Reveal stagger={0.12}>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed mb-5">
                P-KOT Real Estate and Developers is a premium real estate development company committed to building landmark residential, commercial and mixed-use developments. With a legacy of quality, integrity and innovation, we craft spaces that go beyond the ordinary. [REPLACE WITH ACTUAL COMPANY DESCRIPTION]
              </p>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed mb-10">
                Every project we undertake is a testament to our founding philosophy — building better tomorrows.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {["Quality", "Integrity", "Innovation"].map((val, i) => (
                  <div key={val} className="border-t border-[#1a3d2b]/15 pt-4">
                    <p className="font-serif text-sm text-[#c9a84c] mb-1">0{i + 1}</p>
                    <p className="text-xs tracking-[0.2em] text-[#1a3d2b] font-medium uppercase">{val}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="group inline-flex items-center gap-4 text-xs tracking-[0.25em] text-[#1a3d2b] uppercase"
              >
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full border border-[#1a3d2b]/20 group-hover:bg-[#1a3d2b] group-hover:border-[#1a3d2b] transition-all duration-500">
                  <ArrowRight size={14} className="group-hover:text-[#c9a84c] group-hover:translate-x-0.5 transition-all duration-500" />
                </span>
                <span className="text-roll">
                  <span>Discover Our Story</span>
                  <span aria-hidden="true">Discover Our Story</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Statistics */}
        <Reveal
          stagger={0.1}
          className="grid grid-cols-2 lg:grid-cols-4 mt-28 lg:mt-40 border-t border-[#1a3d2b]/10"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative py-10 lg:py-14 px-4 lg:px-8 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} border-[#1a3d2b]/10`}
            >
              <span className="absolute top-0 left-0 h-px w-0 bg-[#c9a84c] group-hover:w-full transition-all duration-700" aria-hidden="true" />
              <p className="font-serif text-[clamp(2.8rem,6vw,4.8rem)] font-light text-[#1a3d2b] leading-none mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs tracking-[0.3em] text-[#1a3d2b] uppercase mb-1">{stat.label}</p>
              <p className="text-xs text-[#6b6b5a] font-light">{stat.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
