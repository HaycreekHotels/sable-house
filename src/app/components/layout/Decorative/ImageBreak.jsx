"use client";

import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ImageBreak({
  src = "https://sabal-house.b-cdn.net/Home%20Page%20Rendering.jpeg",
  alt = "Sabal House interior lounge",
  className = "",
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const image = imageRef.current;

      if (!section || !image) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          image,
          {
            autoAlpha: 0,
            scale: 1.035,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.25,
            ease: "power2.out",

            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(image, {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <figure
      ref={sectionRef}
      className={`
        w-full
        overflow-hidden
        bg-secondary
        px-4
        py-4

        sm:px-5
        sm:py-5

        md:px-6
        md:py-5

        ${className}
      `}
    >
      <div
        ref={imageRef}
        className="
          relative
          w-full
          overflow-hidden

          aspect-[4/3]

          sm:aspect-[3/2]
          md:aspect-[16/9]
          lg:aspect-[2/1]
        "
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />
      </div>
    </figure>
  );
}
