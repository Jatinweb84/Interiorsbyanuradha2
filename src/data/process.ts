/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProcessStep {
  step: string;
  title: string;
  // Placeholder description - confirm with client
  description: string;
}

// 4-stage design realization process
// Placeholder descriptions - confirm with client / Anuradha
export const processStepsData: ProcessStep[] = [
  {
    step: "01",
    title: "Get in touch",
    // Placeholder description - confirm with client
    description: "Call, WhatsApp, or send an enquiry through the form below.",
  },
  {
    step: "02",
    title: "Consultation",
    // Placeholder description - confirm with client
    description: "A conversation about your space, your needs, and your budget.",
  },
  {
    step: "03",
    title: "Concept and approvals",
    // Placeholder description - confirm with client
    description: "Moodboards, layouts, and material selections for your sign-off.",
  },
  {
    step: "04",
    title: "Execution and handover",
    // Placeholder description - confirm with client
    description: "Planned installation and a final walkthrough.",
  },
];

export const processContactInfo = {
  phoneDisplay: "07828605596",
  phoneTel: "tel:07828605596",
  whatsAppLink: "https://wa.me/07828605596",
  formLink: "#contact",
  replyTimeNote: "The team will reply within 10 min",
};
