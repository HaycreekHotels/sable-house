"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import bgleafs from "../../../../public/images/decorative/SH_Leaf_Brown.png";

const BOOKING_URL =
  "https://bookings.sabalhouse.com/book/dates-of-stay?pl=l54q58756h55o58o51a50f51o50950855358v50100&RatePlanId=11780260";

export default function BlackFridayPopup({ bedroomSrc, leafSrc, onDismiss }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closingRef = useRef(false);
  const exitTweenRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement;
    const originalBodyOverflow = document.body.style.overflow;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    closingRef.current = false;

    dialog.addEventListener("close", onDismiss);
    dialog.showModal();

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus({
      preventScroll: true,
    });

    let context;

    if (!reduceMotion) {
      context = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
        });

        timeline
          .fromTo(
            panelRef.current,
            {
              opacity: 0,
              y: 22,
              scale: 0.99,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              clearProps: "all",
            },
          )
          .fromTo(
            "[data-offer-reveal]",
            {
              opacity: 0,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.075,
              clearProps: "all",
            },
            "-=0.22",
          );
      }, dialog);
    }

    return () => {
      exitTweenRef.current?.kill();
      context?.revert();

      dialog.removeEventListener("close", onDismiss);

      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = originalBodyOverflow;

      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus({
          preventScroll: true,
        });
      }
    };
  }, [onDismiss]);

  function requestClose() {
    const dialog = dialogRef.current;

    if (!dialog?.open || closingRef.current) {
      return;
    }

    closingRef.current = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !panelRef.current) {
      dialog.close();
      return;
    }

    exitTweenRef.current = gsap.to(panelRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => {
        if (dialog.open) {
          dialog.close();
        }
      },
    });
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="black-friday-title"
      aria-describedby="black-friday-description"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
      className="
        fixed inset-0 m-auto
        w-[calc(100%-1.5rem)]
        max-w-[1120px]
        max-h-[calc(100dvh-1.5rem)]
        overflow-y-auto
        border-0 bg-transparent p-0
        text-foreground shadow-2xl
        backdrop:bg-black/65
        backdrop:backdrop-blur-[2px]
        sm:w-[calc(100%-3rem)]
      "
    >
      <div
        ref={panelRef}
        className="
          relative grid min-w-0
          grid-cols-1 overflow-hidden
          bg-secondary
          md:min-h-[570px]
          md:grid-cols-[44%_56%]
        "
      >
        {/* Bedroom image */}
        <div
          className="
            relative h-[210px] min-w-0
            overflow-hidden
            sm:h-[280px]
            md:h-auto md:min-h-[570px]
          "
        >
          <Image
            src={bedroomSrc}
            alt="Sabal House guestroom with white bedding, an upholstered headboard, and exposed brick"
            fill
            sizes="(min-width: 1200px) 493px, (min-width: 768px) 44vw, 100vw"
            quality={80}
            className="object-cover object-center"
          />
        </div>

        {/* Copy panel */}
        <div
          className="
            relative isolate flex min-w-0
            flex-col justify-center
            overflow-hidden
            px-6 pb-10 pt-12
            sm:px-10 sm:py-14
            md:px-12 md:py-16
            lg:px-[72px]
          "
        >
          {/* Decorative leaf background */}
          <div
            aria-hidden="true"
            className="
    pointer-events-none absolute
    -bottom-[40%] -right-[20%]
    -rotate-45
    z-0
    h-[85%] w-[95%]
    bg-contain bg-right-bottom
    bg-no-repeat
    opacity-[0.18]
  "
            style={{
              backgroundImage: `url("/images/decorative/SH_Leaf_Brown.png")`,
            }}
          />

          <p
            data-offer-reveal
            className="
              
              font-central-regular
              mb-5 text-[12px] font-semibold
              uppercase tracking-[0.075em]
              text-foreground sm:text-sm
            "
          >
            A Black Friday Invitation
          </p>

          <h2
            id="black-friday-title"
            data-offer-reveal
            className="
              font-benton-regular
              max-w-[540px]
              text-[clamp(2.7rem,4vw,4.15rem)]
              leading-[0.98]
              tracking-[-0.035em]
              uppercase text-foreground
            "
          >
            A Little Something From Us
          </h2>

          <p
            id="black-friday-description"
            data-offer-reveal
            className="
              font-central-regular
              mt-7 max-w-[495px]
              text-base leading-[1.65]
              text-foreground
              sm:mt-9 sm:text-lg
              lg:text-[21px]
            "
          >
            Enjoy 40% off your stay and a bottle of Prosecco. Consider it our
            way of saying we’re glad you’re coming.
          </p>

          <div data-offer-reveal className="mt-8 sm:mt-10">
            <a
              href={BOOKING_URL}
              className="
               font-central-regular
                inline-flex min-h-14 min-w-[220px]
                items-center justify-center
                bg-main px-9 py-4
                text-center text-base uppercase
                tracking-[0.055em] text-white
                transition-[filter] duration-200
                hover:brightness-90
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-main
                motion-reduce:transition-none
                sm:min-w-[255px] sm:text-lg
              "
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Accessible close button */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close Black Friday offer"
          onClick={requestClose}
          className="
            absolute right-3 top-3 z-20
            flex h-11 w-11 items-center
            justify-center rounded-full
            bg-secondary/95 text-foreground
            shadow-sm transition-colors
            hover:bg-white
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-main
            motion-reduce:transition-none
            sm:right-5 sm:top-5
          "
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M5 5 19 19M19 5 5 19" />
          </svg>
        </button>
      </div>
    </dialog>
  );
}
