"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import leafDecorative from "../../../../../public/images/decorative/SH_Leaf_Brown.png";

gsap.registerPlugin(useGSAP);

const ALLOWED_HEADING_LEVELS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

const SECTION_CLASSES =
  "relative isolate min-h-[36rem] overflow-hidden px-5 py-16 sm:min-h-[40rem] sm:px-8 sm:py-20 md:min-h-235 md:px-10 md:py-16";

const CONTENT_CLASSES =
  "relative z-10 mx-auto flex min-h-[24rem] max-w-3xl flex-col items-center justify-center text-center sm:min-h-[28rem] md:min-h-188";

const HEADING_CLASSES =
  "max-w-xl md:max-w-3xl text-balance font-benton-regular text-4xl leading-[1.05] tracking-tight text-stone-900 sm:text-5xl lg:text-[56px]";

const INTRO_CLASSES =
  "mt-6 max-w-sm text-pretty font-central-regular leading-7 text-stone-800 sm:mt-8 sm:text-xl md:text-[16px] sm:leading-[1.50]";

const CTA_CLASSES =
  "mt-10 inline-flex min-h-11 cursor-pointer items-center border-b border-stone-900 bg-transparent px-2 pb-2 text-sm font-medium uppercase tracking-[0.08em] text-stone-900 transition-colors duration-200 hover:border-stone-600 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f3ec] motion-reduce:transition-none sm:mt-12";

const LEAF_CONFIG = {
  left: {
    wrapper:
      "pointer-events-none absolute -left-28 top-6 z-0 size-72 sm:-left-24 sm:size-[22rem] md:-left-56 md:top-3/6 md:size-[50rem] md:-translate-y-1/2 lg:-left-110 lg:size-[58rem]",
    image:
      " object-contain opacity-[0.045] sm:opacity-[0.05] md:opacity-[0.06]",
    sizes:
      "(max-width: 639px) 18rem, (max-width: 767px) 22rem, (max-width: 1023px) 50rem, 58rem",
  },

  right: {
    wrapper:
      "pointer-events-none absolute -right-32 bottom-0 z-0 size-80 sm:-right-28 sm:size-[24rem] md:-right-56 md:top-3/6 md:bottom-auto md:size-[50rem] md:-translate-y-1/2 lg:-right-110 lg:size-[58rem]",
    image:
      "-scale-x-100 object-contain opacity-[0.045] sm:opacity-[0.05]  md:opacity-[0.06]",
    sizes:
      "(max-width: 639px) 20rem, (max-width: 767px) 24rem, (max-width: 1023px) 50rem, 58rem",
  },
};

function LeafDecoration({ side }) {
  const config = LEAF_CONFIG[side];

  return (
    <div aria-hidden="true" className={config.wrapper}>
      <Image
        src={leafDecorative}
        alt=""
        fill
        className={config.image}
        sizes={config.sizes}
      />
    </div>
  );
}

