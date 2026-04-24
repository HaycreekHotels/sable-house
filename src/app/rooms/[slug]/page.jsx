import { notFound } from "next/navigation";
import RoomDetailPage from "../../components/room/RoomDetailPage";
import { rooms } from "../../data/rooms";

export function generateStaticParams() {
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const room = rooms.find((room) => room.slug === slug);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: `${room.title} | Sabal House`,
    description: Array.isArray(room.description)
      ? room.description.join(" ")
      : room.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const room = rooms.find((room) => room.slug === slug);

  if (!room) {
    notFound();
  }

  return <RoomDetailPage room={room} />;
}
