"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import SplitReveal from "@/components/motion/SplitReveal";
import Reveal from "@/components/motion/Reveal";

const AUTOPLAY_MS = 7000;

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setCurrent((c) => (c + 1) % testimonials.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [current, paused]);

  const testimonial = testimonials[current];
  const words = `“${testimonial.quote}”`.split(" ");

  return (
    <section
      className="relative bg-[#f8f5ee] py-24 lg:py-40 overflow-hidden"
      aria-labelledby="testimonials-heading"
      data-motion
    >
      {/* Oversized quote mark */}
      <span
        className="absolute top-10 left-1/2 -translate-x-1/2 font-serif text-[22rem] leading-none text-[#c9a84c]/[0.08] pointer-events-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <Reveal className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
            <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">Testimonials</p>
            <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
          </Reveal>
          <SplitReveal
            id="testimonials-heading"
            lines={["What our clients say"]}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1a3d2b]"
          />
          <p className="mt-4 text-sm text-[#6b6b5a] font-light italic">
            * Placeholder testimonials. Replace with actual client feedback before launch.
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative min-h-[300px] flex items-center justify-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure key={testimonial.id} className="text-center" exit={{ opacity: 0, y: -20, filter: "blur(6px)" }} transition={{ duration: 0.45 }}>
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#1a3d2b] leading-[1.35] mb-12 italic">
                  {words.map((w, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.25em]"
                      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.7, delay: i * 0.025, ease: [0.19, 1, 0.22, 1] }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </blockquote>
                <motion.figcaption
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <span className="w-12 h-12 rounded-full bg-[#1a3d2b] text-[#c9a84c] font-serif text-lg flex items-center justify-center mb-4" aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </span>
                  <span className="text-sm tracking-[0.2em] text-[#1a3d2b] font-medium uppercase">{testimonial.name}</span>
                  <span className="text-xs text-[#6b6b5a] font-light mt-1">
                    {testimonial.role} &bull; {testimonial.project}
                  </span>
                </motion.figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-14">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#1a3d2b]/20 flex items-center justify-center text-[#1a3d2b] hover:bg-[#1a3d2b] hover:text-[#c9a84c] hover:border-[#1a3d2b] transition-all duration-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`relative h-[3px] overflow-hidden bg-[#1a3d2b]/15 transition-all duration-500 ${i === current ? "w-14" : "w-4 hover:bg-[#c9a84c]/50"}`}
                >
                  {i === current && (
                    <motion.span
                      key={`${current}-${paused}`}
                      className="absolute inset-0 bg-[#c9a84c] origin-left"
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#1a3d2b]/20 flex items-center justify-center text-[#1a3d2b] hover:bg-[#1a3d2b] hover:text-[#c9a84c] hover:border-[#1a3d2b] transition-all duration-500"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
