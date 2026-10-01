"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { getFeaturedProjects } from "@/lib/data/projects";
import SplitReveal from "@/components/motion/SplitReveal";
import TiltCard from "@/components/motion/TiltCard";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const statusColors: Record<string, string> = {
  Completed: "bg-[#2d6a4f] text-[#f8f5ee]",
  Ongoing: "bg-[#c9a84c] text-[#0f2d1e]",
  Upcoming: "bg-[#f8f5ee]/15 text-[#f8f5ee] backdrop-blur-md",
  Planning: "bg-[#f8f5ee]/10 text-[#e8d5a3] backdrop-blur-md",
};

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const projects = getFeaturedProjects();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Desktop: pin the section and translate the card track horizontally
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth + 80;

        const scrollTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + distance(),
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(progressRef.current, { scaleX: self.progress }),
          },
        });

        // Inner image parallax + card lift, driven by the horizontal motion
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          const img = card.querySelector(".project-img");
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: "left right", end: "right left", scrub: true },
            }
          );
          gsap.from(card.querySelectorAll(".card-meta"), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, containerAnimation: scrollTween, start: "left 75%", once: true },
          });
        });
      });

      // Mobile / tablet: simple staggered entrance
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0f2d1e] overflow-hidden"
      aria-labelledby="projects-heading"
      data-motion
    >
      <div ref={pinRef} className="relative lg:h-screen flex flex-col justify-center py-24 lg:py-0">
        {/* Decorative watermark */}
        <p
          className="absolute bottom-0 left-0 text-[clamp(8rem,20vw,22rem)] font-serif font-bold text-outline opacity-40 leading-[0.8] pointer-events-none select-none whitespace-nowrap"
          aria-hidden="true"
        >
          Portfolio
        </p>

        <div className="relative w-full">
          <div ref={trackRef} className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-10 px-6 lg:px-10 lg:w-max">
            {/* Intro panel */}
            <div className="lg:w-[34vw] shrink-0 flex flex-col justify-center lg:pr-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-[#c9a84c]" aria-hidden="true" />
                <p className="text-xs tracking-[0.4em] text-[#c9a84c] uppercase">Portfolio</p>
              </div>
              <SplitReveal
                id="projects-heading"
                by="chars"
                lines={["Featured", { text: "Projects", className: "italic text-gold-gradient" }]}
                className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#f8f5ee] leading-[0.95] mb-8"
              />
              <p className="text-sm md:text-base text-[#e8d5a3]/65 font-light leading-relaxed max-w-sm mb-10">
                A curated selection of landmark developments — each one a statement of design, craftsmanship and lasting value.
              </p>
              <div className="hidden lg:flex items-center gap-3 text-[10px] tracking-[0.35em] text-[#e8d5a3]/45 uppercase">
                Scroll <ArrowRight size={12} className="text-[#c9a84c]" />
              </div>
            </div>

            {/* Project cards */}
            {projects.map((project, index) => (
              <div key={project.id} className="project-card shrink-0 lg:w-[38vw] xl:w-[34vw]">
                <TiltCard max={5}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group relative block overflow-hidden h-[460px] md:h-[560px] lg:h-[68vh]"
                    data-cursor="View"
                  >
                    <div className="project-img absolute -inset-x-[12%] inset-y-0">
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2218] via-[#0b2218]/30 to-transparent" />
                    <div className="absolute inset-0 bg-[#0b2218]/0 group-hover:bg-[#0b2218]/20 transition-colors duration-700" />

                    {/* Index */}
                    <span
                      className="absolute top-6 left-8 font-serif text-8xl font-light text-outline leading-none pointer-events-none select-none"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`absolute top-8 right-8 text-[10px] tracking-[0.2em] px-3 py-1.5 uppercase font-medium ${statusColors[project.status] ?? ""}`}
                    >
                      {project.status}
                    </span>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10" style={{ transform: "translateZ(40px)" }}>
                      <p className="card-meta text-xs tracking-[0.25em] text-[#c9a84c] mb-3 uppercase">{project.type}</p>
                      <h3 className="card-meta font-serif text-3xl lg:text-4xl font-light text-[#f8f5ee] mb-3 leading-tight">
                        {project.name}
                      </h3>
                      <div className="card-meta flex items-center gap-1.5 text-[#e8d5a3]/60 mb-6">
                        <MapPin size={12} />
                        <span className="text-xs font-light">{project.location}</span>
                      </div>
                      <div className="card-meta flex items-center justify-between border-t border-[#f8f5ee]/15 pt-5">
                        <p className="text-sm text-[#e8d5a3]/70 font-light line-clamp-1 pr-6">{project.tagline}</p>
                        <span className="flex-shrink-0 w-11 h-11 rounded-full border border-[#c9a84c]/50 flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#0f2d1e] group-hover:rotate-45 transition-all duration-500">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </div>
            ))}

            {/* End panel */}
            <div className="project-card shrink-0 lg:w-[26vw] flex items-center justify-center">
              <Link
                href="/projects"
                className="group relative flex flex-col items-center justify-center w-56 h-56 lg:w-64 lg:h-64 rounded-full border border-[#c9a84c]/40 text-[#f8f5ee] hover:border-[#c9a84c] transition-colors duration-500"
                data-cursor="Open"
              >
                <span className="absolute inset-0 rounded-full bg-[#c9a84c] scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" aria-hidden="true" />
                <span className="relative font-serif text-3xl font-light group-hover:text-[#0f2d1e] transition-colors duration-500">All Projects</span>
                <ArrowRight className="relative mt-3 text-[#c9a84c] group-hover:text-[#0f2d1e] transition-colors duration-500" size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="hidden lg:block absolute bottom-10 left-10 right-10 h-px bg-[#f8f5ee]/10" aria-hidden="true">
          <div ref={progressRef} className="h-full bg-[#c9a84c] origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
}
