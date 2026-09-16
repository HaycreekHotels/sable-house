import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import NavBar from "./components/layout/Header/NavBar";
import Footer from "./components/layout/Footer/Footer";

import {
  bentonLight,
  bentonReg,
  centralNoLight,
  centralNoReg,
  handwritingErnie,
} from "./fonts";

export const siteUrl = "https://www.sabalhouse.com";

export const siteDescription =
  "Sabal House is a hotel opening December 2026 in Savannah’s Historic District, directly across from Oglethorpe Square.";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Sabal House",
    template: "%s | Sabal House",
  },

  description: siteDescription,

  applicationName: "Sabal House",

  publisher: "Sabal House",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "travel",
};

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,

      url: `${siteUrl}/`,

      name: "Sabal House",

      description: siteDescription,

      inLanguage: "en-US",

      publisher: {
        "@id": `${siteUrl}/#hotel`,
      },
    },

    {
      "@type": "Hotel",
      "@id": `${siteUrl}/#hotel`,

      name: "Sabal House",

      url: `${siteUrl}/`,

      description: siteDescription,

      telephone: "+1-912-233-1600",

      image: `${siteUrl}/images/sabal-house-og.jpg`,

      address: {
        "@type": "PostalAddress",

        streetAddress: "225 E. President St",

        addressLocality: "Savannah",

        addressRegion: "GA",

        postalCode: "31401",

        addressCountry: "US",
      },

      sameAs: [
        "https://www.instagram.com/thesabalhouse/",
        "https://www.facebook.com/people/The-Sabal-House/61592632106578/",
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${bentonLight.variable}
        ${bentonReg.variable}
        ${centralNoLight.variable}
        ${centralNoReg.variable}
        ${handwritingErnie.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <NavBar />

        {children}

        <Footer />

        <SpeedInsights />
      </body>
    </html>
  );
}
