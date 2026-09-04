"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { rooms } from "@/app/data/accommodations";

gsap.registerPlugin(ScrollTrigger);


const filters = [
  {
    value: "all",
    label: "All Rooms",
  },
  {
    value: "sabal",
    label: "Sabal House Rooms",
  },
  {
    value: "heritage",
    label: "Heritage Rooms @ Sabal House",
  },
];

export default function AccommodationsPage() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRooms =
    activeFilter === "all"
      ? rooms
      : rooms.filter((room) => room.house === activeFilter);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      gsap.fromTo(
        "[data-hero]",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const cards = gsap.utils.toArray("[data-room-card]");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, gridRef);

    return () => context.revert();
  }, [activeFilter]);

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  return (
    <main ref={pageRef} className="min-h-screen bg-[#f7f6f2] text-black">
      <section
        ref={heroRef}
        aria-labelledby="accommodations-heading"
        className="
          mx-auto
          w-full
          max-w-[1800px]
          px-5
          pb-14
          pt-28

          sm:px-8
          sm:pb-16
          sm:pt-36

          lg:px-12
          lg:pb-20
          lg:pt-52

          xl:px-16
          xl:pt-56
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-y-8

            lg:grid-cols-12
            lg:gap-x-8
            lg:gap-y-12
          "
        >
          <h1
            id="accommodations-heading"
            data-hero
            className="
              grid
              grid-cols-1
              gap-y-1

              font-benton-regular
              text-[clamp(3.5rem,8vw,5.75rem)]
              font-normal
              leading-[0.92]
              tracking-[-0.03em]

              lg:col-span-12
              lg:grid-cols-12
              lg:items-end
              lg:gap-x-8
              lg:text-[clamp(4.5rem,5vw,6rem)]
            "
          >
            <span className="block lg:col-span-3">Find</span>

            <span
              className="
                block
                lg:col-span-4
                lg:col-start-5
              "
            >
              Your Place
            </span>

            <span
              className="
                block
                whitespace-nowrap

                lg:col-span-4
                lg:col-start-9
              "
            >
              at Sabal House
            </span>
          </h1>

          <div
            data-hero
            className="
              mt-4
              max-w-md

              lg:col-span-4
              lg:col-start-9
              lg:mt-0
              lg:max-w-[460px]
            "
          >
            <p
              className="
                font-central-regular
                text-[13px]
                leading-[1.65]

                sm:text-sm

                lg:text-[15px]
                lg:leading-[1.5]
              "
            >
              Choose between the light-filled rooms of the Sabal House building
              and The Heritage Rooms, set within the former Presidents&apos;
              Quarters. Two distinct expressions, each part of the same stay.
            </p>
          </div>
        </div>

        <div
          data-hero
          className="
            mt-14
            border-t
            border-black/15
            pt-6

            sm:mt-20

            lg:mt-24
          "
        >
          <RoomFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      <section
        ref={gridRef}
        aria-labelledby="rooms-heading"
        className="
          mx-auto
          max-w-[1600px]
          px-2
          pb-24

          sm:px-3

          lg:px-4
          lg:pb-36
        "
      >
        <h2 id="rooms-heading" className="sr-only">
          Accommodations
        </h2>

        <p aria-live="polite" aria-atomic="true" className="sr-only">
          Showing {filteredRooms.length}{" "}
          {filteredRooms.length === 1 ? "room" : "rooms"}.
        </p>

        <div
          className="
            grid
            grid-cols-1
            gap-x-3
            gap-y-16

            md:grid-cols-2
            md:gap-y-20

            lg:gap-x-4
            lg:gap-y-24
          "
        >
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </main>
  );
}

function RoomFilter({ activeFilter, onFilterChange }) {
  return (
    <div>
      <p id="accommodation-filter-label" className="sr-only">
        Filter accommodations by house
      </p>

      <div
        role="group"
        aria-labelledby="accommodation-filter-label"
        className="
          flex
          flex-wrap
          items-center
          gap-x-7
          gap-y-3

          sm:gap-x-10

          lg:gap-x-14
        "
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onFilterChange(filter.value)}
              className="
                group
                flex
                min-h-11
                items-center
                gap-2.5
                text-left

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-black
              "
            >
              <span
                aria-hidden="true"
                className={`
                  flex
                  h-[14px]
                  w-[14px]
                  shrink-0
                  items-center
                  justify-center
                  border
                  border-black

                  transition-colors
                  duration-300

                  ${
                    isActive
                      ? "bg-black"
                      : "bg-transparent group-hover:bg-black/10"
                  }
                `}
              >
                <span
                  className={`
                    h-1
                    w-1
                    bg-white

                    transition-opacity
                    duration-300

                    ${isActive ? "opacity-100" : "opacity-0"}
                  `}
                />
              </span>

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.03em]

                  sm:text-[10px]
                "
              >
                {filter.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RoomCard({ room }) {
  return (
    <article data-room-card className="min-w-0">
      <Link
        href={`/stay/accommodations/${room.slug}`}
        aria-label={`View ${room.name}`}
        className="
          group
          block

          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-black
        "
      >
        <div
          className="
            relative
            aspect-[1.15/1]
            overflow-hidden
            bg-[#f1eadf]

            sm:aspect-[4/3]

            lg:aspect-[1.55/1]
          "
        >
          <Image
            src={room.image}
            alt={room.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectPosition: room.imagePosition ?? "center center" }}
            className="
              object-cover

              transition-transform
              duration-700
              ease-out

              motion-reduce:transition-none

              group-hover:scale-[1.025]
            "
          />
        </div>

        <div className="pt-4 sm:pt-5">
          <div
            className="
              grid
              grid-cols-1
              gap-2

              sm:grid-cols-[1fr_auto]
              sm:items-start
              sm:gap-6
            "
          >
            <h3
              className="
                text-[13px]
                font-medium
                uppercase
                leading-5
                tracking-[0.025em]
              "
            >
              {room.name}
            </h3>

            <div
              className="
                flex
                flex-wrap
                gap-x-2

                text-[13px]
                font-medium
                uppercase
                leading-5
                tracking-[0.02em]

                sm:justify-end
                sm:text-right
              "
            >
              <span>{room.bed}</span>
              <span aria-hidden="true">|</span>
              <span>{room.size}</span>
            </div>
          </div>

          <p
            className="
              mt-3
              max-w-xl
              text-[15px]
              leading-[1.65]

              sm:text-[13px]
            "
          >
            {room.shortDescription}
          </p>

          <span
            className="
              relative
              mt-4
              inline-block
              pb-1

              text-[13px]
              font-medium
              uppercase
              tracking-[0.025em]
            "
          >
            View Room
            <span
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-full
                origin-left
                bg-black

                transition-transform
                duration-300

                group-hover:scale-x-0
              "
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
