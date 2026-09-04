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
  const contentRef = useRef(null);
  const carouselControlsRef = useRef(null);
  const slideContentRef = useRef(null);

  const [activeImage, setActiveImage] = useState(0);
  const [carouselControlsEnabled, setCarouselControlsEnabled] = useState(false);

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

  useGSAP(
    () => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const content = contentRef.current;
      const carouselControls = carouselControlsRef.current;

      if (!section || !panel || !intro || !content) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const getStartWidthSize = () => Math.min(450, window.innerWidth - 40);

      const getStartHeightSize = () => Math.min(350, window.innerWidth - 40);

      if (prefersReducedMotion) {
        gsap.set(panel, {
          width: "100%",
          height: "100svh",
          clearProps: "transform",
        });

        gsap.set(intro, {
          autoAlpha: 0,
        });

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

      gsap.set(panel, {
        width: getStartWidthSize(),
        height: getStartHeightSize(),
        y: 0,
      });

      gsap.set(intro, {
        autoAlpha: 1,
        y: 0,
      });

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
          start: "top 30%",
          end: () => `+=${window.innerWidth < 768 ? 650 : 850}`,
          scrub: 1,
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        panel,
        {
          width: () => section.clientWidth,
          height: "100svh",
          duration: 3,
          ease: "none",
        },
        0,
      );

      timeline.to(
        intro,
        {
          autoAlpha: 0,
          y: -12,
          duration: 0.6,
          ease: "none",
        },
        0.35,
      );

      timeline.to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "none",
        },
        2.2,
      );

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
          2.7,
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
      aria-label={title}
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
      "
    >
      <div
        ref={introRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
      >
        <div
          className="
            flex
            h-full
            flex-col
            items-center
            justify-between
            px-6
            py-44
            text-center
            md:hidden
          "
        >
          <p
            className="
              whitespace-nowrap
              text-right
              font-benton-regular
              text-[clamp(2.75rem,5vw,5rem)]
              leading-[0.92]
            "
          >
            {leftIntroHeading}
          </p>

          <div
            aria-hidden="true"
            className="
              h-[min(250px,calc(100vw-2.5rem))]
              w-[min(250px,calc(100vw-2.5rem))]
              shrink-0
              opacity-0
            "
          />

          <p
            className="
              font-benton-regular
              text-[clamp(2.25rem,10vw,3.5rem)]
              leading-[0.95]
            "
          >
            {rightIntroHeading}
          </p>
        </div>

        <div
          className="
            hidden
            h-full
            items-center
            px-8
            md:grid
            md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]
            md:gap-36
            lg:px-16
            xl:px-24
          "
        >
          <div className="flex justify-end">
            <p
              className="
                text-right
                font-benton-regular
                text-[clamp(2.75rem,4vw,3.5rem)]
                leading-[0.92]
              "
            >
              {leftIntroHeading}
            </p>
          </div>

          <div aria-hidden="true" className="h-[250px] w-[250px] shrink-0" />

          <div className="flex justify-start">
            <p
              className="
                text-left
                font-benton-regular
                text-[clamp(2.75rem,4vw,3.5rem)]
                leading-[0.92]
              "
            >
              {rightIntroHeading}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={panelRef}
        role={hasCarousel ? "region" : undefined}
        aria-roledescription={hasCarousel ? "carousel" : undefined}
        aria-label={hasCarousel ? `${title} image gallery` : undefined}
        className="
          relative
          h-[min(250px,calc(100vw-2.5rem))]
          w-[min(250px,calc(100vw-2.5rem))]
          shrink-0
          overflow-hidden
          motion-reduce:h-[100svh]
          motion-reduce:w-full
        "
      >
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
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-black/40
          "
        />

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
      tracking-[0.08em]

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
                {/* Title + arrow */}
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
                  <h2
                    className="
          font-benton-regular
          text-[clamp(3rem,12vw,4.5rem)]
          leading-[0.9]
          tracking-[-0.04em]

          sm:text-[clamp(3.75rem,10vw,5.5rem)]

          md:text-[clamp(4.25rem,6vw,6.75rem)]
          md:whitespace-nowrap

          lg:text-[clamp(4.75rem,5.5vw,7rem)]
        "
                  >
                    {activeSlide.title}
                  </h2>
                </div>

                {/* Static property label */}
                <p
                  className="
        mt-2
        self-center

        font-central-regular
        text-[clamp(1.25rem,5vw,1.75rem)]
        leading-none
        tracking-[-0.02em]

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

            <div className="flex flex-col items-start justify-end gap-5 md:gap-6">
              <p className="max-w-xl text-sm leading-relaxed md:text-base">
                {activeSlide.description}
              </p>

              <Link
                href={activeSlide.ctaHref}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  bg-black
                  px-5
                  py-3
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-secondary
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
      className="
                    h-8
                    w-8
                    rotate-180
                  "
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="
                    h-8
                    w-8
                  "
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
