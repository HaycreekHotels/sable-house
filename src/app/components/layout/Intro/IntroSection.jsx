"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection({
  label = "Begin",
  heading,
  children,
  className = "",
}) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Normal animation
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
            .from(labelRef.current, {
              autoAlpha: 0,
              y: 12,
            })
            .from(
              contentRef.current.children,
              {
                autoAlpha: 0,
                y: 12,
                stagger: 0.1,
              },
              "-=0.55",
            );
        },

        // Accessibility: don't animate for reduced motion users
        "(prefers-reduced-motion: reduce)": () => {
          gsap.set([labelRef.current, ...contentRef.current.children], {
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
      className={`w-full -mb-44 text-black ${className}`}
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
          lg:px-20
        "
      >
        {/* Left */}
        <div className="flex md:justify-center">
          <p
            ref={labelRef}
            className="
              font-benton-regular
              text-[2rem]
              leading-none

              md:text-[2.25rem]
            "
          >
            {label}
          </p>
        </div>

        {/* Right */}
        <div
          ref={contentRef}
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

              md:text-[2.25rem]
            "
          >
            {heading}
          </h2>

          <div
            className="
              text-sm
              leading-[1.65]
              text-neutral-900

              md:text-[0.95rem]
            "
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
