/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Destination URL for Google Business Profile
// [CONFIRM: Confirm Google Business Profile direct CID / link with Anuradha]
export const GOOGLE_BUSINESS_PROFILE_URL =
  "https://www.google.com/maps/search/?api=1&query=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001";

export interface GoogleReviewItem {
  id: string;
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
  isVerified?: boolean;
}

/**
 * Reviews data for Interiors by Anuradha.
 * Strictly adheres to verified Google Maps data:
 * - 5.0 rating across 7 Google reviews
 * - Ar.Anshul Nigam review is the only full review text provided so far
 * - Never invent or expand reviews, names, or quotes
 */
export const reviewsData = {
  rating: "5.0",
  reviewCount: 7,
  googleProfileUrl: GOOGLE_BUSINESS_PROFILE_URL,
  reviews: [
    {
      id: "review-anshul-nigam",
      name: "Ar.Anshul Nigam (Local Guide, 15 reviews)",
      rating: 5,
      timeAgo: "posted a month ago",
      text: "Design style: Classic, Rustic, Industrial, Traditional, Elegant, Minimalist and Other",
      isVerified: true,
    },
    // Add approved client quotes here once Anuradha confirms them.
    // Example format for future reviews:
    // {
    //   id: "review-2",
    //   name: "Client Name (Google Review)",
    //   rating: 5,
    //   timeAgo: "2 months ago",
    //   text: "Verified client quote",
    //   isVerified: true
    // }
  ] as GoogleReviewItem[],
};
