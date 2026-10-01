import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

// Social icon SVG components (brand icons not in this lucide-react version)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.95C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);


const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Properties", href: "/properties" },
    { label: "Developments", href: "/developments" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: XIcon, href: "#", label: "Twitter / X" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];


export default function Footer() {
  return (
    <footer className="bg-[#0f2d1e] text-[#f8f5ee] relative overflow-hidden" role="contentinfo">
      {/* Gold architectural line */}
      <div className="gold-line opacity-40" aria-hidden="true" />

      {/* Background decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 border border-[#c9a84c]/10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-[#c9a84c]/10 rounded-full" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/pkot-logo.jpg"
                  alt="P-KOT Real Estate and Developers"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-xs tracking-[0.3em] text-[#c9a84c] mb-1">P-KOT REAL ESTATE</p>
            <p className="text-xs tracking-[0.2em] text-[#e8d5a3]/60 mb-6">AND DEVELOPERS</p>
            <p className="text-sm text-[#e8d5a3]/70 font-light leading-relaxed mb-8">
              Building better tomorrows through visionary real estate development, premium craftsmanship and enduring design.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c]/60 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-[#c9a84c] mb-6 uppercase">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#e8d5a3]/70 hover:text-[#c9a84c] transition-colors duration-300 font-light arch-line pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-[#c9a84c] mb-6 uppercase">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <a href="tel:+910000000000" className="text-sm text-[#e8d5a3]/70 hover:text-[#c9a84c] transition-colors duration-300 font-light">
                  [PHONE NUMBER]
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@pkotrealstate.com" className="text-sm text-[#e8d5a3]/70 hover:text-[#c9a84c] transition-colors duration-300 font-light break-all">
                  [EMAIL ADDRESS]
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <address className="text-sm text-[#e8d5a3]/70 font-light not-italic leading-relaxed">
                  [OFFICE ADDRESS]<br />
                  [CITY, STATE, PIN]
                </address>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-[#c9a84c] mb-6 uppercase">Business Hours</h3>
            <ul className="space-y-2 text-sm text-[#e8d5a3]/70 font-light">
              <li>Monday – Friday</li>
              <li className="text-[#e8d5a3]">[9:00 AM – 6:00 PM]</li>
              <li className="mt-3">Saturday</li>
              <li className="text-[#e8d5a3]">[9:00 AM – 2:00 PM]</li>
              <li className="mt-3">Sunday</li>
              <li className="text-[#e8d5a3]/50">By Appointment Only</li>
            </ul>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block border border-[#c9a84c] text-[#c9a84c] text-[10px] tracking-[0.3em] px-5 py-3 hover:bg-[#c9a84c] hover:text-[#0f2d1e] transition-all duration-500"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2d6a4f]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#e8d5a3]/40 font-light tracking-wide">
            © {new Date().getFullYear()} P-KOT Real Estate and Developers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#e8d5a3]/40 hover:text-[#c9a84c] transition-colors duration-300 font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.4em] text-[#c9a84c]/40 uppercase">
            Building Better Tomorrows
          </p>
        </div>
      </div>
    </footer>
  );
}
