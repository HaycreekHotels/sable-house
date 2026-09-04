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
      title: "Room Not Found | Sabal House",
    };
  }

  return {
    title: `${room.name} | Sabal House`,
    description: room.shortDescription,
    openGraph: {
      title: `${room.name} | Sabal House`,
      description: room.shortDescription,
      images: [
        {
          url: room.image,
          alt: room.imageAlt,
        },
      ],
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
