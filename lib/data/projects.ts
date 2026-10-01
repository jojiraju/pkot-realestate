import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "emerald-heights",
    name: "Emerald Heights",
    tagline: "Where luxury meets the skyline",
    location: "[LOCATION — e.g. Hyderabad, Telangana]",
    type: "Residential",
    status: "Completed",
    description:
      "A landmark luxury residential tower featuring premium apartments with panoramic city views, world-class amenities, and architectural elegance.",
    overview:
      "Emerald Heights redefines urban living with its iconic silhouette and thoughtfully designed spaces. Each residence is crafted to offer the finest living experience, with premium finishes, expansive balconies, and curated amenities that cater to a refined lifestyle. [REPLACE WITH ACTUAL PROJECT DESCRIPTION]",
    heroImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80",
    ],
    amenities: [
      "Rooftop Infinity Pool",
      "Landscaped Gardens",
      "Fitness Center",
      "Spa & Wellness",
      "Concierge Services",
      "Underground Parking",
      "Smart Home Systems",
      "Children's Play Area",
    ],
    specifications: [
      { label: "Total Units", value: "[XX] Units" },
      { label: "Floors", value: "[XX] Floors" },
      { label: "Area Range", value: "[XXXX – XXXX] sq. ft." },
      { label: "Possession", value: "[YEAR]" },
      { label: "Configuration", value: "[X/X/X BHK]" },
    ],
    year: 2023,
    area: "[TOTAL AREA] sq. ft.",
    units: 120,
    floors: 24,
    featured: true,
  },
  {
    id: "2",
    slug: "golden-villas",
    name: "Golden Villas",
    tagline: "Private luxury, naturally yours",
    location: "[LOCATION — e.g. Shamshabad, Hyderabad]",
    type: "Villas",
    status: "Ongoing",
    description:
      "An exclusive gated community of premium villas designed around nature, offering unmatched privacy and luxury in a serene environment.",
    overview:
      "Golden Villas is an exceptional collection of independently designed luxury villas nestled within a lush gated community. Each villa is a masterpiece of architectural design, blending contemporary aesthetics with the tranquility of nature. [REPLACE WITH ACTUAL PROJECT DESCRIPTION]",
    heroImage:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    ],
    amenities: [
      "Private Pool",
      "Landscaped Garden",
      "Home Theatre",
      "Smart Home Automation",
      "24/7 Security",
      "Club House",
      "Jogging Track",
      "Meditation Pavilion",
    ],
    specifications: [
      { label: "Total Villas", value: "[XX] Villas" },
      { label: "Plot Size", value: "[XXX – XXX] sq. yards" },
      { label: "Built-up Area", value: "[XXXX – XXXX] sq. ft." },
      { label: "Possession", value: "[YEAR]" },
      { label: "Configuration", value: "[X/X BHK Villas]" },
    ],
    year: 2024,
    area: "[TOTAL AREA] acres",
    units: 48,
    floors: 2,
    featured: true,
  },
  {
    id: "3",
    slug: "parkview-residences",
    name: "Parkview Residences",
    tagline: "Modern living, timeless design",
    location: "[LOCATION — e.g. Gachibowli, Hyderabad]",
    type: "Apartments",
    status: "Upcoming",
    description:
      "Contemporary apartment residences with park-facing views, premium interiors and every modern convenience within reach.",
    overview:
      "Parkview Residences is a curated collection of thoughtfully designed apartments that bring together the best of contemporary architecture and verdant surroundings. With direct access to a landscaped park, residents enjoy a healthy, vibrant lifestyle. [REPLACE WITH ACTUAL PROJECT DESCRIPTION]",
    heroImage:
      "https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
    amenities: [
      "Park View Balconies",
      "Swimming Pool",
      "Gymnasium",
      "Community Hall",
      "Children's Park",
      "Covered Parking",
      "Power Backup",
      "EV Charging Points",
    ],
    specifications: [
      { label: "Total Units", value: "[XX] Units" },
      { label: "Floors", value: "[XX] Floors" },
      { label: "Area Range", value: "[XXX – XXXX] sq. ft." },
      { label: "Possession", value: "[YEAR]" },
      { label: "Configuration", value: "[X/X/X BHK]" },
    ],
    year: 2025,
    area: "[TOTAL AREA] sq. ft.",
    units: 200,
    floors: 18,
    featured: true,
  },
  {
    id: "4",
    slug: "commerce-one",
    name: "Commerce One",
    tagline: "The future of business spaces",
    location: "[LOCATION — e.g. HITEC City, Hyderabad]",
    type: "Commercial",
    status: "Planning",
    description:
      "A premium Grade-A commercial complex designed for modern enterprises, offering best-in-class office spaces, retail zones and business amenities.",
    overview:
      "Commerce One is P-KOT's flagship commercial development, setting a new benchmark for Grade-A office spaces. Designed for the future of work, this development features intelligent building systems, premium specifications and an address that commands respect. [REPLACE WITH ACTUAL PROJECT DESCRIPTION]",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    ],
    amenities: [
      "Double Height Lobby",
      "High-Speed Elevators",
      "CCTV Surveillance",
      "Fire Safety Systems",
      "Conference Facilities",
      "Food Court",
      "Ample Parking",
      "24/7 Power Backup",
    ],
    specifications: [
      { label: "Total Area", value: "[XX,XXX] sq. ft." },
      { label: "Floors", value: "[XX] Floors" },
      { label: "Floor Plate", value: "[XXXX] sq. ft." },
      { label: "Handover", value: "[YEAR]" },
      { label: "Grade", value: "Grade A" },
    ],
    year: 2026,
    area: "[TOTAL AREA] sq. ft.",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
