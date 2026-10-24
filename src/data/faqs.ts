/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isPlaceholder?: boolean;
}

// NOTE: All answers below must be confirmed before launch. Do not invent prices or timelines.
// Answers marked stay as placeholders for Anuradha to complete.
export const faqsData: FAQItem[] = [
  {
    id: "faq-services",
    question: "What services do you offer?",
    // Answer must be confirmed before launch. Do not invent prices or timelines.
    answer:
      "We design bedrooms, bathrooms, dining rooms, wardrobes, cabinetry, commercial spaces, hospitality interiors, and interior architecture, and we help with flooring, appliances, décor, and custom art.",
  },
  {
    id: "faq-spaces",
    question: "Do you work on homes and commercial spaces?",
    // Answer must be confirmed before launch. Do not invent prices or timelines.
    answer:
      "Yes. Our work covers residential, commercial, and hospitality projects.",
  },
  {
    id: "faq-process",
    question: "How does a project begin?",
    // Placeholder answer for Anuradha to complete: describe the first consultation, its length, and whether it is free. Do not invent prices or timelines.
    answer:
      "describe the first consultation, its length, and whether it is free",
    isPlaceholder: true,
  },
  {
    id: "faq-styles",
    question: "What styles do you design in?",
    // Answer must be confirmed before launch. Do not invent prices or timelines.
    answer:
      "Classic, rustic, industrial, traditional, elegant, and minimalist, and we can combine them.",
  },
  {
    id: "faq-timeline",
    question: "How long does a project take?",
    // Placeholder answer for Anuradha to complete: timelines is based upon what is the project type. Do not invent prices or timelines.
    answer:
      "timelines is based upon what is the project type",
    isPlaceholder: true,
  },
  {
    id: "faq-pricing",
    question: "How is pricing structured?",
    // Placeholder answer for Anuradha to complete: depend upon pricing model, such as per square foot, fixed fee, or design fee. Do not invent prices or timelines.
    answer:
      "depend upon pricing model, such as per square foot, fixed fee, or design fee",
    isPlaceholder: true,
  },
  {
    id: "faq-location",
    question: "Do you work outside Jabalpur?",
    // Answer must be confirmed before launch. Do not invent prices or timelines.
    answer:
      "Yes we also work outside Jabalpur",
  },
];
