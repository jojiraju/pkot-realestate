import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LenisProvider from "@/components/providers/LenisProvider";
import Preloader from "@/components/ui/Preloader";
import AutoReveal from "@/components/motion/AutoReveal";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pkotrealstate.com"), // [UPDATE WITH ACTUAL DOMAIN]
  title: {
    default: "P-KOT Real Estate and Developers | Building Better Tomorrows",
    template: "%s | P-KOT Real Estate and Developers",
  },
  description:
    "P-KOT Real Estate and Developers — premium residential, commercial and mixed-use developments. Building better tomorrows through visionary architecture, quality craftsmanship and enduring design.",
  keywords: [
    "P-KOT Real Estate",
    "luxury real estate",
    "property developers",
    "residential apartments",
    "premium villas",
    "commercial development",
    "real estate investment",
    "building better tomorrows",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.pkotrealstate.com",
    siteName: "P-KOT Real Estate and Developers",
    title: "P-KOT Real Estate and Developers | Building Better Tomorrows",
    description:
      "Premium real estate development — landmark residential, commercial and mixed-use projects crafted with integrity, design excellence and long-term vision.",
    images: [
      {
        url: "/pkot-logo.jpg",
        width: 1200,
        height: 630,
        alt: "P-KOT Real Estate and Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P-KOT Real Estate and Developers",
    description: "Building Better Tomorrows — Premium Real Estate & Development",
    images: ["/pkot-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <Preloader />
        <LenisProvider>
          <AutoReveal />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
