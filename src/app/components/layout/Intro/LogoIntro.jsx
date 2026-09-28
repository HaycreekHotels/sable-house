"use client";

import Image from "next/image";
import { useId, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Leaf from "../../../../../public/images/decorative/SH_Leaf_Brown.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Decorative leaf configurations
const LEAVES = [
  {
    position: `
      -bottom-[55%] -left-[28%]
      h-[175%] w-[90%]
      -rotate-[10deg] opacity-[0.025]

      max-md:-bottom-[25%]
      max-md:-left-[55%]
      max-md:h-[125%]
      max-md:w-[150%]
      max-md:-rotate-[8deg]

      lg:-bottom-[55%]
      lg:-left-[50%]
      lg:h-[180%]
      lg:w-[92%]

      xl:-left-[46%]
      2xl:-left-[42%]
    `,
    imageClass: "object-left-bottom",
  },
  {
    position: `
      -right-[28%] -bottom-[55%]
      h-[175%] w-[90%]
      rotate-[10deg] opacity-[0.035]

      max-md:-right-[55%]
      max-md:-bottom-[25%]
      max-md:h-[125%]
      max-md:w-[150%]
      max-md:rotate-[8deg]

      lg:-right-[50%]
      lg:-bottom-[55%]
      lg:h-[180%]
      lg:w-[92%]

      xl:-right-[46%]
      2xl:-right-[42%]
    `,
    imageClass: "-scale-x-100 object-left-bottom",
  },
];

export default function LogoIntro({
  logo,
  logoAlt = "Brand logo",
  logoWidth = 150,
  eyebrow = "",
  label = "",
  heading = "",
  leftText = "",
  className = "",
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const decorativeRef = useRef(null);

  const headingId = useId();

  // ----------------------------------------
  // GSAP ENTRANCE ANIMATION
  // ----------------------------------------

  useGSAP(
    () => {
      const content = contentRef.current;
      const decorative = decorativeRef.current;

      if (!content) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const contentElements = content.querySelectorAll(
          "[data-intro-animate]",
        );

        const leafElements = decorative?.querySelectorAll("[data-leaf-motion]");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        // Content entrance (including logo)
        timeline.from(contentElements, {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        });

        // Decorative leaves
        if (leafElements?.length) {
          timeline.from(
            leafElements,
            {
              autoAlpha: 0,
              y: 30,
              scale: 1.025,
              duration: 1.35,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.7",
          );
        }

        return () => timeline.kill();
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  // ----------------------------------------
  // RENDER
  // ----------------------------------------

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className={`
        relative isolate
        w-full overflow-hidden
        bg-secondary text-black
        ${className}
      `}
    >
      {/* ------------------------------------
          DECORATIVE LEAVES
      ------------------------------------ */}

      <div
        ref={decorativeRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          overflow-hidden
        "
      >
        {LEAVES.map((leaf, index) => (
          <div
            key={index}
            className={`
              absolute
              ${leaf.position}
            `}
          >
            <div data-leaf-motion className="relative h-full w-full">
              <Image
                src={Leaf}
                alt=""
                fill
                sizes="
                  (max-width: 768px) 125vw,
                  (max-width: 1280px) 74vw,
                  70vw
                "
                className={`
                  object-contain
                  ${leaf.imageClass}
                `}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------
          MAIN CONTAINER
      ------------------------------------ */}

      <div
        className="
          mx-auto flex
          min-h-[560px] w-full
          max-w-[1440px]
          items-center justify-center

          px-6 py-20

          sm:min-h-[600px]
          sm:px-8 sm:py-24

          md:min-h-[650px]
          md:px-12 md:py-28

          lg:min-h-[690px]
          lg:px-20

          xl:min-h-[720px]
          xl:max-w-[1600px]
          xl:px-24

          2xl:min-h-[760px]
          2xl:max-w-[1800px]
          2xl:px-28
        "
      >
        {/* ----------------------------------
            CONTENT
        ---------------------------------- */}

        <div
          ref={contentRef}
          className="
            relative z-10
            flex w-full max-w-[550px]
            flex-col items-center
            text-center

            lg:max-w-[620px]
            xl:max-w-[700px]
            2xl:max-w-[760px]
          "
        >
          {/* LOGO */}

          {logo && (
            <div
              data-intro-animate
              className="
                mb-10 flex
                w-full items-center
                justify-center

                sm:mb-12
                lg:mb-14
              "
            >
              <Image
                src={logo}
                alt={logoAlt}
                width={logoWidth}
                height={logoWidth}
                sizes={`${logoWidth}px`}
                className="
                  block h-auto
                  max-w-full
                  object-contain
                "
              />
            </div>
          )}

          {/* EYEBROW */}

          {eyebrow && (
            <p
              data-intro-animate
              className="
                mb-4
                font-central-regular
                text-[0.95rem]
                leading-[1.55]
                text-neutral-950

                sm:mb-5
              "
            >
              {eyebrow}
            </p>
          )}

          {/* HEADING */}

          {(label || heading) && (
            <h2
              id={headingId}
              data-intro-animate
              className="
                w-full
                font-benton-regular

                text-[2.6rem]
                leading-[0.98]
                tracking-[-0.025em]

                sm:text-[3.2rem]
                md:text-[3.6rem]
                lg:text-[4rem]
                xl:text-[4.35rem]
                2xl:text-[4.6rem]
              "
            >
              {label && <span>{label}</span>}

              {label && heading && " "}

              {heading && <span>{heading}</span>}
            </h2>
          )}

          {/* DESCRIPTION */}

          {leftText && (
            <p
              data-intro-animate
              className="
                mt-8 w-full
                max-w-[580px]

                font-central-regular
                text-[0.95rem]
                leading-[1.55]
                text-neutral-950

                sm:mt-9
                sm:text-base

                md:text-[1.05rem]

                lg:max-w-[600px]

                xl:max-w-[640px]
                xl:text-[1.1rem]
                xl:leading-[1.6]

                2xl:max-w-[680px]
              "
            >
              {leftText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
