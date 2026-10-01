"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Line = string | { text: string; className?: string };

interface SplitRevealProps {
  /** Each entry renders as its own masked line. */
  lines: Line[];
  as?: ElementType;
  id?: string;
  className?: string;
  lineClassName?: string;
  /** "chars" flips each letter in 3D; "words" slides each word up. */
  by?: "chars" | "words";
  delay?: number;
  stagger?: number;
  /** Trigger on scroll (default) or immediately on mount. */
  trigger?: "scroll" | "mount";
  start?: string;
  children?: ReactNode;
}

/**
 * Masked text reveal. Renders real text for SEO / screen readers (aria-label
 * on the wrapper) and animates split spans that are hidden from assistive tech.
 */
export default function SplitReveal({
  lines,
  as: Tag = "h2",
  id,
  className,
  lineClassName,
  by = "words",
  delay = 0,
  stagger,
  trigger = "scroll",
  start = "top 85%",
  children,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Polymorphic tag; typed as a div so the ref and props line up
  const Comp = Tag as "div";
  const normalized = lines.map((l) => (typeof l === "string" ? { text: l } : l));
  const label = normalized.map((l) => l.text).join(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const pieces = ref.current.querySelectorAll<HTMLElement>(".split-piece");
      if (!pieces.length) return;

      const from =
        by === "chars"
          ? { yPercent: 110, rotateX: -80, opacity: 0 }
          : { yPercent: 115, rotate: 3, opacity: 0 };

      gsap.set(pieces, from);
      gsap.to(pieces, {
        yPercent: 0,
        rotateX: 0,
        rotate: 0,
        opacity: 1,
        duration: by === "chars" ? 1.1 : 1.2,
        ease: "expo.out",
        stagger: stagger ?? (by === "chars" ? 0.025 : 0.07),
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: ref.current, start, once: true }
            : undefined,
      });
    },
    { scope: ref }
  );

  return (
    <Comp ref={ref} id={id} className={cn("split-root", className)} aria-label={label}>
      {normalized.map((line, li) => (
        <span key={li} className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)} aria-hidden="true">
          <span className={cn("block", line.className)} style={{ perspective: "800px" }}>
            {line.text.split(" ").map((word, wi, arr) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {by === "chars" ? (
                  word.split("").map((ch, ci) => (
                    <span key={ci} className="split-piece inline-block origin-bottom will-change-transform">
                      {ch}
                    </span>
                  ))
                ) : (
                  <span className="split-piece inline-block origin-bottom-left will-change-transform">{word}</span>
                )}
                {wi < arr.length - 1 && " "}
              </span>
            ))}
          </span>
        </span>
      ))}
      {children}
    </Comp>
  );
}
