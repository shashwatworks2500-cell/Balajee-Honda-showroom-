import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { BUSINESS_DESCRIPTOR, BUSINESS_NAME } from "@/lib/site";
import { CITY, dealerSchema } from "@/lib/seo";

/* Display: wide grotesque, used with restraint for names and section heads. */
/* Variable across weight and width, so `axes` replaces a static weight list. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/* Body: drawn for technical documentation, which is the register here. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

/* Data: every price, spec and phone number. Tabular by default. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BUSINESS_NAME} — Honda Two-Wheeler Showroom in ${CITY}`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: `${BUSINESS_NAME} is a ${BUSINESS_DESCRIPTOR} showroom on Station Road, ${CITY}. Visit us or book a test ride.`,
  applicationName: BUSINESS_NAME,
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1416",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          // Structured data emits only verified fields — see lib/seo.ts.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerSchema(siteUrl)) }}
        />
        <SmoothScroll />
        <SkipLink />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
