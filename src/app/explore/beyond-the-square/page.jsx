import BeyondSquareClient from "./BeyondSquareClient";
import {
  beyondTheSquareHero,
  beyondTheSquareSections,
} from "@/app/data/beyondTheSquare";
import { availablePublicImage } from "@/app/lib/editorialImages";

const url = "https://www.sabalhouse.com/explore/beyond-the-square";

export const metadata = {
  title: {
    absolute: "Beyond the Square | Explore Savannah & the Coast | Sabal House",
  },
  description:
    "Discover places to explore beyond downtown Savannah, from Skidaway Island and Tybee's North Beach to beautiful gardens, wildlife, museums, and local history.",
  alternates: { canonical: "/explore/beyond-the-square" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    siteName: "Sabal House",
    locale: "en_US",
    url: "/explore/beyond-the-square",
    title: "Beyond the Square | Explore Savannah & the Coast",
    description:
      "Coastal escapes, leafy gardens, and local stories worth discovering outside Savannah's most familiar landmarks.",
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
    title: "Beyond the Square | Sabal House",
    description:
      "A curated guide to memorable places to explore around Savannah, Georgia.",
    images: ["/images/sabal-house-og.jpg"],
  },
};

export default function BeyondTheSquarePage() {
  const hero = {
    ...beyondTheSquareHero,
    image: availablePublicImage(beyondTheSquareHero.image),
    introImage: availablePublicImage(beyondTheSquareHero.introImage),
  };
  const sections = beyondTheSquareSections.map((section) => ({
    ...section,
    cards: section.cards.map((card) => ({
      ...card,
      image: availablePublicImage(card.image),
    })),
  }));

  const places = beyondTheSquareSections.flatMap(({ cards }) => cards);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: "Beyond the Square",
        description:
          "An editorial guide to coastal places, gardens, wildlife, and cultural destinations in and around Savannah, Georgia.",
        isPartOf: { "@id": "https://www.sabalhouse.com/#website" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: places.length,
          itemListElement: places.map((place, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: place.title,
            url: place.href,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
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
            name: "Beyond the Square",
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
      <BeyondSquareClient hero={hero} sections={sections} />
    </>
  );
}
