"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import stamp from "../../../../public/images/logos/SH_Leaf_Brown.png";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxIntroduction({ intro }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const topImageWrapRef = useRef(null);
  const bottomImageWrapRef = useRef(null);
  const topImageRef = useRef(null);
  const bottomImageRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.to(topImageRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(bottomImageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f3f1ed] py-16 md:py-24">
      <div className="mx-auto max-w-350 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-between gap-10">
            <div ref={textRef} className="max-w-155">
              <h1 className="mb-6 text-s uppercase tracking-[0.35em] text-neutral-500">
                {intro.header}
              </h1>

              <p className="max-w-130 font-serif text-3xl leading-tight text-neutral-900 md:text-5xl">
                {intro.sub}
              </p>

              <div className="mt-8 max-w-155 space-y-4 text-base leading-8 text-neutral-600 md:text-lg">
                <p>{intro.lt}</p>
              </div>
            </div>

            <div
              ref={bottomImageRef}
              className="relative h-80 overflow-hidden md:h-105"
            >
              <Image
                src={intro.image1}
                alt={intro.alt1}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div
              ref={topImageRef}
              className="relative h-105 overflow-hidden md:h-180"
            >
              <Image
                src={intro.image2}
                alt={intro.alt2}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <div
              ref={bottomImageRef}
              className="flex flex-col items-center justify-center gap-6 py-6 text-center"
            >
              <p className="text-xl text-[#b58a45] uppercase">{intro.st}</p>

              <Image
                src={stamp}
                alt="Decorative leaf stamp"
                className="h-auto w-20 md:w-56"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
