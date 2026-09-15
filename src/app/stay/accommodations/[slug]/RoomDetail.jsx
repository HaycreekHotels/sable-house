"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
 * Temporary floor-plan artwork.
 *
 * This is intentionally a generic schematic rather than pretending
 * to represent the actual room layout. Replace this component with
 * the real floor-plan Image once those assets are available.
 */
function FloorPlanPlaceholder() {
  return (
    <svg
      viewBox="0 0 900 560"
      role="img"
      aria-labelledby="floor-plan-placeholder-title"
      className="h-full w-full"
    >
      <title id="floor-plan-placeholder-title">
        Generic floor plan placeholder
      </title>

      <rect
        x="95"
        y="70"
        width="710"
        height="420"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />

      {/* Main internal walls */}
      <path
        d="
          M95 315H410
          M410 70V490
          M410 215H805
          M625 215V490
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />

      {/* Door openings */}
      <path
        d="
          M210 315V365
          M410 155H455
          M625 320H670
        "
        fill="none"
        stroke="#ede8de"
        strokeWidth="12"
      />

      {/* Door swings */}
      <path
        d="
          M210 365A50 50 0 0 1 260 315
          M455 155A45 45 0 0 1 410 110
          M670 320A45 45 0 0 1 625 365
        "
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Bed */}
      <rect
        x="145"
        y="115"
        width="190"
        height="135"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />

      <rect
        x="160"
        y="128"
        width="70"
        height="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      <rect
        x="250"
        y="128"
        width="70"
        height="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Bathroom fixtures */}
      <rect
        x="665"
        y="105"
        width="95"
        height="60"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      <circle
        cx="705"
        cy="395"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      {/* Furniture */}
      <rect
        x="470"
        y="285"
        width="105"
        height="65"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />

      <circle
        cx="510"
        cy="420"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function RoomDetail({ room }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const roomImageRef = useRef(null);
  const amenitiesRef = useRef(null);

  /*
   * Hero entrance
   */
  useGSAP(
    () => {
      const hero = heroRef.current;

      if (!hero) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-item]",
          {
            autoAlpha: 0,
            y: 22,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power2.out",
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-item]", {
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
   * Large room image entrance
   */
  useGSAP(
    () => {
      const section = roomImageRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-room-image]",
          {
            autoAlpha: 0,
            y: 30,
            scale: 0.99,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",

            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-room-image]", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    {
      scope: roomImageRef,
    },
  );

  /*
   * Amenities entrance
   */
  useGSAP(
    () => {
      const section = amenitiesRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-amenity-item]",
          {
            autoAlpha: 0,
            y: 16,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.035,
            ease: "power2.out",

            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-amenity-item]", {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    {
      scope: amenitiesRef,
    },
  );

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
          ROOM INTRO
      ====================================================== */}
      <section
        ref={heroRef}
        aria-labelledby="room-title"
        className="
          mx-auto
          w-full
          max-w-[1600px]

          px-5
          pb-16
          pt-32

          sm:px-8
          sm:pb-20
          sm:pt-36

          md:pt-40

          lg:px-12
          lg:pb-24
          lg:pt-44

          xl:px-16
          xl:pt-48
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-14

            lg:grid-cols-2
            lg:items-end
            lg:gap-16

            xl:gap-24
          "
        >
          {/* =================================================
              LEFT: SPECS + FLOOR PLAN
          ================================================= */}
          <div
            className="
              order-2

              lg:order-1
            "
          >
            {/* Room specs */}
            <dl
              data-hero-item
              className="
                grid
                grid-cols-2
                gap-6

                border-b
                border-black/15

                pb-5

                text-[11px]
                font-medium
                uppercase
                tracking-[0.035em]

                sm:text-xs
              "
            >
              <div>
                <dt className="sr-only">Bed configuration</dt>

                <dd>{room.bed}</dd>
              </div>

              <div>
                <dt className="sr-only">Room size</dt>

                <dd>{room.size}</dd>
              </div>
            </dl>

            {/* Floor plan */}
            <figure
              data-hero-item
              className="
                mt-6
                w-full
              "
            >
              <div
                className="
                  relative
                  aspect-[1.45/1]
                  w-full
                  overflow-hidden

                  bg-[#ede8de]
                  text-black/45

                  sm:aspect-[1.65/1]

                  lg:aspect-[1.55/1]
                "
              >
                <FloorPlanPlaceholder />
              </div>

              <figcaption
                className="
                  mt-3

                  text-[10px]
                  uppercase
                  tracking-[0.04em]
                  text-black/60
                "
              >
                Floor plan
              </figcaption>
            </figure>
          </div>

          {/* =================================================
              RIGHT: ROOM DETAILS
          ================================================= */}
          <div
            className="
              order-1

              flex
              flex-col
              items-start

              lg:order-2
              lg:pb-1
            "
          >
            <p
              data-hero-item
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.045em]

                sm:text-xs
              "
            >
              {room.houseLabel}
            </p>

            <h1
              id="room-title"
              data-hero-item
              className="
                mt-5

                font-benton-regular
                font-normal

                text-[clamp(3.5rem,14vw,5rem)]
                leading-[0.9]
                tracking-[-0.035em]

                sm:text-[clamp(4rem,10vw,5.5rem)]

                lg:text-[clamp(4.25rem,5vw,6rem)]
              "
            >
              {room.name}
            </h1>

            <p
              data-hero-item
              className="
                mt-7
                max-w-[520px]

                font-central-regular

                text-sm
                leading-[1.6]

                sm:text-[15px]

                lg:max-w-[500px]
              "
            >
              {room.description}
            </p>

            <Link
              data-hero-item
              href="/book"
              className="
                mt-8

                inline-flex
                min-h-11
                min-w-[150px]
                items-center
                justify-center

                bg-[#555d31]

                px-7
                py-3

                text-xs
                font-medium
                uppercase
                tracking-[0.035em]
                text-white

                transition-colors
                duration-300
                ease-out

                hover:bg-[#454c27]

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-black
              "
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          LARGE ROOM IMAGE
      ====================================================== */}
      <section
        ref={roomImageRef}
        aria-label={`${room.name} room photography`}
        className="
          px-3

          sm:px-4

          lg:px-5
        "
      >
        <div
          data-room-image
          className="
            relative
            mx-auto
            w-full
            max-w-[1560px]
            overflow-hidden
            bg-[#ede8de]

            aspect-[4/5]

            sm:aspect-[4/3]

            md:aspect-[16/9]

            lg:aspect-[2.15/1]
          "
        >
          <Image
            src={room.image}
            alt={room.imageAlt}
            fill
            sizes="100vw"
            style={{
              objectPosition: room.imagePosition ?? "center center",
            }}
            className="
              object-cover
            "
          />
        </div>
      </section>

      {/* =====================================================
          AMENITIES
      ====================================================== */}
      <section
        ref={amenitiesRef}
        aria-labelledby="amenities-heading"
        className="
          mx-auto
          w-full
          max-w-[1500px]

          px-5
          pb-24
          pt-16

          sm:px-8
          sm:pb-28
          sm:pt-20

          lg:px-12
          lg:pb-36
          lg:pt-24

          xl:px-16
        "
      >
        <div
          className="
            max-w-[1100px]
          "
        >
          <h2
            id="amenities-heading"
            data-amenity-item
            className="
              font-benton-regular
              font-normal

              text-[2.5rem]
              leading-none
              tracking-[-0.03em]

              sm:text-[3rem]

              lg:text-[3.5rem]
            "
          >
            Amenities
          </h2>

          <ul
            className="
              mt-8

              grid
              grid-cols-1

              gap-x-16
              gap-y-3

              font-central-regular

              text-[13px]
              leading-[1.45]

              sm:grid-cols-2

              md:grid-cols-3
              md:gap-x-20

              lg:max-w-[950px]
            "
          >
            {room.amenities.map((amenity) => (
              <li key={amenity} data-amenity-item>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <div
          data-amenity-item
          className="
            mt-20

            sm:mt-24

            lg:mt-28
          "
        >
          <Link
            href="/stay/accommodations"
            className="
              group

              inline-flex
              min-h-11
              items-center
              gap-2

              text-[11px]
              font-medium
              uppercase
              tracking-[0.035em]

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-black
            "
          >
            <span
              aria-hidden="true"
              className="
                transition-transform
                duration-300

                group-hover:-translate-x-1

                motion-reduce:transition-none
              "
            >
              ‹
            </span>

            <span
              className="
                relative
                py-1
              "
            >
              Back to accommodations
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  bottom-0

                  h-px

                  origin-left
                  scale-x-0
                  bg-black

                  transition-transform
                  duration-300

                  group-hover:scale-x-100

                  motion-reduce:transition-none
                "
              />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
