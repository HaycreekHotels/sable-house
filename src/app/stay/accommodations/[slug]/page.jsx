import { notFound } from "next/navigation";

import RoomDetail from "./RoomDetail";

import { getRoomBySlug, rooms } from "@/app/data/accommodations";

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const room = getRoomBySlug(slug);

  if (!room) {
    return {
      title: "Room Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = `/stay/accommodations/${room.slug}`;

  return {
    title: room.name,

    description: room.shortDescription,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",

      url: canonicalUrl,

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

export default async function RoomPage({ params }) {
  const { slug } = await params;

  const room = getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return <RoomDetail room={room} />;
}
