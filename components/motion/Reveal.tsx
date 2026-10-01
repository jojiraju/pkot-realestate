"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate each direct child in sequence instead of the wrapper as a whole. */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
}

/** Fades and lifts content into view on scroll. */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger,
  y = 50,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Polymorphic tag; typed as a div so the ref and props line up
  const Comp = Tag as "div";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const targets = stagger !== undefined ? Array.from(ref.current.children) : ref.current;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Comp ref={ref} className={className} data-motion>
      {children}
    </Comp>
  );
}
