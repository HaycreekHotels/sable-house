"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { rooms } from "../../data/rooms";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "King", "Queen", "ADA", "Twin"];

export default function RoomsSuitesGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);

  const filteredRooms = useMemo(() => {
    if (activeFilter === "All") return rooms;

    return rooms.filter((room) => room.categories.includes(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".room-card");

      cards.forEach((card) => {
        const image = card.querySelector(".room-card-image");
        const content = card.querySelector(".room-card-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 60,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
        )
          .fromTo(
            image,
            {
              autoAlpha: 0,
              scale: 1.06,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.55",
          )
          .fromTo(
            content,
            {
              autoAlpha: 0,
              y: 30,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.25",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredRooms]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-secondary px-5 py-16 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center gap-5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm tracking-wide text-neutral-700">
              Filter:
            </span>

            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-4 py-3 text-xs uppercase tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "border-[#8a633b] bg-[#8a633b] text-white"
                      : "border-neutral-300 bg-white text-neutral-700 hover:border-[#8a633b] hover:bg-[#8a633b] hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <p className="text-sm text-neutral-700">
            Viewing: {filteredRooms.length} of {rooms.length}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {filteredRooms.map((room) => (
            <article
              key={room.id}
              className="room-card overflow-hidden bg-white opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="group block">
                <div className="room-card-image relative h-70 overflow-hidden opacity-0 md:h-105">
                  <Image
                    src={room.image}
                    alt={`${room.title} hotel room`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="eager"
                  />
                </div>

                <div className="room-card-content opacity-0 px-7 py-10 md:px-10 md:py-12">
                  <p className="mb-6 text-center text-xs uppercase tracking-wider text-neutral-600">
                    ♢ {room.categories.join(" / ")}
                  </p>

                  <h2 className="mb-4 font-serif text-4xl leading-tight text-neutral-900 md:text-5xl">
                    {room.title}
                  </h2>

                  <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.25em] text-neutral-600">
                    <span>▱ {room.bedType}</span>
                    <span>|</span>
                    <span>▥ {room.size}</span>
                    <span>|</span>
                    <span>☁ {room.sleeps}</span>
                  </div>

                  <div className="space-y-5 text-base leading-8 text-neutral-700">
                    {room.description.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-9">
                    <Link
                      href={`/rooms/${room.slug}`}
                      className="inline-block border-b border-[#8a633b] pb-1 text-sm uppercase tracking-wide text-neutral-700"
                    >
                      Details
                    </Link>
                  </div>

                  <a
                    href="www.google.com"
                    className="mt-8 inline-flex min-w-45 items-center justify-center gap-8 border border-main bg-main px-8 py-3 text-xs uppercase tracking-[0.2em] text-secondary transition-colors duration-300 group-hover:bg-contrast group-hover:text-white"
                  >
                    Book Now
                    <span>→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
