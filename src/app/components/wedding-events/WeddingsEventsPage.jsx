"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eventTypes = [
  {
    id: 1,
    eyebrow: "Weddings",
    title: "Romantic Savannah Celebrations",
    description:
      "Celebrate your wedding at Sabal House, where historic charm, intimate spaces, and thoughtful hospitality create a memorable setting for your day. From quiet ceremonies to elegant receptions, our spaces offer a refined backdrop in the heart of Savannah.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1740&auto=format&fit=crop",
    imageAlt: "Wedding celebration at Sabal House",
    href: "/events/weddings",
    cta: "Explore Weddings",
  },
  {
    id: 2,
    eyebrow: "Corporate Events",
    title: "Gather With Purpose",
    description:
      "Host meetings, retreats, and professional gatherings in a setting designed to feel polished, comfortable, and easy. Sabal House offers a warm alternative to traditional meeting spaces with boutique hospitality and a central Savannah location.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop",
    imageAlt: "Corporate event and meeting setup",
    href: "/events/corporate-events",
    cta: "Explore Corporate Events",
  },
  {
    id: 3,
    eyebrow: "Social Events",
    title: "Milestones, Dinners & Private Gatherings",
    description:
      "From birthday weekends and anniversary dinners to private receptions and celebratory gatherings, Sabal House offers inviting spaces for meaningful moments shared with friends, family, and guests.",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1740&auto=format&fit=crop",
    imageAlt: "Social event dinner table",
    href: "/events/social-events",
    cta: "Explore Social Events",
  },
];

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1740&auto=format&fit=crop",
    alt: "Elegant wedding table setting",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1740&auto=format&fit=crop",
    alt: "Private event table setting",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1740&auto=format&fit=crop",
    alt: "Guests gathering at an event",
  },
];

export default function WeddingsEventsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animate",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.16,
        },
      );

      gsap.fromTo(
        ".hero-image",
        {
          autoAlpha: 0,
          scale: 1.06,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      );

      gsap.utils.toArray(".section-animate-group").forEach((section) => {
        const items = section.querySelectorAll(".section-animate-item");

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

      gsap.utils.toArray(".event-type-section").forEach((section) => {
        const textItems = section.querySelectorAll(".event-text-item");
        const image = section.querySelector(".event-image");

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
      });

      gsap.fromTo(
        ".gallery-image",
        {
          autoAlpha: 0,
          y: 45,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".events-gallery",
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
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1740&auto=format&fit=crop"
          alt="Wedding and event table setting at Sabal House"
          fill
          priority
          className="hero-image object-cover opacity-0"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-main/45" />

        <div className="relative z-10 flex min-h-[82vh] items-end px-5 pb-14 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="hero-animate mb-5 text-sm uppercase tracking-[0.4em] text-secondary opacity-0">
              Sabal House Savannah
            </p>

            <h1 className="hero-animate max-w-5xl font-serif text-5xl leading-tight text-secondary opacity-0 md:text-7xl lg:text-8xl">
              Weddings & Events
            </h1>

            <p className="hero-animate mt-7 max-w-2xl text-lg leading-8 text-secondary/90 opacity-0 md:text-xl">
              Thoughtful celebrations, intimate gatherings, and elevated events
              in the heart of Savannah, Georgia.
            </p>
          </div>
        </div>
      </section>

      <section className="section-animate-group px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="section-animate-item mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Gather at Sabal House
            </p>

            <h2 className="section-animate-item font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              Historic Spaces for Meaningful Moments
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-main/75 md:text-xl md:leading-10">
            <p className="section-animate-item opacity-0">
              Set within the charm of Savannah, Sabal House offers an intimate
              and refined setting for weddings, corporate events, and social
              celebrations. Our spaces are designed for gatherings that feel
              personal, warm, and memorable.
            </p>

            <p className="section-animate-item opacity-0">
              Whether you are planning a romantic wedding weekend, a focused
              business retreat, or a private dinner with the people who matter
              most, our team helps shape the experience with care and attention
              to detail.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-16 md:space-y-20">
          {eventTypes.map((eventType, index) => {
            const imageLeft = index % 2 === 1;

            return (
              <section
                key={eventType.id}
                className="event-type-section grid overflow-hidden border border-main/10 bg-white lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[360px] overflow-hidden md:min-h-[520px] ${
                    imageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={eventType.image}
                    alt={eventType.imageAlt}
                    fill
                    className="event-image object-cover opacity-0"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div
                  className={`flex items-center px-7 py-12 md:px-12 md:py-16 lg:px-16 ${
                    imageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="max-w-xl">
                    <p className="event-text-item mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                      {eventType.eyebrow}
                    </p>

                    <h2 className="event-text-item font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                      {eventType.title}
                    </h2>

                    <p className="event-text-item mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                      {eventType.description}
                    </p>

                    <Link
                      href={eventType.href}
                      className="event-text-item mt-9 inline-flex min-h-[58px] items-center justify-center border border-contrast px-8 text-xs uppercase tracking-[0.25em] text-contrast opacity-0 transition-colors duration-300 hover:bg-contrast hover:text-secondary"
                    >
                      {eventType.cta}
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="events-gallery px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-contrast">
              Spaces & Details
            </p>

            <h2 className="font-serif text-5xl leading-tight text-main md:text-7xl">
              Designed for the Occasion
            </h2>

            <p className="mt-6 text-base leading-8 text-main/75 md:text-lg">
              From candlelit dinners to celebratory weekends, every event at
              Sabal House is shaped by historic surroundings, warm hospitality,
              and a sense of place.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-image relative min-h-[320px] overflow-hidden opacity-0 md:min-h-[440px]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-animate-group bg-main px-5 py-16 text-secondary md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="section-animate-item mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Begin Planning
            </p>

            <h2 className="section-animate-item font-serif text-5xl leading-tight opacity-0 md:text-7xl">
              Tell Us About Your Event
            </h2>

            <p className="section-animate-item mt-7 max-w-2xl text-base leading-8 text-secondary/80 opacity-0 md:text-lg">
              Share a few details with our team and we’ll help guide you toward
              the right space, experience, and next steps.
            </p>
          </div>

          <div className="section-animate-item opacity-0 lg:text-right">
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
