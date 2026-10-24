/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { projects, ProjectData } from "../data/projects.ts";
import { useReveal } from "../hooks/useReveal.js";

export default function ProjectsSection() {
  const headerRef = useReveal();
  const gridRef = useReveal({ selector: ".reveal-card" });

  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Featured");

  // Touch coordinates for mobile swipe
  const touchStartXRef = useRef<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Filter projects based on tab
  const displayedProjects: ProjectData[] =
    activeCategory === "Featured"
      ? projects.slice(0, 3)
      : activeCategory === "All"
        ? projects
        : projects.filter((p: ProjectData) => p.category === activeCategory);

  const isLightboxOpen = selectedProjectIndex !== null;
  const currentProject = isLightboxOpen ? projects[selectedProjectIndex] : null;

  // Handle keyboard navigation & focus trap inside lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    document.body.style.overflow = "hidden";

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedProjectIndex((prev) =>
          prev !== null ? (prev - 1 + projects.length) % projects.length : 0
        );
      } else if (e.key === "ArrowRight") {
        setSelectedProjectIndex((prev) =>
          prev !== null ? (prev + 1) % projects.length : 0
        );
      } else if (e.key === "Tab" && lightboxRef.current) {
        // Focus trap
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Mobile swipe gestures for lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;

    // 50px threshold for swipe
    if (deltaX > 50) {
      // Swiped right -> go to previous
      setSelectedProjectIndex((prev) =>
        prev !== null ? (prev - 1 + projects.length) % projects.length : 0
      );
    } else if (deltaX < -50) {
      // Swiped left -> go to next
      setSelectedProjectIndex((prev) =>
        prev !== null ? (prev + 1) % projects.length : 0
      );
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="projects"
      className="py-[72px] lg:py-[120px] bg-[#F7F2EB] border-b border-[#9D9792]/25"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <div ref={headerRef} className="reveal-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            {/* Eyebrow in wine on cream: "SELECTED WORK." */}
            <span className="eyebrow-light text-[#5F2147] tracking-[0.2em] font-semibold text-xs uppercase mb-3 block">
              SELECTED WORK.
            </span>

            {/* H2 in plum: "Rooms with *character*." */}
            <h2 className="headline-h2 text-[#4A294B] text-balance mb-3">
              Rooms with <em className="italic font-normal">character</em>.
            </h2>

            {/* One-line intro beneath */}
            <p className="text-[17px] text-[#4A294B] max-w-xl leading-relaxed">
              {/* Placeholder copy - needs client approval */}
              A curated look into executed residences and bespoke commercial environments across Jabalpur.
            </p>
          </div>

          {/* Category Tabs: Featured, All, Commercial, Residential */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "Featured", label: "Featured" },
              { id: "All", label: `All (${projects.length})` },
              { id: "Commercial", label: "Commercial" },
              { id: "Residential", label: "Residential" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] ${
                  activeCategory === tab.id
                    ? "bg-[#5F2147] text-[#F7F2EB]"
                    : "bg-transparent text-[#4A294B] hover:bg-[#4A294B]/10 border border-[#9D9792]/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 
          GRID:
          On desktop: an asymmetric layout with one tall image on the left and two stacked on the right.
          Stack all three on mobile.
        */}
        {displayedProjects.length >= 3 && activeCategory === "Featured" ? (
          <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
            {/* LEFT: One tall image (spans 7 cols on desktop) */}
            <div className="reveal-card stagger-1 lg:col-span-7 flex flex-col">
              <div
                onClick={() => setSelectedProjectIndex(0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProjectIndex(0);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${displayedProjects[0].title}`}
                className="card-hover-lift relative group cursor-pointer overflow-hidden border border-[#9D9792]/40 bg-[#4A294B]/10 h-[380px] sm:h-[460px] lg:h-[580px] flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
              >
                <img
                  src={displayedProjects[0].image}
                  alt={displayedProjects[0].alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover overlay: plum background with title in cream and category in gold */}
                <div className="absolute inset-0 bg-[#4A294B]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 sm:p-8 flex flex-col justify-end text-left pointer-events-none">
                  <span className="eyebrow-dark text-[#C7A05A] text-xs font-semibold uppercase tracking-wider mb-2">
                    {displayedProjects[0].category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F2EB] font-semibold leading-tight mb-2">
                    {displayedProjects[0].title}
                  </h3>
                  <p className="text-xs text-[#F7F2EB]/80 inline-flex items-center gap-1">
                    <span>Click to expand in lightbox</span>
                    <span>→</span>
                  </p>
                </div>
              </div>
              {/* Warm grey caption beneath */}
              <p className="mt-2.5 text-xs sm:text-sm text-[#9D9792] font-medium">
                {displayedProjects[0].caption}
              </p>
            </div>

            {/* RIGHT: Two stacked images (spans 5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {displayedProjects.slice(1, 3).map((item, idx) => {
                const projectIndex = idx + 1;
                return (
                  <div key={item.id} className={`reveal-card stagger-${idx + 2} flex flex-col flex-1`}>
                    <div
                      onClick={() => setSelectedProjectIndex(projectIndex)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedProjectIndex(projectIndex);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View ${item.title}`}
                      className="card-hover-lift relative group cursor-pointer overflow-hidden border border-[#9D9792]/40 bg-[#4A294B]/10 h-[220px] sm:h-[260px] lg:h-[265px] flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Hover overlay: plum background with title in cream and category in gold */}
                      <div className="absolute inset-0 bg-[#4A294B]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-left pointer-events-none">
                        <span className="eyebrow-dark text-[#C7A05A] text-xs font-semibold uppercase tracking-wider mb-1">
                          {item.category}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#F7F2EB] font-semibold leading-tight mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#F7F2EB]/80 inline-flex items-center gap-1">
                          <span>Click to expand</span>
                          <span>→</span>
                        </p>
                      </div>
                    </div>
                    {/* Warm grey caption beneath */}
                    <p className="mt-2.5 text-xs sm:text-sm text-[#9D9792] font-medium">
                      {item.caption}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Multi-project grid when All, Commercial, or Residential is selected */
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {displayedProjects.map((item, index) => {
              const originalIndex = projects.findIndex((p) => p.id === item.id);
              return (
                <div key={item.id} className={`reveal-card stagger-${Math.min((index % 6) + 1, 6)} flex flex-col`}>
                  <div
                    onClick={() => setSelectedProjectIndex(originalIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedProjectIndex(originalIndex);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${item.title}`}
                    className="card-hover-lift relative group cursor-pointer overflow-hidden border border-[#9D9792]/40 bg-[#4A294B]/10 aspect-[4/3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Hover overlay: plum background with title in cream and category in gold */}
                    <div className="absolute inset-0 bg-[#4A294B]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-left pointer-events-none">
                      <span className="eyebrow-dark text-[#C7A05A] text-xs font-semibold uppercase tracking-wider mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#F7F2EB] font-semibold leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  {/* Warm grey caption beneath */}
                  <p className="mt-2 text-xs sm:text-sm text-[#9D9792] font-medium">
                    {item.caption}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* 
          CLOSING LINK:
          Text link "View all projects" in wine, linking to [GOOGLE BUSINESS PROFILE URL].
          Comment: confirm the destination with the client.
        */}
        <div className="pt-8 border-t border-[#9D9792]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-[#4A294B]/80">
            Every project begins with a personal site consultation in Jabalpur.
          </p>

          {/* Google Business Profile URL for Interiors by Anuradha */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#5F2147] hover:text-[#4A294B] font-semibold text-[15px] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
            title="View all projects and photos on Interiors by Anuradha Google Business Profile"
            aria-label="View all projects on Interiors by Anuradha Google Business Profile"
          >
            <span>View all projects on Google Business</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
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
        LIGHTBOX:
        Full-screen plum overlay with image, title, and category.
        Supports left and right arrow keys, Escape to close, swipe on mobile, and focus trap.
      */}
      {isLightboxOpen && currentProject && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Project Lightbox: ${currentProject.title}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-[#4A294B]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 md:p-10 text-[#F7F2EB] animate-fadeIn motion-reduce:animate-none"
        >
          {/* Top Bar: Counter, Category, and Close Button */}
          <div className="flex items-center justify-between border-b border-[#9D9792]/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#C7A05A] font-semibold">
                {currentProject.category}
              </span>
              <span className="text-[#9D9792]">·</span>
              <span className="text-xs text-[#F7F2EB]/70 font-mono tabular-nums">
                {(selectedProjectIndex! + 1).toString().padStart(2, "0")} /{" "}
                {projects.length.toString().padStart(2, "0")}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedProjectIndex(null)}
              className="p-2 text-[#F7F2EB] hover:text-[#C7A05A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
              aria-label="Close Lightbox (Esc)"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Middle Viewport: Image with Prev & Next Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() =>
                setSelectedProjectIndex(
                  (prev) => (prev! - 1 + projects.length) % projects.length
                )
              }
              className="absolute left-2 sm:left-4 z-10 p-3 bg-[#4A294B]/70 hover:bg-[#5F2147] text-[#F7F2EB] border border-[#9D9792]/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
              aria-label="Previous Project (Left Arrow)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Main Lightbox Image */}
            <div className="max-w-full max-h-[62vh] flex items-center justify-center p-2">
              <img
                src={currentProject.image}
                alt={currentProject.alt}
                className="max-h-[60vh] max-w-[85vw] object-contain shadow-2xl border border-[#9D9792]/30"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() =>
                setSelectedProjectIndex((prev) => (prev! + 1) % projects.length)
              }
              className="absolute right-2 sm:right-4 z-10 p-3 bg-[#4A294B]/70 hover:bg-[#5F2147] text-[#F7F2EB] border border-[#9D9792]/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
              aria-label="Next Project (Right Arrow)"
            >
              <svg
                width="24"
                height="24"
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
            </button>
          </div>

          {/* Bottom Bar: Title, Category & Keyboard/Swipe hints */}
          <div className="border-t border-[#9D9792]/30 pt-4 text-center">
            <h3 className="font-serif text-xl sm:text-2xl text-[#F7F2EB] font-semibold mb-1">
              {currentProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#C7A05A] font-medium">
              {currentProject.category} · {currentProject.caption}
            </p>
            <p className="text-[11px] text-[#9D9792] mt-2 hidden sm:block">
              Navigate with ← → keys or swipe on mobile · Press Esc to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
