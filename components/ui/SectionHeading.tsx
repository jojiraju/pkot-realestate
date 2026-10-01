import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={cn("mb-12", alignClass, className)}>
      {eyebrow && (
        <p className={cn(
          "text-xs tracking-[0.4em] font-light mb-4 uppercase",
          light ? "text-[#c9a84c]" : "text-[#c9a84c]"
        )}>
          {eyebrow}
        </p>
      )}
      {align === "left" && (
        <div className="w-10 h-px bg-[#c9a84c] mb-5" />
      )}
      <h2 className={cn(
        "font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight",
        light ? "text-[#f8f5ee]" : "text-[#1a3d2b]"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-5 text-base md:text-lg font-light leading-relaxed max-w-2xl",
          align === "center" && "mx-auto",
          light ? "text-[#e8d5a3]/80" : "text-[#6b6b5a]"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
