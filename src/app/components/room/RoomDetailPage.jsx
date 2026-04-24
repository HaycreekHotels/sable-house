"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RoomDetailPage({ room }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".room-hero-image",
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
        ".room-content-animate",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".room-detail-content",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".gallery-image",
        {
          autoAlpha: 0,
          y: 45,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".room-gallery",
            start: "top 80%",
            once: true,
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-secondary text-textColor">
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[75vh]">
        <Image
          src={room.mainImage}
          alt={`${room.title} at sabal House`}
          fill
          priority
          className="room-hero-image object-cover opacity-0"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-white">
              Sabal House
            </p>

            <h1 className="font-serif text-5xl uppercase leading-none text-white md:text-7xl lg:text-8xl">
              {room.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="room-detail-content px-5 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="room-content-animate max-w-2xl text-lg leading-8 opacity-0">
              {room.description}
            </p>

            <div className="room-content-animate mt-10 opacity-0">
              <h3 className="mb-6 font-bold">Features:</h3>

              <ul className="space-y-3 pl-7">
                {room.features.map((feature) => (
                  <li
                    key={feature}
                    className="list-square text-base md:text-lg"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="room-content-animate mt-10 flex flex-col gap-1 opacity-0 sm:flex-row">
              <Link
                href="/rooms"
                className="inline-flex min-h-[64px] items-center justify-center border border-secondary bg-main px-8 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 text-secondary hover:bg-contrast hover:text-white sm:min-w-[260px]"
              >
                Go Back To All Rooms
              </Link>

              <a
                href={room.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[64px] items-center justify-center border border-secondary bg-main px-8 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 text-secondary hover:bg-contrast hover:text-white sm:min-w-[260px]"
              >
                Book Now
              </a>
            </div>
          </div>

          <aside className="room-content-animate opacity-0 lg:pt-24">
            <h3 className="mb-8 font-bold">Always Included:</h3>

            <ul className="space-y-3 pl-7">
              {room.included.map((item) => (
                <li key={item} className="list-square text-base md:text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="room-gallery px-5 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-2">
            {room.gallery.map((image, index) => (
              <div
                key={image}
                className={`gallery-image relative min-h-[320px] overflow-hidden opacity-0 md:min-h-[440px] ${
                  index === 2 ? "lg:col-span-2 lg:min-h-[560px]" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`${room.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes={
                    index === 2 ? "100vw" : "(max-width: 1024px) 100vw, 50vw"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
