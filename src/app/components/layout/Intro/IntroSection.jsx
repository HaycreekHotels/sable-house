"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection({
  heading = "16 Exclusive Luxury Rooms",
  intro = [],
  className = "",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".intro-animate",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-secondary px-5 py-16 md:px-44 md:py-20 lg:px-72 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <p className="intro-animate mb-6 text-center text-sm uppercase tracking-[0.45em] text-neutral-500 opacity-0 md:text-base">
          Sabal House
        </p>

        <h1 className="intro-animate mx-auto mb-10 max-w-5xl text-center font-serif text-2xl leading-tight text-neutral-900 opacity-0 md:text-7xl lg:text-5xl">
          {heading}
        </h1>

        <div className="intro-animate mx-auto max-w-7xl space-y-8 text-left text-md leading-[1.9] text-neutral-700 opacity-0 md:text-lg md:leading-loose">
          {Array.isArray(intro) ? (
            intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}
