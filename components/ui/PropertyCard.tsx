import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Square, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/types";
import TiltCard from "@/components/motion/TiltCard";

interface PropertyCardProps {
  property: Property;
}

const statusStyles: Record<string, string> = {
  Available: "bg-[#2d6a4f] text-[#f8f5ee]",
  Sold: "bg-[#6b6b5a] text-[#f8f5ee]",
  Reserved: "bg-[#c9a84c] text-[#0f2d1e]",
  "Under Construction": "bg-[#1a3d2b]/20 text-[#1a3d2b]",
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <TiltCard max={5} className="h-full">
    <article className="group relative h-full bg-white property-card-hover shadow-[0_1px_0_rgba(26,61,43,0.08)] hover:shadow-[0_40px_80px_-30px_rgba(15,45,30,0.35)] transition-shadow duration-700">
      {/* Image */}
      <Link
        href={`/properties/${property.slug}`}
        className="relative block overflow-hidden"
        style={{ height: "300px" }}
        data-cursor="View"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={property.image}
          alt=""
          fill
          className="object-cover property-card-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Status */}
        <span
          className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] px-3 py-1.5 uppercase font-medium ${statusStyles[property.status]}`}
        >
          {property.status}
        </span>
        {/* Type */}
        <span className="absolute top-4 right-4 bg-[#0f2d1e]/80 text-[#e8d5a3] text-[10px] tracking-[0.15em] px-2.5 py-1.5 uppercase">
          {property.type}
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-[#0f2d1e]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </Link>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl font-light text-[#1a3d2b] leading-tight pr-2">
            {property.name}
          </h3>
          <p className="text-lg font-light text-[#c9a84c] flex-shrink-0">{property.price}</p>
        </div>

        <div className="flex items-center gap-1.5 text-[#6b6b5a] mb-5">
          <MapPin size={12} aria-hidden="true" />
          <span className="text-xs font-light">{property.location}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 pb-5 border-b border-[#1a3d2b]/10 mb-5">
          <div className="flex items-center gap-1.5 text-[#6b6b5a]">
            <BedDouble size={14} aria-hidden="true" />
            <span className="text-xs">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#6b6b5a]">
            <Bath size={14} aria-hidden="true" />
            <span className="text-xs">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#6b6b5a]">
            <Square size={14} aria-hidden="true" />
            <span className="text-xs">{property.area}</span>
          </div>
        </div>

        <Link
          href={`/properties/${property.slug}`}
          className="flex items-center justify-between text-xs tracking-[0.2em] text-[#1a3d2b] group/link uppercase"
          aria-label={`View details for ${property.name}`}
        >
          View Details
          <ArrowRight
            size={14}
            className="text-[#c9a84c] group-hover/link:translate-x-1 transition-transform duration-300"
            aria-hidden="true"
          />
        </Link>
      </div>
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c9a84c] group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" aria-hidden="true" />
    </article>
    </TiltCard>
  );
}
