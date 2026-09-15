"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { rooms } from "@/app/data/accommodations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
    label: "Heritage Rooms",
  },
];

export default function AccommodationsClient() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRooms =
    activeFilter === "all"
      ? rooms
      : rooms.filter((room) => room.house === activeFilter);

  /*
   * Hero entrance animation
   */
  useGSAP(
    () => {
      const hero = heroRef.current;

      if (!hero) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero]",
          {
            autoAlpha: 0,
            y: 22,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power2.out",
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero]", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    {
      scope: heroRef,
    },
  );

  /*
   * Room card scroll entrances.
   *
   * Re-runs when the active filter changes so newly
   * rendered rooms receive the same entrance treatment.
   */
  useGSAP(
    () => {
      const grid = gridRef.current;

      if (!grid) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray("[data-room-card]");

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 35,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        ScrollTrigger.refresh();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-room-card]", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    {
      scope: gridRef,
      dependencies: [activeFilter],
      revertOnUpdate: true,
    },
  );

  function handleFilterChange(filter) {
    setActiveFilter(filter);
  }

  return (
    <main
      ref={pageRef}
      className="
        min-h-screen
        bg-secondary
        text-black
      "
    >
      {/* =====================================================
          PAGE INTRO
      ====================================================== */}
      <section
        ref={heroRef}
        aria-labelledby="accommodations-heading"
        className="
          mx-auto
          flex
          w-full
          max-w-[1440px]
          flex-col
          items-center

          px-5
          pb-20
          pt-36

          sm:px-8
          sm:pb-24
          sm:pt-40

          md:pt-44

          lg:min-h-[660px]
          lg:justify-center
          lg:px-12
          lg:pb-20
          lg:pt-40

          xl:min-h-[700px]
          xl:px-16
        "
      >
        {/* Intro copy */}
        <div
          data-hero
          className="
            flex
            w-full
            max-w-[620px]
            flex-col
            items-center
            text-center
          "
        >
          <h1
            id="accommodations-heading"
            className="
              font-benton-regular
              font-normal

              text-[clamp(3rem,12vw,4.25rem)]
              leading-[0.95]
              tracking-[-0.035em]

              sm:text-[clamp(3.5rem,8vw,4.75rem)]

              md:text-[clamp(4rem,5vw,5.25rem)]
            "
          >
            Find Your Place
          </h1>

          <p
            className="
              mt-6
              max-w-[520px]

              font-central-regular
              text-[13px]
              leading-[1.55]

              sm:text-sm
              sm:leading-[1.6]

              md:mt-7
              md:text-[15px]
            "
          >
            Choose between the light-filled rooms of the Sabal House building
            and The Heritage Rooms, set within the former Presidents&apos;
            Quarters. Two distinct expressions, each part of the same stay.
          </p>
        </div>

        {/* Filters */}
        <div
          data-hero
          className="
            mt-16
            w-full

            sm:mt-20

            md:mt-24

            lg:mt-28
          "
        >
          <RoomFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

      {/* =====================================================
          ROOMS
      ====================================================== */}
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

/* =========================================================
   ROOM FILTER
========================================================= */

function RoomFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="w-full">
      <p id="accommodation-filter-label" className="sr-only">
        Filter accommodations by room collection
      </p>

      <div
        role="group"
        aria-labelledby="accommodation-filter-label"
        className="
          mx-auto
          flex
          w-full
          max-w-[620px]

          flex-wrap
          items-center
          justify-center

          gap-x-6
          gap-y-2

          sm:gap-x-10

          md:gap-x-14
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
                relative

                inline-flex
                min-h-11
                items-center
                justify-center

                px-1

                text-center
                text-[9px]
                font-medium
                uppercase
                tracking-[0.035em]

                sm:text-[10px]

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-black
              "
            >
              <span>{filter.label}</span>

              {/* Underline */}
              <span
                aria-hidden="true"
                className={`
                  absolute
                  bottom-[6px]
                  left-0

                  h-px
                  w-full

                  origin-center
                  bg-black

                  transition-transform
                  duration-300
                  ease-out

                  ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }
                `}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   ROOM CARD
========================================================= */

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
        {/* Image */}
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
            sizes="
              (min-width: 768px) 50vw,
              100vw
            "
            style={{
              objectPosition: room.imagePosition ?? "center center",
            }}
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

        {/* Room information */}
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
