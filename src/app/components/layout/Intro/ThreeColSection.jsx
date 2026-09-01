"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeColSection({
  label = "Begin",
  heading,
  hr,
  content,
  cr,
  eyebrow,
  className = "",
}) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const middleRef = useRef(null);
  const rightRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const labelElement = labelRef.current;
    const middleElement = middleRef.current;
    const rightElement = rightRef.current;

    if (!section || !labelElement || !middleElement || !rightElement) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const middleChildren = Array.from(middleElement.children);
        const rightChildren = Array.from(rightElement.children);

        /*
         * Build one ordered list so the animation progresses naturally:
         * label -> middle column -> right column.
         */
        const animatedElements = [
          labelElement,
          ...middleChildren,
          ...rightChildren,
        ];

        gsap.set(animatedElements, {
          autoAlpha: 0,
          y: 16,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          defaults: {
            ease: "power2.out",
          },
        });

        /*
         * Label appears first.
         */
        timeline.to(labelElement, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
        });

        /*
         * Middle column follows with a subtle stagger.
         */
        timeline.to(
          middleChildren,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
          },
          "-=0.4",
        );

        /*
         * Right column overlaps slightly with the middle reveal so the
         * section feels like one coordinated composition rather than
         * three disconnected animations.
         */
        timeline.to(
          rightChildren,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
          },
          "-=0.5",
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [labelElement, ...middleElement.children, ...rightElement.children],
          {
            clearProps: "opacity,visibility,transform",
          },
        );
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="three-col-section-heading"
      className={`w-full text-black ${className}`}
    >
      <div
        className="
          mx-auto
          grid
          min-h-80
          max-w-360
          grid-cols-1
          gap-10
          px-6
          py-20

          sm:gap-12
          sm:px-8

          md:grid-cols-3
          md:gap-12
          md:px-12
          md:py-20

          lg:min-h-87.5
          lg:gap-16
          lg:px-20
        "
      >
        {/* Left column */}
        <div className="flex md:justify-center">
          <p
            ref={labelRef}
            className="
              font-benton-regular
              text-[2rem]
              leading-none

              md:text-[clamp(2.5rem,4vw,3.75rem)]
            "
          >
            {label}
          </p>
        </div>

        {/* Middle column */}
        <div
          ref={middleRef}
          className="
            flex
            max-w-105
            flex-col
            items-start
            gap-5
          "
        >
          <h2
            id="three-col-section-heading"
            className="
              font-benton-regular
              text-[2rem]
              leading-[1.05]

              md:text-[clamp(2.5rem,4vw,3.75rem)]
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
            {content}
          </div>
        </div>

        {/* Right column */}
        <div
          ref={rightRef}
          className="
            flex
            max-w-105
            flex-col
            items-start
            gap-5
          "
        >
          {hr && (
            <h3
              className="
                font-benton-regular
                text-[2rem]
                leading-[1.05]

                md:text-[clamp(2.5rem,4vw,3.75rem)]
              "
            >
              {hr}
            </h3>
          )}

          {cr && (
            <div
              className="
                text-sm
                leading-[1.65]
                text-neutral-900

                md:text-[0.95rem]
              "
            >
              {cr}
            </div>
          )}

          {eyebrow && (
            <div
              className="
                text-sm
                leading-[1.65]
                text-neutral-900

                md:text-[0.95rem]
              "
            >
              {eyebrow}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
