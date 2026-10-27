import { notFound } from "next/navigation";

import RoomDetail from "./RoomDetail";
import { getRoomBySlug, rooms } from "@/app/data/accommodations";

const siteUrl = "https://www.sabalhouse.com";

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const canonicalPath = `/stay/accommodations/${room.slug}`;

  return {
    title: room.name,
    description: room.shortDescription,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "website",
      url: `${siteUrl}${canonicalPath}`,
      title: `${room.name} | Sabal House`,
      description: room.shortDescription,
      images: [
        {
          url: room.image,
          alt: room.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${room.name} | Sabal House`,
      description: room.shortDescription,
      images: [room.image],
    },
  };
}

// Room page
export default async function RoomPage({ params }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const canonicalUrl = `${siteUrl}/stay/accommodations/${room.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HotelRoom",
        "@id": `${canonicalUrl}#room`,
        name: room.name,
        description: room.shortDescription,
        url: canonicalUrl,
        image: room.image,
        containedInPlace: {
          "@id": `${siteUrl}/#hotel`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Accommodations",
            item: `${siteUrl}/stay/accommodations`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: room.name,
            item: canonicalUrl,
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

      <RoomDetail room={room} />
    </>
  );
}
