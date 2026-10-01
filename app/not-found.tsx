import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section
      className="min-h-screen bg-[#0f2d1e] flex items-center justify-center px-6"
      aria-labelledby="not-found-heading"
    >
      <div className="text-center">
        <p
          className="font-serif text-[clamp(8rem,25vw,20rem)] font-light text-[#f8f5ee]/5 leading-none"
          aria-hidden="true"
        >
          404
        </p>
        <div className="-mt-12 md:-mt-24 relative z-10">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">
            Page Not Found
          </p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6 mx-auto" aria-hidden="true" />
          <h1
            id="not-found-heading"
            className="font-serif text-4xl md:text-5xl font-light text-[#f8f5ee] mb-4"
          >
            Oops. This page doesn&apos;t exist.
          </h1>
          <p className="text-base text-[#e8d5a3]/60 font-light mb-10 max-w-md mx-auto">
            The page you are looking for may have been moved, renamed or is
            temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-[#c9a84c] text-[#0f2d1e] text-xs tracking-[0.25em] px-8 py-4 font-medium uppercase hover:bg-[#e8d5a3] transition-colors duration-500"
            >
              <Home size={14} aria-hidden="true" />
              Go Home
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 border border-[#f8f5ee]/20 text-[#f8f5ee] text-xs tracking-[0.25em] px-8 py-4 font-light uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-500"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
