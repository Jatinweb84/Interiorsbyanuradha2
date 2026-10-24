/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { faqsData, FAQItem } from "../data/faqs.ts";
import { useReveal } from "../hooks/useReveal.js";

export default function FAQSection() {
  const headerRef = useReveal();

  // Only one item open at a time; first item open by default for immediate preview
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-[#F7F2EB] border-b border-[#9D9792]/30"
    >
      <div className="max-w-[900px] mx-auto px-6 sm:px-8">
        {/* HEADER: Cream background. Eyebrow in wine: "QUESTIONS." H2 in plum: "Frequently asked questions." */}
        <header ref={headerRef} className="reveal-header text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F2147] block mb-3">
            QUESTIONS.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#4A294B] tracking-tight">
            Frequently asked questions.
          </h2>
        </header>

        {/* ACCORDION: Accessible accordion using buttons with aria-expanded and aria-controls.
            Only one item open at a time. Animate open and close with a short height transition, 
            disabled under prefers-reduced-motion. Uses gold plus or minus icon. */}
        {/* Comment: These answers must be confirmed before launch. Do not invent prices or timelines. */}
        <div className="border-t border-[#9D9792]/40 divide-y divide-[#9D9792]/40">
          {faqsData.map((item: FAQItem) => {
            const isOpen = openId === item.id;
            const headingId = `faq-title-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div key={item.id} className="group">
                <h3>
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full py-6 px-1 flex items-center justify-between text-left group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C7A05A] transition-colors"
                  >
                    <span className="font-serif text-xl sm:text-2xl text-[#4A294B] group-hover:text-[#5F2147] transition-colors pr-6 leading-snug">
                      {item.question}
                    </span>
                    {/* Gold plus or minus icon sitting on plum */}
                    <span
                      className="w-8 h-8 rounded-full bg-[#4A294B] group-hover:bg-[#5F2147] flex items-center justify-center shrink-0 text-[#C7A05A] transition-colors duration-200 shadow-xs"
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        /* Minus icon in gold */
                        <svg
                          className="w-4 h-4 stroke-[#C7A05A]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      ) : (
                        /* Plus icon in gold */
                        <svg
                          className="w-4 h-4 stroke-[#C7A05A]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </span>
                  </button>
                </h3>

                {/* Animated accordion panel with height transition, disabled on prefers-reduced-motion */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pt-1 px-1 text-[16px] sm:text-[17px] leading-[1.75] text-[#4A294B]/85">
                      <p className={item.isPlaceholder ? "italic text-[#4A294B]/75" : ""}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CLOSING LINE: "Still have a question? Send us a WhatsApp message." linking to https://wa.me/917828605596.
            Link button is plum colour (#4A294B). */}
        <div className="mt-12 sm:mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="text-[17px] text-[#4A294B]">
            Still have a question?
          </span>
          <a
            href="https://wa.me/917828605596"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#4A294B] hover:bg-[#5F2147] text-[#F7F2EB] px-6 py-3 font-medium text-sm sm:text-base tracking-wide transition-colors duration-150 ease border border-[#4A294B] shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C7A05A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2EB]"
            aria-label="Send us a WhatsApp message"
          >
            <span>Send us a WhatsApp message</span>
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
