import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "real-estate-development",
    icon: "Building2",
    title: "Real Estate Development",
    description:
      "End-to-end real estate development from site acquisition through planning, construction and delivery. We create landmark developments that stand the test of time.",
    details: [
      "Site acquisition and feasibility analysis",
      "Master planning and design coordination",
      "Project management and execution",
      "Quality control and delivery",
    ],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: "2",
    slug: "residential-projects",
    icon: "Home",
    title: "Residential Projects",
    description:
      "Premium residential developments — apartments, villas and gated communities — designed to elevate the everyday living experience.",
    details: [
      "Luxury apartment complexes",
      "Premium villa communities",
      "Gated residential townships",
      "Affordable premium housing",
    ],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  },
  {
    id: "3",
    slug: "commercial-development",
    icon: "Briefcase",
    title: "Commercial Development",
    description:
      "Grade-A commercial spaces designed for the modern enterprise — from corporate headquarters to retail destinations and mixed-use developments.",
    details: [
      "Grade-A office developments",
      "Retail and commercial complexes",
      "Mixed-use developments",
      "Business parks",
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "4",
    slug: "land-development",
    icon: "Map",
    title: "Land Development",
    description:
      "Strategic land development and acquisition services, transforming raw land into premium plots, townships and development-ready parcels.",
    details: [
      "Land acquisition and due diligence",
      "Layout development and approvals",
      "Infrastructure development",
      "Plot marketing and sales",
    ],
    image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800&q=80",
  },
  {
    id: "5",
    slug: "investment-opportunities",
    icon: "TrendingUp",
    title: "Investment Opportunities",
    description:
      "Curated real estate investment opportunities with strong fundamentals, transparent governance and attractive long-term returns.",
    details: [
      "Pre-launch investment opportunities",
      "NRI investment advisory",
      "Portfolio diversification",
      "Return on investment analysis",
    ],
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80",
  },
  {
    id: "6",
    slug: "property-management",
    icon: "Settings",
    title: "Property Management",
    description:
      "Comprehensive property management services ensuring your investment is maintained, managed and maximized with care and professionalism.",
    details: [
      "Facilities management",
      "Tenant management",
      "Maintenance and upkeep",
      "Annual property reporting",
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    id: "7",
    slug: "project-consultancy",
    icon: "Lightbulb",
    title: "Project Consultancy",
    description:
      "Expert consultancy services guiding developers, investors and landowners through the complexities of real estate development.",
    details: [
      "Feasibility studies",
      "Development advisory",
      "Regulatory and approval guidance",
      "Market research and analysis",
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    id: "8",
    slug: "design-architecture",
    icon: "Ruler",
    title: "Design & Architecture",
    description:
      "In-house design and architecture expertise creating spaces that are beautiful, functional and enduring in their appeal.",
    details: [
      "Architectural design",
      "Interior design coordination",
      "Landscape design",
      "Sustainable design practices",
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
