"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROOM_PLACEHOLDER_IMAGE =
  "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Guestroom.jpg";

export default function RoomDetail({ room }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const roomImageRef = useRef(null);
  const amenitiesRef = useRef(null);

  const titleWords = room.name.trim().split(/\s+/);

  const firstTitleWord = titleWords[0] ?? "";
  const secondTitleWord = titleWords[1] ?? "";
  const remainingTitleWords = titleWords.slice(2).join(" ");

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from("[data-room-image]", {
        y: 45,
        opacity: 0,
        scale: 0.985,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: roomImageRef.current,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from("[data-amenity-item]", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.045,
        ease: "power2.out",
        scrollTrigger: {
          trigger: amenitiesRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, pageRef);

    return () => context.revert();
  }, [room.slug]);

  return (
    <main ref={pageRef} className="min-h-screen bg-[#fdfdfc] text-black">
      <section
        ref={heroRef}
        aria-labelledby="room-title"
        className="
          mx-auto
          w-full
          max-w-[1800px]
          px-5
          pb-16
          pt-28

          sm:px-8
          sm:pt-32

          lg:px-12
          lg:pb-20
          lg:pt-40

          xl:px-16
        "
      >
        <p
          data-hero-item
          className="
            mb-14

            font-central-regular
            text-[14px]
            uppercase
            tracking-[0.04em]

            lg:mb-20
          "
        >
          {room.houseLabel}
        </p>

        <h1 id="room-title" className="sr-only">
          {room.name}
        </h1>

        <div data-hero-item aria-hidden="true" className="lg:hidden">
          <p
            className="
              max-w-[700px]

              font-benton-regular
              text-[clamp(3.5rem,14vw,6.5rem)]
              font-normal
              leading-[0.9]
              tracking-[-0.05em]
            "
          >
            {room.name}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            hidden

            lg:grid
            lg:grid-cols-12
            lg:items-end
            lg:gap-x-8
          "
        >
          <div data-hero-item className="lg:col-span-3">
            <p
              className="
                font-benton-regular
                text-[clamp(3.5rem,6vw,6.5rem)]
                font-normal
                leading-[0.9]
                tracking-[-0.01em]
              "
            >
              {firstTitleWord}
            </p>
          </div>

          <div
            data-hero-item
            className="
              lg:col-span-4
              lg:col-start-5
            "
          >
            <p
              className="
                font-benton-regular
                text-[clamp(3.5rem,6vw,6.5rem)]
                font-normal
                leading-[0.9]
                tracking-[-0.01em]
              "
            >
              {secondTitleWord}
            </p>
          </div>

          {remainingTitleWords && (
            <div
              data-hero-item
              className="
                lg:col-span-4
                lg:col-start-9
              "
            >
              <p
                className="
                  font-benton-regular
                  text-[clamp(3.5rem,6vw,6.5rem)]
                  font-normal
                  leading-[0.9]
                  tracking-[-0.01em]
                "
              >
                {remainingTitleWords}
              </p>
            </div>
          )}
        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-2
            gap-x-8
            gap-y-10

            sm:mt-12

            lg:mt-12
            lg:grid-cols-12
            lg:gap-x-8
          "
        >
          <div data-hero-item className="col-span-1 lg:col-span-3">
            <p
              className="
                font-central-regular
                text-[14px]
                uppercase
                tracking-[0.02em]
              "
            >
              {room.bed}
            </p>
          </div>

          <div
            data-hero-item
            className="
              col-span-1

              lg:col-span-4
              lg:col-start-5
            "
          >
            <p
              className="
                font-central-regular
                text-[14px]
                uppercase
                tracking-[0.02em]
              "
            >
              {room.size}
            </p>
          </div>

          <div
            data-hero-item
            className="
              col-span-2
              max-w-lg

              lg:col-span-4
              lg:col-start-9
              lg:max-w-[460px]
            "
          >
            <p
              className="
                font-central-regular
                text-[13px]
                leading-[1.6]

                sm:text-sm

                lg:text-[15px]
                lg:leading-[1.55]
              "
            >
              {room.description}
            </p>

            <Link
              href="/book"
              className="
                mt-8
                inline-flex
                min-h-11
                min-w-[150px]
                items-center
                justify-center

                bg-black
                px-8

                font-central-regular
                text-[14px]
                uppercase
                tracking-[0.03em]
                text-white

                transition-colors
                duration-300

                hover:bg-black/75

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

      {/* Single room image — replaces the former multi-image collage */}
      <section
        ref={roomImageRef}
        aria-label={`${room.name} room image`}
        className="
          mx-2
          overflow-hidden
          bg-[#f1eadf]

          sm:mx-3

          lg:mx-4
        "
      >
        <div
          data-room-image
          className="
            relative
            mx-auto
            aspect-[4/5]
            w-full
            max-w-[1600px]
            overflow-hidden

            sm:aspect-[4/3]

            md:aspect-[16/9]

            lg:aspect-[16/7]
          "
        >
          <Image
            src={ROOM_PLACEHOLDER_IMAGE}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section
        ref={amenitiesRef}
        aria-labelledby="amenities-heading"
        className="
          mx-auto
          max-w-[1600px]
          px-5
          py-20

          sm:px-8
          sm:py-28

          lg:px-12
          lg:pb-40
          lg:pt-24
        "
      >
        <div className="max-w-6xl">
          <h2
            id="amenities-heading"
            data-amenity-item
            className="
              mb-7

              font-benton-regular
              text-4xl
              font-normal
              tracking-[-0.04em]

              sm:text-5xl
            "
          >
            Amenities
          </h2>

          <ul
            className="
              grid
              grid-cols-1
              gap-x-14
              gap-y-3

              font-central-regular
              text-[14px]

              sm:grid-cols-2

              md:grid-cols-3
            "
          >
            {room.amenities.map((amenity) => (
              <li key={amenity} data-amenity-item>
                {amenity}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-28 lg:mt-36">
          <Link
            data-amenity-item
            href="/stay/accommodations"
            className="
              group
              inline-block

              font-central-regular
              text-[14px]
              uppercase
              tracking-[0.03em]

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-black
            "
          >
            Back to Accommodations
            <span
              aria-hidden="true"
              className="
                mt-1
                block
                h-px
                w-full
                origin-left
                bg-black

                transition-transform
                duration-300

                group-hover:scale-x-0
              "
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
