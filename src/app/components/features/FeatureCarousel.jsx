"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function FeatureCarousel({
  slides = [],
  imageSide = "left",
  backgroundColor = "bg-secondary",
  textColor = "text-textColor",
  buttonColor = "bg-main",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentImageRef = useRef(null);
  const incomingImageRef = useRef(null);

  const currentTextRef = useRef(null);
  const incomingTextRef = useRef(null);

  const currentSlide = slides[currentIndex];
  const incomingSlide = incomingIndex !== null ? slides[incomingIndex] : null;

  useEffect(() => {
    if (!slides.length) return;

    slides.forEach((slide) => {
      if (!slide?.image) return;
      const img = new window.Image();
      img.src = slide.image;
    });
  }, [slides]);

  useEffect(() => {
    if (!slides.length) return;

    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

    [slides[currentIndex], slides[nextIndex], slides[prevIndex]].forEach(
      (slide) => {
        if (!slide?.image) return;
        const img = new window.Image();
        img.src = slide.image;
      },
    );
  }, [currentIndex, slides]);

  useLayoutEffect(() => {
    if (!currentImageRef.current || !currentTextRef.current) return;

    const currentTextItems =
      currentTextRef.current.querySelectorAll(".slide-item");

    gsap.set(currentImageRef.current, {
      x: 0,
      opacity: 1,
      scale: 1,
      clearProps: "transform",
    });

    gsap.set(currentTextItems, {
      x: 0,
      opacity: 1,
      clearProps: "transform",
    });
  }, [currentIndex]);

  const getCurrentTextItems = () => {
    return currentTextRef.current?.querySelectorAll(".slide-item") || [];
  };

  const getIncomingTextItems = () => {
    return incomingTextRef.current?.querySelectorAll(".slide-item") || [];
  };

  const handleNext = () => {
    if (isAnimating || slides.length <= 1) return;

    const nextIndex = (currentIndex + 1) % slides.length;
    setIsAnimating(true);
    setIncomingIndex(nextIndex);

    requestAnimationFrame(() => {
      const exitX = imageSide === "left" ? -30 : 30;
      const enterX = imageSide === "left" ? 30 : -30;

      const textExitX = imageSide === "left" ? -20 : 20;
      const textEnterX = imageSide === "left" ? 24 : -24;

      const currentTextItems = getCurrentTextItems();
      const incomingTextItems = getIncomingTextItems();

      gsap.set(incomingImageRef.current, {
        x: enterX,
        opacity: 0,
        scale: 1.02,
      });

      gsap.set(incomingTextItems, {
        x: textEnterX,
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentIndex(nextIndex);
          setIncomingIndex(null);
          setIsAnimating(false);
        },
      });

      tl.to(
        currentImageRef.current,
        {
          x: exitX,
          opacity: 0,
          scale: 0.98,
          duration: 0.75,
          ease: "power2.inOut",
        },
        0,
      )
        .to(
          incomingImageRef.current,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0,
        )
        .to(
          currentTextItems,
          {
            x: textExitX,
            opacity: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          incomingTextItems,
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.12,
        );
    });
  };

  const renderSlideLink = (slide) => {
    if (!slide?.link) return null;

    const isExternal = slide.link.startsWith("http");

    const className =
      "slide-item mt-8 inline-block border-b border-current pb-1 font-serif text-lg hover:opacity-70";

    if (isExternal) {
      return (
        <a
          href={slide.link}
          className={className}
          target="_blank"
          rel="noreferrer"
        >
          {slide.linkText || "View More"}
        </a>
      );
    }

    return (
      <Link href={slide.link} className={className}>
        {slide.linkText || "View More"}
      </Link>
    );
  };

  if (!slides.length) return null;

  return (
    <section
      className={`w-full px-4 py-10 sm:px-6 md:px-10 lg:px-16 ${backgroundColor}`}
    >
      <div
        className={`mx-auto grid max-w-8xl grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr] ${
          imageSide === "right"
            ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
            : ""
        }`}
      >
        <div className="relative aspect-6/5 w-full overflow-hidden bg-gray-300">
          <div ref={currentImageRef} className="absolute inset-0 z-10">
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>

          {incomingSlide && (
            <div ref={incomingImageRef} className="absolute inset-0 z-20">
              <Image
                src={incomingSlide.image}
                alt={incomingSlide.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex h-full flex-col justify-center">
          <div className={`relative min-h-60 max-w-md ${textColor}`}>
            <div ref={currentTextRef} className="absolute inset-0 z-10">
              <p className="slide-item text-xs uppercase tracking-tighter text-main md:text-xl">
                {currentSlide.eyebrow}
              </p>

              <h2 className="slide-item mt-4 text-main font-serif text-3xl leading-tight sm:text-4xl">
                {currentSlide.title}
              </h2>

              <p className="slide-item mt-5 text-main text-sm leading-7 sm:text-base">
                {currentSlide.description}
              </p>

              {renderSlideLink(currentSlide)}
            </div>

            {incomingSlide && (
              <div ref={incomingTextRef} className="absolute inset-0 z-20">
                <p className="slide-item text-xs uppercase tracking-tighter text-[#004051] md:text-xl">
                  {incomingSlide.eyebrow}
                </p>

                <h2 className="slide-item mt-4 text-main font-serif text-3xl leading-tight sm:text-4xl">
                  {incomingSlide.title}
                </h2>

                <p className="slide-item mt-5 text-main text-sm leading-7 sm:text-base">
                  {incomingSlide.description}
                </p>

                {renderSlideLink(incomingSlide)}
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Next slide"
              className={`flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 ${buttonColor}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6l6 6-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
