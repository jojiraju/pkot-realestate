"use client";
import { useState } from "react";
import Image from "next/image";
import PropertyCard from "@/components/ui/PropertyCard";
import { properties } from "@/lib/data/properties";
import { SlidersHorizontal, X } from "lucide-react";
import type { Property } from "@/lib/types";

const propertyTypes = ["All", "Apartment", "Villa", "Penthouse", "Townhouse", "Plot"];
const statusOptions = ["All", "Available", "Under Construction", "Reserved", "Sold"];
const bedroomOptions = ["Any", "2", "3", "4", "5+"];

export default function PropertiesPage() {
  const [activeType, setActiveType] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeBeds, setActiveBeds] = useState("Any");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = properties.filter((p: Property) => {
    const typeMatch = activeType === "All" || p.type === activeType;
    const statusMatch = activeStatus === "All" || p.status === activeStatus;
    const bedsMatch =
      activeBeds === "Any" ||
      (activeBeds === "5+" ? p.bedrooms >= 5 : p.bedrooms === parseInt(activeBeds));
    return typeMatch && statusMatch && bedsMatch;
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0f2d1e] min-h-[55vh] flex items-end pb-20 overflow-hidden" aria-label="Properties hero">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=80"
            alt="P-KOT Properties"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0f2d1e]/80" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-40">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Find Your Home</p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05]">
            Premium
            <br />
            <em className="text-[#c9a84c] not-italic">Properties</em>
          </h1>
        </div>
      </section>

      <section className="bg-[#f8f5ee] py-16" aria-label="Property listings">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          {/* Filters */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#6b6b5a] font-light">
                Showing <strong className="text-[#1a3d2b]">{filtered.length}</strong> propert{filtered.length !== 1 ? 'ies' : 'y'}
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#1a3d2b] border border-[#1a3d2b]/20 px-4 py-2 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 uppercase lg:hidden"
                aria-expanded={showFilters}
              >
                <SlidersHorizontal size={14} aria-hidden="true" />
                Filters
              </button>
            </div>

            <div className={`space-y-4 lg:space-y-0 lg:flex lg:flex-wrap lg:gap-8 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              {/* Type filter */}
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#6b6b5a] mb-2 uppercase">Type</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by property type">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`text-xs tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 uppercase ${
                        activeType === type
                          ? 'bg-[#1a3d2b] text-[#f8f5ee] border-[#1a3d2b]'
                          : 'border-[#1a3d2b]/20 text-[#1a3d2b] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                      }`}
                      aria-pressed={activeType === type}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {/* Status filter */}
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#6b6b5a] mb-2 uppercase">Status</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveStatus(s)}
                      className={`text-xs tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 uppercase ${
                        activeStatus === s
                          ? 'bg-[#1a3d2b] text-[#f8f5ee] border-[#1a3d2b]'
                          : 'border-[#1a3d2b]/20 text-[#1a3d2b] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                      }`}
                      aria-pressed={activeStatus === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {/* Bedrooms filter */}
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#6b6b5a] mb-2 uppercase">Bedrooms</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by bedrooms">
                  {bedroomOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => setActiveBeds(b)}
                      className={`text-xs tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 uppercase ${
                        activeBeds === b
                          ? 'bg-[#1a3d2b] text-[#f8f5ee] border-[#1a3d2b]'
                          : 'border-[#1a3d2b]/20 text-[#1a3d2b] hover:border-[#c9a84c] hover:text-[#c9a84c]'
                      }`}
                      aria-pressed={activeBeds === b}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-[#1a3d2b] font-light mb-3">No properties found</p>
              <p className="text-[#6b6b5a] font-light mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => { setActiveType('All'); setActiveStatus('All'); setActiveBeds('Any'); }}
                className="text-xs tracking-[0.2em] text-[#c9a84c] border-b border-[#c9a84c] pb-0.5"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
