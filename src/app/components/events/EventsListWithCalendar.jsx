// components/EventsListWithCalendar.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function formatMonthYear(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatEventDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMonthGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const cells = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EventsListWithCalendar({ events = [] }) {
  const sectionRef = useRef(null);
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(null);

  const eventDateMap = useMemo(() => {
    const map = new Map();

    events.forEach((event) => {
      if (!map.has(event.date)) {
        map.set(event.date, []);
      }
      map.get(event.date).push(event);
    });

    return map;
  }, [events]);

  const visibleEvents = useMemo(() => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    let filtered = events.filter((event) => {
      const date = new Date(`${event.date}T00:00:00`);
      return date.getMonth() === month && date.getFullYear() === year;
    });

    if (selectedDate) {
      filtered = filtered.filter((event) => event.date === selectedDate);
    }

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, currentMonth, selectedDate]);

  const calendarDays = useMemo(
    () => getMonthGrid(currentMonth),
    [currentMonth],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".events-intro-item",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".events-header",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".events-list-card",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".events-layout",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".events-calendar-panel",
        { autoAlpha: 0, x: 20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".events-layout",
            start: "top 78%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [visibleEvents]);

  function changeMonth(direction) {
    setSelectedDate(null);
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1),
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full bg-secondary px-5 py-16 text-main md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="events-header mb-12 max-w-3xl">
          <p className="events-intro-item mb-4 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
            Sabal House
          </p>

          <h1 className="events-intro-item font-serif text-5xl leading-tight opacity-0 md:text-7xl">
            Events
          </h1>

          <p className="events-intro-item mt-6 text-base leading-8 text-main/75 opacity-0 md:text-lg">
            Discover upcoming happenings at Sabal House and around the city.
          </p>
        </div>

        <div className="events-layout grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-5">
            {visibleEvents.length > 0 ? (
              visibleEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/local-events/${event.slug}`}
                  className="events-list-card flex gap-4 border border-main/10 bg-white p-4 opacity-0 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden md:h-28 md:w-28">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.25em] text-contrast">
                      {event.type}
                    </p>

                    <h2 className="mt-2 font-serif text-2xl leading-tight text-main md:text-3xl">
                      {event.title}
                    </h2>

                    <p className="mt-2 text-sm text-main/70">
                      {formatEventDate(event.date)} • {event.time}
                    </p>

                    <p className="mt-1 text-sm text-main/70">
                      {event.location}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-main/75 md:text-base">
                      {event.excerpt}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="events-list-card border border-main/10 bg-white p-6 opacity-0">
                <p className="text-base text-main/75">
                  No events found for this selection.
                </p>
              </div>
            )}
          </div>

          <aside className="events-calendar-panel border border-main/10 bg-white p-6 opacity-0 lg:sticky lg:top-24 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="border border-main/20 px-3 py-2 text-sm text-main transition-colors hover:bg-main hover:text-secondary"
              >
                ←
              </button>

              <h2 className="font-serif text-3xl text-main">
                {formatMonthYear(currentMonth)}
              </h2>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="border border-main/20 px-3 py-2 text-sm text-main transition-colors hover:bg-main hover:text-secondary"
              >
                →
              </button>
            </div>

            <div className="mb-3 grid grid-cols-7 text-center text-xs uppercase tracking-[0.2em] text-main/50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return (
                    <div key={`empty-${index}`} className="aspect-square" />
                  );
                }

                const key = toDateKey(day);
                const hasEvent = eventDateMap.has(key);
                const isSelected = selectedDate === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(isSelected ? null : key)}
                    className={`aspect-square border text-sm transition-colors ${
                      hasEvent
                        ? "border-contrast bg-contrast/10 text-main"
                        : "border-main/10 text-main/70"
                    } ${
                      isSelected ? "bg-main text-secondary border-main" : ""
                    }`}
                    aria-label={
                      hasEvent ? `View events on ${key}` : `No events on ${key}`
                    }
                  >
                    <span className="flex h-full items-center justify-center">
                      {day.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-main/70">
              <span className="inline-block h-3 w-3 bg-contrast/30 border border-contrast" />
              Days with events
            </div>

            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                className="mt-6 inline-flex border border-main px-4 py-2 text-xs uppercase tracking-[0.2em] text-main transition-colors hover:bg-main hover:text-secondary"
              >
                Clear Filter
              </button>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
