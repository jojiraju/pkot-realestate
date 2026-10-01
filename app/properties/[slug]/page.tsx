import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Square, CheckCircle, ArrowLeft } from "lucide-react";
import { properties, getPropertyBySlug } from "@/lib/data/properties";
import CTASection from "@/components/sections/CTASection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: property.name,
    description: property.description,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden" aria-label={`${property.name} hero`}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={property.image}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d1e]/90 via-[#0f2d1e]/40 to-transparent" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-32 w-full">
          <Link href="/properties" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-[#e8d5a3]/60 hover:text-[#c9a84c] transition-colors duration-300 mb-10 uppercase">
            <ArrowLeft size={12} aria-hidden="true" /> Back to Properties
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-[10px] tracking-[0.2em] px-3 py-1.5 bg-[#c9a84c] text-[#0f2d1e] uppercase font-medium">{property.status}</span>
            <span className="text-[10px] tracking-[0.2em] px-3 py-1.5 bg-[#f8f5ee]/10 text-[#f8f5ee] uppercase">{property.type}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-[#f8f5ee] leading-[1.05] mb-6">{property.name}</h1>
          <div className="flex items-center gap-1.5 text-[#e8d5a3]/60 mb-6">
            <MapPin size={14} aria-hidden="true" />
            <span className="text-sm font-light">{property.location}</span>
          </div>
          <p className="font-serif text-3xl text-[#c9a84c] font-light">{property.price}</p>
        </div>
      </section>

      {/* Details */}
      <section className="bg-[#f8f5ee] py-24" aria-label="Property details">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              {/* Specs */}
              <div className="flex flex-wrap gap-8 pb-8 border-b border-[#1a3d2b]/10 mb-8">
                <div className="flex items-center gap-3">
                  <BedDouble size={20} className="text-[#c9a84c]" aria-hidden="true" />
                  <div>
                    <p className="text-lg font-light text-[#1a3d2b]">{property.bedrooms}</p>
                    <p className="text-xs text-[#6b6b5a]">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bath size={20} className="text-[#c9a84c]" aria-hidden="true" />
                  <div>
                    <p className="text-lg font-light text-[#1a3d2b]">{property.bathrooms}</p>
                    <p className="text-xs text-[#6b6b5a]">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Square size={20} className="text-[#c9a84c]" aria-hidden="true" />
                  <div>
                    <p className="text-lg font-light text-[#1a3d2b]">{property.area}</p>
                    <p className="text-xs text-[#6b6b5a]">Built-up Area</p>
                  </div>
                </div>
              </div>
              <p className="text-base text-[#6b6b5a] font-light leading-relaxed mb-10">{property.description}</p>
              {/* Gallery */}
              <div className="grid grid-cols-2 gap-3">
                {property.images.map((img, i) => (
                  <div key={i} className={`relative overflow-hidden img-zoom ${i === 0 ? 'col-span-2' : ''}`} style={{ height: i === 0 ? '360px' : '200px' }}>
                    <Image src={img} alt={`${property.name} view ${i + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                ))}
              </div>
            </div>
            {/* Sidebar */}
            <div>
              <div className="bg-[#1a3d2b] p-8 sticky top-24">
                <p className="font-serif text-4xl text-[#c9a84c] font-light mb-6">{property.price}</p>
                <h3 className="text-xs tracking-[0.3em] text-[#c9a84c] mb-4 uppercase">Amenities</h3>
                <ul className="space-y-2 mb-8">
                  {property.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#c9a84c] flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm text-[#e8d5a3]/70 font-light">{a}</span>
                    </li>
                  ))}
                </ul>
                {property.projectSlug && (
                  <Link href={`/projects/${property.projectSlug}`} className="block text-center border border-[#c9a84c]/40 text-[#c9a84c] text-xs tracking-[0.2em] py-3 mb-4 hover:bg-[#c9a84c]/10 transition-colors duration-300 uppercase">
                    View Project
                  </Link>
                )}
                <Link href="/contact" className="block text-center bg-[#c9a84c] text-[#0f2d1e] text-xs tracking-[0.2em] py-4 font-medium hover:bg-[#e8d5a3] transition-colors duration-300 uppercase">
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
