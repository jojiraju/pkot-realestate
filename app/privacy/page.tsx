import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "P-KOT Real Estate and Developers Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-[#f8f5ee] pt-40 pb-24" aria-labelledby="privacy-heading">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.4em] text-[#c9a84c] mb-4 uppercase">Legal</p>
        <div className="w-10 h-px bg-[#c9a84c] mb-6" aria-hidden="true" />
        <h1 id="privacy-heading" className="font-serif text-4xl md:text-5xl font-light text-[#1a3d2b] mb-10">
          Privacy Policy
        </h1>
        <div className="prose prose-sm max-w-none text-[#6b6b5a] font-light leading-relaxed space-y-6">
          <p className="text-xs text-[#6b6b5a]/60 italic">
            Last updated: [DATE] — [REPLACE WITH ACTUAL PRIVACY POLICY]
          </p>
          <p>
            P-KOT Real Estate and Developers (&ldquo;P-KOT&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website and use our services.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Information We Collect</h2>
          <p>
            We may collect information you provide directly to us, such as when you fill out an enquiry form, subscribe to our communications or contact us directly. This may include your name, email address, phone number and other contact information.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your enquiries, provide information about our projects and services, send you updates and marketing communications (where you have consented), and improve our services.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Information Sharing</h2>
          <p>
            We do not sell, trade or otherwise transfer your personally identifiable information to third parties without your consent, except as described in this policy or as required by law.
          </p>
          <h2 className="font-serif text-2xl font-light text-[#1a3d2b] mt-8">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at [EMAIL ADDRESS].
          </p>
          <p className="italic text-xs text-[#6b6b5a]/60 mt-8">
            [This is a placeholder Privacy Policy. Please consult a legal professional to create a compliant Privacy Policy for your business.]
          </p>
        </div>
      </div>
    </section>
  );
}
