"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1740&auto=format&fit=crop",
    alt: "Private dinner table setting at Sabal House",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1740&auto=format&fit=crop",
    alt: "Guests gathering for a social event",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop",
    alt: "Celebration with friends and family",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1740&auto=format&fit=crop",
    alt: "Elegant social event reception",
  },
];

export default function SocialEventsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".social-hero-image",
        { autoAlpha: 0, scale: 1.06 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".social-hero-item",
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.15,
        },
      );

      gsap.utils.toArray(".social-section").forEach((section) => {
        const items = section.querySelectorAll(".social-animate");

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray(".social-feature-section").forEach((section) => {
        const image = section.querySelector(".social-feature-image");
        const textItems = section.querySelectorAll(".social-feature-text");

        gsap.fromTo(
          image,
          { autoAlpha: 0, scale: 1.04 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          textItems,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".social-gallery-item",
        { autoAlpha: 0, y: 35, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".social-gallery",
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
      <section className="relative min-h-[82vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1740&auto=format&fit=crop"
          alt="Social event table setting at Sabal House"
          fill
          priority
          className="social-hero-image object-cover opacity-0"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-main/45" />

        <div className="relative z-10 flex min-h-[82vh] items-end px-5 pb-14 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="social-hero-item mb-5 text-sm uppercase tracking-[0.4em] text-secondary opacity-0">
              Sabal House Social Events
            </p>

            <h1 className="social-hero-item max-w-5xl font-serif text-5xl leading-tight text-secondary opacity-0 md:text-7xl lg:text-8xl">
              Private Gatherings in Savannah
            </h1>

            <p className="social-hero-item mt-7 max-w-2xl text-lg leading-8 text-secondary/90 opacity-0 md:text-xl">
              Celebrate birthdays, anniversaries, private dinners, and milestone
              moments in an intimate boutique setting.
            </p>
          </div>
        </div>
      </section>

      <section className="social-section px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="social-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Celebrate Together
            </p>

            <h2 className="social-animate font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              A Warm Setting for Life’s Best Moments
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-main/75 md:text-xl md:leading-10">
            <p className="social-animate opacity-0">
              Sabal House offers a refined and welcoming setting for social
              events in Savannah, Georgia. From milestone birthdays and
              anniversary dinners to family gatherings and private celebrations,
              our spaces are designed for memorable moments shared with the
              people who matter most.
            </p>

            <p className="social-animate opacity-0">
              With boutique hospitality, thoughtful food and beverage options,
              and a central Savannah location, your event can feel effortless,
              personal, and beautifully connected to the city around it.
            </p>
          </div>
        </div>
      </section>

      <section className="social-feature-section px-5 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-main/10 bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1740&auto=format&fit=crop"
              alt="Private gathering at Sabal House"
              fill
              className="social-feature-image object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center px-7 py-12 md:px-12 md:py-16 lg:px-16">
            <div className="max-w-xl">
              <p className="social-feature-text mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                Private Dinners
              </p>

              <h2 className="social-feature-text font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                Gather Around the Table
              </h2>

              <p className="social-feature-text mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                Host a private dinner that feels intimate, polished, and easy.
                Whether you are celebrating with family or bringing friends
                together for a special night, Sabal House offers a relaxed
                setting with elevated hospitality.
              </p>

              <ul className="social-feature-text mt-8 space-y-3 pl-5 text-base leading-7 text-main/75 opacity-0 md:text-lg">
                <li className="list-disc">Birthday dinners</li>
                <li className="list-disc">Anniversary celebrations</li>
                <li className="list-disc">Family gatherings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="social-feature-section px-5 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-main/10 bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px] lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1740&auto=format&fit=crop"
              alt="Social reception at Sabal House"
              fill
              className="social-feature-image object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center px-7 py-12 md:px-12 md:py-16 lg:order-1 lg:px-16">
            <div className="max-w-xl">
              <p className="social-feature-text mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                Celebrations
              </p>

              <h2 className="social-feature-text font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                Milestones Worth Remembering
              </h2>

              <p className="social-feature-text mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                From cocktail-style gatherings to seated celebrations, our hotel
                spaces can support a range of social events with a sense of
                warmth, style, and occasion.
              </p>

              <ul className="social-feature-text mt-8 space-y-3 pl-5 text-base leading-7 text-main/75 opacity-0 md:text-lg">
                <li className="list-disc">Cocktail receptions</li>
                <li className="list-disc">Milestone parties</li>
                <li className="list-disc">Welcome gatherings and reunions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="social-section bg-white px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="social-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Event Possibilities
            </p>

            <h2 className="social-animate font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              Social Events with a Sense of Place
            </h2>

            <p className="social-animate mt-7 max-w-3xl text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
              Whether your event is small and quiet or lively and celebratory,
              Sabal House offers a charming Savannah backdrop, inviting rooms,
              and service that helps the day feel effortless.
            </p>
          </div>

          <div className="social-animate border border-main/15 bg-secondary p-7 opacity-0 md:p-9">
            <h3 className="font-serif text-3xl text-main md:text-4xl">
              Social Event Options
            </h3>

            <ul className="mt-7 space-y-4 text-base leading-7 text-main/75 md:text-lg">
              <li>Birthday celebrations</li>
              <li>Anniversary dinners</li>
              <li>Private receptions</li>
              <li>Family reunions</li>
              <li>Farewell brunches</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="social-gallery px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-contrast">
              Gallery
            </p>

            <h2 className="font-serif text-5xl leading-tight text-main md:text-7xl">
              Social Moments
            </h2>

            <p className="mt-6 text-base leading-8 text-main/75 md:text-lg">
              A glimpse at the textures, tables, and gathering spaces that help
              make celebrations at Sabal House feel personal.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`social-gallery-item relative min-h-[280px] overflow-hidden opacity-0 ${
                  index === 0 || index === 3
                    ? "md:col-span-2 md:min-h-[420px]"
                    : "md:col-span-1 md:min-h-[420px]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="social-section bg-main px-5 py-16 text-secondary md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="social-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Begin Planning
            </p>

            <h2 className="social-animate font-serif text-5xl leading-tight opacity-0 md:text-7xl">
              Plan Your Social Event
            </h2>

            <p className="social-animate mt-7 max-w-2xl text-base leading-8 text-secondary/80 opacity-0 md:text-lg">
              Tell us about your celebration, preferred dates, and the kind of
              experience you are imagining. Our team can help you shape the next
              steps.
            </p>
          </div>

          <div className="social-animate opacity-0 lg:text-right">
            <Link
              href="/contact"
              className="inline-flex min-h-[60px] items-center justify-center border border-secondary px-9 text-xs uppercase tracking-[0.25em] text-secondary transition-colors duration-300 hover:bg-secondary hover:text-main"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
