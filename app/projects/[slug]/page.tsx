import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/lib/data/projects";
import CTASection from "@/components/sections/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      {/* Full-screen hero */}
      <section className="relative min-h-screen flex items-end pb-20 overflow-hidden" aria-label={`${project.name} hero`}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d1e]/90 via-[#0f2d1e]/40 to-[#0f2d1e]/10" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-32 w-full">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#e8d5a3]/60 hover:text-[#c9a84c] transition-colors duration-300 mb-10 uppercase"
          >
            <ArrowLeft size={12} aria-hidden="true" /> Back to Projects
          </Link>
          <p className="text-xs tracking-[0.2em] text-[#c9a84c] mb-2 uppercase">{project.type}</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05] mb-4">
            {project.name}
          </h1>
          <p className="font-serif text-xl text-[#c9a84c] italic font-light mb-6">{project.tagline}</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-[#e8d5a3]/60">
              <MapPin size={14} aria-hidden="true" />
              <span className="text-sm font-light">{project.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#e8d5a3]/60">
              <Calendar size={14} aria-hidden="true" />
              <span className="text-sm font-light">{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.2em] px-3 py-1 bg-[#c9a84c] text-[#0f2d1e] uppercase font-medium">{project.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#f8f5ee] py-24" aria-labelledby="project-overview-heading">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Overview</p>
              <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
              <h2 id="project-overview-heading" className="font-serif text-3xl font-light text-[#1a3d2b] mb-6">
                Project Overview
              </h2>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed">{project.overview}</p>
            </div>
            {/* Specs */}
            <div className="border-l border-[#c9a84c]/20 pl-10">
              <h3 className="text-xs tracking-[0.3em] text-[#c9a84c] mb-6 uppercase">Specifications</h3>
              <ul className="space-y-4">
                {project.specifications.map((spec) => (
                  <li key={spec.label} className="flex flex-col">
                    <span className="text-[10px] tracking-[0.2em] text-[#6b6b5a] uppercase mb-0.5">{spec.label}</span>
                    <span className="text-base font-light text-[#1a3d2b]">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#1a3d2b] py-24" aria-label="Project gallery">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Gallery</p>
          <div className="w-10 h-px bg-[#c9a84c] mb-10" aria-hidden="true" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {project.galleryImages.map((img, i) => (
              <div key={i} className={`relative overflow-hidden img-zoom ${ i === 0 ? 'col-span-2 row-span-2' : '' }`} style={{ height: i === 0 ? '400px' : '190px' }}>
                <Image
                  src={img}
                  alt={`${project.name} gallery image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-[#f8f5ee] py-24" aria-labelledby="amenities-heading">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Amenities</p>
          <div className="w-10 h-px bg-[#c9a84c] mb-8" aria-hidden="true" />
          <h2 id="amenities-heading" className="font-serif text-3xl font-light text-[#1a3d2b] mb-10">
            World-class amenities
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-3 py-3 border-b border-[#1a3d2b]/10">
                <CheckCircle size={16} className="text-[#c9a84c] flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-light text-[#1a3d2b]">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        heading={`Interested in ${project.name}?`}
        subheading="Speak with our sales team to learn more about this project, pricing and availability."
        primaryCTA={{ label: "Make an Enquiry", href: "/contact" }}
        secondaryCTA={{ label: "View All Projects", href: "/projects" }}
      />
    </>
  );
}
