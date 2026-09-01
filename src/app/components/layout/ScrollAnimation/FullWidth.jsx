"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const placeHolder =
  "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Guestroom.jpg";

export default function FullWidth() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const introRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const content = contentRef.current;

      if (!section || !panel || !intro || !content) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const getStartSize = () => Math.min(250, window.innerWidth - 40);

      /*
       * Reduced motion:
       * Skip the pinned scroll animation and show the useful final state.
       */
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

        return;
      }

      /*
       * Initial state
       */
      gsap.set(panel, {
        width: getStartSize(),
        height: getStartSize(),
        y: 0,
      });

      gsap.set(intro, {
        autoAlpha: 1,
        y: 0,
      });

      /*
       * autoAlpha: 0 also applies visibility: hidden.
       * This keeps the hidden CTA/content out of normal keyboard interaction
       * until the reveal begins.
       */
      gsap.set(content, {
        autoAlpha: 0,
        y: 24,
      });

      /*
       * Scroll sequence
       *
       * Pin only after the entire starting square has had a chance to enter
       * the viewport. The panel expands to the full viewport height so there
       * is no exposed strip beneath it on desktop.
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerWidth < 768 ? 720 : 1000}`,
          scrub: 1,
          pin: section,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Phase 1 — step into the image
       */
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

      /*
       * Phase 2 — remove the intro
       */
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

      /*
       * Phase 3 — reveal the expanded content
       */
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

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sabal-house-rooms-heading"
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
        ref={panelRef}
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
        {/* Decorative background image */}
        <Image
          src={placeHolder}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Image overlay for text contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-black/40"
        />

        {/* Starting square state */}
        <div
          ref={introRef}
          aria-hidden="true"
          className="
            absolute inset-0 z-20
            flex flex-col
            items-center justify-center
            px-5
            text-center
            text-secondary
          "
        >
          <p className="mb-2 text-xs uppercase tracking-[0.15em]">Two ways</p>

          <p
            className="
              max-w-50
              font-benton-regular
              text-[2rem]
              leading-[0.95]
              uppercase
              md:text-[2.5rem]
            "
          >
            To Stay
          </p>
        </div>

        {/* Expanded state */}
        <div
          ref={contentRef}
          className="
            invisible
            absolute inset-x-0 bottom-0 z-20

            grid grid-cols-1
            gap-7

            px-5
            pb-[max(2rem,env(safe-area-inset-bottom))]

            text-secondary

            sm:px-8
            sm:pb-[max(2.5rem,env(safe-area-inset-bottom))]

            md:grid-cols-2
            md:gap-12
            md:px-12
            md:pb-12

            lg:gap-16
            lg:px-20
            lg:pb-14

            xl:px-28
            2xl:px-36
          "
        >
          {/* Left column */}
          <div className="flex flex-col justify-end">
            <p className="mb-3 text-xs uppercase tracking-[0.15em]">Stay</p>

            <div className="flex items-end gap-5">
              <h2
                id="sabal-house-rooms-heading"
                className="
                  max-w-[11ch]
                  font-benton-regular
                  text-[clamp(2.25rem,10vw,3rem)]
                  leading-[0.95]

                  md:max-w-[10ch]
                  md:text-[clamp(3rem,5vw,4rem)]
                "
              >
                Sabal House Rooms
              </h2>

              <span
                aria-hidden="true"
                className="
                  hidden
                  h-12 w-12
                  shrink-0
                  items-center justify-center
                  rounded-full
                  border border-secondary/70
                  md:flex
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
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
              </span>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start justify-end gap-5 md:gap-6">
            <p
              className="
                max-w-xl
                text-sm
                leading-relaxed
                md:text-base
              "
            >
              A lighter, more contemporary expression of Sabal House. Refined
              finishes, thoughtful layouts, and a calm sense of ease within the
              new building.
            </p>

            <Link
              href="/stay/accommodations"
              className="
                inline-flex
                min-h-11
                items-center
                justify-center

                bg-black
                px-5 py-3

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
              Explore Your Stay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
