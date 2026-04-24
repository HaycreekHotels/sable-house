"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultOffers = [
  {
    id: 1,
    title: "Spring Escape",
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=1600&auto=format&fit=crop",
    description: [
      "Enjoy a refreshing seasonal getaway at Sable House with 15% off your stay.",
      "Perfect for a quiet retreat filled with sunny afternoons, local charm, and relaxed evenings.",
    ],
    finePrint:
      "Applicable to new reservations only. Cannot be combined with other offers. Subject to availability at the time of booking.",
    promoCode: "SPRING15",
    bookUrl: "https://example.com/book",
  },
  {
    id: 2,
    title: "Romance Package",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
    description: [
      "Celebrate a special occasion with a romantic stay designed for two.",
      "Includes sparkling wine upon arrival and a late checkout for a more leisurely experience.",
    ],
    finePrint:
      "Applicable to new reservations only. Package inclusions may vary based on availability.",
    promoCode: "ROMANCE",
    bookUrl: "https://example.com/book",
  },
  {
    id: 3,
    title: "Stay Longer & Save",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    description: [
      "Extend your visit and receive a discounted rate when you stay three nights or more.",
      "Ideal for guests who want extra time to explore the neighborhood and enjoy a slower pace.",
    ],
    finePrint:
      "Minimum three-night stay required. Cannot be combined with other offers or group rates.",
    promoCode: "LONGER",
    bookUrl: "https://example.com/book",
  },
  {
    id: 4,
    title: "Weekend Retreat",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    description: [
      "Slip away for a relaxing weekend at Sable House with exclusive weekend savings.",
      "Perfect for a short, elegant escape with boutique comfort and a peaceful setting.",
    ],
    finePrint:
      "Valid for select weekend dates only. Subject to blackout dates and availability.",
    promoCode: "WEEKEND",
    bookUrl: "https://example.com/book",
  },
  {
    id: 5,
    title: "Advance Purchase",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
    description: [
      "Plan ahead and save when you book your stay in advance.",
      "A great option for guests with fixed travel plans who want the best available value.",
    ],
    finePrint:
      "Full prepayment may be required. Non-refundable. Subject to availability at booking.",
    promoCode: "ADVANCE",
    bookUrl: "https://example.com/book",
  },
];

export default function OffersPackagesSection({
  eyebrow = "Sable House",
  heading = "Offers & Packages",
  intro = "Discover curated offers designed to make your stay even more memorable.",
  offers = defaultOffers,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".offers-header-item",
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".offers-header",
            start: "top 80%",
            once: true,
          },
        },
      );

      const cards = gsap.utils.toArray(".offer-card");

      cards.forEach((card) => {
        const image = card.querySelector(".offer-card-image");
        const content = card.querySelector(".offer-card-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            once: true,
          },
        });

        tl.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 45,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
        )
          .fromTo(
            image,
            {
              autoAlpha: 0,
              scale: 1.04,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
            },
            "-=0.45",
          )
          .fromTo(
            content,
            {
              autoAlpha: 0,
              y: 24,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.3",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [offers]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-secondary px-5 py-16 text-main md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="offers-header mb-12 max-w-3xl">
          <p className="offers-header-item mb-4 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
            {eyebrow}
          </p>

          <h2 className="offers-header-item font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
            {heading}
          </h2>

          <p className="offers-header-item mt-6 text-base leading-8 text-main/75 opacity-0 md:text-lg">
            {intro}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="offer-card overflow-hidden border border-main/10 bg-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <div className="offer-card-image relative h-[260px] overflow-hidden opacity-0 md:h-[360px]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="offer-card-content px-7 py-8 opacity-0 md:px-10 md:py-10">
                <h3 className="font-serif text-4xl leading-tight text-main md:text-5xl">
                  {offer.title}
                </h3>

                <div className="mt-6 space-y-5 text-base leading-8 text-main/80">
                  {offer.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <p className="mt-8 text-sm leading-7 text-main/65">
                  {offer.finePrint}
                </p>

                <p className="mt-8 text-base text-main/80">
                  <span className="font-medium text-main">
                    Promotional Code:
                  </span>{" "}
                  {offer.promoCode}
                </p>

                <a
                  href={offer.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-w-[180px] items-center justify-center gap-8 border border-contrast px-8 py-4 text-xs uppercase tracking-[0.22em] text-contrast transition-colors duration-300 hover:bg-contrast hover:text-secondary"
                >
                  Book Now
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
