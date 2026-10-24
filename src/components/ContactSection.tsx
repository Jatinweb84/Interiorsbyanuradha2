/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { services } from "../data/services.js";
import { useReveal } from "../hooks/useReveal.js";

// The six design styles for multi-select chips
const DESIGN_STYLES = [
  "Classic",
  "Rustic",
  "Industrial",
  "Traditional",
  "Elegant",
  "Minimalist",
];

// Manual placeholder budget range options
const BUDGET_OPTIONS = [
  "Select a budget range",
  "Under ₹5 Lakhs",
  "₹5 Lakhs – ₹15 Lakhs",
  "₹15 Lakhs – ₹30 Lakhs",
  "₹30 Lakhs – ₹50 Lakhs",
  "Above ₹50 Lakhs",
  "To be determined / Need guidance",
];

interface EnquiryFormState {
  name: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  preferredStyles: string[];
  message: string;
}

export default function ContactSection() {
  const headerRef = useReveal();

  const [formData, setFormData] = useState<EnquiryFormState>({
    name: "",
    phone: "",
    projectType: services[0]?.title || "Bedroom design",
    budgetRange: BUDGET_OPTIONS[0],
    preferredStyles: [],
    message: "",
  });

  // Honeypot field for spam bots
  const [honeypot, setHoneypot] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Toggle selection for preferred style multi-select chips
  const toggleStyle = (styleName: string) => {
    setFormData((prev) => {
      const exists = prev.preferredStyles.includes(styleName);
      if (exists) {
        return {
          ...prev,
          preferredStyles: prev.preferredStyles.filter((s) => s !== styleName),
        };
      } else {
        return {
          ...prev,
          preferredStyles: [...prev.preferredStyles, styleName],
        };
      }
    });
  };

  /**
   * Builds the formatted WhatsApp message for +91 78286 05596
   */
  const generateWhatsAppMessage = (data: EnquiryFormState): string => {
    const lines = [
      `*New Interior Design Enquiry — Interiors by Anuradha*`,
      ``,
      `*Client Name:* ${data.name.trim()}`,
      `*Contact Phone:* ${data.phone.trim()}`,
      `*Project Type:* ${data.projectType}`,
      `*Budget Range:* ${data.budgetRange}`,
      `*Preferred Style(s):* ${data.preferredStyles.length > 0 ? data.preferredStyles.join(", ") : "Not specified"}`,
      `*Project Vision / Message:* ${data.message.trim() || "None provided"}`,
      ``,
      `_Sent directly from Interiors by Anuradha studio website_`,
    ];
    return `https://wa.me/917828605596?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  /**
   * Save submissions and log enquiry.
   */
  const saveSubmission = async (submission: EnquiryFormState): Promise<boolean> => {
    console.log("Enquiry submission received for WhatsApp:", submission);
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.trim().replace(/[^0-9]/g, "").length < 7) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If honeypot is filled, silently ignore (bot trap)
    if (honeypot.trim() !== "") {
      setIsSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    const targetUrl = generateWhatsAppMessage(formData);
    setWhatsappUrl(targetUrl);

    try {
      await saveSubmission(formData);
      setIsSubmitted(true);

      // Directly open WhatsApp message to +91 78286 05596
      if (typeof window !== "undefined") {
        try {
          window.location.href = targetUrl;
        } catch {
          // Direct button in UI provides immediate fallback
        }
      }
    } catch (err) {
      console.error("Submission error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      projectType: services[0]?.title || "Bedroom design",
      budgetRange: BUDGET_OPTIONS[0],
      preferredStyles: [],
      message: "",
    });
    setErrors({});
    setWhatsappUrl("");
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[#F7F2EB] border-b border-[#9D9792]/30"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* HEADER: Cream background. Eyebrow in wine: "CONTACT." H2 in plum: "Let's talk about your *space*." */}
        <header ref={headerRef} className="reveal-header text-center max-w-2xl mx-auto mb-14 lg:mb-18">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F2147] block mb-3">
            CONTACT.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A294B] tracking-tight">
            Let&apos;s talk about your <em className="italic font-normal">space</em>.
          </h2>
        </header>

        {/* LAYOUT: Two columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Plum card with cream text */}
          <div className="lg:col-span-5 bg-[#4A294B] text-[#F7F2EB] p-8 sm:p-10 border border-[#4A294B] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C7A05A] block mb-2">
                STUDIO DETAILS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F7F2EB] mb-6">
                Get in touch directly
              </h3>

              <div className="space-y-6 pt-2">
                {/* Phone: Tap-to-call link */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#C7A05A] font-semibold mb-1">
                    Phone
                  </span>
                  <a
                    href="tel:+917828605596"
                    className="text-lg sm:text-xl font-medium text-[#F7F2EB] hover:text-[#C7A05A] transition-colors inline-block"
                  >
                    +91 78286 05596
                  </a>
                </div>

                {/* WhatsApp button in gold */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#C7A05A] font-semibold mb-2">
                    Instant Messaging
                  </span>
                  <a
                    href="https://wa.me/917828605596"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C7A05A] hover:bg-[#5F2147] hover:text-[#F7F2EB] text-[#4A294B] font-semibold text-sm tracking-wide transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Address */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#C7A05A] font-semibold mb-1">
                    Studio Address
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-sm sm:text-base text-[#F7F2EB]/90 hover:text-[#C7A05A] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C7A05A] rounded-xs"
                    title="Open studio location in Google Maps"
                    aria-label="Studio address: Interiors by Anuradha, Madan Mahal, Nagpur Rd, Hathital, Jabalpur, Madhya Pradesh 482001. Touch to open in Google Maps"
                  >
                    <svg
                      className="w-5 h-5 text-[#C7A05A] shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="underline underline-offset-4 decoration-[#C7A05A]/50 group-hover:decoration-[#C7A05A] leading-relaxed">
                      Interiors by Anuradha, Madan Mahal, Nagpur Rd, Hathital, Jabalpur, Madhya Pradesh 482001
                    </span>
                  </a>
                </div>

                {/* Hours: 10 am to 10 pm */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#C7A05A] font-semibold mb-1">
                    Hours
                  </span>
                  <p className="text-sm sm:text-base text-[#F7F2EB]/90">
                    10 am to 10 pm
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps embed for the address */}
            {/* Open Google Maps, search the address, choose Share, then Embed a map, and paste the iframe src here. */}
            <div className="mt-8 border border-[#9D9792]/40 bg-[#4A294B] overflow-hidden">
              <div className="aspect-[4/3] lg:aspect-[16/9] w-full">
                <iframe
                  title="Interiors by Anuradha Location Map"
                  src="https://maps.google.com/maps?q=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 bg-[#4A294B] hover:bg-[#5F2147] text-xs sm:text-sm text-[#F7F2EB] border-t border-[#9D9792]/30 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
                aria-label="Open location in Google Maps app"
              >
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <svg
                    className="w-4 h-4 text-[#C7A05A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Open in Google Maps</span>
                </span>
                <span className="text-[#C7A05A] text-xs inline-flex items-center gap-1 font-medium">
                  Get Directions
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Cream card with a warm grey border containing the enquiry form */}
          <div className="lg:col-span-7 bg-[#F7F2EB] border border-[#9D9792] p-8 sm:p-10 shadow-xs">
            {isSubmitted ? (
              /* Plum success message on submit with direct WhatsApp action */
              <div className="bg-[#4A294B] text-[#F7F2EB] p-8 sm:p-12 text-center border border-[#4A294B] animate-fadeIn">
                <div className="w-14 h-14 mx-auto mb-4 border border-[#C7A05A] flex items-center justify-center text-[#C7A05A] rounded-full bg-[#4A294B] shadow-sm">
                  {/* WhatsApp chat icon */}
                  <svg
                    className="w-7 h-7 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F2EB] mb-2">
                  Enquiry Prepared
                </h3>
                <p className="text-sm sm:text-base text-[#F7F2EB]/95 max-w-md mx-auto leading-relaxed mb-6">
                  Your details have been formatted. Redirecting to WhatsApp to send directly to <strong>+91 78286 05596</strong>...
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                  <a
                    href={whatsappUrl || "https://wa.me/917828605596"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C7A05A] hover:bg-[#5F2147] hover:text-[#F7F2EB] text-[#4A294B] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Send Message on WhatsApp</span>
                    <span>→</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F7F2EB] border border-[#C7A05A]/40 hover:border-[#C7A05A] transition-colors cursor-pointer"
                  >
                    Start New Enquiry
                  </button>
                </div>
                <p className="text-xs text-[#F7F2EB]/70">
                  Our team typically replies within 10 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Hidden honeypot field for spam protection */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="website-url">Do not fill this field</label>
                  <input
                    id="website-url"
                    type="text"
                    name="_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name (required) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs uppercase tracking-wider font-semibold text-[#4A294B]"
                    >
                      Name <span className="text-[#5F2147]">*</span>
                    </label>
                    {errors.name && (
                      <span className="text-xs font-semibold text-[#5F2147]">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 bg-[#F7F2EB] border text-[#4A294B] placeholder-[#9D9792] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A05A] focus:border-[#C7A05A] transition-colors ${
                      errors.name ? "border-[#5F2147]" : "border-[#9D9792]"
                    }`}
                  />
                </div>

                {/* Phone (required) - No email field as requested */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs uppercase tracking-wider font-semibold text-[#4A294B]"
                    >
                      Phone <span className="text-[#5F2147]">*</span>
                    </label>
                    {errors.phone && (
                      <span className="text-xs font-semibold text-[#5F2147]">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    placeholder="+91 98XXX XXXXX"
                    className={`w-full px-4 py-3 bg-[#F7F2EB] border text-[#4A294B] placeholder-[#9D9792] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A05A] focus:border-[#C7A05A] transition-colors ${
                      errors.phone ? "border-[#5F2147]" : "border-[#9D9792]"
                    }`}
                  />
                </div>

                {/* Project type: dropdown with the 12 services from services.js, plus "Other" */}
                <div>
                  <label
                    htmlFor="contact-project-type"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#4A294B] mb-1.5"
                  >
                    Project type
                  </label>
                  <select
                    id="contact-project-type"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F7F2EB] border border-[#9D9792] text-[#4A294B] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A05A] focus:border-[#C7A05A] transition-colors cursor-pointer"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Budget range: dropdown with manual placeholder options */}
                <div>
                  <label
                    htmlFor="contact-budget-range"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#4A294B] mb-1.5"
                  >
                    Budget range
                  </label>
                  <select
                    id="contact-budget-range"
                    value={formData.budgetRange}
                    onChange={(e) =>
                      setFormData({ ...formData, budgetRange: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#F7F2EB] border border-[#9D9792] text-[#4A294B] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A05A] focus:border-[#C7A05A] transition-colors cursor-pointer"
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred style: multi-select chips from the six design styles */}
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#4A294B] mb-2">
                    Preferred style (select all that apply)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {DESIGN_STYLES.map((style) => {
                      const isSelected = formData.preferredStyles.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => toggleStyle(style)}
                          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C7A05A] ${
                            isSelected
                              ? "bg-[#5F2147] text-[#F7F2EB] border-[#5F2147]"
                              : "bg-[#F7F2EB] text-[#4A294B] border-[#9D9792] hover:border-[#5F2147]"
                          }`}
                        >
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message: textarea */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#4A294B] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your room, vision, timeline, or questions..."
                    className="w-full px-4 py-3 bg-[#F7F2EB] border border-[#9D9792] text-[#4A294B] placeholder-[#9D9792] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A05A] focus:border-[#C7A05A] transition-colors"
                  />
                </div>

                {/* Submit button in wine, full width */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#5F2147] hover:bg-[#4A294B] text-[#F7F2EB] font-semibold text-sm uppercase tracking-wider transition-colors duration-150 ease cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C7A05A]"
                >
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
