/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#4A294B] text-[#F7F2EB] relative border-t border-[#C7A05A]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Three columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-12">
          {/* Column 1: Wordmark & tagline */}
          <div className="space-y-3">
            <span className="font-serif text-2xl lg:text-3xl text-[#F7F2EB] font-medium tracking-tight block">
              Interiors by Anuradha
            </span>
            {/* Note: "Design that feels like home." is placeholder copy to confirm with Anuradha */}
            <p className="text-[#F7F2EB]/80 text-sm leading-relaxed max-w-sm">
              Design that feels like home.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C7A05A] font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#F7F2EB] hover:text-[#C7A05A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A294B] rounded-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details (Strictly no email or Instagram links) */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C7A05A] font-semibold mb-4">
              Contact Details
            </h3>
            <div className="space-y-3 text-sm text-[#F7F2EB]">
              <address className="not-italic leading-relaxed text-[#F7F2EB]/90">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C7A05A] transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A294B] rounded-xs inline-block"
                  title="Open in Google Maps"
                >
                  Interiors by Anuradha, Madan Mahal, Nagpur Rd, Hathital, Jabalpur, Madhya Pradesh 482001
                </a>
              </address>

              <div>
                <span className="text-xs text-[#C7A05A] block mb-0.5">Phone</span>
                <a
                  href="tel:+917828605596"
                  className="text-[#F7F2EB] hover:text-[#C7A05A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A294B] rounded-xs"
                >
                  +91 78286 05596
                </a>
              </div>

              <div>
                <span className="text-xs text-[#C7A05A] block mb-0.5">WhatsApp</span>
                <a
                  href="https://wa.me/917828605596"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F7F2EB] hover:text-[#C7A05A] underline underline-offset-4 decoration-[#C7A05A]/60 hover:decoration-[#C7A05A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A294B] rounded-xs inline-block"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <span className="text-xs text-[#C7A05A] block mb-0.5">Hours</span>
                <span className="text-[#F7F2EB]/80">10 am to 10 pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Thin gold rule, copyright on left, Back to top on right */}
        <div className="border-t border-[#C7A05A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F2EB]">
          <p>© {currentYear} Interiors by Anuradha. All rights reserved.</p>
          <a
            href="#top"
            className="text-[#F7F2EB] hover:text-[#C7A05A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#4A294B] rounded-xs inline-flex items-center gap-1"
          >
            Back to top
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
