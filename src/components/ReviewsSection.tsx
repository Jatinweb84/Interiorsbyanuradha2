/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { reviewsData } from "../data/reviews.ts";
import { useReveal } from "../hooks/useReveal.js";

export default function ReviewsSection() {
  const headerRef = useReveal();
  const cardsRef = useReveal({ selector: ".reveal-card" });

  return (
    <section
      id="reviews"
      className="py-20 lg:py-28 bg-[#F7F2EB] text-[#4A294B] border-b border-[#9D9792]/30"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* HEADER: Cream background, Eyebrow in wine, H2 in plum */}
        <div ref={headerRef} className="reveal-header max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5F2147] block mb-3">
            CLIENT REVIEWS.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#4A294B] leading-tight">
            What people say about working with us.
          </h2>
        </div>

        {/* RATING CARD: Cream card with warm grey border, 5.0 in Cormorant, 5 gold stars, Based on 7 Google reviews, wine button */}
        <div className="bg-[#F7F2EB] border border-[#9D9792] p-8 sm:p-10 mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              {/* Large 5.0 in Cormorant */}
              <div className="flex items-baseline">
                <span className="font-serif text-6xl sm:text-7xl font-bold text-[#4A294B] leading-none tabular-nums">
                  {reviewsData.rating}
                </span>
              </div>

              <div>
                {/* Five gold stars */}
                <div
                  className="flex items-center gap-1 mb-2"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#C7A05A] fill-[#C7A05A]"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                {/* Text: Based on 7 Google reviews, */}
                <p className="text-base text-[#4A294B] font-medium">
                  Based on {reviewsData.reviewCount} Google reviews,
                </p>
                <p className="text-xs text-[#9D9792] mt-0.5">
                  Verified customer feedback from Google Maps
                </p>
              </div>
            </div>

            {/* Wine button: Read all reviews on Google */}
            {/* [CONFIRM: Confirm Google Business Profile URL destination with client] */}
            <div>
              <a
                href={reviewsData.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#5F2147] hover:bg-[#4A294B] text-[#F7F2EB] font-medium text-sm transition-colors duration-150 ease shadow-sm"
              >
                Read all reviews on Google
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* REVIEW CARDS: 2-column grid on desktop, 1-column on mobile */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {reviewsData.reviews.map((review, idx) => (
            <article
              key={review.id}
              className={`reveal-card stagger-${Math.min(idx + 1, 6)} bg-[#F7F2EB] border border-[#9D9792] p-6 sm:p-8 flex flex-col justify-between`}
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-[#4A294B] leading-snug">
                      {review.name}
                    </h3>
                    <p className="text-xs text-[#9D9792] mt-1">
                      {review.timeAgo}
                    </p>
                  </div>
                  {/* Google Maps Icon Badge */}
                  <div
                    className="w-7 h-7 flex items-center justify-center bg-white border border-[#9D9792]/40 text-[#4A294B] flex-shrink-0"
                    title="Google Maps Review"
                    aria-label="Google Maps Review"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                  </div>
                </div>

                {/* Google-style Star Rating */}
                <div
                  className="flex items-center gap-1 mb-4"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-[#C7A05A] fill-[#C7A05A]"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text as given without invention or expanding */}
                <p className="text-[#4A294B] text-[16px] leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#9D9792]/30 flex items-center gap-2 text-xs text-[#9D9792]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A05A]"></span>
                <span>Verified Google Review</span>
              </div>
            </article>
          ))}
        </div>

        {/* Add approved client quotes here once Anuradha confirms them. */}
        {/* Placeholder comment for future confirmed reviews:
            Add approved client quotes here once Anuradha confirms them.
            Do not invent or fabricate client reviews.
        */}

        {/* Closing text link to profile URL */}
        <div className="mt-8 pt-6 border-t border-[#9D9792]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#9D9792]">
            {/* Add approved client quotes here once Anuradha confirms them. */}
            All reviews verified directly from Google Business Profile.
          </p>
          <a
            href={reviewsData.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5F2147] hover:text-[#4A294B] text-sm font-medium hover:underline inline-flex items-center gap-1.5"
          >
            Read more reviews on Google
            <svg
              className="w-4 h-4"
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
