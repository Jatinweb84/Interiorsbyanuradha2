/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Loader from "./components/Loader.jsx";
import Navbar from "./components/Navbar.tsx";
import HeroSection from "./components/HeroSection.tsx";
import ProjectsSection from "./components/ProjectsSection.tsx";
import ServicesSection from "./components/ServicesSection.tsx";
import AboutSection from "./components/AboutSection.tsx";
import ReviewsSection from "./components/ReviewsSection.tsx";
import ProcessSection from "./components/ProcessSection.tsx";
import FAQSection from "./components/FAQSection.tsx";
import ContactSection from "./components/ContactSection.tsx";
import Footer from "./components/Footer.tsx";

export default function App() {
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  // Guarantee the website always opens at the very topmost section (navbar and hero) on page load/reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2EB] text-[#4A294B] selection:bg-[#5F2147] selection:text-[#F7F2EB]">
      {/* Intro Loader Overlay - plays on every page load; site HTML remains in DOM at all times */}
      {isLoaderActive && (
        <Loader onComplete={() => setIsLoaderActive(false)} />
      )}

      {/* Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section (id="hero") */}
        <HeroSection />

        {/* Selected Portfolio / Projects Section (id="projects") */}
        <ProjectsSection />

        {/* Services Section with 12 Disciplines (id="services") */}
        <ServicesSection />

        {/* Why Us / Studio Philosophy Section (id="why-us") */}
        <AboutSection />

        {/* Verified Google Ratings & Review Section (id="reviews") */}
        <ReviewsSection />

        {/* 4-Stage Design Realization Process (id="process") */}
        <ProcessSection />

        {/* Frequently Asked Questions (id="faq") */}
        <FAQSection />

        {/* Contact & Studio Consultation Dialogue (id="contact") */}
        <ContactSection />
      </main>

      {/* Studio Footer */}
      <Footer />
    </div>
  );
}
