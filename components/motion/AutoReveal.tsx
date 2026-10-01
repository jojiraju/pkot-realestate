"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onIntroComplete, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = "h1, h2, h3, p, li, article, blockquote, form, figure, dl, table";

/**
 * Site-wide scroll reveal for content that doesn't choreograph its own motion.
 * Anything inside a `[data-motion]` container is skipped — those sections
 * run bespoke animations. Only opacity/transform are touched, never the DOM.
 */
export default function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const main = document.getElementById("main-content");
    if (!main) return;

    let ctx: gsap.Context | undefined;
    let raf = 0;

    const run = () => {
      raf = requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          const all = Array.from(main.querySelectorAll<HTMLElement>(SELECTOR)).filter(
            (el) => !el.closest("[data-motion]") && !el.closest(".sr-only")
          );
          // Animate the outermost match only (e.g. an <article>, not every <p> inside it)
          const set = new Set(all);
          const targets = all.filter((el) => {
            for (let p = el.parentElement; p && p !== main; p = p.parentElement) {
              if (set.has(p)) return false;
            }
            return true;
          });
          if (!targets.length) return;

          gsap.set(targets, { opacity: 0, y: 40 });
          ScrollTrigger.batch(targets, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
          });

          // Slow settle-in zoom on the page's opening image
          const heroImg = main.querySelector<HTMLElement>(":scope > section:first-child img");
          if (heroImg && !heroImg.closest("[data-motion]")) {
            gsap.fromTo(heroImg, { scale: 1.15 }, { scale: 1, duration: 2.4, ease: "expo.out" });
          }
          ScrollTrigger.refresh();
        }, main);
      });
    };

    const off = onIntroComplete(run);
    return () => {
      off();
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
