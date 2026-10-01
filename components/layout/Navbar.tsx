"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Properties", href: "/properties" },
  { label: "Developments", href: "/developments" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Solid background after leaving the top; hide while scrolling down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 400);
        lastY = y;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation (state adjusted during render, not in an effect)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          scrolled ? "nav-solid py-3" : "nav-transparent py-5"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
        role="banner"
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Logo size={scrolled ? "sm" : "md"} />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm tracking-[0.12em] font-light transition-colors duration-300 pb-1 ${
                  isActive(link.href) ? "text-[#c9a84c]" : "text-[#f8f5ee] hover:text-[#c9a84c]"
                }`}
              >
                <span className="text-roll">
                  <span>{link.label}</span>
                  <span aria-hidden="true">{link.label}</span>
                </span>
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9a84c]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="group relative overflow-hidden border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.2em] px-6 py-2.5 font-light transition-all duration-500 hover:text-[#0f2d1e]"
            >
              <span className="absolute inset-0 bg-[#c9a84c] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <span className="relative text-roll">
                <span>ENQUIRE NOW</span>
                <span aria-hidden="true">ENQUIRE NOW</span>
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-[#f8f5ee] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0f2d1e] flex flex-col justify-center px-8"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              <div className="absolute top-1/4 right-8 w-64 h-64 border border-[#c9a84c] rounded-full" />
              <div className="absolute bottom-1/4 left-8 w-40 h-40 border border-[#c9a84c] rounded-full" />
            </div>

            <nav aria-label="Mobile navigation links">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`group flex items-center justify-between border-b py-5 transition-colors duration-300 ${
                      isActive(link.href)
                        ? "border-[#c9a84c] text-[#c9a84c]"
                        : "border-[#2d6a4f]/30 text-[#f8f5ee] hover:text-[#c9a84c] hover:border-[#c9a84c]"
                    }`}
                  >
                    <span className="font-serif text-3xl font-light">{link.label}</span>
                    <ChevronRight
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#c9a84c]"
                      size={20}
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Link
                  href="/contact"
                  className="inline-block border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.3em] px-8 py-4"
                >
                  ENQUIRE NOW
                </Link>
              </motion.div>
            </nav>

            {/* Bottom brand text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 left-8 text-[10px] tracking-[0.3em] text-[#e8d5a3]"
            >
              BUILDING BETTER TOMORROWS
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
