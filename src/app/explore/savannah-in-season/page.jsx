import EventsClient from "./EventsClient";
import { SAVANNAH_EVENTS } from "@/app/data/savannahEvents";
import {
  savannahOffsetForDate,
  savannahToday,
  visibleEvents,
} from "@/app/lib/savannahEventDates";

export const revalidate = 1800;

const siteUrl = "https://www.sabalhouse.com";

export const metadata = {
  title: { absolute: "Savannah in Season | Things to Do | Sabal House" },
  description:
    "Explore upcoming Savannah events, seasonal celebrations, local markets, arts, music, and traditions. Filter by date or category and plan your visit to Sabal House.",
  alternates: { canonical: "/events" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sabal House",
    url: "/events",
    title: "Savannah in Season | Events & Things to Do",
    description:
      "Explore upcoming events around Savannah, Georgia and plan your next visit.",
    images: [
      {
        url: "/images/sabal-house-og.jpg",
        width: 1200,
        height: 630,
        alt: "Oak-lined street in Savannah, Georgia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savannah Events Calendar | Sabal House",
    description:
      "Discover upcoming Savannah events and filter by date and category.",
    images: ["/images/sabal-house-og.jpg"],
  },
};

function eventJsonLd(item) {
  const { event, nextDate } = item;
  const isRecurring = event.schedule.type === "weekly";
  const isContinuous = event.schedule.type === "range";
  return {
    "@type": "Event",
    "@id": `${siteUrl}/events#${event.id}-${nextDate}`,
    name: event.title,
    description: event.description,
    url: event.url,
    startDate:
      event.startsAt ||
      (isContinuous
        ? event.schedule.start
        : isRecurring && event.startsTime
          ? `${nextDate}T${event.startsTime}:00${savannahOffsetForDate(nextDate)}`
          : nextDate),
    endDate:
      event.endsAt ||
      (isContinuous
        ? event.schedule.end
        : isRecurring && event.endsTime
          ? `${nextDate}T${event.endsTime}:00${savannahOffsetForDate(nextDate)}`
          : nextDate),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venueName ?? event.location,
      address: {
        "@type": "PostalAddress",
        ...(event.venueAddress ? { streetAddress: event.venueAddress } : {}),
        addressLocality: "Savannah",
        addressRegion: "GA",
        addressCountry: "US",
      },
    },
  };
}

export default function SavannahEventsPage() {
  const today = savannahToday();
  const current = visibleEvents(SAVANNAH_EVENTS, today);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/events#page`,
        url: `${siteUrl}/events`,
        name: "Savannah on the Calendar",
        description:
          "A curated collection of upcoming Savannah events from Sabal House.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: current.map(({ event, nextDate }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: event.title,
            item: { "@id": `${siteUrl}/events#${event.id}-${nextDate}` },
          })),
        },
      },
      ...current.map(eventJsonLd),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <EventsClient events={SAVANNAH_EVENTS} serverToday={today} />
    </>
  );
}
