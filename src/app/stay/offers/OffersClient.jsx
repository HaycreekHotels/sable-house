"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { buildBookingUrl } from "@/app/components/layout/Header/bookingUrl";
import OfferDetailModal from "@/app/components/layout/cards/OfferDetailModal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const tabs = [
  { id: "offers", label: "Offers" },
  { id: "packages", label: "Packages" },
];

function OfferImage({ offer, featured = false }) {
  return (
    <div
      className={`relative min-w-0 overflow-hidden bg-[#dedad1] ${featured ? "min-h-[290px] sm:min-h-[370px] lg:min-h-[455px]" : "aspect-[6/5] sm:aspect-[5/4]"}`}
    >
      {offer.image ? (
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          priority={featured}
          sizes={
            featured
              ? "(min-width: 1024px) 52vw, 100vw"
              : "(min-width: 1024px) 45vw, 100vw"
          }
          className="object-cover object-center"
        />
      ) : (
        <span className="sr-only">Image pending for {offer.title}</span>
      )}
    </div>
  );
}

function ActionLink({ offer, onShowDetails, bookingUrl, light = false }) {
  const common = `inline-flex min-h-11 items-center border-b pb-0.5 font-central-regular text-[14px] uppercase tracking-[0.025em] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 ${light ? "border-secondary text-secondary focus-visible:outline-secondary" : "border-foreground text-foreground focus-visible:outline-main"}`;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
      >
        Book now
        <span className="sr-only"> for {offer.title} (opens in a new tab)</span>
      </a>
      <button
        type="button"
        onClick={() => onShowDetails(offer)}
        className={common}
        aria-haspopup="dialog"
        aria-label={`More details about ${offer.title}`}
      >
        More details
      </button>
    </div>
  );
}

export default function OffersClient({ offers, intro }) {
  const mainRef = useRef(null);
  const [activeTab, setActiveTab] = useState("offers");
  const [openOffer, setOpenOffer] = useState(null);
  const closeModal = useCallback(() => setOpenOffer(null), []);

  const featured = offers.find((offer) => offer.featured);
  const filtered = offers.filter(
    (offer) => !offer.featured && offer.tabs.includes(activeTab),
  );
  const bookingUrl = (offer) => offer.bookingUrl || buildBookingUrl({});

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray("[data-offers-reveal]", mainRef.current)
          .forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 22 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.95,
                ease: "power2.out",
                clearProps: "opacity,visibility,transform",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              },
            );
          });
      });
      return () => mm.revert();
    },
    { scope: mainRef },
  );

  return (
    <main
      id="main-content"
      ref={mainRef}
      className="min-w-0 flex-1 overflow-x-clip bg-secondary pb-28 text-foreground lg:pb-44"
    >
      {/* The page's editorial introduction replaces the previous empty spacer. */}
      <section
        aria-labelledby="offers-intro-title"
        data-offers-reveal
        className="mx-auto flex w-full max-w-[820px] flex-col items-center px-5 pb-16 pt-32 text-center sm:px-8 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44 lg:mt-5"
      >
        <p className="font-central-regular text-[11px] uppercase tracking-[0.08em] text-main sm:text-xs">
          {intro.eyebrow}
        </p>
        <h1
          id="offers-intro-title"
          className="mt-5 font-benton-regular text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.04] tracking-[-0.025em]"
        >
          {intro.title}
        </h1>
        <p className="mt-6 max-w-[48ch] font-central-regular text-[15px] leading-[1.65] sm:mt-7 sm:text-[17px]">
          {intro.description}
        </p>
      </section>

      {featured && (
        <section
          aria-label="Featured hotel offer"
          data-offers-reveal
          className="mx-auto w-full max-w-[1310px] px-5 sm:px-8 lg:px-12 lg:mt-12"
        >
          <div
            id={featured.id}
            className="grid min-w-0 overflow-hidden lg:grid-cols-[59%_41%]"
          >
            <OfferImage offer={featured} featured />
            <div className="relative isolate flex min-h-[340px] flex-col items-center justify-between overflow-hidden bg-main px-6 py-10 text-center text-secondary sm:min-h-[400px] sm:px-10 lg:min-h-[455px] lg:py-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[url('/images/decorative/Dark-Green-Background-Grain.png')] bg-cover opacity-15"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rotate-[-18deg] bg-[url('/images/decorative/SH_Leaf_Green.png')] bg-contain bg-center bg-no-repeat opacity-15"
              />
              <p className="relative font-central-regular text-[11px] uppercase tracking-wider">
                {featured.eyebrow}
              </p>
              <h2 className="relative max-w-[13ch] font-benton-regular text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.1] tracking-[-0.025em]">
                {featured.title}
              </h2>
              <div className="relative">
                <ActionLink
                  offer={featured}
                  bookingUrl={bookingUrl(featured)}
                  onShowDetails={setOpenOffer}
                  light
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        aria-labelledby="offers-list-title"
        className="mx-auto mt-14 w-full max-w-[1150px] px-5 sm:mt-20 sm:px-8 lg:mt-24 lg:px-12"
      >
        <h2 id="offers-list-title" className="sr-only">
          Browse hotel offers and packages
        </h2>
        <div
          aria-label="Filter by offer type"
          className="flex items-center justify-center gap-10 sm:gap-16"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-11 border-b px-2 pb-1 pt-2 font-central-regular text-[14px] uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-main ${activeTab === tab.id ? "border-foreground text-foreground" : "border-transparent text-foreground/75 hover:border-main"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          Showing {filtered.length} {activeTab}
        </div>
        <div
          key={activeTab}
          className="mt-12 space-y-12 sm:mt-16 sm:space-y-20 lg:mt-20"
        >
          {filtered.length > 0 ? (
            filtered.map((offer) => (
              <article
                id={offer.id}
                key={offer.id}
                className="grid min-w-0 items-stretch gap-7 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12"
              >
                <OfferImage offer={offer} />
                <div className="flex min-w-0 flex-col items-center justify-center border-y border-main/35 px-3 py-8 text-center sm:px-9 lg:py-12">
                  <p className="font-central-regular text-[11px] uppercase tracking-[0.035em]">
                    {offer.eyebrow}
                  </p>
                  <h3 className="mt-5 font-benton-regular text-[clamp(2rem,3.2vw,3.35rem)] leading-[1.08] tracking-[-0.025em]">
                    {offer.title}
                  </h3>
                  <p className="mt-5 max-w-[47ch] font-central-regular text-[14px] leading-[1.65] sm:text-[15px]">
                    {offer.description}
                  </p>
                  <div className="mt-7">
                    <ActionLink
                      offer={offer}
                      bookingUrl={bookingUrl(offer)}
                      onShowDetails={setOpenOffer}
                    />
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="py-16 text-center font-central-regular text-base">
              No {activeTab} are currently available. Please check back soon.
            </p>
          )}
        </div>
      </section>

      <OfferDetailModal
        offer={openOffer}
        bookingUrl={openOffer ? bookingUrl(openOffer) : null}
        onClose={closeModal}
      />
    </main>
  );
}
