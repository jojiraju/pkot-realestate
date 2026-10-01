"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Only on devices with a precise pointer (no touch screens)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    let current: Element | null = null;
    // Delegated hover detection so links added after navigation still work
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element).closest("a, button, [role='button'], [data-cursor]");
      if (target === current) return;
      current = target;

      const text = target?.getAttribute("data-cursor");
      if (text) {
        label.textContent = text;
        gsap.to(ring, { width: 88, height: 88, backgroundColor: "#c9a84c", borderColor: "#c9a84c", duration: 0.45, ease: "expo.out" });
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, delay: 0.05 });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else if (target) {
        gsap.to(ring, { width: 56, height: 56, backgroundColor: "rgba(201,168,76,0.12)", borderColor: "#c9a84c", duration: 0.4, ease: "expo.out" });
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      } else {
        gsap.to(ring, { width: 36, height: 36, backgroundColor: "rgba(201,168,76,0)", borderColor: "#c9a84c", duration: 0.4, ease: "expo.out" });
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ width: 6, height: 6, background: "#c9a84c", left: 0, top: 0, transform: "none", opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden [@media(hover:hover)_and_(pointer:fine)]:flex items-center justify-center mix-blend-normal"
        style={{ width: 36, height: 36, border: "1px solid #c9a84c", left: 0, top: 0, transform: "none", opacity: 0 }}
        aria-hidden="true"
      >
        <span ref={labelRef} className="cursor-label opacity-0 scale-50" />
      </div>
    </>
  );
}
