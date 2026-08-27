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
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(textRef.current, {
          opacity: 1,
          y: 0,
        });

        return;
      }

      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className={`
    flex
    min-h-[60vh]
    items-center
    justify-center
    px-6
    py-20
    sm:px-10
    md:px-16
    lg:px-24
    ${className}
  `}
    >
      <p
        ref={textRef}
        className={`
    w-full
    max-w-[700px]
    font-benton-regular
    text-[clamp(1.75rem,3.9vw,4.5rem)]
    leading-[1.25]
    tracking-[-0.025em]
    text-black
    ${textClassName}
  `}
      >
        {children}
      </p>
    </section>
  );
}
