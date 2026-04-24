"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import HeroImage from "../components/layout/Heros/HeroImage";

export default function CorporateTravel({
  image = "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1740&auto=format&fit=crop",
  bookUrl = "https://example.com/book",
  contactUrl = "/contact",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".corporate-animate",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".corporate-image",
        {
          autoAlpha: 0,
          scale: 1.04,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <HeroImage
        image="https://images.unsplash.com/photo-1667826878697-d54556b53472?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="downtown Georgia"
      />
      <section
        ref={sectionRef}
        className="w-full bg-secondary px-5 py-16 text-main md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <h1 className="corporate-animate max-w-6xl font-serif text-3xl leading-tight text-main opacity-0 md:text-5xl lg:text-6xl">
            Work Hard, Stay Smart—Exclusive Corporate Rates Await
          </h1>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-8 text-lg leading-8 text-main md:text-xl md:leading-9">
              <p className="corporate-animate opacity-0">
                At Sable House, we know that business travel should be as smooth
                as your morning coffee. That’s why we offer exclusive corporate
                rates tailored to professionals who appreciate effortless stays.
                With elevated amenities, thoughtful hospitality, and a setting
                designed for both productivity and relaxation, your time in
                Savannah just got better.
              </p>

              <p className="corporate-animate opacity-0">
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-contrast text-main transition-colors duration-300 hover:text-contrast"
                >
                  Book Now
                </a>{" "}
                and enjoy our standard corporate discount.
              </p>

              <p className="corporate-animate opacity-0">
                <Link
                  href={contactUrl}
                  className="border-b border-contrast text-main transition-colors duration-300 hover:text-contrast"
                >
                  Contact Us
                </Link>{" "}
                to get your company&apos;s exclusive code.
              </p>
            </div>

            <div className="corporate-image relative min-h-[340px] overflow-hidden opacity-0 md:min-h-[500px]">
              <Image
                src={image}
                alt="Sable House guest room for corporate travelers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
