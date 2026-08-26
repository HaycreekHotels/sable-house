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

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .from("[data-hero-image]", {
            scale: 1.05,
            duration: 1.4,
          })
          .from(
            "[data-hero-title]",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
            },
            "-=0.9",
          )
          .from(
            "[data-hero-copy]",
            {
              y: 35,
              opacity: 0,
              duration: 0.8,
            },
            "-=0.55",
          );
      });

      return () => media.revert();
    },
    {
      scope: heroRef,
    },
  );

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden bg-black ${className}`}
      aria-labelledby="editorial-hero-heading"
    >
      {/* Desktop / Tablet */}
      <div className="relative hidden aspect-[1.92/1] min-h-[500px] overflow-hidden md:block">
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

        {/* Optional readability overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-black/10"
          aria-hidden="true"
        />

        {/* Heading */}
        <HeadingTag
          id="editorial-hero-heading"
          className="
            absolute
            left-[7%]
            right-[17%]
            top-[32%]
            z-10
            grid
            grid-cols-3
            items-center
            text-[clamp(2rem,4.75vw,5.5rem)]
            font-benton-regular
            leading-none
            tracking-[-0.04em]
            text-white
          "
        >
          <span data-hero-title className="justify-self-start">
            {titleParts[0]}
          </span>

          <span data-hero-title className="justify-self-center">
            {titleParts[1]}
          </span>

          <span data-hero-title className="justify-self-end">
            {titleParts[2]}
          </span>
        </HeadingTag>

        {/* Editorial copy */}
        <div
          data-hero-copy
          className="
            absolute
            bottom-0
            right-0
            z-20
            w-[42%]
            min-w-[400px]
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
                sm:text-sm
              "
            >
              {footer}
            </p>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative aspect-[4/5] overflow-hidden">
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
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-b
              from-black/20
              via-transparent
              to-black/40
            "
            aria-hidden="true"
          />

          <HeadingTag
            id="editorial-hero-heading-mobile"
            className="
              absolute
              inset-x-5
              top-1/2
              z-10
              flex
              -translate-y-1/2
              flex-col
              gap-1
              font-serif
              text-[clamp(2.6rem,13vw,4.25rem)]
              font-medium
              leading-[0.95]
              tracking-[-0.045em]
              text-white
            "
          >
            <span data-hero-title>{titleParts[0]}</span>

            <span data-hero-title className="self-center">
              {titleParts[1]}
            </span>

            <span data-hero-title className="self-end text-right">
              {titleParts[2]}
            </span>
          </HeadingTag>
        </div>

        <div
          data-hero-copy
          className="bg-white px-5 py-8 text-black sm:px-8 sm:py-10"
        >
          {description && (
            <p className="text-[0.95rem] leading-[1.7]">{description}</p>
          )}

          {footer && (
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.04em]">
              {footer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
