"use client";

import Image from "next/image";

import whiteLogo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

const LEAF_INTRO_ID = "leaf-intro";
const LEAF_INTRO_HEADING_ID = `${LEAF_INTRO_ID}-heading`;

export default function Footer() {
  function handleBackToIntro() {
    const introSection = document.getElementById(LEAF_INTRO_ID);
    const introHeading = document.getElementById(LEAF_INTRO_HEADING_ID);

    if (!introSection) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    introSection.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    introHeading?.focus({
      preventScroll: true,
    });
  }

  return (
    <footer className="bg-main px-5 py-4 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <address className="text-center text-xs leading-5 font-normal tracking-[0.08em] uppercase not-italic md:text-left">
          225 E President&apos;s Street
          <span className="hidden lg:inline">, </span>
          <span className="block lg:inline">Savannah, GA 31401</span>
        </address>

        <Image
          src={whiteLogo}
          alt="Sabal House"
          className="mx-auto h-auto w-32"
          sizes="8rem"
        />

        <button
          type="button"
          onClick={handleBackToIntro}
          className="mx-auto inline-flex min-h-11 cursor-pointer items-center gap-2 border-b border-white px-2 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-200 hover:border-white/65 hover:text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-main)] motion-reduce:transition-none md:mx-0 md:justify-self-end"
        >
          Contact Us
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 stroke-current"
            strokeWidth="2"
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
