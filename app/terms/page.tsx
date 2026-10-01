import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "P-KOT Real Estate and Developers Terms and Conditions.",
};

export default function TermsPage() {
  return (
    <section className="bg-[#f8f5ee] pt-40 pb-24" aria-labelledby="terms-heading">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Legal</p>
        <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
        <h1 id="terms-heading" className="font-serif text-4xl md:text-5xl font-light text-[#1a3d2b] mb-10">
          Terms &amp; Conditions
        </h1>
        <div className="prose prose-sm max-w-none text-[#6b6b5a] font-light leading-relaxed space-y-6">
          <p className="text-xs text-[#6b6b5a]/60 italic">
            Last updated: [DATE] — [REPLACE WITH ACTUAL TERMS AND CONDITIONS]
          </p>
          <p>
            By accessing and using the P-KOT Real Estate and Developers website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Use of Website</h2>
          <p>
            This website is provided for general information purposes about P-KOT Real Estate and Developers and our projects and services. The content on this website is subject to change without notice. We make no warranties or representations about the accuracy or completeness of the information provided.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, images, graphics, logos and design, is the property of P-KOT Real Estate and Developers and is protected by applicable intellectual property laws.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Disclaimer</h2>
          <p>
            The information provided on this website is for general informational purposes only and does not constitute legal, financial or investment advice. Property information, prices and availability are subject to change. Please contact us directly for the most current information.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Contact</h2>
          <p>
            For questions regarding these terms, contact us at [EMAIL ADDRESS].
          </p>
          <p className="italic text-xs text-[#6b6b5a]/60 mt-8">
            [This is a placeholder Terms and Conditions document. Please consult a legal professional to create compliant Terms and Conditions for your business.]
          </p>
        </div>
      </div>
    </section>
  );
}
