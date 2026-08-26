"use client";

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

  /* ---------------------------------------------------------------------- */
  /* HERO ANIMATION                                                         */
  /* ---------------------------------------------------------------------- */

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

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

  /* ---------------------------------------------------------------------- */
  /* ROOM CARD ANIMATION                                                    */
  /* ---------------------------------------------------------------------- */

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        return;
      }

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
    <main ref={pageRef} className="min-h-screen bg-[#fdfdfc] text-black">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}

      <section
        ref={heroRef}
        aria-labelledby="accommodations-heading"
        className="
          mx-auto
          max-w-[1600px]
          px-5
          pb-14
          pt-20
          sm:px-8
          sm:pb-16
          sm:pt-24
          lg:px-12
          lg:pb-20
          lg:pt-28
          xl:px-16
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-12
            lg:items-end
            lg:gap-x-8
          "
        >
          {/* ------------------------------------------------------------ */}
          {/* TITLE                                                        */}
          {/* ------------------------------------------------------------ */}

          <div data-hero className="lg:col-span-7">
            <h1
              id="accommodations-heading"
              className="
                max-w-[900px]
                font-serif
                text-[clamp(3.5rem,7vw,7.5rem)]
                font-normal
                leading-[0.9]
                tracking-[-0.055em]
              "
            >
              Find Your Place
              <br />
              At Sabal House
            </h1>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* DESCRIPTION                                                  */}
          {/* ------------------------------------------------------------ */}

          <div
            data-hero
            className="
              max-w-xl
              lg:col-span-5
              lg:max-w-md
              lg:justify-self-end
              lg:pb-1
            "
          >
            <p
              className="
                text-[13px]
                leading-[1.65]
                sm:text-sm
              "
            >
              Choose between the light-filled rooms of Sabal House and the
              Heritage Rooms, set within the former Presidents&apos; Quarters.
              Two distinct expressions, each part of the same stay.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* FILTER                                                       */}
        {/* ============================================================ */}

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

      {/* ================================================================ */}
      {/* ROOM GRID                                                        */}
      {/* ================================================================ */}

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

        {/* Accessibility announcement when filtering */}

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

/* ========================================================================== */
/* FILTER                                                                     */
/* ========================================================================== */

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
              {/* Checkbox-inspired indicator */}

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

/* ========================================================================== */
/* ROOM CARD                                                                  */
/* ========================================================================== */

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
        {/* ============================================================ */}
        {/* IMAGE                                                        */}
        {/* ============================================================ */}

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
          <RoomPlaceholder room={room} />
        </div>

        {/* ============================================================ */}
        {/* ROOM INFORMATION                                             */}
        {/* ============================================================ */}

        <div className="pt-4 sm:pt-5">
          {/* Name + specifications */}

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
                text-[10px]
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
                text-[10px]
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

          {/* Description */}

          <p
            className="
              mt-3
              max-w-xl
              text-[12px]
              leading-[1.65]
              sm:text-[13px]
            "
          >
            {room.shortDescription}
          </p>

          {/* View room */}

          <span
            className="
              relative
              mt-4
              inline-block
              pb-1
              text-[10px]
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

/* ========================================================================== */
/* PLACEHOLDER ART                                                           */
/* ========================================================================== */

function RoomPlaceholder({ room }) {
  const isHeritage = room.house === "heritage";

  return (
    <div
      aria-hidden="true"
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-[#f3ecdf]
      "
    >
      {/* Back artwork */}

      <div
        className={`
          absolute
          left-1/2
          top-[10%]
          h-[58%]
          w-[25%]
          -translate-x-1/2
          transition-transform
          duration-700
          ease-out
          group-hover:-translate-x-1/2
          group-hover:scale-[1.025]
          ${isHeritage ? "bg-[#6f4738]" : "bg-[#9c8b7e]"}
        `}
      />

      {/* Hanging light */}

      <div
        className="
          absolute
          left-[24%]
          top-[-6%]
          z-10
          h-[15%]
          w-[6%]
          rounded-b-full
          bg-[#b08c51]
        "
      />

      <div
        className="
          absolute
          left-[19%]
          top-[5%]
          z-10
          h-[15%]
          w-[16%]
          rounded-[50%]
          bg-[#eee8df]
          shadow-sm
        "
      />

      {/* Left furniture */}

      <div
        className="
          absolute
          bottom-[25%]
          left-[8%]
          h-[24%]
          w-[31%]
          border
          border-black/10
          bg-[#d9dcd5]
          shadow-sm
          transition-transform
          duration-700
          ease-out
          group-hover:-translate-y-1
        "
      >
        <div
          className="
            grid
            h-full
            w-full
            grid-cols-5
            opacity-20
          "
        >
          <span className="border-r border-black" />
          <span className="border-r border-black" />
          <span className="border-r border-black" />
          <span className="border-r border-black" />
        </div>
      </div>

      {/* Right rug / art */}

      <div
        className={`
          absolute
          bottom-[14%]
          right-[8%]
          h-[38%]
          w-[31%]
          border-[5px]
          transition-transform
          duration-700
          ease-out
          group-hover:translate-y-[-3px]
          ${
            isHeritage
              ? "border-[#654b39] bg-[#b99c7b]"
              : "border-[#263c52] bg-[#c0ae86]"
          }
        `}
      >
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            overflow-hidden
            text-center
            font-serif
            text-3xl
            opacity-20
          "
        >
          ✦
        </div>
      </div>

      {/* Bench */}

      <div
        className="
          absolute
          bottom-[10%]
          left-[38%]
          z-20
          h-[17%]
          w-[28%]
          rounded-[45%_45%_10%_10%]
          bg-[#ebe6dc]
          shadow-sm
          transition-transform
          duration-700
          ease-out
          group-hover:-translate-y-1
        "
      >
        <div
          className="
            absolute
            -left-[6%]
            bottom-0
            h-[85%]
            w-[11%]
            rounded-full
            bg-[#ebe6dc]
          "
        />

        <div
          className="
            absolute
            -right-[6%]
            bottom-0
            h-[85%]
            w-[11%]
            rounded-full
            bg-[#ebe6dc]
          "
        />
      </div>

      {/* Label */}

      <span
        className="
          absolute
          bottom-4
          right-4
          text-[8px]
          font-medium
          uppercase
          tracking-[0.12em]
          text-black/30
        "
      >
        Placeholder
      </span>
    </div>
  );
}
