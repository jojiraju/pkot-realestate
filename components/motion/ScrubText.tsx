"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrubTextProps {
  text: string;
  /** Words (lower-case, punctuation stripped) to render in the accent colour. */
  highlight?: string[];
  className?: string;
  accentClassName?: string;
}

/** Paragraph whose words light up one by one as the reader scrolls through it. */
export default function ScrubText({ text, highlight = [], className, accentClassName }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const words = ref.current.querySelectorAll(".scrub-word");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((word, i) => {
        const bare = word.toLowerCase().replace(/[^a-z-]/g, "");
        return (
          <span
            key={i}
            className={cn("scrub-word inline-block mr-[0.25em]", highlight.includes(bare) && accentClassName)}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
