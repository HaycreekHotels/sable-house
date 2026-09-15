"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import Leaf from "../../../../../public/images/decorative/SH_Leaf_Brown.png";

export default function IntroSection({
  label = "Begin at",
  heading = "Sabal House",
  leftText,
  children,
  ctaLabel = "Book Your Stay",
  ctaHref = "/stay/accommodations",
  className = "",
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const decorativeRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      const decorative = decorativeRef.current;

      if (!section || !content) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        timeline.from(content.children, {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        });

        if (decorative) {
          const leafMotionElements =
            decorative.querySelectorAll("[data-leaf-motion]");

          timeline.from(
            leafMotionElements,
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
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(content.children, {
          clearProps: "all",
        });

        if (decorative) {
          gsap.set(decorative.querySelectorAll("[data-leaf-motion]"), {
            clearProps: "all",
          });
        }
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intro-section-heading"
      className={`
        relative
        isolate
        w-full
        overflow-hidden
        bg-secondary
        text-black
        ${className}
      `}
    >
      {/* =========================================================
          DECORATIVE LEAVES
      ========================================================== */}
      <div
        ref={decorativeRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          overflow-hidden
        "
      >
        {/* LEFT LEAF */}
        <div
          className="
            absolute

  -bottom-[55%]
  -left-[28%]

  h-[175%]
  w-[90%]

  -rotate-[10deg]
  opacity-[0.025]

  max-md:-bottom-[25%]
  max-md:-left-[55%]
  max-md:h-[125%]
  max-md:w-[150%]
  max-md:-rotate-[8deg]

  lg:-bottom-[55%]
  lg:-left-[50%]
  lg:h-[180%]
  lg:w-[92%]
          "
        >
          <div
            data-leaf-motion
            className="
              relative
              h-full
              w-full
            "
          >
            <Image
              src={Leaf}
              alt=""
              fill
              sizes="
                (max-width: 768px) 125vw,
                (max-width: 1280px) 74vw,
                70vw
              "
              className="
                object-contain
                object-left-bottom
              "
            />
          </div>
        </div>

        {/* RIGHT LEAF */}
        <div
          className="
           absolute

  -right-[28%]
  -bottom-[55%]

  h-[175%]
  w-[90%]

  rotate-[10deg]
  opacity-[0.035]

  max-md:-right-[55%]
  max-md:-bottom-[25%]
  max-md:h-[125%]
  max-md:w-[150%]
  max-md:rotate-[8deg]

  lg:-right-[50%]
  lg:-bottom-[55%]
  lg:h-[180%]
  lg:w-[92%]
          "
        >
          <div
            data-leaf-motion
            className="
              relative
              h-full
              w-full
            "
          >
            <Image
              src={Leaf}
              alt=""
              fill
              sizes="
                (max-width: 768px) 125vw,
                (max-width: 1280px) 74vw,
                70vw
              "
              className="
                -scale-x-100
                object-contain
                object-left-bottom
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}
      <div
        className="
          mx-auto
          flex
          min-h-[560px]
          w-full
          max-w-[1440px]
          items-center
          justify-center

          px-6
          py-20

          sm:min-h-[600px]
          sm:px-8
          sm:py-24

          md:min-h-[650px]
          md:px-12
          md:py-28

          lg:min-h-[690px]
          lg:px-16
        "
      >
        <div
          ref={contentRef}
          className="
            relative
            z-10

            flex
            w-full
            max-w-[550px]
            flex-col
            items-start
          "
        >
          {/* Heading */}
          <h2
            id="intro-section-heading"
            className="
              w-full
              text-center

              font-benton-regular
              text-[2.6rem]
              leading-[0.98]
              tracking-[-0.025em]

              sm:text-[3.2rem]
              md:text-[3.6rem]
              lg:text-[4rem]
            "
          >
            {label} <span className="whitespace-nowrap">{heading}</span>
          </h2>

          {/* First paragraph */}
          {leftText && (
            <p
              className="
                mt-8
                w-full

                text-[0.95rem]
                leading-[1.55]
                text-neutral-950

                sm:mt-9
                sm:text-base

                md:text-[1.05rem]
                md:leading-[1.6]
              "
            >
              {leftText}
            </p>
          )}

          {/* Second paragraph */}
          {children && (
            <div
              className="
                mt-7
                w-full

                text-[0.95rem]
                leading-[1.55]
                text-neutral-950

                sm:text-base

                md:mt-8
                md:text-[1.05rem]
                md:leading-[1.6]

                [&_p+p]:mt-5
              "
            >
              {children}
            </div>
          )}

          {/* CTA */}
          {ctaLabel && ctaHref && (
            <div
              className="
                mt-10
                flex
                w-full
                justify-center

                md:mt-12
              "
            >
              <Link
                href={ctaHref}
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center

                  bg-[#555d31]
                  px-5
                  py-3

                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.03em]
                  text-white

                  transition-colors
                  duration-300
                  ease-out

                  hover:bg-[#444b27]

                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-black

                  sm:text-sm
                "
              >
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
