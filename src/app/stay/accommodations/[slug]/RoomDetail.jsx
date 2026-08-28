"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RoomDetail({ room }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const collageRef = useRef(null);
  const amenitiesRef = useRef(null);

  const titleWords = room.name.trim().split(/\s+/);

  const firstTitleWord = titleWords[0] ?? "";
  const secondTitleWord = titleWords[1] ?? "";
  const remainingTitleWords = titleWords.slice(2).join(" ");

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      /*
       * Hero entrance
       */
      gsap.from("[data-hero-item]", {
        y: 35,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      /*
       * Collage entrance
       */
      gsap.from("[data-collage-image]", {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: collageRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /*
       * Amenities
       */
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
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}

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
        {/* ------------------------------------------------------------ */}
        {/* HOUSE LABEL                                                  */}
        {/* ------------------------------------------------------------ */}

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

        {/* Real accessible page heading */}
        <h1 id="room-title" className="sr-only">
          {room.name}
        </h1>

        {/* ------------------------------------------------------------ */}
        {/* MOBILE TITLE                                                 */}
        {/* ------------------------------------------------------------ */}

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

        {/* ------------------------------------------------------------ */}
        {/* DESKTOP TITLE                                                */}
        {/* ------------------------------------------------------------ */}

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
          {/* Column 1 */}
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

          {/* Column 2 */}
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

          {/* Column 3 */}
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

        {/* ------------------------------------------------------------ */}
        {/* ROOM DETAILS                                                 */}
        {/* ------------------------------------------------------------ */}

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
          {/* Bed */}
          <div
            data-hero-item
            className="
        col-span-1
        lg:col-span-3
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
              {room.bed}
            </p>
          </div>

          {/* Room size */}
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

          {/* Description + CTA */}
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

      {/* ================================================================ */}
      {/* ROOM COLLAGE                                                     */}
      {/* ================================================================ */}

      <section
        ref={collageRef}
        aria-label={`${room.name} room gallery`}
        className="
          mx-2
          overflow-hidden
          bg-[#f1eadf]
          sm:mx-3
          lg:mx-4
        "
      >
        <div
          className="
            relative
            mx-auto
            aspect-[1/1]
            max-w-[1500px]
            overflow-hidden
            sm:aspect-[4/3]
            md:aspect-[16/8]
            lg:aspect-[16/7]
          "
        >
          {/* Back artwork */}

          <div
            data-collage-image
            className="
              absolute
              left-[34%]
              top-[5%]
              h-[54%]
              w-[32%]
              overflow-hidden
              sm:left-[37%]
              sm:w-[26%]
            "
          >
            <img
              src={room.images[0]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Left piece */}

          <div
            data-collage-image
            className="
              absolute
              left-[8%]
              top-[37%]
              h-[29%]
              w-[38%]
              overflow-hidden
              sm:left-[24%]
              sm:top-[36%]
              sm:h-[26%]
              sm:w-[23%]
            "
          >
            <img
              src={room.images[1]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right piece */}

          <div
            data-collage-image
            className="
              absolute
              right-[6%]
              top-[47%]
              h-[35%]
              w-[43%]
              overflow-hidden
              sm:right-[22%]
              sm:top-[45%]
              sm:h-[38%]
              sm:w-[28%]
            "
          >
            <img
              src={room.images[2]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Front furniture */}

          <div
            data-collage-image
            className="
              absolute
              bottom-[8%]
              left-[25%]
              z-10
              h-[25%]
              w-[48%]
              overflow-hidden
              sm:bottom-[9%]
              sm:left-[39%]
              sm:h-[24%]
              sm:w-[24%]
            "
          >
            <img
              src={room.images[3]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* AMENITIES                                                        */}
      {/* ================================================================ */}

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
              text-[14px]
              font-central-regular
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
              text-[14px]
              font-central-regular
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
