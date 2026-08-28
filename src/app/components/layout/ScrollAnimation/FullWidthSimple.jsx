"use client";

import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const placeHolder =
  "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-66.jpeg";

export default function FullWidthSimple({
  eyebrow = "OUR PHILOSOPHY",
  headingStart = "Slow down,",
  headingEnd = "experience more.",
  description = `Sabal House believes that slowing down allows you to
    experience more. Through thoughtful design, intuitive
    hospitality, and a deep connection to Savannah, the house
    creates space to arrive, feel at ease, and become more
    present to the city around you.`,
  image = placeHolder,
  imageAlt = "Flourishing green forest in Savannah, Georgia",
}) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  const introRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const getStartSize = () => {
        // Slightly smaller on narrow screens.
        if (window.innerWidth < 768) {
          return Math.min(240, window.innerWidth - 40);
        }

        return 250;
      };

      if (prefersReducedMotion) {
        gsap.set(panelRef.current, {
          width: "100%",
          height: "90vh",
        });

        gsap.set([introRef.current, headingRef.current], {
          autoAlpha: 0,
        });

        gsap.set(overlayRef.current, {
          autoAlpha: 1,
        });

        gsap.set(contentRef.current, {
          autoAlpha: 1,
          y: 0,
        });

        return;
      }

      gsap.set(panelRef.current, {
        width: getStartSize,
        height: getStartSize,
      });

      gsap.set(overlayRef.current, {
        autoAlpha: 0,
      });

      gsap.set(contentRef.current, {
        autoAlpha: 0,
        y: 30,
      });

      /*
       * Main scroll sequence
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(
        panelRef.current,
        {
          width: () => sectionRef.current?.clientWidth ?? window.innerWidth,
          height: () => window.innerHeight * 0.9,
          ease: "none",
          duration: 3,
        },
        0,
      );

      timeline.to(
        imageRef.current,
        {
          scale: 1.08,
          ease: "none",
          duration: 3,
        },
        0,
      );

      timeline.to(
        introRef.current,
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.5,
          ease: "none",
        },
        0.85,
      );

      timeline.to(
        headingRef.current,
        {
          autoAlpha: 0,
          duration: 0.6,
          ease: "none",
        },
        0.55,
      );

      timeline.to(
        overlayRef.current,
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "none",
        },
        2.15,
      );

      timeline.to(
        contentRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "none",
        },
        2.35,
      );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f7f6f2]"
    >
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Eyebrow */}
        <p
          ref={introRef}
          className="
            absolute
            left-1/2
            top-6
            -translate-x-1/2
            text-[10px]
            uppercase
            tracking-[0.08em]
            text-black
            md:top-44
            md:text-xs
          "
        >
          {eyebrow}
        </p>

        {/* Split heading */}
        <h2
          ref={headingRef}
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            w-full
            -translate-x-1/2
            -translate-y-1/2
            grid-cols-[1fr_250px_1fr]
            items-center
            gap-12
            px-8
            font-benton-regular
            text-[clamp(1.75rem,3.6vw,4rem)]
            font-normal
            leading-none
            tracking-[-0.04em]
            text-black
            md:grid
            lg:gap-12
            lg:px-16
          "
        >
          <span className="justify-self-end text-right">{headingStart}</span>

          {/* Empty column represents the starting image */}
          <span aria-hidden="true" />

          <span className="justify-self-start">{headingEnd}</span>
        </h2>

        {/* Mobile heading */}
        <h2
          className="
            absolute
            inset-x-5
            bottom-8
            flex
            justify-between
            gap-4
            font-benton-regular
            text-[clamp(1.5rem,7vw,2.25rem)]
            leading-none
            tracking-[-0.03em]
            text-black
            md:hidden
          "
        >
          <span>{headingStart}</span>

          <span className="text-right">{headingEnd}</span>
        </h2>
      </div>

      <div
        ref={panelRef}
        className="
          relative
          z-10
          shrink-0
          overflow-hidden
          will-change-[width,height]
        "
      >
        {/* Image */}
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Final dark overlay */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-black/20"
        />

        <div
          ref={contentRef}
          className="
            absolute
            inset-x-0
            bottom-0
            z-20
            flex
            justify-end
            px-5
            pb-8
            text-white
            md:px-16
            md:pb-14
            lg:px-36
          "
        >
          <p
            className="
              max-w-[34rem]
              text-sm
              leading-[1.65]
              md:text-base
            "
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
