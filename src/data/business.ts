/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusinessInfo {
  name: string;
  city: string;
  address: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsAppLink: string;
  googleBusinessUrl: string;
  rating: number;
  reviewCount: number;
  hours: string; // [CONFIRM: Google listing shows Open 24 hours - client should confirm official consultation hours]
}

export const businessInfo: BusinessInfo = {
  name: "Interiors by Anuradha",
  city: "Jabalpur",
  address: "Interiors by Anuradha, Madan Mahal, Nagpur Rd, Hathital, Jabalpur, Madhya Pradesh 482001",
  phoneDisplay: "+91 78286 05596",
  phoneTel: "tel:+917828605596",
  whatsAppLink: "https://wa.me/917828605596",
  googleBusinessUrl:
    "https://www.google.com/maps/search/?api=1&query=Interiors+by+Anuradha%2C+Madan+Mahal%2C+Nagpur+Rd%2C+Hathital%2C+Jabalpur%2C+Madhya+Pradesh+482001",
  rating: 5.0,
  reviewCount: 7,
  hours: "10 am to 10 pm",
};
