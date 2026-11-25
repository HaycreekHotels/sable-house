"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

/** A native HTML dialog supplies focus trapping and Escape handling for free. */
export default function OfferDetailModal({ offer, bookingUrl, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const detailsId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const [includesOpen, setIncludesOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !offer) return;

    const previousFocus = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const handleNativeClose = () => {
      // Esc, close button and backdrop clicks all end up here.
      onClose();
    };

    dialog.addEventListener("close", handleNativeClose);

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.removeEventListener("close", handleNativeClose);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [offer, onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-[1100px] overflow-y-auto border-0 bg-secondary p-0 text-foreground shadow-2xl backdrop:bg-black/65 backdrop:backdrop-blur-[2px] sm:w-[calc(100%-3rem)]"
    >
      {offer && (
        <div className="relative grid min-w-0 md:grid-cols-[47%_53%]">
          <button
            ref={closeButtonRef}
            onClick={() => dialogRef.current?.close()}
            type="button"
            aria-label={`Close details for ${offer.title}`}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/95 text-main transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main sm:right-5 sm:top-5"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-6 w-6"
            >
              <path d="M5 5 19 19M19 5 5 19" />
            </svg>
          </button>

          <div className="relative h-[240px] min-w-0 bg-[#dcd8cd] sm:h-[360px] md:h-auto md:min-h-[540px]">
            {offer.image ? (
              <Image
                src={offer.image}
                alt={offer.imageAlt}
                fill
                sizes="(min-width: 768px) 47vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="sr-only">Photo pending for {offer.title}</span>
            )}
          </div>

          <div className="flex min-w-0 flex-col justify-center px-6 py-12 sm:px-12 sm:py-16 md:px-14 lg:px-16">
            <p className="font-central-regular text-[11px] uppercase tracking-[0.055em]">
              {offer.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 max-w-[20ch] font-benton-regular text-[clamp(2.2rem,3.5vw,3.5rem)] leading-[1.07] tracking-[-0.025em]"
            >
              {offer.title}
            </h2>
            <p
              id={descriptionId}
              className="mt-5 max-w-[48ch] font-central-regular text-[15px] leading-[1.65]"
            >
              {offer.description}
            </p>

            {(offer.stayDates ||
              offer.lengthOfStay ||
              offer.bookBy ||
              offer.availability ||
              offer.details?.length > 0) && (
              <div className="mt-7 space-y-3 border-t border-main/30 pt-6 font-central-regular text-[14px] leading-[1.55]">
                {offer.details?.map((detail) => (
                  <p key={detail.label}>
                    <span className="font-central-regular font-semibold">
                      {detail.label}:{" "}
                    </span>
                    {detail.value}
                  </p>
                ))}
                {offer.bookBy && (
                  <p>
                    <strong>Book by:</strong> {offer.bookBy}
                  </p>
                )}
                {offer.stayDates && (
                  <p>
                    <strong>Stay dates:</strong> {offer.stayDates}
                  </p>
                )}
                {offer.lengthOfStay && (
                  <p>
                    <strong>Length of stay:</strong> {offer.lengthOfStay}
                  </p>
                )}
                {offer.availability && (
                  <p>
                    <strong>Availability:</strong> {offer.availability}
                  </p>
                )}
              </div>
            )}

            {offer.inclusions?.length > 0 && (
              <div className="mt-8 border-t border-main/35">
                <h3>
                  <button
                    type="button"
                    aria-expanded={includesOpen}
                    aria-controls={detailsId}
                    onClick={() => setIncludesOpen((open) => !open)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-central-regular text-[12px] uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                  >
                    <span>
                      {offer.category === "offer"
                        ? "Offer includes"
                        : "Package includes"}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${includesOpen ? "rotate-180" : ""}`}
                    >
                      <path d="m5 9 7 7 7-7" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={detailsId}
                  role="region"
                  aria-label={`${offer.title} inclusions`}
                  aria-hidden={!includesOpen}
                  inert={!includesOpen}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${includesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ol className="space-y-4 border-t border-main/20 pb-7 pt-5 pl-5 font-central-regular text-[14px] leading-[1.6]">
                      {offer.inclusions.map((item, index) => (
                        <li key={`${item.title}-${index}`} className="pl-1">
                          <strong className="font-central-regular">
                            {item.title}
                          </strong>
                          <p className="mt-1">{item.description}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 w-fit items-center border-b border-foreground font-central-regular text-[14px] uppercase tracking-wide transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
            >
              Book now{" "}
              <span className="sr-only">
                for {offer.title} (opens booking website in a new tab)
              </span>
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
