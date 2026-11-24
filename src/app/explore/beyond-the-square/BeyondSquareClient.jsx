"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialPlaceCard from "@/app/components/layout/cards/EditorialPlaceCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Content and layout remain visible in SSR even before JS or GSAP initialize. */
export default function BeyondSquareClient({ hero, sections }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const elements = gsap.utils.toArray("[data-beyond-reveal]", root);
        const cards = gsap.utils.toArray("[data-editorial-card]", root);
        [...elements, ...cards].forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
              },
            },
          );
        });
      });
      // Don't parallax the product photography: keep it sharp and calm.
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <main
      ref={rootRef}
      id="main-content"
      className="min-w-0 w-full flex-1 overflow-x-clip bg-secondary text-foreground"
    >
      <a
        href="#beyond-the-square-title"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-20 focus:z-[90] focus:bg-secondary focus:px-5 focus:py-3 focus:font-central-regular focus:text-main focus:outline-2 focus:outline-main"
      >
        Skip to Beyond the Square content
      </a>

      <section
        aria-label="Explore Savannah and the coast"
        className="relative h-[52svh] min-h-[340px] max-h-[740px] w-full overflow-hidden bg-[#d9d9d9] sm:h-[62svh] lg:h-[65svh]"
      >
        {hero.image && (
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        )}
        {hero.image && (
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        )}
        {/* Contrast for the existing white nav/logo/booking controls over either photo or placeholder. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent"
          aria-hidden="true"
        />
      </section>

      <section
        aria-labelledby="beyond-the-square-title"
        className="mx-auto grid w-full max-w-[1350px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:px-12 lg:pb-28 lg:pt-28 xl:px-16"
      >
        <div
          data-beyond-reveal
          className="mx-auto w-full max-w-[460px] lg:ml-auto lg:mr-0 lg:pr-4"
        >
          <h1
            id="beyond-the-square-title"
            className="font-benton-light text-[clamp(2.6rem,4vw,4.4rem)] leading-[1.06] tracking-[-0.055em]"
          >
            Beyond the Square
          </h1>
          <div className="mt-8 max-w-[430px] space-y-6 font-central-regular text-[15px] leading-[1.65] sm:text-[16px]">
            <p>
              There’s a side of Savannah that reveals itself when you wander a
              little further. Where shaded streets give way to winding
              waterways, and marsh meets the sea, and local stories unfold
              beyond the familiar landmarks.
            </p>
            <p>
              From coastal escapes to tucked-away gardens and cultural
              discoveries, consider this our invitation to see Savannah a little
              differently.
            </p>
          </div>
        </div>
        <div
          data-beyond-reveal
          className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden bg-[#d9d9d9] lg:ml-auto lg:mr-0"
        >
          {hero.introImage && (
            <Image
              src={hero.introImage}
              alt={hero.introImageAlt}
              fill
              sizes="(max-width: 1023px) 90vw, 36vw"
              className="object-cover"
            />
          )}
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-heading`}
          className="mx-auto w-full max-w-[1560px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10 lg:pb-32 xl:px-12"
        >
          <div
            data-beyond-reveal
            className="mx-auto mb-12 max-w-[600px] text-center sm:mb-16 lg:mb-20"
          >
            <h2
              id={`${section.id}-heading`}
              className="font-benton-light text-[clamp(2.1rem,4vw,3.4rem)] leading-[1.1] tracking-[-0.052em]"
            >
              {section.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[54ch] font-central-regular text-[15px] leading-[1.65] sm:text-[16px]">
              {section.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-20 lg:gap-x-8 lg:gap-y-24">
            {section.cards.map((card) => (
              <EditorialPlaceCard key={card.id} card={card} wide />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
