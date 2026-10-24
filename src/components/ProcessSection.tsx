/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { processStepsData, processContactInfo } from "../data/process.ts";
import { useReveal } from "../hooks/useReveal.js";

export default function ProcessSection() {
  const headerRef = useReveal();
  const stepsMobileRef = useReveal({ selector: ".reveal-card" });
  const stepsDesktopRef = useReveal({ selector: ".reveal-card" });

  return (
    <section
      id="process"
      className="py-20 lg:py-28 bg-[#5F2147] text-[#F7F2EB] border-b border-[#9D9792]/30"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* HEADER: Wine background, Eyebrow in gold, H2 in cream */}
        <div ref={headerRef} className="reveal-header max-w-2xl mb-14 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C7A05A] block mb-3">
            HOW IT WORKS.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F2EB] leading-tight">
            From first call to <em className="italic font-normal">final reveal</em>.
          </h2>
        </div>

        {/* STEPS: Horizontal row on desktop, vertical timeline on mobile */}
        {/* Mobile / Tablet vertical timeline */}
        <div ref={stepsMobileRef} className="lg:hidden relative pl-8 sm:pl-10 border-l border-[#C7A05A]/40 space-y-10">
          {processStepsData.map((item, idx) => (
            <div key={item.step} className={`reveal-card stagger-${idx + 1} relative`}>
              {/* Timeline marker */}
              <div
                className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-4 h-4 bg-[#5F2147] border-2 border-[#C7A05A] flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 bg-[#C7A05A]" />
              </div>

              {/* Gold numeral */}
              <span className="font-serif text-3xl font-semibold text-[#C7A05A] block mb-1">
                {item.step}.
              </span>

              {/* Cormorant title */}
              <h3 className="font-serif text-2xl font-semibold text-[#F7F2EB] mb-2">
                {item.title}
              </h3>

              {/* Placeholder description - needs client confirmation */}
              {/* Placeholder descriptions and comment that they need confirmation */}
              <p className="text-[#F7F2EB]/90 text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop horizontal row */}
        <div ref={stepsDesktopRef} className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
          {processStepsData.map((item, idx) => (
            <div
              key={item.step}
              className={`reveal-card stagger-${idx + 1} border-t border-[#C7A05A]/40 pt-6 relative flex flex-col justify-start`}
            >
              {/* Gold connector accent dot */}
              <div
                className="absolute -top-[5px] left-0 w-2.5 h-2.5 bg-[#C7A05A]"
                aria-hidden="true"
              />

              {/* Gold numeral */}
              <span className="font-serif text-3xl lg:text-4xl font-semibold text-[#C7A05A] block mb-3">
                {item.step}.
              </span>

              {/* Cormorant title */}
              <h3 className="font-serif text-2xl font-semibold text-[#F7F2EB] mb-3 leading-snug">
                {item.title}
              </h3>

              {/* Placeholder description - needs client confirmation */}
              {/* Placeholder descriptions and comment that they need confirmation */}
              <p className="text-[#F7F2EB]/90 text-[15px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* HOW TO CONTACT STRIP: Three cards in a row below the steps */}
        <div className="mt-16 lg:mt-24 pt-12 border-t border-[#F7F2EB]/20">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="font-serif text-xl sm:text-2xl text-[#F7F2EB] font-semibold">
              Ready to begin your space?
            </h4>
            <div className="inline-flex items-center gap-2 text-xs text-[#C7A05A] font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#C7A05A] animate-pulse" />
              <span>{processContactInfo.replyTimeNote}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 1: Call - tap-to-call link */}
            <div className="bg-[#4A294B]/70 border border-[#9D9792]/40 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C7A05A] font-semibold block mb-2">
                  DIRECT PHONE
                </span>
                <p className="text-xs text-[#F7F2EB]/80 mb-4">
                  Speak directly with our studio lead about your project.
                </p>
              </div>

              <div>
                <a
                  href={processContactInfo.phoneTel}
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-transparent border border-[#F7F2EB]/60 hover:bg-[#F7F2EB] text-[#F7F2EB] hover:text-[#5F2147] font-semibold text-base transition-colors duration-200"
                  aria-label={`Call ${processContactInfo.phoneDisplay}`}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  {processContactInfo.phoneDisplay}
                </a>

                {/* Wrap note saying the team will reply within 10 min */}
                <p className="text-[11px] text-[#C7A05A] mt-2.5 text-center">
                  The team will reply within 10 min
                </p>
              </div>
            </div>

            {/* CARD 2: WhatsApp - gold button */}
            <div className="bg-[#4A294B]/70 border border-[#9D9792]/40 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C7A05A] font-semibold block mb-2">
                  INSTANT MESSAGING
                </span>
                <p className="text-xs text-[#F7F2EB]/80 mb-4">
                  Send plans, site photos, or reference inspirations quickly.
                </p>
              </div>

              <div>
                <a
                  href={processContactInfo.whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-[#C7A05A] hover:bg-[#5F2147] hover:text-[#F7F2EB] text-[#4A294B] font-semibold text-base transition-colors duration-200 shadow-sm"
                  aria-label="Chat with Anuradha on WhatsApp"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp Us
                </a>

                {/* Wrap note saying the team will reply within 10 min */}
                <p className="text-[11px] text-[#C7A05A] mt-2.5 text-center">
                  The team will reply within 10 min
                </p>
              </div>
            </div>

            {/* CARD 3: Consultation / Form */}
            <div className="bg-[#4A294B]/70 border border-[#9D9792]/40 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C7A05A] font-semibold block mb-2">
                  PROJECT BRIEF
                </span>
                <p className="text-xs text-[#F7F2EB]/80 mb-4">
                  Share floor plans, room counts, and preferred design styles.
                </p>
              </div>

              <div>
                <a
                  href={processContactInfo.formLink}
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-transparent border border-[#F7F2EB]/60 hover:bg-[#F7F2EB] text-[#F7F2EB] hover:text-[#5F2147] font-semibold text-base transition-colors duration-200"
                >
                  Request Consultation
                  <svg
                    className="w-4 h-4 ml-2"
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

                <p className="text-[11px] text-[#F7F2EB]/70 mt-2.5 text-center">
                  Structured studio intake form
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
