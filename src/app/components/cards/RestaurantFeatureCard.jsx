"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RestaurantFeatureCard({
  eyebrow = "Restaurant & Bar",
  title = "Sable Dining Room",
  description = "A refined restaurant experience at Sable House with seasonal dishes, thoughtful hospitality, and a relaxed atmosphere.",
  hours = [],
  image,
  imageAlt = "Restaurant at Sable House",
  slug = "/restaurants",
  reservationUrl = "https://example.com/book-table",
  imagePosition = "right",
}) {
  const cardRef = useRef(null);

  const imageFirst = imagePosition === "left";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".restaurant-text-item",
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
            trigger: cardRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".restaurant-image",
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
            trigger: cardRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={cardRef} className="w-full bg-secondary text-main">
      <div className="grid min-h-180 lg:grid-cols-2">
        <div
          className={`flex items-center justify-center px-5 py-16 md:px-10 lg:px-16 ${
            imageFirst ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="mx-auto max-w-xl text-center">
            <p className="restaurant-text-item mb-6 text-xs font-bold uppercase tracking-[0.35em] text-contrast opacity-0">
              {eyebrow}
            </p>

            <h2 className="restaurant-text-item font-serif text-xl uppercase leading-[0.95] text-main opacity-0 md:text-4xl lg:text-7xl">
              {title}
            </h2>

            <p className="restaurant-text-item mx-auto mt-8 max-w-lg text-lg leading-8 text-main/80 opacity-0">
              {description}
            </p>

            {hours.length > 0 && (
              <ul className="restaurant-text-item mx-auto mt-9 inline-block space-y-3 text-left text-base leading-7 text-main/85 opacity-0 md:text-lg">
                {hours.map((item) => (
                  <li key={item} className="list-square">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            <div className="restaurant-text-item mt-10 flex flex-col gap-4 opacity-0">
              <Link
                href={`/dine/${slug}`}
                className="inline-flex min-h-16 items-center justify-center border border-main px-8 text-xs font-bold uppercase tracking-[0.25em] text-main transition-colors duration-300 hover:bg-main hover:text-secondary"
              >
                Explore
              </Link>

              <a
                href={reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-16 items-center justify-center border border-main px-8 text-xs font-bold uppercase tracking-[0.25em] text-main transition-colors duration-300 hover:bg-main hover:text-secondary"
              >
                Book a Table
              </a>
            </div>
          </div>
        </div>

        <div
          className={`restaurant-image relative min-h-105 overflow-hidden opacity-0 lg:min-h-full ${
            imageFirst ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
