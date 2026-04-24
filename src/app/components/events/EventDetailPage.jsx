// components/EventDetailPage.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

function formatEventDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventDetailPage({ event }) {
  return (
    <main className="bg-secondary text-main">
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-main/35" />
        <div className="absolute bottom-0 left-0 w-full px-5 pb-10 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm uppercase tracking-[0.35em] text-secondary">
              {event.type}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-secondary md:text-7xl">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-lg text-main/75">
            {formatEventDate(event.date)} • {event.time}
          </p>

          <p className="mt-2 text-lg text-main/75">{event.location}</p>

          <p className="mt-8 text-lg leading-9 text-main/80">
            {event.description}
          </p>

          <Link
            href="/local-events"
            className="mt-10 inline-flex border border-main px-6 py-3 text-xs uppercase tracking-[0.2em] text-main transition-colors hover:bg-main hover:text-secondary"
          >
            Back To Events
          </Link>
        </div>
      </section>
    </main>
  );
}
