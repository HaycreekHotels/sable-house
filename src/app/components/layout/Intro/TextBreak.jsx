"use client";

import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TextBreak({
  children,
  stampSrc,
  stampAlt = "",
  className = "",
  panelClassName = "",
  textClassName = "",
}) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const stampRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const text = textRef.current;
      const stamp = stampRef.current;

      if (!section || !text) return;

      const mm = gsap.matchMedia();

      /*
       * Reduced motion
       */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([text, stamp].filter(Boolean), {
          autoAlpha: 1,
          clearProps: "transform",
        });
      });

      /*
       * Standard motion
       */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          text,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
        );

        if (stamp) {
          timeline.fromTo(
            stamp,
            {
              autoAlpha: 0,
              y: 10,
              scale: 0.96,
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.45",
          );
        }

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <div
      ref={sectionRef}
      className={`
        w-full
        bg-secondary

        p-4

        sm:p-5
        md:p-6
        lg:p-8

        ${className}
      `}
    >
      <div
        className={`
          flex
          min-h-[520px]
          w-full
          flex-col
          items-center
          justify-center

          bg-[#4f5b2d]

          px-6
          py-16

          sm:min-h-[560px]
          sm:px-10
          sm:py-20

          md:min-h-[620px]
          md:px-14
          md:py-24

          lg:min-h-[650px]
          lg:px-20
          lg:py-28

          ${panelClassName}
        `}
      >
        <div
          className="
            flex
            w-full
            max-w-[900px]
            flex-col
            items-center
            text-center
          "
        >
          {/* Main statement */}
          <p
            ref={textRef}
            className={`
              max-w-[860px]

              font-benton-regular
              italic

              text-[clamp(2rem,7vw,2.85rem)]
              leading-[1.18]
              tracking-[-0.025em]

              text-secondary

              sm:text-[clamp(2.4rem,5vw,3.4rem)]

              md:text-[clamp(2.75rem,4vw,4rem)]
              md:leading-[1.16]

              lg:text-[clamp(3rem,3.25vw,4.25rem)]

              ${textClassName}
            `}
          >
            {children}
          </p>

          {/* Sabal House stamp */}
          {stampSrc && (
            <div
              ref={stampRef}
              className="
                relative

                mt-12
                h-[72px]
                w-[120px]

                sm:mt-14
                sm:h-[82px]
                sm:w-[140px]

                md:mt-16
                md:h-[92px]
                md:w-[160px]
              "
            >
              <Image
                src={stampSrc}
                alt={stampAlt}
                fill
                sizes="160px"
                className="
                  object-contain
                "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
