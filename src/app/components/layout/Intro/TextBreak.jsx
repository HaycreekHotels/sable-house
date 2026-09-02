"use client";

import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TextBreak({
  children,
  className = "",
  textClassName = "",
}) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;

      if (!section || !text) return;

      const mm = gsap.matchMedia();

      /*
       * Standard motion.
       *
       * Keep the movement smaller on phones so the text feels like it
       * settles into place rather than sliding a long distance upward.
       */
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set(text, {
              autoAlpha: 1,
              y: 0,
              clearProps: "transform",
            });

            return;
          }

          gsap.fromTo(
            text,
            {
              autoAlpha: 0,
              y: isMobile ? 28 : 48,
            },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: isMobile ? "top 90%" : "top 85%",
                end: isMobile ? "top 62%" : "top 48%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <div
      ref={sectionRef}
      className={`
        flex
        min-h-[50svh]
        w-full
        items-center
        justify-center

        px-5
        py-16

        sm:min-h-[55svh]
        sm:px-8
        sm:py-20

        md:min-h-[60svh]
        md:px-12
        md:py-24

        lg:px-20
        lg:py-28

        xl:px-24

        ${className}
      `}
    >
      <p
        ref={textRef}
        className={`
          w-full
          max-w-[46rem]

          font-benton-regular
          text-[clamp(1.75rem,7.5vw,2.5rem)]
          leading-[1.12]
          tracking-[-0.025em]
          text-black

          sm:text-[clamp(2rem,5.5vw,3rem)]
          sm:leading-[1.15]

          md:text-[clamp(2.5rem,4.2vw,4.25rem)]
          md:leading-[1.18]

          lg:max-w-[54rem]
          lg:text-[clamp(3rem,4vw,4.5rem)]
          lg:leading-[1.2]

          ${textClassName}
        `}
      >
        {children}
      </p>
    </div>
  );
}
