"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  /** Base speed in seconds per loop. */
  duration?: number;
  reverse?: boolean;
}

/** Infinite ticker that speeds up with scroll velocity and follows scroll direction. */
export default function Marquee({ items, className, itemClassName, duration = 30, reverse = false }: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (prefersReducedMotion() || !track) return;

      const wrap = gsap.utils.wrap(-50, 0);
      const setX = gsap.quickSetter(track, "xPercent");
      const baseDir = reverse ? 1 : -1;
      let x = 0;
      let scrollDir = 1;
      let boost = 0;

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          scrollDir = self.direction;
          boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 400, 8));
        },
      });

      const tick = (_t: number, deltaMs: number) => {
        const perMs = 50 / (duration * 1000);
        x = wrap(x + baseDir * scrollDir * perMs * deltaMs * (1 + boost));
        boost *= 0.92;
        setX(x);
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: rootRef }
  );

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span className="mx-8 lg:mx-12 text-[#c9a84c] text-[0.5em]" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className={cn("overflow-hidden", className)} aria-label={items.join(", ")} role="marquee">
      <div ref={trackRef} className="flex w-max will-change-transform" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
