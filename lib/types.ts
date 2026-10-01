// ─── Core Data Types for P-KOT Real Estate ───────────────────────────────────

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  type: "Residential" | "Commercial" | "Villas" | "Apartments" | "Mixed-Use";
  status: "Completed" | "Ongoing" | "Upcoming" | "Planning";
  description: string;
  overview: string;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  specifications: ProjectSpec[];
  year: number;
  area?: string;
  units?: number;
  floors?: number;
  featured: boolean;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: string;
  priceValue: number;
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaValue: number;
  status: "Available" | "Sold" | "Reserved" | "Under Construction";
  type: "Apartment" | "Villa" | "Penthouse" | "Townhouse" | "Plot";
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  projectSlug?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FilterOptions {
  location?: string;
  type?: string;
  priceMin?: number;
  priceMax?: number;
  status?: string;
  bedrooms?: number;
}
