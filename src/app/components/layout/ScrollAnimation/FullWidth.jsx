"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const placeHolder =
  "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Guestroom.jpg";

export default function FullWidth({
  leftIntroHeading = "Past & Present",
  rightIntroHeading = "Perfected",

  introHeading,
  introDescription = "Two distinct expressions, one Sabal House. Contemporary rooms offer a lighter, more refined sense of ease, while The Heritage Rooms, formerly Presidents’ Quarters, carry forward the character, original details, and individuality of the historic building.",

  title = "Sabal House Rooms",
  description = "A lighter, more contemporary expression of Sabal House. Refined finishes, thoughtful layouts, and a calm sense of ease within the new building.",

  ctaLabel = "Explore Your Stay",
  ctaHref = "/stay/accommodations",

  imageSrc = placeHolder,
  images = [],
}) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const introRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const carouselControlsRef = useRef(null);
  const slideContentRef = useRef(null);

  const [activeImage, setActiveImage] = useState(0);
  const [carouselControlsEnabled, setCarouselControlsEnabled] = useState(false);

  const resolvedIntroHeading =
    introHeading || `${leftIntroHeading} ${rightIntroHeading}`;

  const suppliedImages =
    Array.isArray(images) && images.length > 0 ? images : [imageSrc];

  const carouselImages = suppliedImages
    .map((image, index) => {
      if (typeof image === "string") {
        return {
          src: image,
          alt: `${title} — image ${index + 1}`,
          eyebrow: "Stay",
          title,
          description,
          ctaLabel,
          ctaHref,
        };
      }

      if (!image?.src) return null;

      return {
        src: image.src,
        alt: image.alt || `${title} — image ${index + 1}`,
        eyebrow: image.eyebrow || "Stay",
        title: image.title || title,
        description: image.description || description,
        ctaLabel: image.ctaLabel || ctaLabel,
        ctaHref: image.ctaHref || ctaHref,
      };
    })
    .filter(Boolean);

  if (!carouselImages.length) {
    carouselImages.push({
      src: placeHolder,
      alt: `${title} guest room`,
      eyebrow: "Stay",
      title,
      description,
      ctaLabel,
      ctaHref,
    });
  }

  const hasCarousel = carouselImages.length > 1;

  const currentImageIndex = Math.min(activeImage, carouselImages.length - 1);

  const activeSlide = carouselImages[currentImageIndex];

  function showPreviousImage() {
    setActiveImage((current) =>
      current <= 0 ? carouselImages.length - 1 : current - 1,
    );
  }

  function showNextImage() {
    setActiveImage((current) =>
      current >= carouselImages.length - 1 ? 0 : current + 1,
    );
  }

  /*
   * Main expansion animation
   */
  useGSAP(
    () => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;
      const carouselControls = carouselControlsRef.current;

      if (!section || !panel || !intro || !content) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /*
       * Starting image is now substantially wider on desktop
       * to match the redesign.
       */
      const getStartWidthSize = () => {
        if (window.innerWidth < 768) {
          return Math.min(window.innerWidth - 32, 520);
        }

        return Math.min(window.innerWidth * 0.62, 920);
      };

      /*
       * Keep a wide editorial aspect ratio instead of
       * the old near-square starting shape.
       */
      const getStartHeightSize = () => {
        const width = getStartWidthSize();

        if (window.innerWidth < 768) {
          return Math.min(width * 0.78, window.innerHeight * 0.42);
        }

        return Math.min(width * 0.56, window.innerHeight * 0.52);
      };

      /*
       * Push the starting image downward so the intro
       * has room above it.
       */
      const getStartYOffset = () => {
        if (window.innerWidth < 768) {
          return Math.min(110, window.innerHeight * 0.13);
        }

        return Math.min(280, window.innerHeight * 0.33);
      };

      /*
       * Reduced motion:
       * jump directly to the expanded state.
       */
      if (prefersReducedMotion) {
        gsap.set(panel, {
          width: "100%",
          height: "100svh",
          y: 0,
          clearProps: "transform",
        });

        gsap.set(intro, {
          autoAlpha: 0,
        });

        if (overlay) {
          gsap.set(overlay, {
            autoAlpha: 1,
          });
        }

        gsap.set(content, {
          autoAlpha: 1,
          y: 0,
        });

        if (carouselControls) {
          gsap.set(carouselControls, {
            autoAlpha: 1,
          });

          setCarouselControlsEnabled(true);
        }

        return;
      }

      /*
       * Initial state
       */
      gsap.set(panel, {
        width: getStartWidthSize(),
        height: getStartHeightSize(),
        y: getStartYOffset(),
      });

      gsap.set(intro, {
        autoAlpha: 1,
        y: 0,
      });

      if (overlay) {
        gsap.set(overlay, {
          autoAlpha: 0,
        });
      }

      gsap.set(content, {
        autoAlpha: 0,
        y: 24,
      });

      if (carouselControls) {
        gsap.set(carouselControls, {
          autoAlpha: 0,
        });

        setCarouselControlsEnabled(false);
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,

          /*
           * OLD:
           * start: "top 30%"
           *
           * Larger viewport percentage means the animation
           * begins sooner as the component enters the screen.
           */
          start: "top 72%",

          end: () => `+=${window.innerWidth < 768 ? 650 : 850}`,

          scrub: 1,

          pin: section,
          pinSpacing: true,

          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Expand image to fill viewport while also moving
       * from its lower starting position into the center.
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
       * Intro fades away shortly after expansion begins.
       */
      timeline.to(
        intro,
        {
          autoAlpha: 0,
          y: -18,

          duration: 0.65,
          ease: "none",
        },
        0.35,
      );

      /*
       * Dark treatment comes in only once the image
       * begins becoming immersive.
       */
      if (overlay) {
        timeline.to(
          overlay,
          {
            autoAlpha: 1,

            duration: 0.8,
            ease: "none",
          },
          1.25,
        );
      }

      /*
       * Full-width slide content
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

      /*
       * Carousel controls
       */
      if (carouselControls) {
        timeline.to(
          carouselControls,
          {
            autoAlpha: 1,

            duration: 0.3,
            ease: "none",

            onStart: () => {
              setCarouselControlsEnabled(true);
            },

            onReverseComplete: () => {
              setCarouselControlsEnabled(false);
            },
          },
          2.65,
        );
      }

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );

  /*
   * Animate new carousel text when slide changes.
   */
  useGSAP(
    () => {
      const slideContent = slideContentRef.current;

      if (!slideContent) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(slideContent, {
          autoAlpha: 1,
          y: 0,
          clearProps: "transform",
        });

        return;
      }

      gsap.fromTo(
        slideContent,
        {
          autoAlpha: 0,
          y: 10,
        },
        {
          autoAlpha: 1,
          y: 0,

          duration: 0.5,
          ease: "power2.out",
        },
      );
    },
    {
      scope: panelRef,
      dependencies: [currentImageIndex],
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="full-width-intro-heading"
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-secondary
      "
    >
      {/* ======================================================
          INTRO
      ====================================================== */}
      <div
        ref={introRef}
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-[8svh]
          z-20

          px-6

          text-center

          sm:top-[9svh]
          sm:px-8

          md:top-[12svh]
          md:px-12

          lg:top-[13svh]
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[540px]
            flex-col
            items-center
          "
        >
          <h2
            id="full-width-intro-heading"
            className="
              font-benton-regular

              text-[clamp(2.6rem,10vw,3.75rem)]
              leading-[0.98]
              tracking-[-0.025em]
              text-black

              md:text-[clamp(3.5rem,4.75vw,5rem)]
            "
          >
            {resolvedIntroHeading}
          </h2>

          {introDescription && (
            <p
              className="
                mt-6
                max-w-[620px]

                text-sm
                leading-[1.6]
                text-black

                sm:text-base

                md:mt-7
                md:text-[1.05rem]
                md:leading-[1.65]
              "
            >
              {introDescription}
            </p>
          )}
        </div>
      </div>

      {/* ======================================================
          EXPANDING IMAGE / CAROUSEL
      ====================================================== */}
      <div
        ref={panelRef}
        role={hasCarousel ? "region" : undefined}
        aria-roledescription={hasCarousel ? "carousel" : undefined}
        aria-label={hasCarousel ? `${title} image gallery` : undefined}
        className="
          relative

          h-[min(320px,42svh)]
          w-[calc(100%-2rem)]

          shrink-0
          overflow-hidden

          motion-reduce:h-[100svh]
          motion-reduce:w-full
        "
      >
        {/* Images */}
        <div aria-live="off" className="absolute inset-0">
          {carouselImages.map((image, index) => {
            const isActive = index === currentImageIndex;

            return (
              <div
                key={`${image.src}-${index}`}
                role={hasCarousel ? "group" : undefined}
                aria-roledescription={hasCarousel ? "slide" : undefined}
                aria-label={
                  hasCarousel
                    ? `${index + 1} of ${carouselImages.length}`
                    : undefined
                }
                aria-hidden={hasCarousel && !isActive ? "true" : undefined}
                className={`
                  absolute
                  inset-0

                  transition-opacity
                  duration-700
                  ease-in-out

                  ${isActive ? "z-[2] opacity-100" : "z-[1] opacity-0"}
                `}
              >
                <Image
                  src={image.src}
                  alt={isActive ? image.alt : ""}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  className="
                    object-cover
                    object-center
                  "
                />
              </div>
            );
          })}
        </div>

        {/* Dark overlay */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-black/40
          "
        />

        {/* ====================================================
            CAROUSEL CONTROLS
        ===================================================== */}
        {hasCarousel && (
          <>
            <div
              ref={carouselControlsRef}
              aria-hidden={!carouselControlsEnabled ? "true" : undefined}
              className="
                pointer-events-none
                invisible
                absolute
                inset-0
                z-30
              "
            >
              <button
                type="button"
                disabled={!carouselControlsEnabled}
                onClick={showPreviousImage}
                aria-label="View previous room image"
                className="
                  pointer-events-auto

                  absolute
                  left-3
                  top-1/2

                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/50

                  bg-black/55
                  text-white

                  backdrop-blur-[2px]

                  transition
                  duration-300

                  hover:border-white
                  hover:bg-black/80

                  disabled:pointer-events-none

                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white

                  sm:left-5
                  sm:h-14
                  sm:w-14

                  lg:left-8
                  lg:h-16
                  lg:w-16
                "
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                disabled={!carouselControlsEnabled}
                onClick={showNextImage}
                aria-label="View next room image"
                className="
                  pointer-events-auto

                  absolute
                  right-3
                  top-1/2

                  flex
                  h-12
                  w-12
                  -translate-y-1/2
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/50

                  bg-black/55
                  text-white

                  backdrop-blur-[2px]

                  transition
                  duration-300

                  hover:border-white
                  hover:bg-black/80

                  disabled:pointer-events-none

                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white

                  sm:right-5
                  sm:h-14
                  sm:w-14

                  lg:right-8
                  lg:h-16
                  lg:w-16
                "
              >
                <ChevronRight />
              </button>
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Image {currentImageIndex + 1} of {carouselImages.length}:{" "}
              {activeSlide.alt}
            </p>
          </>
        )}

        {/* ====================================================
            FULL-WIDTH CONTENT
        ===================================================== */}
        <div
          ref={contentRef}
          className="
            invisible
            absolute
            inset-x-0
            bottom-0
            z-20

            px-5
            pb-[max(2rem,env(safe-area-inset-bottom))]

            text-secondary

            sm:px-8
            sm:pb-[max(2.5rem,env(safe-area-inset-bottom))]

            md:px-12
            md:pb-12

            lg:px-20
            lg:pb-14

            xl:px-28

            2xl:px-36
          "
        >
          <div
            ref={slideContentRef}
            className="
              grid
              grid-cols-1
              gap-7

              md:grid-cols-2
              md:gap-12

              lg:gap-16
            "
          >
            {/* Left column */}
            <div
              className="
                flex
                flex-col
                justify-end
              "
            >
              <p
                className="
                  mb-5

                  text-xs
                  uppercase

                  sm:text-sm

                  md:mb-6
                  md:text-base
                "
              >
                {activeSlide.eyebrow}
              </p>

              <div
                className="
                  flex
                  flex-col
                  items-start
                "
              >
                <div
                  className="
                    flex
                    w-full
                    items-center
                    gap-4

                    sm:gap-5

                    md:gap-6
                  "
                >
                  <h3
                    className="
                      font-benton-regular

                      text-[clamp(3rem,12vw,4.5rem)]

                      sm:text-[clamp(3.75rem,10vw,5.5rem)]

                      md:whitespace-nowrap
                      md:text-[clamp(4.25rem,6vw,6.75rem)]

                      lg:text-[clamp(4.75rem,5.5vw,7rem)]
                    "
                  >
                    {activeSlide.title}
                  </h3>
                </div>

                <p
                  className="
                    mt-2
                    self-center

                    font-central-regular
                    text-[clamp(1.25rem,5vw,1.75rem)]

                    sm:mt-3

                    md:mr-[8%]
                    md:self-center
                    md:text-[clamp(1.4rem,1.5vw,1.75rem)]

                    lg:mr-[12%]
                  "
                >
                  at Sabal House
                </p>
              </div>
            </div>

            {/* Right column */}
            <div
              className="
                flex
                flex-col
                items-start
                justify-end
                gap-5

                md:gap-6
              "
            >
              <p className="max-w-xl text-sm md:text-base">
                {activeSlide.description}
              </p>

              <Link
                href={activeSlide.ctaHref}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center

                  bg-main

                  px-5
                  py-3

                  text-md
                  font-central-regular
                  uppercase
                  text-secondary

                   transition-colors
                  duration-300
                  ease-out

                   hover:bg-transparent
            hover:border-2
            hover:border-secondary
            hover:text-secondary

                  motion-safe:transition-opacity
                  motion-safe:hover:opacity-80

                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-white
                "
              >
                {activeSlide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-8 w-8 rotate-180"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
