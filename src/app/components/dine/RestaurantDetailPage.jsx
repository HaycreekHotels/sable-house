// components/RestaurantDetailPage.jsx

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RestaurantDetailPage({ restaurant }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".restaurant-hero-image",
        {
          autoAlpha: 0,
          scale: 1.06,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".restaurant-intro-item",
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
            trigger: ".restaurant-intro-section",
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".menu-section",
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: ".restaurant-menu-section",
            start: "top 78%",
            once: true,
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-secondary text-main">
      <section className="relative h-[65vh] min-h-110 w-full overflow-hidden md:h-[78vh]">
        <Image
          src={restaurant.image}
          alt={restaurant.imageAlt}
          fill
          priority
          className="restaurant-hero-image object-cover opacity-0"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-main/35" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-secondary md:text-sm">
              {restaurant.eyebrow}
            </p>

            <h1 className="max-w-5xl font-serif text-5xl leading-none text-secondary md:text-7xl lg:text-8xl">
              {restaurant.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="restaurant-intro-section bg-white px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="restaurant-intro-item opacity-0">
            <p className="mb-6 text-center text-sm uppercase tracking-[0.45em] text-main/60 lg:text-left">
              {restaurant.eyebrow}
            </p>

            <h2 className="mb-10 text-center font-serif text-5xl leading-tight text-main md:text-6xl lg:text-left">
              {restaurant.title}
            </h2>

            <p className="max-w-2xl text-lg leading-10 text-main/75 md:text-xl">
              {restaurant.description}
            </p>
          </div>

          <div className="restaurant-intro-item border-main/20 opacity-0 lg:border-l lg:pl-20">
            <p className="mb-10 text-sm uppercase tracking-[0.45em] text-main/60">
              Hours:
            </p>

            <div className="space-y-0">
              {restaurant.hours.map((hour, index) => (
                <div
                  key={hour}
                  className={`py-7 text-lg leading-8 text-main/75 md:text-xl ${
                    index !== restaurant.hours.length - 1
                      ? "border-b border-main/15"
                      : ""
                  }`}
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="restaurant-menu-section bg-secondary px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-contrast">
              Menu
            </p>

            <h2 className="font-serif text-5xl leading-tight text-main md:text-7xl">
              Seasonal Favorites
            </h2>

            <p className="mt-6 text-base leading-8 text-main/75 md:text-lg">
              Our menus are designed with clear headings, readable item
              descriptions, and simple pricing to support an accessible browsing
              experience.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {restaurant.menuSections.map((section) => (
              <section
                key={section.title}
                className="menu-section border border-main/15 bg-white p-7 opacity-0 md:p-8"
                aria-labelledby={`${restaurant.slug}-${section.title}`}
              >
                <h3
                  id={`${restaurant.slug}-${section.title}`}
                  className="mb-8 font-serif text-3xl text-main md:text-4xl"
                >
                  {section.title}
                </h3>

                <div className="space-y-8">
                  {section.items.map((item) => (
                    <article key={item.name}>
                      <div className="mb-2 flex items-start justify-between gap-5">
                        <h4 className="text-lg font-semibold leading-7 text-main">
                          {item.name}
                        </h4>

                        <p className="shrink-0 text-base text-contrast">
                          {item.price}
                        </p>
                      </div>

                      <p className="text-base leading-7 text-main/70">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dine"
              className="inline-flex min-h-14.5 items-center justify-center border border-main px-8 text-xs font-bold uppercase tracking-[0.25em] text-main transition-colors duration-300 hover:bg-main hover:text-secondary"
            >
              Back To Dining
            </Link>

            <a
              href={restaurant.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14.5 items-center justify-center border border-contrast px-8 text-xs font-bold uppercase tracking-[0.25em] text-contrast transition-colors duration-300 hover:bg-contrast hover:text-secondary"
            >
              Book a Table
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
