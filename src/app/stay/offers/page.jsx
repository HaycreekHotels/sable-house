import OffersClient from "./OffersClient";
import {
  activePackageOffers,
  packageOffers,
  offersPageIntro,
  savannahToday,
} from "@/app/data/packageOffers.mjs";
import { availablePublicImage } from "@/app/lib/editorialImages";

const url = "https://www.sabalhouse.com/offers";

// Keep expired promotions out of the rendered list and search engine markup.
export const revalidate = 3600;

export const metadata = {
  title: {
    absolute: "Hotel Packages & Special Offers in Savannah | Sabal House",
  },
  description:
    "Explore special offers, seasonal stays, and curated hotel packages at Sabal House in Savannah, Georgia.",
  alternates: { canonical: "/offers" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Sabal House",
    locale: "en_US",
    url: "/offers",
    title: "Packages & Offers | Sabal House Savannah",
    description:
      "Discover curated stays, seasonal packages, and special hotel offers at Sabal House in Savannah.",
    images: [
      {
        url: "/images/sabal-house-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sabal House in Savannah, Georgia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Packages & Offers | Sabal House",
    description:
      "Find special hotel offers and thoughtfully curated Savannah stays.",
    images: ["/images/sabal-house-og.jpg"],
  },
};

export default function OffersPage() {
  const offers = activePackageOffers(savannahToday(), packageOffers).map(
    (offer) => ({
      ...offer,
      image: availablePublicImage(offer.image),
    }),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: "Packages & Offers at Sabal House",
        description:
          "Seasonal hotel offers and Savannah travel packages at Sabal House.",
        isPartOf: { "@id": "https://www.sabalhouse.com/#website" },
        about: { "@id": "https://www.sabalhouse.com/#hotel" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: offers.length,
          itemListElement: offers.map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: offer.title,
            description: offer.description,
            url: `${url}#${offer.id}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.sabalhouse.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Packages & Offers",
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <OffersClient offers={offers} intro={offersPageIntro} />
    </>
  );
}
