"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScatteredGallerySection({ card }) {
  const sectionRef = useRef(null);

  const imageOneRef = useRef(null);
  const imageTwoRef = useRef(null);
  const imageThreeRef = useRef(null);
  const imageFourRef = useRef(null);

  const textRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(
        [
          imageOneRef.current,
          imageTwoRef.current,
          imageThreeRef.current,
          imageFourRef.current,
        ],
        {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
        },
      )
        .from(
          textRef.current,
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.1",
        )
        .from(
          linkRef.current,
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-secondary py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-425 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Top left image */}
          <div ref={imageOneRef} className="lg:col-span-4 lg:row-start-1">
            <div className="relative h-75 overflow-hidden md:h-105 lg:h-107.">
              <Image
                src={card.img1}
                alt={card.alt1}
                fill
                sizes="(max-width: 1024px) 100vw, 28vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Top middle image */}
          <div
            ref={imageTwoRef}
            className="lg:col-span-2 lg:row-start-1 lg:pt-3"
          >
            <div className="relative h-55 overflow-hidden md:h-70 lg:h-75">
              <Image
                src={card.img2}
                alt={card.alt2}
                fill
                sizes="(max-width: 1024px) 100vw, 16vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Text block */}
          <div
            ref={textRef}
            className="lg:col-span-4 lg:col-start-7 lg:row-start-1 lg:pt-16"
          >
            <div className="flex flex-col justify-center">
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
                {card.eyebrow}
              </p>

              <h2 className="mt-4 max-w-130 font-serif text-4xl leading-tight text-neutral-900 md:text-5xl lg:text-6xl">
                {card.title}
              </h2>

              <p className="mt-8 max-w-135 text-lg leading-9 text-neutral-700">
                {card.content}
              </p>

              <div ref={linkRef} className="mt-10">
                <Link
                  href={card.href}
                  className="inline-block border-b border-[#a67c3d] pb-2 text-sm uppercase tracking-[0.12em] text-neutral-700 transition-opacity duration-300 hover:opacity-70"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom left tall image */}
          <div
            ref={imageThreeRef}
            className="lg:col-span-3 lg:col-start-4 lg:row-start-2 lg:-mt-6"
          >
            <div className="relative h-70 overflow-hidden md:h-85 lg:h-90">
              <Image
                src={card.img3}
                alt={card.alt3}
                fill
                sizes="(max-width: 1024px) 100vw, 24vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom right wide image */}
          <div
            ref={imageFourRef}
            className="lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:-mt-12"
          >
            <div className="relative h-60 overflow-hidden md:h-75 lg:h-70">
              <Image
                src={card.img4}
                alt={card.alt4}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
