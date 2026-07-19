import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import NavBar from "./components/layout/Header/NavBar";
import Footer from "./components/layout/Footer/Footer";

import { bentonLight, bentonReg, centralNoLight, centralNoReg } from "./fonts";

export const metadata = {
  metadataBase: new URL("https://www.sabalhouse.com"),

  title: {
    default: "Sabal House Hotel | Opening December 2026 in Savannah",
    template: "%s | Sabal House",
  },

  description:
    "Sabal House is a new hotel opening December 2026 in Savannah’s Historic District. Follow the journey, get opening updates, and contact our team.",

  applicationName: "Sabal House",

  generator: "Next.js",

  authors: [
    {
      name: "Michael Mount",
    },
  ],

  creator: "Michael Mount",

  publisher: "Sabal House",

  keywords: [
    "Sabal House",
    "Sabal House Hotel",
    "Savannah hotel",
    "Savannah Georgia hotel",
    "Savannah Historic District hotel",
    "new hotel in Savannah",
    "hotel opening December 2026",
    "Savannah accommodations",
    "Historic District Savannah",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Sabal House",
    title: "Sabal House Hotel | Opening December 2026 in Savannah",
    description:
      "Sabal House is coming to Savannah’s Historic District in December 2026. Follow the hotel’s journey, receive opening updates, and contact our team for more information.",
    images: [
      {
        url: "/images/sabal-house-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sabal House hotel, opening December 2026 in Savannah, Georgia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sabal House Hotel | Opening December 2026 in Savannah",
    description:
      "Sabal House is coming to Savannah’s Historic District in December 2026. Follow along for opening updates and more information.",
    images: ["/images/sabal-house-og.jpg"],
  },

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${bentonLight.variable}
        ${bentonReg.variable}
        ${centralNoLight.variable}
        ${centralNoReg.variable}h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
