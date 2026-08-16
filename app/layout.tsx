import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/chrome";
import { Header, SkipLink } from "@/components/layout/header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import {
  ADDRESS,
  ADDRESS_ONE_LINE,
  BUSINESS_DESCRIPTOR,
  BUSINESS_NAME,
  CONTACT,
  HOURS,
  LANDMARKS,
  MAP_HREF,
} from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description = `${BUSINESS_DESCRIPTOR} on ${ADDRESS.street}, ${ADDRESS.city}. Honda motorcycles and scooters with finance, insurance, exchange, service and genuine parts. Open ${HOURS.time} every day.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BUSINESS_NAME} — Honda Showroom in ${ADDRESS.city}`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description,
  applicationName: BUSINESS_NAME,
  keywords: [
    `Honda showroom ${ADDRESS.city}`,
    `Honda bikes ${ADDRESS.city}`,
    `Honda scooters ${ADDRESS.city}`,
    `Honda service ${ADDRESS.city}`,
    BUSINESS_NAME,
  ],
  formatDetection: { telephone: true, address: true },
  openGraph: {
    title: `${BUSINESS_NAME} — Honda Showroom in ${ADDRESS.city}`,
    description,
    url: "/",
    siteName: BUSINESS_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/hero/hornet-projectors.jpg", width: 2200, height: 1240 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#08090a",
};

/** Structured data. Every field below is verified business information. */
const schema = {
  "@context": "https://schema.org",
  "@type": "MotorcycleDealer",
  name: BUSINESS_NAME,
  description: BUSINESS_DESCRIPTOR,
  url: siteUrl,
  telephone: CONTACT.phoneE164,
  email: CONTACT.email,
  image: `${siteUrl}/brand/balajee-honda-logo.png`,
  logo: `${siteUrl}/brand/balajee-honda-logo.png`,
  hasMap: MAP_HREF,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${ADDRESS.plot}, ${ADDRESS.street}, ${ADDRESS.locality}`,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.countryCode,
  },
  areaServed: { "@type": "City", name: ADDRESS.city },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: HOURS.opens,
      closes: HOURS.closes,
    },
  ],
  location: {
    "@type": "Place",
    name: `${BUSINESS_NAME}, ${ADDRESS_ONE_LINE}`,
    description: LANDMARKS.join(". "),
  },
  paymentAccepted: "Cash, UPI, Debit Card, Credit Card, Bank Transfer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      id="top"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <MotionProvider>
          <SmoothScroll />
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
