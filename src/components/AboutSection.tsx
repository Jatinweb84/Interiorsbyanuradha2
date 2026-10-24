/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useReveal } from "../hooks/useReveal.js";

export default function AboutSection() {
  const headerRef = useReveal();
  const portraitRef = useReveal();
  const statsRef = useReveal({ selector: ".reveal-stat" });

  /*
    NOTE: These four points are placeholder copy to confirm with Anuradha.
  */
  const reasons = [
    {
      numeral: "01",
      title: "Design with intention",
      description: "Every choice serves how the room is actually used.",
    },
    {
      numeral: "02",
      title: "Details matter",
      description: "Finishes, lighting, and hardware are planned from the start.",
    },
    {
      numeral: "03",
      title: "Comfort over trends",
      description: "Spaces that still feel right in ten years.",
    },
    {
      numeral: "04",
      title: "Clear from start to finish",
      description: "One point of contact from first call to handover.",
    },
  ];

  return (
    <section
      id="why-us"
      className="py-[72px] lg:py-[120px] bg-[#4A294B] text-[#F7F2EB] border-b border-[#9D9792]/25 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="reveal-header max-w-2xl mb-12 lg:mb-16">
          {/* Eyebrow in gold: "WHY CHOOSE ANURADHA." */}
          <span className="text-[#C7A05A] text-xs uppercase tracking-[0.2em] font-semibold block mb-3">
            WHY CHOOSE ANURADHA.
          </span>

          {/* H2 in cream with italic accent words */}
          <h2 className="headline-h2 text-[#F7F2EB] text-balance">
            Thoughtful design,{" "}
            <em className="italic font-normal text-[#F7F2EB]">
              carefully executed
            </em>
            .
          </h2>
        </div>

        {/* Split layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Portrait of Anuradha with thin gold frame offset behind it */}
          <div ref={portraitRef} className="reveal-portrait lg:col-span-5 order-2 lg:order-1">
            <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none w-full pr-4 pb-4 sm:pr-6 sm:pb-6 group">
              {/* Thin gold frame offset behind the portrait */}
              <div
                className="absolute top-4 left-4 sm:top-6 sm:left-6 w-full h-full border border-[#C7A05A] pointer-events-none z-0"
                aria-hidden="true"
              />

              {/* Main Portrait Frame */}
              <div className="relative z-10 bg-[#5F2147] border border-[#C7A05A]/40 overflow-hidden shadow-2xl">
                {/* 
                  NOTE: Client portrait at /public/images/anuradha.jpg.
                  Placeholder image to be confirmed and replaced with Anuradha's confirmed studio portrait.
                */}
                <picture>
                  <source srcSet="/images/anuradha.webp" type="image/webp" />
                  <img
                    src="/images/anuradha.jpg"
                    alt="Portrait of Anuradha, founder and lead interior designer at Interiors by Anuradha in Jabalpur"
                    loading="lazy"
                    width="600"
                    height="800"
                    className="w-full h-auto aspect-[3/4] object-cover object-center block"
                  />
                </picture>

                {/* Studio Lead Caption Plaque */}
                <div className="p-4 sm:p-5 bg-[#4A294B] border-t border-[#C7A05A]/30 flex items-center justify-between">
                  <div>
                    <p className="font-serif text-xl font-semibold text-[#F7F2EB]">
                      Anuradha
                    </p>
                    <p className="text-xs text-[#C7A05A] tracking-wider uppercase font-medium mt-0.5">
                      Principal Designer · Jabalpur
                    </p>
                  </div>
                  <span className="text-[11px] text-[#F7F2EB]/70 uppercase tracking-widest px-2.5 py-1 border border-[#C7A05A]/30">
                    Studio Lead
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Four Reasons and Stats Row below them */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between">
            {/* The Four Reasons */}
            <div className="space-y-8 sm:space-y-10">
              {reasons.map((reason) => (
                <div
                  key={reason.numeral}
                  className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 pb-6 border-b border-[#F7F2EB]/15 last:border-b-0"
                >
                  {/* Gold numeral */}
                  <span className="font-serif text-2xl lg:text-3xl font-semibold text-[#C7A05A] tabular-nums shrink-0 pt-1">
                    {reason.numeral}.
                  </span>

                  <div>
                    {/* Cormorant title at 36px */}
                    <h3 className="font-serif text-[28px] sm:text-[36px] leading-[1.15] font-semibold text-[#F7F2EB] mb-2">
                      {reason.title}
                    </h3>

                    {/* Short paragraph */}
                    <p className="text-[16px] text-[#F7F2EB]/85 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 
              STATS ROW below the reasons:
              Three gold figures in Cormorant, each with a label.
              NOTE: Add real figures once confirmed with Anuradha. Do not add invented numbers such as years of experience or project counts.
            */}
            <div ref={statsRef} className="pt-8 sm:pt-10 mt-10 border-t border-[#C7A05A]/30 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {/* Stat 1: 5.0 Google rating */}
              <div className="reveal-stat flex flex-col">
                <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#C7A05A] leading-none">
                  5.0
                </span>
                <span className="text-sm text-[#F7F2EB]/85 font-medium tracking-wide mt-2">
                  Google rating
                </span>
              </div>

              {/* Stat 2: 7 Google reviews */}
              <div className="reveal-stat flex flex-col">
                <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#C7A05A] leading-none">
                  7
                </span>
                <span className="text-sm text-[#F7F2EB]/85 font-medium tracking-wide mt-2">
                  Google reviews
                </span>
              </div>

              {/* Stat 3: Residential, commercial, and hospitality projects */}
              <div className="reveal-stat flex flex-col sm:col-span-1">
                <span className="font-serif text-xl sm:text-2xl font-semibold text-[#C7A05A] leading-snug">
                  Residential, commercial, and hospitality
                </span>
                <span className="text-sm text-[#F7F2EB]/85 font-medium tracking-wide mt-2">
                  projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
