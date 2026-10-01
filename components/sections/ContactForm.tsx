"use client";
import { useState, FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  project: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // NOTE: Form submission not connected to backend. Integrate with your API/email service.
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle className="text-[#2d6a4f] mb-4" size={48} aria-hidden="true" />
        <h3 className="font-serif text-2xl text-[#1a3d2b] mb-3">Enquiry Received</h3>
        <p className="text-[#6b6b5a] font-light max-w-md">
          Thank you for reaching out to P-KOT Real Estate and Developers. Our team will be in touch with you shortly.
        </p>
        <p className="text-xs text-[#6b6b5a]/60 mt-4 italic">
          Note: This form is not yet connected to a backend. No data has been transmitted.
        </p>
      </div>
    );
  }

  const inputClasses = (field: keyof FormErrors) =>
    `w-full bg-transparent border-b py-3 text-sm font-light text-[#1a3d2b] placeholder-[#6b6b5a]/60 focus:outline-none transition-colors duration-300 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-[#1a3d2b]/20 focus:border-[#c9a84c]"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Enquiry form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs tracking-[0.2em] text-[#6b6b5a] mb-2 uppercase">
            Full Name <span className="text-[#c9a84c]" aria-label="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClasses("name")}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs tracking-[0.2em] text-[#6b6b5a] mb-2 uppercase">
            Email Address <span className="text-[#c9a84c]" aria-label="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={inputClasses("email")}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs tracking-[0.2em] text-[#6b6b5a] mb-2 uppercase">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-transparent border-b border-[#1a3d2b]/20 focus:border-[#c9a84c] py-3 text-sm font-light text-[#1a3d2b] placeholder-[#6b6b5a]/60 focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Project interest */}
        <div>
          <label htmlFor="project" className="block text-xs tracking-[0.2em] text-[#6b6b5a] mb-2 uppercase">
            Project / Interest
          </label>
          <select
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#1a3d2b]/20 focus:border-[#c9a84c] py-3 text-sm font-light text-[#1a3d2b] focus:outline-none transition-colors duration-300 cursor-pointer"
          >
            <option value="">Select a project or service</option>
            <option value="emerald-heights">Emerald Heights</option>
            <option value="golden-villas">Golden Villas</option>
            <option value="parkview-residences">Parkview Residences</option>
            <option value="commerce-one">Commerce One</option>
            <option value="investment">Investment Enquiry</option>
            <option value="general">General Enquiry</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mb-10">
        <label htmlFor="message" className="block text-xs tracking-[0.2em] text-[#6b6b5a] mb-2 uppercase">
          Message <span className="text-[#c9a84c]" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          rows={5}
          className={`${inputClasses("message")} resize-none`}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-500 mt-1" role="alert">{errors.message}</p>
        )}
      </div>

      <p className="text-xs text-[#6b6b5a]/60 italic mb-6">
        Note: Form submission is not yet connected to a backend service. Contact us directly at [EMAIL ADDRESS] until integration is complete.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="group flex items-center gap-3 bg-[#1a3d2b] text-[#f8f5ee] text-xs tracking-[0.25em] px-10 py-4 uppercase hover:bg-[#c9a84c] hover:text-[#0f2d1e] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label={submitting ? "Submitting enquiry..." : "Submit enquiry"}
      >
        {submitting ? (
          <>Sending...</>
        ) : (
          <>
            Submit Enquiry
            <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
