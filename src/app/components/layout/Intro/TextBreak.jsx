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
    <section
      ref={sectionRef}
      style={{
        backgroundImage:
          "url('/images/decorative/dark-green-background-grain.jpg')",
      }}
      className={`
        w-full
        bg-cover
        bg-center
        bg-no-repeat

        p-4

        sm:p-5
        md:p-6
        lg:p-8

        ${className}
      `}
    >
      <div
        className={`
          relative

          flex
          min-h-[520px]
          w-full
          items-center
          justify-center

          px-6
          py-20

          sm:min-h-[560px]
          sm:px-10
          sm:py-24

          md:min-h-[620px]
          md:px-14
          md:py-28

          lg:min-h-[650px]
          lg:px-20
          lg:py-32

          ${panelClassName}
        `}
      >
        {/* Centered quote */}
        <div
          className="
            flex
            w-full
            max-w-[900px]
            items-center
            justify-center

            text-center

            md:max-w-[750px]
            lg:max-w-[800px]
          "
        >
          <p
            ref={textRef}
            className={`
              max-w-[860px]

              font-benton-regular
              italic

              text-[clamp(2rem,7vw,2.85rem)]
              leading-[1.18]
              

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
        </div>

        {/* Sabal House stamp */}
        {stampSrc && (
          <div
            ref={stampRef}
            className="
              absolute
              bottom-8
              left-1/2

              h-[72px]
              w-[100px]

              -translate-x-1/2

              sm:bottom-10
              sm:h-[82px]
              sm:w-[120px]

              md:bottom-18
              md:h-[92px]
              md:w-[140px]

              lg:bottom-24
            "
          >
            <Image
              src={stampSrc}
              alt={stampAlt}
              fill
              sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, 180px"
              className="object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
