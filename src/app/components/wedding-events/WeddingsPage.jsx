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
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1740&auto=format&fit=crop",
    alt: "Elegant wedding table setting at Sable House",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1740&auto=format&fit=crop",
    alt: "Wedding couple celebration",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1740&auto=format&fit=crop",
    alt: "Wedding reception dinner setup",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1740&auto=format&fit=crop",
    alt: "Romantic wedding ceremony",
  },
];

export default function WeddingsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wedding-hero-image",
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
        ".wedding-hero-item",
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

      gsap.utils.toArray(".wedding-section").forEach((section) => {
        const items = section.querySelectorAll(".wedding-animate");

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

      gsap.utils.toArray(".wedding-feature-section").forEach((section) => {
        const image = section.querySelector(".wedding-feature-image");
        const textItems = section.querySelectorAll(".wedding-feature-text");

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
        ".wedding-gallery-item",
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
            trigger: ".wedding-gallery",
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
          alt="Wedding table setting at Sable House"
          fill
          priority
          className="wedding-hero-image object-cover opacity-0"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-main/45" />

        <div className="relative z-10 flex min-h-[82vh] items-end px-5 pb-14 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="wedding-hero-item mb-5 text-sm uppercase tracking-[0.4em] text-secondary opacity-0">
              Sable House Weddings
            </p>

            <h1 className="wedding-hero-item max-w-5xl font-serif text-5xl leading-tight text-secondary opacity-0 md:text-7xl lg:text-8xl">
              Intimate Weddings in Savannah
            </h1>

            <p className="wedding-hero-item mt-7 max-w-2xl text-lg leading-8 text-secondary/90 opacity-0 md:text-xl">
              Celebrate your day in a setting shaped by historic charm, warm
              hospitality, and thoughtful details.
            </p>
          </div>
        </div>
      </section>

      <section className="wedding-section px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="wedding-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Your Celebration
            </p>

            <h2 className="wedding-animate font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              A Romantic Setting for the Moments That Matter
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-9 text-main/75 md:text-xl md:leading-10">
            <p className="wedding-animate opacity-0">
              Sable House offers an intimate wedding experience in the heart of
              Savannah, Georgia. With historic character, refined interiors, and
              inviting gathering spaces, our hotel creates a warm backdrop for
              ceremonies, receptions, welcome parties, and wedding weekends.
            </p>

            <p className="wedding-animate opacity-0">
              Whether you are planning a small ceremony, a private dinner, or a
              full weekend celebration, our team helps you shape the experience
              with care, flexibility, and attention to detail.
            </p>
          </div>
        </div>
      </section>

      <section className="wedding-feature-section px-5 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-main/10 bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1740&auto=format&fit=crop"
              alt="Wedding ceremony at Sable House"
              fill
              className="wedding-feature-image object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center px-7 py-12 md:px-12 md:py-16 lg:px-16">
            <div className="max-w-xl">
              <p className="wedding-feature-text mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                Ceremony
              </p>

              <h2 className="wedding-feature-text font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                A Beautiful Place to Begin
              </h2>

              <p className="wedding-feature-text mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                Exchange vows in a setting that feels personal, elegant, and
                grounded in Savannah charm. Our spaces are ideal for intimate
                ceremonies with close family and friends.
              </p>

              <ul className="wedding-feature-text mt-8 space-y-3 pl-5 text-base leading-7 text-main/75 opacity-0 md:text-lg">
                <li className="list-disc">
                  Indoor and outdoor-inspired settings
                </li>
                <li className="list-disc">Ideal for intimate guest counts</li>
                <li className="list-disc">
                  Historic atmosphere with boutique service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wedding-feature-section px-5 pb-16 md:px-10 md:pb-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-main/10 bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[520px] lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1740&auto=format&fit=crop"
              alt="Wedding reception at Sable House"
              fill
              className="wedding-feature-image object-cover opacity-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex items-center px-7 py-12 md:px-12 md:py-16 lg:order-1 lg:px-16">
            <div className="max-w-xl">
              <p className="wedding-feature-text mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
                Reception
              </p>

              <h2 className="wedding-feature-text font-serif text-4xl leading-tight text-main opacity-0 md:text-6xl">
                Dinner, Toasts & Celebration
              </h2>

              <p className="wedding-feature-text mt-7 text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
                Continue the celebration with a private dinner, cocktail hour,
                or reception designed around the mood of your day. From relaxed
                gatherings to polished evenings, Sable House offers a welcoming
                setting for every part of the celebration.
              </p>

              <ul className="wedding-feature-text mt-8 space-y-3 pl-5 text-base leading-7 text-main/75 opacity-0 md:text-lg">
                <li className="list-disc">
                  Private dining and reception options
                </li>
                <li className="list-disc">
                  Custom food and beverage direction
                </li>
                <li className="list-disc">
                  Warm boutique hospitality for your guests
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wedding-section bg-white px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="wedding-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Wedding Weekends
            </p>

            <h2 className="wedding-animate font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
              Stay, Gather, and Celebrate Together
            </h2>

            <p className="wedding-animate mt-7 max-w-3xl text-base leading-8 text-main/75 opacity-0 md:text-lg md:leading-9">
              With guest rooms, dining spaces, and inviting common areas, Sable
              House is well suited for wedding weekends where your closest
              people can stay near the celebration and enjoy Savannah together.
            </p>
          </div>

          <div className="wedding-animate border border-main/15 bg-secondary p-7 opacity-0 md:p-9">
            <h3 className="font-serif text-3xl text-main md:text-4xl">
              Wedding Possibilities
            </h3>

            <ul className="mt-7 space-y-4 text-base leading-7 text-main/75 md:text-lg">
              <li>Welcome receptions</li>
              <li>Intimate ceremonies</li>
              <li>Private dinners</li>
              <li>Farewell brunches</li>
              <li>Room blocks and wedding weekend stays</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wedding-gallery px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-contrast">
              Gallery
            </p>

            <h2 className="font-serif text-5xl leading-tight text-main md:text-7xl">
              Wedding Moments
            </h2>

            <p className="mt-6 text-base leading-8 text-main/75 md:text-lg">
              A small look at the atmosphere, details, and romantic textures
              that inspire celebrations at Sable House.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`wedding-gallery-item relative min-h-[280px] overflow-hidden opacity-0 ${
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

      <section className="wedding-section bg-main px-5 py-16 text-secondary md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="wedding-animate mb-5 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              Begin Planning
            </p>

            <h2 className="wedding-animate font-serif text-5xl leading-tight opacity-0 md:text-7xl">
              Start Your Wedding Conversation
            </h2>

            <p className="wedding-animate mt-7 max-w-2xl text-base leading-8 text-secondary/80 opacity-0 md:text-lg">
              Tell us about your vision, guest count, preferred dates, and the
              kind of celebration you are imagining. Our team will help guide
              the next steps.
            </p>
          </div>

          <div className="wedding-animate opacity-0 lg:text-right">
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
