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

      /*
       * ---------------------------------------------------------
       * REDUCED MOTION
       * ---------------------------------------------------------
       */
      if (prefersReducedMotion) {
        gsap.set(panel, {
          width: "100%",
          height: "90vh",
          y: 0,
        });

        gsap.set(intro, {
          autoAlpha: 0,
        });

        gsap.set(content, {
          autoAlpha: 1,
          y: 0,
          visibility: "visible",
        });

        return;
      }

      /*
       * ---------------------------------------------------------
       * HELPERS
       * ---------------------------------------------------------
       */

      // Keep the starting square responsive on smaller screens.
      const getStartSize = () => {
        return Math.min(250, window.innerWidth - 40);
      };

      const getPanelCenterOffset = () => {
        const rect = panel.getBoundingClientRect();

        const panelCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;

        return viewportCenter - panelCenter;
      };

      gsap.set(panel, {
        width: getStartSize(),
        height: getStartSize(),
        y: 0,
      });

      gsap.set(intro, {
        autoAlpha: 1,
        y: 0,
      });

      gsap.set(content, {
        autoAlpha: 0,
        y: 24,
        visibility: "visible",
      });

      /*
       * ---------------------------------------------------------
       * TIMELINE
       * ---------------------------------------------------------
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,

          start: "70% bottom",

          end: "+=1000",

          scrub: 1,

          pin: section,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          markers: false,
        },
      });

      /* PHASE 1 — STEP INTO IMAGE */

      timeline.to(
        panel,
        {
          width: () => section.clientWidth,
          height: () => window.innerHeight * 0.9,

          y: () => getPanelCenterOffset(),

          duration: 3,
          ease: "none",
        },
        0,
      );

      /*
      
       * PHASE 2 — REMOVE INTRO
     
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
      
       * PHASE 3 — REVEAL EXPANDED CONTENT
      
       */

      timeline.to(
        content,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "none",
        },
        2.35,
      );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full items-center justify-center  -mb-[340px] "
    >
      <div ref={panelRef} className="relative h-[90vh] w-full overflow-hidden">
        {/* Background image */}
        <Image
          src={placeHolder}
          alt="Flourishing green forest in Savannah, Georgia"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Subtle image overlay */}
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-black/40" />

        {/* Small starting state */}
        <div
          ref={introRef}
          className="
            absolute inset-0 z-20
            flex flex-col
            items-center justify-center
            px-5
            text-center text-secondary
          "
        >
          <p className="mb-2 text-xs uppercase tracking-[0.15em]">Two ways</p>

          <h2
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
          </h2>
        </div>

        {/* Expanded state */}
        <div
          ref={contentRef}
          className="
            invisible
            absolute inset-x-0 bottom-0 z-20

            grid grid-cols-1
            gap-8

            px-5 pb-10

            text-secondary

            md:grid-cols-2
            md:gap-16
            md:px-16
            md:pb-14

            lg:px-36
          "
        >
          {/* Left column */}
          <div className="flex flex-col justify-end">
            <p className="mb-3 text-xs uppercase tracking-[0.15em]">Stay</p>

            <div className="flex items-end gap-5">
              <h2
                className="
                  max-w-120
                  font-benton-regular
                  text-[2.25rem]
                  leading-[0.95]

                  md:text-[3.25rem]
                  lg:text-[4rem]
                "
              >
                Sabal House Rooms
              </h2>

              {/* Decorative arrow */}
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
          <div className="flex flex-col items-start justify-end gap-6">
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
              href="#"
              className="
                inline-flex
                min-h-11
                items-center justify-center

                bg-black
                px-5 py-3

                text-xs font-bold
                uppercase tracking-wide
                text-secondary

                transition-opacity
                hover:opacity-80

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
