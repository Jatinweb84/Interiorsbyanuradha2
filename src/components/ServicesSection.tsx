/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
// Load the 12 services from /src/data/services.js as required by prompt
import { services } from "../data/services.js";
import { useReveal } from "../hooks/useReveal.js";

// Helper renderer for gold inline SVG line icons
function renderServiceIcon(iconType: string) {
  switch (iconType) {
    case "bedroom":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 7v11M21 7v11M3 13h18M3 17h18M6 13V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
          <rect x="7" y="9.5" width="4" height="2" rx="0.5" />
          <rect x="13" y="9.5" width="4" height="2" rx="0.5" />
        </svg>
      );
    case "bathroom":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12h16a1 1 0 0 1 1 1v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2a1 1 0 0 1 1-1Z" />
          <path d="M5 21l1-2M19 21l-1-2M5 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1" />
          <path d="M10 7h2" />
        </svg>
      );
    case "dining":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2v4M8 6h8l-1.5 3h-5L8 6zM4 14h16M7 14v7M17 14v7M5 17h14" />
          <path d="M2 13h2M20 13h2" />
        </svg>
      );
    case "wardrobe":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="10" y1="11" x2="10" y2="13" />
          <line x1="14" y1="11" x2="14" y2="13" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      );
    case "cabinetry":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="10" y1="7" x2="14" y2="7" />
          <line x1="10" y1="15" x2="14" y2="15" />
          <circle cx="12" cy="7" r="1" fill="#C7A05A" />
          <circle cx="12" cy="15" r="1" fill="#C7A05A" />
        </svg>
      );
    case "commercial":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <line x1="8" y1="7" x2="10" y2="7" />
          <line x1="14" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="10" y2="11" />
          <line x1="14" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="10" y2="15" />
          <line x1="14" y1="15" x2="16" y2="15" />
          <path d="M10 21v-3h4v3" />
        </svg>
      );
    case "hospitality":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4v2" />
          <circle cx="12" cy="4" r="1" />
          <path d="M4 17h16" />
          <path d="M4 17a8 8 0 0 1 16 0" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case "architecture":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 21h18" />
          <path d="M3 21L19 5l-2-2L3 17v4z" />
          <path d="M7 17l2-2M10 14l2-2M13 11l2-2" />
        </svg>
      );
    case "flooring":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="7.5" y1="3" x2="7.5" y2="12" />
          <line x1="16.5" y1="12" x2="16.5" y2="21" />
          <line x1="3" y1="7.5" x2="12" y2="7.5" />
          <line x1="12" y1="16.5" x2="21" y2="16.5" />
        </svg>
      );
    case "appliances":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16" cy="9" r="2.5" />
          <line x1="3" y1="15" x2="21" y2="15" />
          <circle cx="7" cy="18" r="0.75" fill="#C7A05A" />
          <circle cx="12" cy="18" r="0.75" fill="#C7A05A" />
          <circle cx="17" cy="18" r="0.75" fill="#C7A05A" />
        </svg>
      );
    case "decor":
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 10h6l1.5 5a4 4 0 0 1-4 5h-1a4 4 0 0 1-4-5L9 10z" />
          <path d="M10 10V7h4v3" />
          <path d="M12 7V3" />
          <path d="M12 4c1-1 3-1 3 0s-2 2-3 2" />
          <path d="M12 5c-1-1-3-1-3 0s2 2 3 2" />
        </svg>
      );
    case "art":
    default:
      return (
        <svg
          className="w-8 h-8 text-[#C7A05A]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="15" rx="1" />
          <circle cx="8" cy="9" r="1.5" />
          <path d="M21 15l-5-5L5 19" />
          <line x1="2" y1="21" x2="22" y2="21" />
        </svg>
      );
  }
}

export default function ServicesSection() {
  const headerRef = useReveal();
  const gridRef = useReveal({ selector: ".reveal-card" });

  const scrollToContact = (e: React.MouseEvent, serviceTitle?: string) => {
    e.preventDefault();
    if (serviceTitle) {
      window.dispatchEvent(
        new CustomEvent("studio-select-service", {
          detail: { service: serviceTitle },
        })
      );
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = contactSection.querySelector<HTMLInputElement>("input#fullName");
        input?.focus();
      }, 450);
    }
  };

  return (
    <section
      id="services"
      className="py-[72px] lg:py-[120px] bg-[#F7F2EB] border-b border-[#9D9792]/25"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* HEADER: Cream background, Eyebrow in wine, H2 in plum with italic accent, one-line intro */}
        <div ref={headerRef} className="reveal-header max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F2147] mb-3">
            WHAT WE DO.
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A294B] tracking-tight leading-tight mb-4">
            Design for every room, <em className="italic font-normal">every purpose</em>.
          </h2>
          <p className="text-[17px] text-[#4A294B]/90 leading-relaxed">
            Thoughtfully planned homes, offices, and commercial spaces across Jabalpur, from first sketch to final detail.
          </p>
        </div>

        {/* SERVICE GRID: 12 services in 3-col desktop, 2-col tablet, 1-col mobile */}
        {/* NOTE: Add more services here if additional services are discovered on the studio's Google Business Profile listing */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`reveal-card stagger-${Math.min((index % 6) + 1, 6)} card-hover-lift group p-8 border border-[#9D9792]/40 bg-[#4A294B] hover:bg-[#5F2147] hover:border-[#C7A05A]/50 flex flex-col justify-between shadow-sm`}
            >
              <div>
                {/* Gold inline SVG line icon */}
                <div className="mb-6 flex items-center justify-start">
                  {renderServiceIcon(service.icon)}
                </div>

                {/* Service Name in Cormorant at 28px in cream */}
                <h3 className="font-serif text-[28px] font-semibold text-[#F7F2EB] transition-colors duration-200 leading-tight mb-4">
                  {service.title}
                </h3>

                {/* One-sentence placeholder description in cream */}
                <p className="text-[15px] leading-relaxed text-[#F7F2EB]/90 transition-colors duration-200">
                  {service.description}
                </p>
              </div>

              {/* Discreet architectural accent rule at card bottom & quick consultation link */}
              <div className="pt-6 mt-6 border-t border-[#F7F2EB]/20 transition-colors duration-200 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C7A05A] group-hover:text-[#F7F2EB] transition-colors duration-200">
                  Studio Discipline
                </span>
                <button
                  type="button"
                  onClick={(e) => scrollToContact(e, service.title)}
                  className="text-xs uppercase font-semibold tracking-wider text-[#F7F2EB] hover:text-[#C7A05A] hover:underline cursor-pointer transition-colors duration-150 ease"
                >
                  Consult →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CLOSING CTA: Plum button "Request a Consultation" linking to #contact (150ms ease colour transition only) */}
        <div className="mt-14 sm:mt-16 text-center">
          <a
            href="#contact"
            role="button"
            onClick={(e) => scrollToContact(e)}
            className="inline-flex items-center justify-center bg-[#4A294B] text-[#F7F2EB] hover:bg-[#5F2147] px-9 py-4 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-colors duration-150 ease shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
          >
            <span>Request a Consultation</span>
            <svg
              className="w-4 h-4 ml-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
