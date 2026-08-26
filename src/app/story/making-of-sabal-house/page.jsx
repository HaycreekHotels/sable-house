"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function StoryVideo({
  poster,
  videoSrc,
  name,
  role,
  description,
  quote,
  quoteAttribution,
  className = "",
}) {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);

  function getPortraitHeight() {
    if (!mediaRef.current) return 0;

    return mediaRef.current.offsetWidth * (16 / 9);
  }

  function expandVideo() {
    const media = mediaRef.current;
    const video = videoRef.current;

    if (!media || !video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setIsExpanded(true);

    if (reducedMotion) {
      gsap.set(media, {
        height: getPortraitHeight(),
      });
    } else {
      gsap.to(media, {
        height: getPortraitHeight(),
        duration: 0.85,
        ease: "power3.inOut",
      });
    }

    video.play().catch(() => {});
  }

  function collapseVideo() {
    const media = mediaRef.current;
    const video = videoRef.current;

    if (!media || !video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    video.pause();
    setIsExpanded(false);

    if (reducedMotion) {
      gsap.set(media, {
        clearProps: "height",
      });

      return;
    }

    gsap.to(media, {
      height: media.offsetWidth,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(media, {
          clearProps: "height",
        });
      },
    });
  }

  useEffect(() => {
    function handleResize() {
      if (!isExpanded || !mediaRef.current) return;

      gsap.set(mediaRef.current, {
        height: getPortraitHeight(),
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isExpanded]);

  return (
    <article data-reveal className={`w-full ${className}`}>
      <div
        ref={mediaRef}
        className="group relative aspect-square w-full overflow-hidden bg-neutral-200"
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          preload="metadata"
          playsInline
          controls={isExpanded}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={`${name}, ${role}`}
        />

        {!isExpanded && (
          <button
            type="button"
            onClick={expandVideo}
            aria-expanded={false}
            aria-label={`Play ${name}'s story and expand video`}
            className="
              absolute inset-0 z-10
              flex cursor-pointer items-center justify-center
              bg-black/0
              transition-colors duration-300
              hover:bg-black/10
              focus-visible:bg-black/10
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-[-4px]
              focus-visible:outline-black
            "
          >
            <span
              aria-hidden="true"
              className="
                flex h-14 w-14
                translate-y-2
                items-center justify-center
                rounded-full
                bg-white/90
                opacity-0
                shadow-sm
                backdrop-blur-sm
                transition-all duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
                group-focus-within:translate-y-0
                group-focus-within:opacity-100
                md:h-16 md:w-16
              "
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        {isExpanded && (
          <button
            type="button"
            onClick={collapseVideo}
            aria-expanded={true}
            aria-label={`Collapse ${name}'s video`}
            className="
              absolute right-3 top-3 z-20
              bg-white px-3 py-2
              text-[10px] font-medium uppercase tracking-wide
              text-black
              transition-colors
              hover:bg-black hover:text-white
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-black
            "
          >
            Close
          </button>
        )}
      </div>

      <div className="pt-4">
        {role && (
          <p className="mb-2 text-[10px] font-medium uppercase leading-none md:text-xs">
            {role}
          </p>
        )}

        <h2 className="font-serif text-[28px] font-normal leading-[0.95] tracking-[-0.04em] md:text-[34px] lg:text-[38px]">
          {name}
        </h2>

        {description && (
          <p className="mt-3 max-w-xl text-sm leading-[1.45] tracking-[-0.01em] md:text-[15px]">
            {description}
          </p>
        )}

        {quote && (
          <figure className="mt-4 max-w-xl">
            <blockquote className="text-sm italic leading-[1.45] tracking-[-0.01em] md:text-[15px]">
              “{quote}”
            </blockquote>

            {quoteAttribution && (
              <figcaption className="sr-only">
                Quote from {quoteAttribution}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </article>
  );
}

export default function StoryPage() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set("[data-reveal]", {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.from("[data-hero-word]", {
        y: 70,
        opacity: 0,
        duration: 1.15,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
          y: 55,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    },
    {
      scope: pageRef,
    },
  );

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#f8f8f6] text-black"
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-5
          pb-32
          pt-20
          sm:px-8
          md:px-10
          md:pt-28
          lg:px-14
          lg:pb-44
          xl:px-16
        "
      >
        <h1 className="sr-only">The Making of Sabal House</h1>

        <div className="md:hidden">
          <p
            data-hero-word
            className="
              max-w-[650px]
              font-serif
              text-[clamp(52px,16vw,84px)]
              font-normal
              leading-[0.87]
              tracking-[-0.065em]
            "
          >
            The Making
            <br />
            of Sabal House
          </p>
        </div>

        <div
          aria-hidden="true"
          className="
            hidden
            grid-cols-12
            items-baseline
            gap-x-6
            md:grid
            lg:gap-x-10
          "
        >
          <div
            data-hero-word
            className="
              col-span-3
              font-serif
              text-[clamp(62px,7vw,118px)]
              leading-none
              tracking-[-0.07em]
            "
          >
            The
          </div>

          <div
            data-hero-word
            className="
              col-span-4
              font-serif
              text-[clamp(62px,7vw,118px)]
              leading-none
              tracking-[-0.07em]
            "
          >
            Making
          </div>

          <div
            data-hero-word
            className="
              col-span-5
              whitespace-nowrap
              font-serif
              text-[clamp(62px,7vw,118px)]
              leading-none
              tracking-[-0.07em]
            "
          >
            of Sabal House
          </div>
        </div>

        <div
          className="
            mt-14
            grid grid-cols-1
            gap-x-10 gap-y-16
            md:mt-16
            md:grid-cols-12
            lg:gap-x-16
            xl:gap-x-20
          "
        >
          <div className="md:col-span-5 md:col-start-1">
            <StoryVideo
              poster="/images/posters/Angela-King-Poster.jpg"
              videoSrc="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Reel_ex3fnx.mp4"
              name="Angela King"
              role="The Steward"
              quote="Our whole intention with building Sabal House is a quiet place to come alive, to get away from the hustle and bustle and really restore and refresh."
              quoteAttribution="Angela King"
            />
          </div>

          <div
            data-reveal
            className="
              order-first
              md:order-none
              md:col-span-5
              md:col-start-8
            "
          >
            <p className="max-w-[500px] text-sm leading-[1.55] tracking-[-0.015em] md:text-[15px]">
              From the beginning, Sabal House was imagined as a quieter way to
              experience Savannah, a place to arrive, find your footing, and
              become more attuned to the city around you. That idea is taking
              shape through architecture, material, and the people behind it,
              bringing together a luxury new building and the restored Heritage
              Rooms as one Sabal House.
            </p>

            <p className="mt-16 text-[11px] font-medium uppercase tracking-[-0.01em] md:mt-24 md:text-xs">
              Told by the people shaping it.
            </p>
          </div>
        </div>

        <div
          className="
            mt-28
            grid grid-cols-1
            gap-x-10
            md:mt-[-40px]
            md:grid-cols-12
            lg:gap-x-16
            xl:gap-x-20
          "
        >
          <div className="md:col-span-5 md:col-start-8">
            <StoryVideo
              poster="/images/posters/Pat-Shay-Poster.jpg"
              videoSrc="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/pat_opcrnn.mp4"
              name="Pat Shay"
              role="The Architect"
              description="On blending historic structure and new modernity seamlessly."
            />
          </div>
        </div>

        <div
          className="
            mt-28
            grid grid-cols-1
            gap-x-10
            md:mt-[-90px]
            md:grid-cols-12
            lg:gap-x-16
            xl:gap-x-20
          "
        >
          <div className="md:col-span-5 md:col-start-1">
            <StoryVideo
              poster="/images/posters/Maria-Gossett-Poster.jpg"
              videoSrc="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Maria_mh89i8.mp4"
              name="Maria Gossett"
              role="The Designer"
              description="On the intention behind Sabal House."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
