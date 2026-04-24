// app/events/[slug]/page.jsx
import { notFound } from "next/navigation";
import EventDetailPage from "../../components/events/EventDetailPage";
import { events } from "../../data/events";

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  return {
    title: `${event.title} | Sabal House`,
    description: event.excerpt,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}
