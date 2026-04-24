"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OverlapCarouselSection({
  slides = [],
  eyebrow,
  title,
  content,
  label,
  href,
  mediaRight = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef(null);
  const imageBlockRef = useRef(null);

  const imageOrderClass = mediaRight ? "lg:order-2" : "lg:order-1";
  const textOrderClass = mediaRight ? "lg:order-1" : "lg:order-2";

  const goToNext = () => {
    if (!slides.length) return;
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    if (!slides.length) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageBlockRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-contrast py-16 md:py-24">
      <div className="mx-auto max-w-400 px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div
            ref={imageBlockRef}
            className={`relative -mt-20 md:-mt-28 lg:-mt-36 ${imageOrderClass}`}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-xl">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}

              {slides.length > 1 && (
                <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                  <button
                    onClick={goToPrev}
                    className="flex h-12 w-12 items-center justify-center border border-white/40 bg-black/30 text-white"
                  >
                    Prev
                  </button>
                  <button
                    onClick={goToNext}
                    className="flex h-12 w-12 items-center justify-center border border-white/40 bg-black/30 text-white"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex flex-col justify-center py-8 ${
              mediaRight ? "lg:pr-8" : "lg:pl-8"
            } ${textOrderClass}`}
          >
            <p className="text-sm uppercase tracking-[0.18em] text-white/90">
              {eyebrow}
            </p>

            <h2 className="mt-3 max-w-105 text-4xl font-light uppercase leading-tight text-white md:text-5xl">
              {title}
            </h2>

            <p className="mt-8 max-w-130 text-base leading-8 text-white/90">
              {content}
            </p>

            <div className="mt-8">
              <Link
                href={href}
                className="bg-white px-8 py-4 text-sm uppercase tracking-[0.16em] text-textColor hover:bg-main hover:text-secondary"
              >
                {label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
