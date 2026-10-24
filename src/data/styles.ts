/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DesignStyle {
  id: string;
  name: string;
  // Placeholder copy - needs client approval
  characteristic: string;
  elements: string[];
}

// 6 Design Styles specified in business facts: Classic, Rustic, Industrial, Traditional, Elegant, Minimalist
export const designStylesData: DesignStyle[] = [
  {
    id: "classic",
    name: "Classic",
    // Placeholder copy - needs client approval
    characteristic: "Timeless balance, symmetrical proportions, and dignified architectural moldings that never go out of style.",
    elements: ["Architectural millwork", "Symmetric layouts", "Rich natural textiles"],
  },
  {
    id: "rustic",
    name: "Rustic",
    // Placeholder copy - needs client approval
    characteristic: "Honest raw textures, warm earthy timbers, and comforting organic surfaces bringing grounded charm.",
    elements: ["Exposed grain wood", "Natural stone surfaces", "Warm tactile fabrics"],
  },
  {
    id: "industrial",
    name: "Industrial",
    // Placeholder copy - needs client approval
    characteristic: "Architectural metalwork, raw brick accents, utilitarian grace, and confident open-volume spaces.",
    elements: ["Blackened steel fixtures", "Textured surfaces", "Functional lighting"],
  },
  {
    id: "traditional",
    name: "Traditional",
    // Placeholder copy - needs client approval
    characteristic: "Deep heritage accents, intricate woodwork, warm ornamental craftsmanship, and graceful comfort.",
    elements: ["Carved joinery", "Warm layered palettes", "Heritage motifs"],
  },
  {
    id: "elegant",
    name: "Elegant",
    // Placeholder copy - needs client approval
    characteristic: "Graceful silhouettes, brushed brass accents, subdued luxe palettes, and quietly luxurious finishes.",
    elements: ["Brushed metallic details", "Velvets & linens", "Refined ambient glows"],
  },
  {
    id: "minimalist",
    name: "Minimalist",
    // Placeholder copy - needs client approval
    characteristic: "Deliberate negative space, unadorned architectural planes, and uncluttered serenity where light is paramount.",
    elements: ["Concealed storage", "Monochromatic purity", "Architectural shadow lines"],
  },
];
