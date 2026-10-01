"use client";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  linkClassName?: string;
}

export default function Logo({ size = "md", className = "", linkClassName = "" }: LogoProps) {
  const sizes = {
    sm: { width: 48, height: 48 },
    md: { width: 64, height: 64 },
    lg: { width: 96, height: 96 },
  };

  const { width, height } = sizes[size];

  return (
    <Link href="/" className={`flex items-center gap-3 group ${linkClassName}`} aria-label="P-KOT Real Estate — Home">
      <div className={`relative flex-shrink-0 ${className}`} style={{ width, height }}>
        <Image
          src="/pkot-logo.jpg"
          alt="P-KOT Real Estate and Developers"
          fill
          className="object-contain rounded-full"
          priority
        />
      </div>
      <div className="hidden xl:block">
        <p className="text-xs tracking-[0.3em] text-[#c9a84c] font-light leading-none mb-0.5">P-KOT</p>
        <p className="text-[10px] tracking-[0.2em] text-current font-light opacity-70 leading-none">REAL ESTATE & DEVELOPERS</p>
      </div>
    </Link>
  );
}
