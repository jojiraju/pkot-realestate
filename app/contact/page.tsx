import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with P-KOT Real Estate and Developers. Enquire about our projects, properties or services.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-[#0f2d1e] pt-40 pb-20 overflow-hidden"
        aria-label="Contact hero"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] border border-[#c9a84c]/10 rounded-full" />
          <div className="absolute top-20 right-20 w-[200px] h-[200px] border border-[#c9a84c]/5 rounded-full" />
        </div>
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-10">
          <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">
            Get In Touch
          </p>
          <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#f8f5ee] leading-[1.05]">
            Let&apos;s build your
            <br />
            <em className="text-[#c9a84c] not-italic">better tomorrow.</em>
          </h1>
          <p className="mt-6 text-base text-[#e8d5a3]/70 font-light max-w-lg leading-relaxed">
            Whether you are looking for your dream home, planning a real estate
            investment or seeking development expertise, our team is here to
            help.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-[#f8f5ee] py-24 lg:py-36" aria-label="Contact information and form">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info — sidebar */}
            <aside className="lg:col-span-2" aria-label="Contact details">
              <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mb-8">
                Reach us directly
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#6b6b5a] mb-1 uppercase">
                      Phone
                    </p>
                    <a
                      href="tel:+910000000000"
                      className="text-base font-light text-[#1a3d2b] hover:text-[#c9a84c] transition-colors duration-300"
                    >
                      [PHONE NUMBER]
                    </a>
                    <br />
                    <a
                      href="tel:+910000000000"
                      className="text-base font-light text-[#1a3d2b] hover:text-[#c9a84c] transition-colors duration-300"
                    >
                      [ALTERNATE PHONE]
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#6b6b5a] mb-1 uppercase">
                      Email
                    </p>
                    <a
                      href="mailto:info@pkotrealstate.com"
                      className="text-base font-light text-[#1a3d2b] hover:text-[#c9a84c] transition-colors duration-300 break-all"
                    >
                      [EMAIL ADDRESS]
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] flex-shrink-0"
                    aria-hidden="true"
                  >
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#6b6b5a] mb-1 uppercase">
                      Office
                    </p>
                    <address className="text-base font-light text-[#1a3d2b] not-italic leading-relaxed">
                      [OFFICE ADDRESS LINE 1]
                      <br />
                      [CITY, STATE — PIN CODE]
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[#6b6b5a] mb-1 uppercase">
                      Hours
                    </p>
                    <p className="text-base font-light text-[#1a3d2b]">
                      Mon – Fri: [9:00 AM – 6:00 PM]
                    </p>
                    <p className="text-base font-light text-[#1a3d2b]">
                      Saturday: [9:00 AM – 2:00 PM]
                    </p>
                    <p className="text-base font-light text-[#6b6b5a]">
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="relative w-full bg-[#1a3d2b]/10 border border-[#1a3d2b]/20 flex items-center justify-center"
                style={{ height: "240px" }}
                aria-label="Office location map placeholder"
              >
                <div className="text-center">
                  <MapPin
                    className="mx-auto text-[#c9a84c] mb-3"
                    size={32}
                    aria-hidden="true"
                  />
                  <p className="text-xs text-[#6b6b5a] font-light tracking-wide">
                    [EMBED GOOGLE MAPS HERE]
                  </p>
                  <p className="text-xs text-[#6b6b5a]/60 font-light mt-1">
                    Replace with actual map embed
                  </p>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mb-8">
                Send us an enquiry
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
