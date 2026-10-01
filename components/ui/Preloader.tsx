"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { completeIntro, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const BRAND = "P-KOT";

/** Full-screen brand intro shown on first load; lifts away to reveal the page. */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        completeIntro();
        setDone(true);
      };

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      document.documentElement.classList.add("is-loading");
      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          document.documentElement.classList.remove("is-loading");
          setDone(true);
        },
      });

      tl.from(".pl-logo", { scale: 0.6, opacity: 0, rotate: -20, duration: 1.2 }, 0)
        .from(".pl-char", { yPercent: 120, rotateX: -90, opacity: 0, stagger: 0.06, duration: 1 }, 0.2)
        .from(".pl-sub", { opacity: 0, y: 12, duration: 0.8 }, 0.6)
        .to(".pl-line", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.3)
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.3
        )
        .to(".pl-content", { yPercent: -30, opacity: 0, duration: 0.7, ease: "power3.in" }, 2.05)
        .add(() => completeIntro(), 2.45)
        .to(".pl-panel", { yPercent: -100, duration: 1.1, ease: "expo.inOut", stagger: 0.07 }, 2.45);

      return () => document.documentElement.classList.remove("is-loading");
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div ref={rootRef} className="preloader fixed inset-0 z-[10000] pointer-events-auto" aria-hidden="true">
      {/* Curtain panels */}
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="pl-panel h-full flex-1 bg-[#0f2d1e] border-r border-[#c9a84c]/[0.06] last:border-r-0" />
        ))}
      </div>

      <div className="pl-content absolute inset-0 flex flex-col items-center justify-center">
        <div className="pl-logo relative w-20 h-20 mb-8 rounded-full overflow-hidden ring-1 ring-[#c9a84c]/40">
          <Image src="/pkot-logo.jpg" alt="" fill className="object-contain" priority sizes="80px" />
        </div>

        <p className="flex overflow-hidden font-serif text-6xl md:text-8xl font-light text-[#f8f5ee] tracking-[0.08em] leading-none" style={{ perspective: 600 }}>
          {BRAND.split("").map((c, i) => (
            <span key={i} className={`pl-char inline-block origin-bottom ${c === "-" ? "text-[#c9a84c]" : ""}`}>
              {c}
            </span>
          ))}
        </p>
        <p className="pl-sub mt-4 text-[10px] md:text-xs tracking-[0.5em] text-[#c9a84c] uppercase">
          Real Estate &amp; Developers
        </p>

        <div className="mt-12 w-56 md:w-72">
          <div className="h-px bg-[#f8f5ee]/10 relative overflow-hidden">
            <div className="pl-line absolute inset-0 bg-gradient-to-r from-[#c9a84c]/40 via-[#c9a84c] to-[#e8d5a3] origin-left scale-x-0" />
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-[0.3em] text-[#e8d5a3]/50">
            <span>BUILDING BETTER TOMORROWS</span>
            <span ref={counterRef} className="tabular-nums text-[#c9a84c]">000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
