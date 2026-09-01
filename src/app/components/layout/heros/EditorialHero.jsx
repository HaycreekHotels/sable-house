"use client";

import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function EditorialHero({
  image,
  imageAlt = "",
  titleParts = ["The", "Making", "of Sabal House"],
  description,
  footer,
  headingLevel = "h1",
  priority = false,
  className = "",
}) {
  const heroRef = useRef(null);

  const HeadingTag = headingLevel;

  const safeTitleParts = [
    titleParts?.[0] ?? "",
    titleParts?.[1] ?? "",
    titleParts?.[2] ?? "",
  ];

  useGSAP(
    () => {
      const hero = heroRef.current;

      if (!hero) return;

      const mm = gsap.matchMedia();

      /*
       * Animate only the breakpoint that is currently visible.
       * This avoids applying transforms to both the hidden mobile and
       * hidden desktop copies of the artwork at the same time.
       */
      const createEntrance = (rootSelector, isMobile = false) => {
        const root = hero.querySelector(rootSelector);

        if (!root) return undefined;

        const imageElement = root.querySelector("[data-hero-image]");
        const titleElements = root.querySelectorAll("[data-hero-title]");
        const copyElement = root.querySelector("[data-hero-copy]");

        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (imageElement) {
          timeline.fromTo(
            imageElement,
            {
              scale: isMobile ? 1.035 : 1.05,
            },
            {
              scale: 1,
              duration: isMobile ? 1.15 : 1.4,
            },
            0,
          );
        }

        if (titleElements.length) {
          timeline.fromTo(
            titleElements,
            {
              y: isMobile ? 20 : 30,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: isMobile ? 0.7 : 0.8,
              stagger: isMobile ? 0.09 : 0.12,
            },
            isMobile ? 0.18 : 0.32,
          );
        }

        if (copyElement) {
          timeline.fromTo(
            copyElement,
            {
              y: isMobile ? 20 : 30,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
            },
            isMobile ? 0.48 : 0.62,
          );
        }

        return () => {
          timeline.kill();
        };
      };

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => createEntrance("[data-hero-desktop]"),
      );

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => createEntrance("[data-hero-mobile]", true),
      );

      /*
       * Reduced motion:
       * Make sure no entrance state remains if the user's preference changes.
       */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          hero.querySelectorAll(
            "[data-hero-image], [data-hero-title], [data-hero-copy]",
          ),
          {
            clearProps: "opacity,visibility,transform",
          },
        );
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: heroRef,
      dependencies: [image, safeTitleParts.join("|"), description, footer],
    },
  );

  return (
    <section
      ref={heroRef}
      aria-labelledby="editorial-hero-heading"
      className={`relative overflow-hidden bg-black ${className}`}
    >
      {/*
       * One semantic heading labels the hero at every breakpoint.
       * The large visual title treatments below are decorative duplicates.
       */}
      <HeadingTag id="editorial-hero-heading" className="sr-only">
        {safeTitleParts.filter(Boolean).join(" ")}
      </HeadingTag>

      {/* Desktop / Tablet */}
      <div
        data-hero-desktop
        aria-hidden="true"
        className="
          relative
          hidden
          min-h-[500px]
          overflow-hidden

          md:block
          md:aspect-[1.92/1]
        "
      >
        {/* Background image */}
        <div
          data-hero-image
          className="absolute inset-0 origin-center will-change-transform"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Readability overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/10"
        />

        {/* Visual heading */}
        <div
          className="
            absolute
            left-[7%]
            right-[10%]
            top-[32%]
            z-10

            grid
            grid-cols-[0.8fr_1fr_1.35fr]
            items-center
            gap-[2vw]

            font-benton-regular
            text-[clamp(2.2rem,4.75vw,5.5rem)]
            leading-[0.95]
            tracking-[-0.04em]
            text-white
          "
        >
          <span data-hero-title className="justify-self-start">
            {safeTitleParts[0]}
          </span>

          <span data-hero-title className="justify-self-center">
            {safeTitleParts[1]}
          </span>

          <span data-hero-title className="justify-self-end text-right">
            {safeTitleParts[2]}
          </span>
        </div>

        {/* Editorial copy */}
        <div
          data-hero-copy
          className="
            absolute
            bottom-0
            right-0
            z-20

            w-[42%]
            min-w-[380px]
            max-w-[720px]

            bg-white
            px-[clamp(2rem,3.2vw,4rem)]
            py-[clamp(2rem,3vw,3.75rem)]

            text-black
          "
        >
          {description && (
            <p
              className="
                max-w-[42rem]
                text-[clamp(0.9rem,1vw,1.1rem)]
                leading-[1.65]
              "
            >
              {description}
            </p>
          )}

          {footer && (
            <p
              className="
                mt-5
                text-xs
                font-medium
                uppercase
                tracking-[0.04em]

                lg:text-sm
              "
            >
              {footer}
            </p>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div data-hero-mobile className="md:hidden">
        <div
          aria-hidden="true"
          className="
            relative
            min-h-[34rem]
            overflow-hidden
            sm:min-h-[40rem]
          "
        >
          <div
            data-hero-image
            className="absolute inset-0 origin-center will-change-transform"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-b
              from-black/20
              via-transparent
              to-black/40
            "
          />

          {/* Visual heading */}
          <div
            className="
              absolute
              inset-x-5
              top-1/2
              z-10

              flex
              -translate-y-1/2
              flex-col
              gap-1

              font-benton-regular
              text-[clamp(2.5rem,12vw,4.25rem)]
              leading-[0.92]
              tracking-[-0.045em]
              text-white

              sm:inset-x-8
            "
          >
            <span data-hero-title>{safeTitleParts[0]}</span>

            <span data-hero-title className="self-center">
              {safeTitleParts[1]}
            </span>

            <span data-hero-title className="self-end text-right">
              {safeTitleParts[2]}
            </span>
          </div>
        </div>

        <div
          data-hero-copy
          className="
            bg-white
            px-5
            py-8
            text-black

            sm:px-8
            sm:py-10
          "
        >
          {description && (
            <p
              className="
                max-w-[42rem]
                text-[0.95rem]
                leading-[1.7]
              "
            >
              {description}
            </p>
          )}

          {footer && (
            <p
              className="
                mt-5
                text-xs
                font-medium
                uppercase
                tracking-[0.04em]
              "
            >
              {footer}
            </p>
          )}
        </div>
      </div>

    </section>
  );
}
