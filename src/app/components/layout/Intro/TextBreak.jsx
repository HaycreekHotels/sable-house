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
       * Reduced motion:
       * Show the copy immediately with no transform.
       */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(text, {
          autoAlpha: 1,
          y: 0,
          clearProps: "transform",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const animation = gsap.fromTo(
          text,
          {
            autoAlpha: 0,
            y: 18,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",

            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      });

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
          text-center

          font-benton-regular
          text-[clamp(1.75rem,7.5vw,2.5rem)]
          
          tracking-[-0.025em]
          text-black

          sm:text-[clamp(2rem,5.5vw,3rem)]
          sm:leading-[1.15]

          md:text-[clamp(2.5rem,4.2vw,4.25rem)]
          md:leading-[1.18]

          lg:max-w-[72rem]
          lg:text-[clamp(3rem,3.75vw,4rem)]
          

          ${textClassName}
        `}
      >
        {children}
      </p>
    </div>
  );
}
