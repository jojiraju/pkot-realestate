import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore P-KOT Real Estate's portfolio of premium residential, commercial and mixed-use developments.",
};

const statusColors: Record<string, string> = {
  Completed: "bg-[#2d6a4f] text-[#f8f5ee]",
  Ongoing: "bg-[#c9a84c] text-[#0f2d1e]",
  Upcoming: "bg-[#1a3d2b]/20 text-[#1a3d2b]",
  Planning: "bg-[#6b6b5a]/20 text-[#6b6b5a]",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0f2d1e] min-h-[60vh] flex items-end pb-20 overflow-hidden" aria-label="Projects hero">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
            alt="P-KOT Projects portfolio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0f2d1e]/80" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-40">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Portfolio</p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05]">
            Our
            <br />
            <em className="text-[#c9a84c] not-italic">Projects</em>
          </h1>
        </div>
      </section>

      {/* Projects listing */}
      <section className="bg-[#f8f5ee] py-24 lg:py-36" aria-label="Project listings">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <article key={project.id} className="group relative overflow-hidden">
                <div className="relative" style={{ height: '420px' }}>
                  <Image
                    src={project.heroImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d1e]/85 via-[#0f2d1e]/20 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className={`self-start text-[10px] tracking-[0.2em] px-3 py-1.5 mb-4 uppercase font-medium ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <p className="text-xs tracking-[0.2em] text-[#c9a84c] mb-2 uppercase">{project.type}</p>
                    <h2 className="font-serif text-3xl font-light text-[#f8f5ee] mb-2">{project.name}</h2>
                    <div className="flex items-center gap-1.5 text-[#e8d5a3]/60 mb-4">
                      <MapPin size={12} aria-hidden="true" />
                      <span className="text-xs font-light">{project.location}</span>
                    </div>
                    <p className="text-sm text-[#e8d5a3]/70 font-light line-clamp-2 mb-6">{project.description}</p>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="self-start flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#c9a84c] border border-[#c9a84c]/40 px-5 py-3 hover:bg-[#c9a84c] hover:text-[#0f2d1e] transition-all duration-400 uppercase"
                    >
                      View Project <ArrowRight size={10} aria-hidden="true" />
                    </Link>
                  </div>

                  <span className="absolute top-8 right-8 font-serif text-7xl font-light text-[#f8f5ee]/5 leading-none pointer-events-none select-none" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a development in mind?"
        subheading="Whether you are a landowner, investor or buyer, P-KOT offers the expertise to make your real estate goals a reality."
        primaryCTA={{ label: "Enquire Now", href: "/contact" }}
        secondaryCTA={{ label: "Our Services", href: "/services" }}
      />
    </>
  );
}
