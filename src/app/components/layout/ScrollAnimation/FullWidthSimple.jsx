"use client";

import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const placeHolder =
  "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-66.jpeg";

export default function FullWidthSimple({
  eyebrow = "OUR PHILOSOPHY",
  headingStart = "Slow down,",
  headingEnd = "experience more.",
  description = `Sabal House believes that slowing down allows you to
    experience more. Through thoughtful design, intuitive
    hospitality, and a deep connection to Savannah, the house
    creates space to arrive, feel at ease, and become more
    present to the city around you.`,
  image = placeHolder,
  imageAlt = "",
}) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  const introRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const imageLayer = imageRef.current;
      const overlay = overlayRef.current;
      const intro = introRef.current;
      const heading = headingRef.current;
      const content = contentRef.current;

      if (
        !section ||
        !panel ||
        !imageLayer ||
        !overlay ||
        !intro ||
        !heading ||
        !content
      ) {
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /*
       * REDUCED MOTION
       *
       * Show the finished, useful state immediately.
       * The panel fills the entire viewport so no section background
       * is exposed beneath the image.
       */
      if (prefersReducedMotion) {
        gsap.set(panel, {
          width: "100%",
          height: "100svh",
        });

        gsap.set([intro, heading], {
          autoAlpha: 0,
        });

        gsap.set(overlay, {
          autoAlpha: 1,
        });

        gsap.set(content, {
          autoAlpha: 1,
          y: 0,
        });

        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const getStartSize = () => {
            if (isMobile) {
              return Math.min(220, window.innerWidth - 48);
            }

            return 250;
          };

          /*
           * STARTING STATE
           */
          gsap.set(panel, {
            width: getStartSize(),
            height: getStartSize(),
          });

          gsap.set(imageLayer, {
            scale: 1,
          });

          gsap.set([intro, heading], {
            autoAlpha: 1,
            y: 0,
          });

          gsap.set(overlay, {
            autoAlpha: 0,
          });

          /*
           * autoAlpha also applies visibility:hidden at zero opacity,
           * keeping the hidden final copy out of the accessibility tree
           * until it begins to appear.
           */
          gsap.set(content, {
            autoAlpha: 0,
            y: isMobile ? 20 : 30,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: isMobile ? "+=1000" : "+=1600",
              scrub: isMobile ? 0.65 : 1,
              pin: section,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /*
           * PHASE 1 — EXPAND TO THE FULL VIEWPORT
           *
           * The previous 86svh / 90vh values were the source of the
           * light-colored bar beneath the image. The pinned section is
           * 100svh tall, so the final panel needs to be 100svh as well.
           */
          timeline.to(
            panel,
            {
              width: () => section.clientWidth,
              height: "100svh",
              ease: "none",
              duration: 3,
            },
            0,
          );

          timeline.to(
            imageLayer,
            {
              scale: isMobile ? 1.04 : 1.08,
              ease: "none",
              duration: 3,
            },
            0,
          );

          /*
           * PHASE 2 — REMOVE THE INTRODUCTORY COPY
           */
          timeline.to(
            [intro, heading],
            {
              autoAlpha: 0,
              y: isMobile ? -6 : -10,
              duration: 0.55,
              ease: "none",
            },
            isMobile ? 0.45 : 0.65,
          );

          /*
           * PHASE 3 — DARKEN THE IMAGE AND REVEAL THE FINAL COPY
           */
          timeline.to(
            overlay,
            {
              autoAlpha: 1,
              duration: 0.8,
              ease: "none",
            },
            2.1,
          );

          timeline.to(
            content,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "none",
            },
            isMobile ? 2.2 : 2.35,
          );

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="philosophy-heading"
      className="
        relative
        flex
        h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#f7f6f2]
      "
    >
      {/* Persistent accessible heading for the section. */}
      <h2 id="philosophy-heading" className="sr-only">
        {headingStart} {headingEnd}
      </h2>

      {/* Introductory copy positioned around the starting square. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
      >
        <p
          ref={introRef}
          className="
            absolute
            left-1/2
            top-[calc(50%-9.5rem)]
            -translate-x-1/2
            whitespace-nowrap
            text-[10px]
            uppercase
            tracking-[0.12em]
            text-black

            md:top-44
            md:text-xs
          "
        >
          {eyebrow}
        </p>

        <div ref={headingRef} className="absolute inset-0">
          {/* Desktop split heading */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              hidden
              w-full
              -translate-x-1/2
              -translate-y-1/2
              grid-cols-[1fr_250px_1fr]
              items-center
              gap-12
              px-8
              font-benton-regular
              text-[clamp(1.75rem,3.6vw,4rem)]
              font-normal
              leading-none
              tracking-[-0.04em]
              text-black

              md:grid
              lg:px-16
            "
          >
            <span className="justify-self-end text-right">{headingStart}</span>

            <span />

            <span className="justify-self-start">{headingEnd}</span>
          </div>

          {/* Mobile heading */}
          <div
            className="
              absolute
              left-1/2
              top-[calc(50%+9rem)]
              w-[calc(100%-2.5rem)]
              -translate-x-1/2
              text-center
              font-benton-regular
              text-[clamp(1.75rem,8vw,2.35rem)]
              font-normal
              leading-[0.95]
              tracking-[-0.035em]
              text-black

              md:hidden
            "
          >
            <span className="block">{headingStart}</span>
            <span className="block">{headingEnd}</span>
          </div>
        </div>
      </div>

      <div
        ref={panelRef}
        className="
          relative
          z-10
          h-[220px]
          w-[220px]
          shrink-0
          overflow-hidden
          will-change-[width,height]

          md:h-[250px]
          md:w-[250px]
        "
      >
        {/* Atmospheric image */}
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Final image treatment */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-0 z-10"
        >
          {/* Mobile: stronger bottom gradient for copy legibility. */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-black/15
              to-black/5
              md:hidden
            "
          />

          {/* Desktop: lighter, flatter treatment. */}
          <div className="absolute inset-0 hidden bg-black/20 md:block" />
        </div>

        {/* Final copy */}
        <div
          ref={contentRef}
          className="
            invisible
            absolute
            inset-x-0
            bottom-0
            z-20

            px-6
            pb-[max(2rem,env(safe-area-inset-bottom))]
            text-white

            sm:px-8
            sm:pb-[max(2.5rem,env(safe-area-inset-bottom))]

            md:flex
            md:justify-end
            md:px-16
            md:pb-14

            lg:px-24
            xl:px-36
          "
        >
          <p
            className="
              max-w-[28rem]
              text-[0.875rem]
              leading-[1.65]

              md:max-w-[34rem]
              md:text-base
            "
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
