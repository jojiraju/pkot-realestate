"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        scrub: 0.3,
        start: "top top",
        end: "bottom bottom",
      },
    });

    // Only kill this component's own trigger — never other components'
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar w-full"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
