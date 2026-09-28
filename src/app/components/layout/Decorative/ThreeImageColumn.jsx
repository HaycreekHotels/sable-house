"use client";

import { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const columnImages = [
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_cola.jpg",
    alt: "A dark cocktail beneath a glass cloche on a wooden serving board.",
  },
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_steak.jpg",
    alt: "A sliced T-bone steak served on a wooden board with grilled onions.",
  },
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_oyster.jpg",
    alt: "Baked oysters topped with herbs and a golden, savory crust.",
  },
];

export default function ThreeImageColumn({
  images = columnImages,
  className = "",
}) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray(".three-image-column__item", section);

        if (!items.length) return;

        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            y: 36,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",

            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [images],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Oak Steakhouse food and drink gallery"
      className={["relative w-full", "py-12 md:py-16 lg:py-20", className].join(
        " ",
      )}
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1800px]
          grid-cols-1
          gap-5
          px-5

          md:grid-cols-3
          md:gap-6
          md:px-8

          lg:gap-10
          lg:px-12

          2xl:gap-14
          2xl:px-16
        "
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className="
              three-image-column__item
              relative
              min-w-0
              overflow-hidden
            "
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={2400}
              sizes="
                (max-width: 767px) calc(100vw - 40px),
                (max-width: 1023px) 30vw,
                (max-width: 1535px) 29vw,
                560px
              "
              quality={80}
              loading="lazy"
              className="
                block
                aspect-[2/3]
                h-auto
                w-full
                object-cover
                object-center
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}
