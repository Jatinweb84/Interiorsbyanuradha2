/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { businessInfo } from "../data/business.ts";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Exact navigation links specified in requirements
  const navLinks = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Why Us", href: "#why-us", id: "why-us" },
    { label: "Reviews", href: "#reviews", id: "reviews" },
    { label: "Process", href: "#process", id: "process" },
    { label: "FAQ", href: "#faq", id: "faq" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Scroll detection (40px threshold) & active section in view tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Determine which section is currently in view
      const scrollPosition = scrollY + 140; // Offset for sticky navbar
      let currentId = "";

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentId = link.id;
            break;
          }
        }
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trap focus inside mobile panel when open & handle Escape key
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";

      // Focus the close button when opened
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
          triggerButtonRef.current?.focus();
          return;
        }

        if (e.key === "Tab" && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
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
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    if (isMenuOpen) {
      setIsMenuOpen(false);
      triggerButtonRef.current?.focus();
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color] duration-300 ease-in-out motion-reduce:transition-none ${
          isScrolled
            ? "bg-[#F7F2EB] border-b border-[#9D9792]/30 shadow-xs"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* LOGO: Cormorant Garamond 600. Cream over hero, plum after scrolling */}
          <div className="shrink-0 flex items-center">
            {/* 
              LOGO REPLACEMENT POINT:
              To replace the text wordmark with a real studio logo image later, place the <img> element here:
              <img 
                src="/images/logo.svg" 
                alt="Interiors by Anuradha" 
                className="h-9 w-auto object-contain" 
              />
            */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`logo-wordmark font-serif text-2xl lg:text-[26px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none border-none outline-none select-none ${
                isScrolled ? "text-[#4A294B] hover:text-[#5F2147]" : "text-[#F7F2EB] hover:text-[#C7A05A]"
              }`}
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 600,
                outline: "none",
                border: "none",
                boxShadow: "none",
              }}
              aria-label={businessInfo.name}
            >
              {businessInfo.name}
            </a>
          </div>

          {/* DESKTOP NAVIGATION LINKS (Visible 1024px and above) */}
          <nav
            className="hidden lg:flex items-center gap-7 text-[15px] font-medium"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.id)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 ${
                    isScrolled
                      ? isActive
                        ? "text-[#4A294B] font-semibold"
                        : "text-[#4A294B] hover:text-[#5F2147]"
                      : isActive
                        ? "text-[#F7F2EB] font-semibold"
                        : "text-[#F7F2EB] hover:text-[#C7A05A]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Gold underline slides in over 250ms for active section */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A05A] origin-left transition-transform duration-[250ms] ease-out motion-reduce:transition-none ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* DESKTOP CTA BUTTON: "Book a Consultation" in wine, linking to #contact (150ms ease colour transition only) */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact", "contact")}
              className="px-5 py-2.5 text-[14px] font-medium tracking-wide text-[#F7F2EB] bg-[#5F2147] hover:bg-[#4A294B] transition-colors duration-150 ease motion-reduce:transition-none whitespace-nowrap shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
            >
              Book a Consultation
            </a>
          </div>

          {/* MOBILE HAMBURGER BUTTON (Below 1024px) */}
          <div className="flex lg:hidden items-center">
            <button
              ref={triggerButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 ${
                isScrolled ? "text-[#4A294B] hover:text-[#5F2147]" : "text-[#F7F2EB] hover:text-[#C7A05A]"
              }`}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-panel"
              aria-label="Open Navigation Menu"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="7" x2="21" y2="7"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="17" x2="21" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-HEIGHT MOBILE CREAM PANEL (Below 1024px) */}
      {isMenuOpen && (
        <div
          id="mobile-navigation-panel"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 h-screen w-screen bg-[#F7F2EB] z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-fadeIn motion-reduce:animate-none"
        >
          {/* Top Row: Wordmark & Close Button */}
          <div className="flex items-center justify-between border-b border-[#9D9792]/30 pb-5">
            <span
              className="font-serif text-2xl font-semibold text-[#4A294B] tracking-tight"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600 }}
            >
              {businessInfo.name}
            </span>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                triggerButtonRef.current?.focus();
              }}
              className="p-2 text-[#4A294B] hover:text-[#5F2147] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
              aria-label="Close Navigation Menu"
            >
              <svg
                width="26"
                height="26"
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

          {/* Links list: Projects, Services, Why Us, Reviews, Process, FAQ, Contact */}
          <nav className="flex flex-col py-6 space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <div key={link.href} className="border-b border-[#9D9792]/20 pb-3">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.id)}
                    className={`inline-block py-2 text-xl font-serif transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 ${
                      isActive
                        ? "text-[#5F2147] font-semibold border-b-2 border-[#C7A05A]"
                        : "text-[#4A294B] hover:text-[#5F2147]"
                    }`}
                  >
                    {link.label}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Bottom Area: CTA & Direct Communication */}
          <div className="pt-4 border-t border-[#9D9792]/30 space-y-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact", "contact")}
              className="w-full block text-center py-3.5 px-6 text-[15px] font-medium tracking-wide text-[#F7F2EB] bg-[#5F2147] hover:bg-[#4A294B] transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2"
            >
              Book a Consultation
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A294B] gap-2 pt-1">
              <span>{businessInfo.address}</span>
              <a
                href={businessInfo.phoneTel}
                className="font-semibold text-[#5F2147] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A05A]"
              >
                {businessInfo.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
