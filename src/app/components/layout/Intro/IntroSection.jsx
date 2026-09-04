"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection({
  label = "Begin",
  heading,
  leftText,
  children,
  className = "",
}) {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const rightContent = rightContentRef.current;

    if (!section || !leftContent || !rightContent) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(prefers-reduced-motion: no-preference)": () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            defaults: {
              duration: 0.8,
              ease: "power2.out",
            },
          });

          timeline
            .from(leftContent.children, {
              autoAlpha: 0,
              y: 12,
              stagger: 0.1,
            })
            .from(
              rightContent.children,
              {
                autoAlpha: 0,
                y: 12,
                stagger: 0.1,
              },
              "-=0.55",
            );
        },

        "(prefers-reduced-motion: reduce)": () => {
          gsap.set([...leftContent.children, ...rightContent.children], {
            clearProps: "all",
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intro-section-heading"
      className={`w-full mb-0 md:-mb-44 text-black ${className}`}
    >
      <div
        className="
          mx-auto
          grid
          min-h-80
          max-w-360
          grid-cols-1
          gap-12
          px-6
          py-16

          md:grid-cols-2
          md:gap-16
          md:px-12
          md:py-20

          lg:min-h-87.5
          lg:px-72
        "
      >
        {/* Left */}
        <div
          ref={leftContentRef}
          className="
            flex
            max-w-105
            flex-col
            items-start
            gap-5

            md:mx-auto
            md:w-full
          "
        >
          <p
            className="
              font-benton-regular
              text-[2rem]
              leading-none

              md:text-6xl
            "
          >
            {label}
          </p>

          {leftText && (
            <p
              className="
                max-w-90
                text-sm
                leading-[1.65]
                text-neutral-900
text-justify
                md:text-[0.95rem]
              "
            >
              {leftText}
            </p>
          )}
        </div>

        {/* Right */}
        <div
          ref={rightContentRef}
          className="
            flex
            max-w-105
            flex-col
            items-start
            gap-5
          "
        >
          <h2
            id="intro-section-heading"
            className="
              font-benton-regular
              text-[2rem]
              leading-[1.05]

              md:text-6xl
            "
          >
            {heading}
          </h2>

          <p
            className="
              text-sm
              leading-[1.65]
              text-neutral-900 text-justify
              md:text-[0.95rem]
            "
          >
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}
