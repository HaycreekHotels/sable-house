"use client";

import Link from "next/link";
import Image from "next/image";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Logo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";
import Leaf from "../../../../../public/images/decorative/SH_Leaf_Green.png";
import CloseSvg from "../../../../../public/images/decorative/x.svg";
import Chevron from "../../../../../public/images/decorative/Chevron-Icon.svg";

gsap.registerPlugin(useGSAP);

const menuSections = [
  {
    title: "Our Story",
    links: [
      {
        label: "The Making of Sabal House",
        href: "/our-story/making-of-sabal-house",
      },
      {
        label: "Artist Journal",
        href: "/our-story/artist-journal",
      },
    ],
  },
  {
    title: "Stay",
    links: [
      {
        label: "Accommodations",
        href: "/stay/accommodations",
      },
      {
        label: "Offers",
        href: "/stay/offers",
      },
    ],
  },
];

const menuFooterSections = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thesabalhouse/?utm_source=ig_web_button_share_sheet",
  },
  {
    label: "Facebook",
    href: "#",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
  {
    label: "Accessibility",
    href: "/accessibility",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
];

function animateDrawerClose(drawer, backdrop, onComplete) {
  if (!drawer || !backdrop) {
    onComplete?.();
    return;
  }

  const timeline = gsap.timeline({
    onComplete,
  });

  timeline.to(
    drawer,
    {
      xPercent: -100,
      duration: 0.8,
      ease: "power2.inOut",
    },
    0,
  );

  timeline.to(
    backdrop,
    {
      autoAlpha: 0,
      duration: 0.55,
      ease: "power2.inOut",
    },
    0.15,
  );
}

export default function MenuDrawer({ onClose, returnFocusRef }) {
  const pathname = usePathname();

  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const closeButtonRef = useRef(null);

  const previousPathnameRef = useRef(pathname);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus({
      preventScroll: true,
    });
  }, []);

  const finishDrawerClose = useCallback(() => {
    returnFocusRef?.current?.focus({
      preventScroll: true,
    });

    onClose();
  }, [onClose, returnFocusRef]);

  const handleCloseDrawer = useCallback(() => {
    animateDrawerClose(
      drawerRef.current,
      backdropRef.current,
      finishDrawerClose,
    );
  }, [finishDrawerClose]);

  useEffect(() => {
    const previousPathname = previousPathnameRef.current;

    if (previousPathname !== pathname) {
      previousPathnameRef.current = pathname;
      handleCloseDrawer();
    }
  }, [pathname, handleCloseDrawer]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleCloseDrawer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseDrawer]);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline.fromTo(
        backdropRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        0,
      );

      timeline.fromTo(
        drawerRef.current,
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        0,
      );

      timeline.from(
        ".menu-reveal",
        {
          opacity: 0,
          y: 12,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
        },
        0.35,
      );
    },
    {
      scope: drawerRef,
    },
  );

  function toggleSection(title) {
    setOpenSection((currentSection) =>
      currentSection === title ? null : title,
    );
  }

  return (
    <>
      {/* Full-screen backdrop */}
      <div
        ref={backdropRef}
        className="
          fixed
          inset-0
          z-[100]
          bg-black
        "
      >
        {/* Right-side photograph */}
        <div
          className="
            absolute
            inset-y-0
            left-0
            right-0

            bg-[url('/images/decorative/curated-lifestyle.jpg')]
            bg-cover
            bg-left
            bg-no-repeat

            sm:left-[420px]
            lg:left-[min(42vw,420px)]
          "
        >
          {/* Slight image darkening */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              z-[1]
              bg-black/10
            "
          />

          {/* Clicking the photograph closes the menu */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            onClick={handleCloseDrawer}
            className="
              absolute
              inset-0
              z-0
              cursor-default
            "
          />

          {/* Transparent right-side header */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-20

              hidden
              h-24
              items-start
              justify-end

              px-7
              py-6

              sm:flex
              lg:px-8
              lg:py-7
            "
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Sabal House home"
              className="
                pointer-events-auto

                absolute
                left-1/5
                top-5
                -translate-x-1/2

                flex
                flex-col
                items-center

                text-white

                transition-opacity
                duration-300

                hover:opacity-70

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white

                lg:top-7
              "
            >
              <Image
                src={Logo}
                alt="Sabal House"
                width={100}
                height={50}
                priority
              />
            </Link>

            {/* Book button */}
            <Link
              href="/stay/accommodations"
              className="
                pointer-events-auto

                inline-flex
                min-h-10
                items-center
                justify-center

                bg-black
                px-4
                py-2.5

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.02em]
                text-white

                transition-colors
                duration-300

                hover:bg-neutral-800

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
              "
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>

      {/* Green menu drawer */}
      <nav
        id="site-menu"
        ref={drawerRef}
        aria-label="Site menu"
        className="
          fixed
          left-0
          top-0
          z-[110]

          h-dvh
          w-full

          overflow-hidden

          bg-main

          px-8
          py-8

          font-central-regular
          text-secondary

          sm:w-[420px]

          lg:w-[42vw]
          lg:max-w-[420px]
        "
      >
        {/* Close is intentionally outside .menu-reveal so GSAP never hides it */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close menu"
          onClick={handleCloseDrawer}
          className="
            absolute
            left-8
            top-8
            z-[999]

            flex
            min-h-11
            items-center
            gap-3

            text-secondary

            transition-opacity
            duration-300

            hover:opacity-70

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-secondary
            focus-visible:ring-offset-4
            focus-visible:ring-offset-main
          "
        >
          <Image
            src={CloseSvg}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            className="
              h-6
              w-6
              shrink-0
            "
          />

          <span className="text-xs font-bold uppercase">Close</span>
        </button>

        <div
          className="
            relative
            z-10

            flex
            h-full
            flex-col
            items-start
          "
        >
          {/* Main accordions */}
          <div
            className="
              mt-20

              flex
              w-full
              max-w-[330px]
              flex-col
              gap-7

              sm:mt-24
            "
          >
            {menuSections.map((section) => {
              const isOpen = openSection === section.title;

              const panelId = `menu-${section.title
                .toLowerCase()
                .replaceAll(" ", "-")}`;

              return (
                <section key={section.title} className="menu-reveal">
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleSection(section.title)}
                      className="
                        flex
                        min-h-11
                        w-full
                        items-center
                        justify-start
                        gap-8

                        text-left

                        font-benton-regular
                        text-[2rem]
                        leading-none

                        transition-opacity
                        duration-300

                        hover:opacity-75

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-secondary
                        focus-visible:ring-offset-4
                        focus-visible:ring-offset-main

                        lg:text-[2.15rem]
                      "
                    >
                      <span>{section.title}</span>

                      <Image
                        src={Chevron}
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className={`
                          mt-2
                          h-4
                          w-4
                          shrink-0

                          transition-transform
                          duration-300

                          ${isOpen ? "rotate-180" : "rotate-0"}
                        `}
                      />
                    </button>
                  </h2>

                  <div
                    id={panelId}
                    aria-hidden={!isOpen}
                    className={`
                      grid

                      transition-[grid-template-rows,opacity]
                      duration-300
                      ease-out

                      ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="
                          flex
                          flex-col
                          gap-2.5

                          pb-2
                          pt-3
                        "
                      >
                        {section.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            tabIndex={isOpen ? 0 : -1}
                            className="
                              w-fit

                              text-[13px]
                              font-medium

                              transition-opacity
                              duration-300

                              hover:opacity-65

                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-secondary
                              focus-visible:ring-offset-2
                              focus-visible:ring-offset-main
                            "
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Footer links */}
          <div
            className="
              menu-reveal

              mt-auto

              flex
              w-full
              max-w-[300px]
              flex-col
              gap-5

              pb-3
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px
                w-28
                bg-white/20
              "
            />

            <div className="flex flex-col gap-2.5">
              {menuFooterSections.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="
                      w-fit

                      text-xs
                      uppercase

                      transition-opacity
                      duration-300

                      hover:opacity-65

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-secondary
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-main
                    "
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative leaf */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -bottom-32
            -right-32
            z-0

            -rotate-45

            opacity-60
          "
        >
          <Image src={Leaf} alt="" width={440} height={440} />
        </div>
      </nav>
    </>
  );
}
