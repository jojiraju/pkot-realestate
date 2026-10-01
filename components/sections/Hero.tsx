"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import { stats } from "@/lib/data/testimonials";
import { onIntroComplete, prefersReducedMotion, useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const ROTATING_WORDS = ["Tomorrows.", "Landmarks.", "Communities.", "Legacies."];

function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className={`hero-char inline-block origin-bottom will-change-transform ${className ?? ""}`}>
          {ch}
        </span>
      ))}
    </>
  );
}

/** Third headline line: cycles through brand keywords with a 3D letter flip. */
function RotatingWord({ start }: { start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const first = useRef(true);

  // Animate the new word in whenever it changes (skip the first — the hero timeline owns it)
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      gsap.fromTo(
        ".rot-char",
        { yPercent: 110, rotateX: -90, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.9, stagger: 0.035, ease: "expo.out" }
      );
    },
    { scope: ref, dependencies: [index] }
  );

  useEffect(() => {
    if (!start || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!ref.current) return;
      gsap.to(ref.current.querySelectorAll(".rot-char"), {
        yPercent: -110,
        rotateX: 90,
        opacity: 0,
        duration: 0.5,
        stagger: 0.025,
        ease: "power3.in",
        onComplete: () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      });
    }, 3800);
    return () => window.clearInterval(id);
  }, [start]);

  return (
    <span ref={ref} className="block" style={{ perspective: 900 }}>
      {ROTATING_WORDS[index].split("").map((ch, i) => (
        <span key={`${index}-${i}`} className="hero-char rot-char text-gold-gradient inline-block origin-bottom will-change-transform">
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const off = onIntroComplete(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, onComplete: () => setRotate(true) })
          .from(".hero-line", { scaleX: 0, duration: 1.2, ease: "power3.inOut" }, 0.2)
          .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1 }, 0.4)
          .from(".hero-char", { yPercent: 115, rotateX: -90, opacity: 0, duration: 1.4, stagger: 0.035 }, 0.5)
          .from(".hero-sub", { y: 20, opacity: 0, duration: 1.2 }, 1.3)
          .from(".hero-cta", { y: 20, opacity: 0, duration: 1.2, stagger: 0.1 }, 1.45)
          .from(".hero-stat", { y: 30, opacity: 0, duration: 1.2, stagger: 0.1 }, 1.7)
          .from(".hero-scroll", { y: 20, opacity: 0, duration: 1 }, 2.0);
      });

      // Scroll-out: content drifts up and dissolves while the 3D camera rises
      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "70% top", scrub: true },
      });
      gsap.to(".hero-dim", {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      return off;
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0b2218]"
      aria-label="Hero"
      data-motion
    >
      {/* Static fallback (reduced motion / while the 3D scene loads) */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
      </div>

      {/* 3D city */}
      {!reduced && <HeroScene />}

      {/* Legibility + atmosphere overlays */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2218]/95 via-[#0b2218]/55 to-transparent md:via-[#0b2218]/35" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b2218] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b2218]/80 to-transparent" />
        <div className="hero-dim absolute inset-0 bg-[#0b2218] opacity-0" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 min-h-[100svh] max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col pt-[120px] pb-[100px] lg:pt-[160px] lg:pb-[100px]">
        <div className="w-full my-auto">
          <div className="max-w-3xl">
            <div className="hero-eyebrow hero-fade flex items-center gap-4 mb-6">
              <span className="hero-line block w-12 h-px bg-[#c9a84c] origin-left" aria-hidden="true" />
              <p className="text-[10px] sm:text-xs tracking-[0.45em] text-[#c9a84c] font-light uppercase">
                Real Estate &bull; Development &bull; Investment
              </p>
            </div>

            <h1 className="font-serif font-light leading-[0.92] tracking-tight mb-8 text-[clamp(3.2rem,7.5vw,8rem)]">
              <span className="sr-only">Building Better Tomorrows.</span>
              <span aria-hidden="true">
                <span className="block overflow-hidden pb-[0.06em]" style={{ perspective: 900 }}>
                  <Chars text="Building" className="text-[#f8f5ee]" />
                </span>
                <span className="block overflow-hidden pb-[0.06em]" style={{ perspective: 900 }}>
                  <Chars text="Better" className="text-[#f8f5ee] italic" />
                </span>
                <span className="block overflow-hidden pb-[0.06em]">
                  <RotatingWord start={rotate} />
                </span>
              </span>
            </h1>

            <p className="hero-sub hero-fade text-base md:text-lg text-[#e8d5a3]/75 font-light max-w-md leading-relaxed mb-10">
              P-KOT Real Estate and Developers — crafting landmark spaces and premium communities that stand the test of time.
            </p>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="hero-cta hero-fade btn-shine group relative overflow-hidden bg-gradient-to-r from-[#c9a84c] to-[#e8d5a3] text-[#0f2d1e] text-xs tracking-[0.25em] px-8 py-4 font-medium uppercase flex items-center gap-3 shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)] transition-all duration-500 magnetic-btn"
                data-cursor="Explore"
              >
                Explore Projects
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="hero-cta hero-fade group border border-[#f8f5ee]/40 backdrop-blur-md bg-[#0b2218]/30 text-[#f8f5ee] text-xs tracking-[0.25em] px-8 py-4 font-light uppercase flex items-center gap-3 hover:border-[#c9a84c] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c] transition-all duration-500 magnetic-btn"
              >
                Book a Consultation
              </Link>
            </div>

            <div className="glass-panel flex divide-x divide-[#c9a84c]/20 rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-sm overflow-hidden w-fit">
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="hero-stat px-6 sm:px-8 py-5 bg-[#0b2218]/40 hover:bg-[#0b2218]/60 transition-colors duration-300">
                  <p className="font-serif text-3xl sm:text-4xl text-[#f8f5ee] leading-none tracking-tight">
                    {s.value}
                    <span className="text-[#c9a84c] text-2xl">{s.suffix}</span>
                  </p>
                  <p className="mt-2 text-[9px] sm:text-[10px] tracking-[0.3em] text-[#e8d5a3]/70 uppercase font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
              <Link
                href="/about"
                className="hidden sm:flex items-center px-6 text-[#c9a84c] bg-[#0b2218]/40 hover:bg-[#c9a84c] hover:text-[#0f2d1e] transition-all duration-500"
                aria-label="About P-KOT"
              >
                <ArrowDownRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar: scroll cue */}
        <div className="absolute bottom-8 left-6 right-6 lg:left-10 lg:right-10 flex items-end justify-between gap-6">
          <div className="hero-scroll hero-fade hidden md:flex items-center gap-4">
            <span className="relative block w-px h-14 bg-[#f8f5ee]/15 overflow-hidden" aria-hidden="true">
              <span className="scroll-cue absolute left-0 top-0 w-px h-5 bg-[#c9a84c]" />
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#e8d5a3]/50 uppercase">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
