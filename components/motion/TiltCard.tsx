"use client";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  /** Show a soft light sheen that follows the pointer. */
  glare?: boolean;
}

/** Card that tilts in 3D toward the pointer, with an optional moving sheen. */
export default function TiltCard({ children, className, max = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(ref.current, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: -(py - 0.5) * max * 2,
      transformPerspective: 1000,
      duration: 0.6,
      ease: "power3.out",
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(232,213,163,0.22), transparent 55%)`,
        duration: 0.4,
      });
    }
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("relative will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
      {glare && (
        <div ref={glareRef} className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-screen" aria-hidden="true" />
      )}
    </div>
  );
}
