/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string; // Placeholder copy - needs client approval
  icon: string;
}

// 12 Interior Design Services for Interiors by Anuradha, Jabalpur.
// Seeded from verified business profile facts.
// NOTE: Descriptions are warm, confident placeholders and need client approval.

export const services: ServiceItem[] = [
  {
    id: "bedroom-design",
    title: "Bedroom design",
    description: "Serene private sanctuaries tailored with layered ambient lighting, bespoke headboard wall panels, and restful acoustic finishes.",
    icon: "bedroom",
  },
  {
    id: "bathroom-design",
    title: "Bathroom design",
    description: "Spa-calibre wellness retreats detailed with enduring stone surfaces, precision plumbing fixtures, and custom vanity millwork.",
    icon: "bathroom",
  },
  {
    id: "dining-room-design",
    title: "Dining room design",
    description: "Atmospheric spaces proportioned for memorable hospitality, statement pendant illumination, and custom dining tables.",
    icon: "dining",
  },
  {
    id: "wardrobe-design",
    title: "Wardrobe design",
    description: "Ergonomic walk-in and fitted wardrobe systems featuring concealed illumination, velvet dividers, and tailored storage bays.",
    icon: "wardrobe",
  },
  {
    id: "cabinetry-hardware-design",
    title: "Cabinetry and hardware design",
    description: "Architectural casework with artisanal joinery details, tactile solid metal pulls, and balanced proportions throughout.",
    icon: "cabinetry",
  },
  {
    id: "commercial-interior-design",
    title: "Commercial interior design",
    description: "Executive offices, corporate boardrooms, and prestige commercial suites engineered for workflow efficiency and client impressions.",
    icon: "commercial",
  },
  {
    id: "hospitality-design",
    title: "Hospitality design",
    description: "Engaging guest environments, lounge experiences, and boutique reception venues pairing intimate atmosphere with durable utility.",
    icon: "hospitality",
  },
  {
    id: "interior-architectural-design",
    title: "Interior architectural design",
    description: "Comprehensive spatial planning, false ceiling profiles, partition detailing, and structural interior alignments.",
    icon: "architecture",
  },
  {
    id: "flooring-selection",
    title: "Flooring selection",
    description: "Discerning curation across fine marbles, natural hardwoods, designer porcelain tiles, and seamless acoustic transitions.",
    icon: "flooring",
  },
  {
    id: "appliance-selection",
    title: "Appliance selection",
    description: "Harmonious integration of high-performance culinary, refrigeration, and ventilation appliances directly into cabinetry plans.",
    icon: "appliances",
  },
  {
    id: "home-decor-selection",
    title: "Home decor selection",
    description: "Layered artisanal textiles, sculptural ceramics, mirrors, and curated accessories that impart warmth, depth, and character.",
    icon: "decor",
  },
  {
    id: "custom-art-selection",
    title: "Custom art selection",
    description: "Original fine art commissions, bespoke canvases, and archival framing curated to accentuate primary architectural focal points.",
    icon: "art",
  },
  /* NOTE: Add more services here if additional services are discovered on the studio's Google Business Profile listing */
];

export const servicesData = services;
export default services;