export default function LeafIntro({
  title = "A Quiet Place To Come Alive",
  intro = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex.",
  ctaLabel = "Stay Informed",
  closeLabel = "Close Form",
  headingLevel = "h2",
  sectionId,
}) {
  const Heading = ALLOWED_HEADING_LEVELS.has(headingLevel)
    ? headingLevel
    : "h2";

  const headingId = sectionId ? `${sectionId}-heading` : undefined;

  const [isFormOpen, setIsFormOpen] = useState(false);

  const generatedId = useId();

  const sectionRef = useRef(null);
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);
  const drawerTimeline = useRef(null);

  const drawerId = `${generatedId}-signup-drawer`;
  const firstNameId = `${generatedId}-first-name`;
  const lastNameId = `${generatedId}-last-name`;
  const emailId = `${generatedId}-email`;

  useGSAP(
    () => {
      const drawer = drawerRef.current;

      if (!drawer) {
        return;
      }

      const fields = gsap.utils.toArray("[data-signup-field]", drawer);

      const drawerLine = drawer.querySelector("[data-drawer-line]");

      const submitButton = drawer.querySelector("[data-signup-submit]");

      if (!drawerLine || !submitButton) {
        return;
      }

      gsap.set(drawer, {
        height: 0,
        autoAlpha: 0,
      });

      gsap.set(drawerLine, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(fields, {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
      });

      gsap.set(submitButton, {
        autoAlpha: 0,
        y: 12,
      });

      const media = gsap.matchMedia();

      media.add(
        {
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reducedMotion } = context.conditions;

          drawerTimeline.current = gsap
            .timeline({
              paused: true,
              defaults: {
                ease: "power3.out",
              },
            })
            .to(drawer, {
              height: "auto",
              autoAlpha: 1,
              duration: reducedMotion ? 0 : 0.65,
            })
            .to(
              drawerLine,
              {
                scaleX: 1,
                duration: reducedMotion ? 0 : 0.45,
                ease: "power2.out",
              },
              reducedMotion ? ">" : "-=0.35",
            )
            .to(
              fields,
              {
                autoAlpha: 1,
                clipPath: "inset(0 0% 0 0)",
                duration: reducedMotion ? 0 : 0.55,
                stagger: reducedMotion ? 0 : 0.12,
              },
              reducedMotion ? ">" : "-=0.18",
            )
            .to(
              submitButton,
              {
                autoAlpha: 1,
                y: 0,
                duration: reducedMotion ? 0 : 0.35,
              },
              reducedMotion ? ">" : "-=0.15",
            );
        },
      );

      return () => media.revert();
    },
    {
      scope: sectionRef,
    },
  );
  function handleFormToggle() {
    const nextOpenState = !isFormOpen;

    if (!nextOpenState && drawerRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus();
    }

    setIsFormOpen(nextOpenState);

    if (nextOpenState) {
      drawerTimeline.current?.play();
    } else {
      drawerTimeline.current?.reverse();
    }
  }
  return (
    <section
      ref={sectionRef}
      id={sectionId}
      aria-labelledby={headingId}
      className={SECTION_CLASSES}
    >
      <LeafDecoration side="left" />
      <LeafDecoration side="right" />

      <div className={CONTENT_CLASSES}>
        <Heading id={headingId} className={HEADING_CLASSES}>
          {title}
        </Heading>

        <p className={INTRO_CLASSES}>{intro}</p>

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isFormOpen}
          aria-controls={drawerId}
          onClick={handleFormToggle}
          className={CTA_CLASSES}
        >
          {isFormOpen ? closeLabel : ctaLabel}
        </button>
      </div>
      <div
        ref={drawerRef}
        id={drawerId}
        aria-hidden={!isFormOpen}
        className="invisible relative z-10 mx-auto h-0 max-w-5xl overflow-hidden px-1"
      >
        <div className="h-px overflow-hidden">
          <div
            data-drawer-line
            className="h-full origin-left bg-stone-400/60"
          />
        </div>

        <form
          className="grid gap-x-8 gap-y-8 pt-10 md:grid-cols-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <div data-signup-field className="min-w-0">
            <label
              htmlFor={firstNameId}
              className="block text-xs font-medium uppercase tracking-[0.1em] text-stone-700"
            >
              First name
            </label>

            <input
              id={firstNameId}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              disabled={!isFormOpen}
              className="mt-3 w-full border-0 border-b border-stone-500 bg-transparent px-0 py-3 text-base text-stone-900 outline-none transition-colors focus:border-stone-950 focus:ring-0 disabled:cursor-not-allowed"
            />
          </div>

          <div data-signup-field className="min-w-0">
            <label
              htmlFor={lastNameId}
              className="block text-xs font-medium uppercase tracking-[0.1em] text-stone-700"
            >
              Last name
            </label>

            <input
              id={lastNameId}
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              disabled={!isFormOpen}
              className="mt-3 w-full border-0 border-b border-stone-500 bg-transparent px-0 py-3 text-base text-stone-900 outline-none transition-colors focus:border-stone-950 focus:ring-0 disabled:cursor-not-allowed"
            />
          </div>

          <div data-signup-field className="min-w-0">
            <label
              htmlFor={emailId}
              className="block text-xs font-medium uppercase tracking-[0.1em] text-stone-700"
            >
              Email address
            </label>

            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={!isFormOpen}
              className="mt-3 w-full border-0 border-b border-stone-500 bg-transparent px-0 py-3 text-base text-stone-900 outline-none transition-colors focus:border-stone-950 focus:ring-0 disabled:cursor-not-allowed"
            />
          </div>

          <div data-signup-submit className="flex justify-center md:col-span-3">
            <button
              type="submit"
              disabled={!isFormOpen}
              className="min-h-11 border border-stone-900 px-8 py-3 text-sm font-medium uppercase tracking-[0.08em] text-stone-900 transition-colors hover:bg-stone-900 hover:text-[#f7f3ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f3ec] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Join the List
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
