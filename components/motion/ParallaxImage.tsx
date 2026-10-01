"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** How far (in %) the image drifts while the frame crosses the viewport. */
  speed?: number;
  /** Wipe the frame open with a clip-path when it enters the viewport. */
  reveal?: "up" | "left" | "none";
}

/** Image frame with clip-path wipe-in and scroll-linked parallax drift. */
export default function ParallaxImage({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority,
  speed = 12,
  reveal = "up",
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !frameRef.current) return;

      gsap.fromTo(
        innerRef.current,
        { yPercent: -speed / 2 },
        {
          yPercent: speed / 2,
          ease: "none",
          scrollTrigger: { trigger: frameRef.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      if (reveal !== "none") {
        const hidden = reveal === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frameRef.current, start: "top 85%", once: true },
        });
        tl.fromTo(frameRef.current, { clipPath: hidden }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" })
          .fromTo(innerRef.current!.firstElementChild, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.2);
      }
    },
    { scope: frameRef }
  );

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden", className)}>
      <div ref={innerRef} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <div className="relative w-full h-full">
          <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
        </div>
      </div>
    </div>
  );
}
