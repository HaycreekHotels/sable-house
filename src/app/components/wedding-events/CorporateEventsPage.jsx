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
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop",
    alt: "Corporate meeting setup at Sable House",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1740&auto=format&fit=crop",
    alt: "Business team meeting in a refined event space",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop",
    alt: "Corporate presentation and planning session",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1740&auto=format&fit=crop",
    alt: "Professional gathering and corporate event",
  },
];

export default function CorporateEventsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".corporate-hero-image",
        {
          autoAlpha: 0,
          scale: 1.06,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".corporate-hero-item",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.15,
        },
      );

      gsap.utils.toArray(".corporate-section").forEach((section) => {
        const items = section.querySelectorAll(".corporate-animate");

        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            y: 40,
          },
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

      gsap.utils.toArray(".corporate-feature-section").forEach((section) => {
        const image = section.querySelector(".corporate-feature-image");
        const textItems = section.querySelectorAll(".corporate-feature-text");

        gsap.fromTo(
          image,
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
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          textItems,
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
              trigger: section,
              start: "top 78%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".corporate-gallery-item",
        {
          autoAlpha: 0,
          y: 35,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".corporate-gallery",
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
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop"
          alt="Corporate event table setup at Sable House"
          fill
          priority
          className="corporate-hero-image object-cover opacity-0"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-main/45" />

        <div className="relative z-10 flex min-h-[82vh] items-end px-5 pb-14 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="corporate-hero-item mb-5 text-sm uppercase tracking-[0.4em] text-secondary opacity-0">
              Sable House Corporate Events
            </p>

            <h1 className="corporate-hero-item max-w-5xl font-serif text-5xl leading-tight text-secondary opacity-0 md:text-7xl lg:text-8xl">
              Meetings & Retreats in Savannah
            </h1>

            <p className="corporate-hero-item mt-7 max-w-2xl text-lg leading-8 text-secondary/90 opacity-0 md:text-xl">
              Host polished gatherings, team retreats, and business events in a
              setting that feels focused, refined, and welcoming.
            </p>
          </div>
        </div>
      </section>

      <section className="corporate-section px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="corporate-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Gather With Purpose
            </p>

            <h2 className="corporate-animate font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              Productive Spaces with Boutique Hospitality
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-main/75 md:text-xl md:leading-10">
            <p className="corporate-animate opacity-0">
              Sable House offers a thoughtful setting for corporate events in
              Savannah, Georgia. From leadership retreats and small meetings to
              client receptions and team celebrations, our spaces provide a warm
              alternative to traditional event venues.
            </p>

            <p className="corporate-animate opacity-0">
              With inviting interiors, flexible gathering areas, and a central
              location near Savannah’s historic district, your team can meet,
              connect, and unwind with ease.
            </p>
          </div>
        </div>
      </section>

      <section className="corporate-feature-section px-5 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-main/10 bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1740&auto=format&fit=crop"
              alt="Corporate meeting at Sable House"
              fill
              className="corporate-feature-image object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center px-7 py-12 md:px-12 md:py-16 lg:px-16">
            <div className="max-w-xl">
              <p className="corporate-feature-text mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                Meetings
              </p>

              <h2 className="corporate-feature-text font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                Space to Focus and Connect
              </h2>

              <p className="corporate-feature-text mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                Create a productive environment for planning sessions,
                presentations, workshops, and private team meetings. Our spaces
                are designed to feel relaxed while still supporting focused
                work.
              </p>

              <ul className="corporate-feature-text mt-8 space-y-3 pl-5 text-base leading-7 text-main/75 opacity-0 md:text-lg">
                <li className="list-disc">Leadership meetings and retreats</li>
                <li className="list-disc">Client presentations</li>
                <li className="list-disc">Team planning sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="corporate-feature-section px-5 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-main/10 bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px] lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1740&auto=format&fit=crop"
              alt="Corporate retreat at Sable House"
              fill
              className="corporate-feature-image object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center px-7 py-12 md:px-12 md:py-16 lg:order-1 lg:px-16">
            <div className="max-w-xl">
              <p className="corporate-feature-text mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                Retreats
              </p>

              <h2 className="corporate-feature-text font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                A Better Way to Bring Your Team Together
              </h2>

              <p className="corporate-feature-text mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                Step away from the everyday office setting and gather in a place
                that encourages conversation, clarity, and collaboration. Sable
                House is ideal for teams looking for a more personal retreat
                experience.
              </p>

              <ul className="corporate-feature-text mt-8 space-y-3 pl-5 text-base leading-7 text-main/75 opacity-0 md:text-lg">
                <li className="list-disc">Executive retreats</li>
                <li className="list-disc">Team-building weekends</li>
                <li className="list-disc">Strategy and planning sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="corporate-section bg-white px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="corporate-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Event Possibilities
            </p>

            <h2 className="corporate-animate font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              Professional Events That Feel Personal
            </h2>

            <p className="corporate-animate mt-7 max-w-3xl text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
              Whether you are hosting a small leadership session, a company
              celebration, or a private client dinner, Sable House offers
              flexible event options supported by thoughtful service and a
              distinctive Savannah setting.
            </p>
          </div>

          <div className="corporate-animate border border-main/15 bg-secondary p-7 opacity-0 md:p-9">
            <h3 className="font-serif text-3xl text-main md:text-4xl">
              Corporate Event Options
            </h3>

            <ul className="mt-7 space-y-4 text-base leading-7 text-main/75 md:text-lg">
              <li>Leadership retreats</li>
              <li>Small meetings</li>
              <li>Client receptions</li>
              <li>Team dinners</li>
              <li>Corporate room blocks</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="corporate-gallery px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-contrast">
              Gallery
            </p>

            <h2 className="font-serif text-5xl leading-tight text-main md:text-7xl">
              Gatherings at Sable House
            </h2>

            <p className="mt-6 text-base leading-8 text-main/75 md:text-lg">
              A glimpse at refined spaces, warm hospitality, and the kind of
              environment that makes business gatherings feel more intentional.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`corporate-gallery-item relative min-h-[280px] overflow-hidden opacity-0 ${
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

      <section className="corporate-section bg-main px-5 py-16 text-secondary md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="corporate-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Begin Planning
            </p>

            <h2 className="corporate-animate font-serif text-5xl leading-tight opacity-0 md:text-7xl">
              Plan Your Corporate Event
            </h2>

            <p className="corporate-animate mt-7 max-w-2xl text-base leading-8 text-secondary/80 opacity-0 md:text-lg">
              Tell us about your meeting, retreat, or company gathering. Our
              team can help guide you toward the right space, setup, and next
              steps.
            </p>
          </div>

          <div className="corporate-animate opacity-0 lg:text-right">
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
