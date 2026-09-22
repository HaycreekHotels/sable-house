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
    hospitality, and a deep connection to Savannah, our house
    creates space to arrive, feel at ease, and become more
    present to the city around you.`,
  image = placeHolder,
  imageAlt = "",
  priority = false,
}) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  const introRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const imageLayer = imageRef.current;
      const overlay = overlayRef.current;
      const intro = introRef.current;
      const content = contentRef.current;

      if (!section || !panel || !imageLayer || !overlay || !intro || !content) {
        return;
      }

      const mm = gsap.matchMedia();

      /*
       * Reduced motion:
       * Skip the scroll transformation and show the
       * final state immediately.
       */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(panel, {
          width: "100%",
          height: "100svh",
          y: 0,
        });

        gsap.set(intro, {
          autoAlpha: 0,
        });

        gsap.set(imageLayer, {
          scale: 1,
        });

        gsap.set(overlay, {
          autoAlpha: 1,
        });

        gsap.set(content, {
          autoAlpha: 1,
          y: 0,
        });
      });

      /*
       * Standard motion.
       */
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions;

          if (reduceMotion) return;

          /*
           * Starting image width.
           *
           * Desktop is intentionally much wider than the
           * previous square layout.
           */
          const getStartWidth = () => {
            if (isMobile) {
              return Math.min(window.innerWidth - 32, 520);
            }

            return Math.min(window.innerWidth * 0.62, 900);
          };

          /*
           * Wide editorial image ratio.
           */
          const getStartHeight = () => {
            const width = getStartWidth();

            if (isMobile) {
              return Math.min(width * 0.72, window.innerHeight * 0.46);
            }

            return Math.min(width * 0.52, window.innerHeight * 0.48);
          };

          /*
           * Starting image sits below the intro heading.
           */
          const getStartY = () => {
            if (isMobile) {
              return Math.min(115, window.innerHeight * 0.14);
            }

            return Math.min(185, window.innerHeight * 0.22);
          };

          /*
           * INITIAL STATE
           */
          gsap.set(panel, {
            width: getStartWidth(),
            height: getStartHeight(),
            y: getStartY(),
          });

          gsap.set(imageLayer, {
            scale: 1,
          });

          gsap.set(intro, {
            autoAlpha: 1,
            y: 0,
          });

          gsap.set(overlay, {
            autoAlpha: 0,
          });

          gsap.set(content, {
            autoAlpha: 0,
            y: isMobile ? 20 : 30,
          });

          /*
           * SCROLL ANIMATION
           */
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,

              start: "top 15%",

              end: isMobile ? "+=900" : "+=1400",

              scrub: isMobile ? 0.7 : 1,

              pin: section,
              pinSpacing: true,

              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          /*
           * PHASE 1
           * Expand the image to full viewport.
           */
          timeline.to(
            panel,
            {
              width: () => section.clientWidth,
              height: "100svh",
              y: 0,

              duration: 3,
              ease: "none",
            },
            0,
          );

          /*
           * Gentle image movement creates some depth.
           */
          timeline.to(
            imageLayer,
            {
              scale: isMobile ? 1.035 : 1.07,

              duration: 3,
              ease: "none",
            },
            0,
          );

          /*
           * PHASE 2
           * Fade the intro once expansion has begun.
           */
          timeline.to(
            intro,
            {
              autoAlpha: 0,
              y: -16,

              duration: 0.65,
              ease: "none",
            },
            0.4,
          );

          /*
           * PHASE 3
           * Bring in dark treatment.
           */
          timeline.to(
            overlay,
            {
              autoAlpha: 1,

              duration: 0.8,
              ease: "none",
            },
            1.85,
          );

          /*
           * PHASE 4
           * Reveal final copy.
           */
          timeline.to(
            content,
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.8,
              ease: "none",
            },
            2.15,
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
        bg-secondary
      "
    >
      {/*
       * Persistent semantic heading.
       *
       * The visual version below animates away,
       * while this remains available to assistive tech.
       */}
      <h2 id="philosophy-heading" className="sr-only">
        {headingStart} {headingEnd}
      </h2>

      {/* =====================================================
          INTRO HEADER
      ====================================================== */}
      <div
        ref={introRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[14svh]
          z-20

          px-6
          text-center

          sm:top-[15svh]
          sm:px-8

          md:top-[17svh]
          md:px-12

          lg:top-[18svh]
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[900px]
            flex-col
            items-center
          "
        >
          <p
            className="
              text-[11px]
              font-medium
              uppercase
              tracking-[0.04em]
              text-black

              sm:text-xs

              md:text-sm
            "
          >
            {eyebrow}
          </p>

          <p
            className="
              mt-2

              font-benton-regular
              italic

              text-[clamp(2.25rem,9vw,3.25rem)]
              leading-[1]
              tracking-[-0.035em]
              text-black

              sm:text-[clamp(2.75rem,7vw,3.75rem)]

              md:mt-3
              md:text-[clamp(3.25rem,4.5vw,4.75rem)]

              lg:text-[clamp(3.75rem,4vw,5.25rem)]
            "
          >
            {headingStart}{" "}
            <span className="whitespace-nowrap">{headingEnd}</span>
          </p>
        </div>
      </div>

      {/* =====================================================
          EXPANDING IMAGE
      ====================================================== */}
      <div
        ref={panelRef}
        className="
          relative
          z-10

          h-[300px]
          w-[calc(100%-2rem)]

          shrink-0
          overflow-hidden

          will-change-[width,height,transform]

          md:h-[380px]
        "
      >
        {/* Image */}
        <div
          ref={imageRef}
          className="
            absolute
            inset-0
            will-change-transform
          "
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="
              object-cover
              object-center
            "
          />
        </div>

        {/* ===================================================
            FINAL IMAGE OVERLAY
        ==================================================== */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="
            absolute
            inset-0
            z-10
          "
        >
          {/* Mobile */}
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

          {/* Desktop */}
          <div
            className="
              absolute
              inset-0
              hidden
              bg-black/20

              md:block
            "
          />
        </div>

        {/* ===================================================
            FINAL COPY
        ==================================================== */}
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
