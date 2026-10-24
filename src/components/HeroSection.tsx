/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { businessInfo } from "../data/business.ts";

export default function HeroSection() {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Trigger hero text fade-up animation after loader reveal completion
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as unknown as { __STUDIO_LOADER_DONE__?: boolean }).__STUDIO_LOADER_DONE__) {
      setIsRevealed(true);
      return;
    }

    const onLoaderDone = () => {
      setIsRevealed(true);
    };

    window.addEventListener("studio-loader-complete", onLoaderDone, { once: true });
    return () => window.removeEventListener("studio-loader-complete", onLoaderDone);
  }, []);

  // Subtle parallax effect on hero background image: moves at 0.3x scroll speed, limited to 40px shift
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disabled under prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;

    const updateParallax = () => {
      // Disabled on screens below 768px
      if (window.innerWidth < 768) {
        if (heroBgRef.current) {
          heroBgRef.current.style.transform = "none";
        }
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;
      const shift = Math.min(scrollY * 0.3, 40);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* 
        Hero Section with id="top" 
        Full-width, at least 90vh
        NOTE: Client photo at /public/images/hero.jpg must be the studio's own work in Jabalpur.
      */}
      <section
        id="top"
        className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between bg-[#4A294B] text-[#F7F2EB] overflow-hidden"
      >
        {/* Background photo & plum gradient overlay from the left with subtle parallax */}
        <div
          ref={heroBgRef}
          className="absolute inset-x-0 -top-6 -bottom-10 bg-cover bg-center bg-no-repeat transition-transform ease-out duration-75 will-change-transform motion-reduce:transform-none"
          style={{ backgroundImage: "url('/images/hero.webp'), url('/images/hero.jpg')" }}
          role="img"
          aria-label="Executive office and commercial studio interior with fluted wall paneling and custom cabinetry by Interiors by Anuradha in Jabalpur"
        >
          {/* Plum gradient overlay: deeper on left so cream text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A294B] via-[#4A294B]/90 via-55% to-[#4A294B]/40 lg:to-[#4A294B]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A294B]/80 via-transparent to-[#4A294B]/30" />
        </div>

        {/* Hero Narrative Content */}
        <div className="relative max-w-[1200px] w-full mx-auto px-6 lg:px-8 pt-32 lg:pt-44 pb-12 lg:pb-32 flex-1 flex flex-col justify-center z-10">
          <div className={`max-w-2xl ${isRevealed ? "animate-hero-fade-up" : "hero-content-pending"}`}>
            {/* Eyebrow in gold: INTERIOR DESIGNER · JABALPUR */}
            <div className="mb-4">
              <span className="eyebrow-dark text-[#C7A05A] tracking-[0.2em] font-semibold text-xs uppercase block">
                INTERIOR DESIGNER · JABALPUR
              </span>
            </div>

            {/* H1 in cream with one italic accent word: Spaces designed with intention. */}
            <h1 className="headline-h1 text-[#F7F2EB] mb-6 text-balance">
              Spaces designed with{" "}
              <em className="italic font-normal text-[#F7F2EB]">intention</em>.
            </h1>

            {/* Subcopy in cream at 80% opacity */}
            <p className="text-[#F7F2EB]/80 text-[17px] sm:text-lg leading-[1.7] mb-8 max-w-xl">
              Thoughtfully planned homes, offices, and commercial spaces, from first sketch to final detail.
            </p>

            {/* Buttons: Primary "Book a Free Consultation" & Secondary "See Our Projects" (150ms ease colour transition only) */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
              {/* [CONFIRM whether the consultation is free - client to verify complimentary initial consultation] */}
              <a
                href="#contact"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 text-[15px] font-medium tracking-wide text-[#F7F2EB] bg-[#5F2147] hover:bg-[#4A294B] border border-[#C7A05A]/30 hover:border-[#C7A05A] transition-colors duration-150 ease shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
              >
                Book a Free Consultation
              </a>

              <a
                href="#projects"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-[#F7F2EB] hover:text-[#C7A05A] font-medium transition-colors duration-200 group text-[15px] py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
              >
                <span>See Our Projects</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200 text-[#C7A05A]"
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

          {/* 
            CONSULTATION CTA CARD:
            A small cream card overlapping the bottom edge of the hero on desktop, stacked below it on mobile.
            [CONFIRM consultation length, placeholder: 30 minutes]
          */}
          <div className="mt-12 lg:mt-0 lg:absolute lg:bottom-0 lg:right-8 lg:translate-y-1/2 w-full lg:w-[400px] bg-[#F7F2EB] text-[#4A294B] border border-[#9D9792]/50 p-6 sm:p-7 shadow-xl z-20">
            <span className="eyebrow-light text-[11px] tracking-[0.2em] mb-1.5 block">
              Direct Design Access
            </span>

            <h3 className="font-serif text-2xl font-semibold text-[#4A294B] mb-2 leading-snug">
              Start with a consultation
            </h3>

            {/* [CONFIRM consultation length, placeholder: 30 minutes - client to confirm duration] */}
            <p className="text-sm text-[#4A294B]/85 leading-relaxed mb-5">
              Reserve a dedicated 30-minute dialogue with Anuradha to review layouts, styles, and vision for your Jabalpur space.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#9D9792]/25">
              <a
                href="#contact"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 text-center text-[13px] font-semibold tracking-wide text-[#F7F2EB] bg-[#5F2147] hover:bg-[#4A294B] transition-colors duration-150 ease whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
              >
                Request a Call Back
              </a>

              <a
                href={businessInfo.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start gap-1 text-sm font-semibold text-[#C7A05A] hover:text-[#5F2147] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
              >
                <span>WhatsApp</span>
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 
        TRUST STRIP directly below the card:
        Plum background, gold text.
        Shows "5.0 on Google · 7 reviews" and "Residential · Commercial · Hospitality."
        The Google text links to #reviews.
      */}
      <section className="bg-[#4A294B] text-[#C7A05A] border-t border-b border-[#C7A05A]/20 py-4 lg:py-5 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 lg:pr-[430px] text-xs sm:text-sm font-medium tracking-wide">
            {/* Google Rating Link */}
            <a
              href="#reviews"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 hover:underline hover:text-[#F7F2EB] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-[#C7A05A] fill-[#C7A05A]"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-[#F7F2EB]">5.0 on Google</span>
              <span className="text-[#C7A05A]">·</span>
              <span>7 reviews</span>
            </a>

            {/* Scope / Typology */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C7A05A]">
              <span>Residential</span>
              <span className="text-[#C7A05A]/60">·</span>
              <span>Commercial</span>
              <span className="text-[#C7A05A]/60">·</span>
              <span>Hospitality</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
