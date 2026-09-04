"use client";

import Image from "next/image";
import Link from "next/link";

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
    ],
  },
  {
    title: "Stay",
    links: [
      {
        label: "Accommodations",
        href: "/stay/accommodations",
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
    label: "Accessibility",
    href: "/accessibility",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
];

function animateDrawerClose(drawer, backdrop, desktopHeader, onComplete) {
  if (!drawer || !backdrop) {
    onComplete?.();
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(drawer, {
      xPercent: -100,
    });

    gsap.set(backdrop, {
      autoAlpha: 0,
    });

    if (desktopHeader) {
      gsap.set(desktopHeader, {
        autoAlpha: 0,
      });
    }

    onComplete?.();
    return;
  }

  const timeline = gsap.timeline({
    onComplete,
  });

  /*
   * Fade the floating logo / booking button first so it feels
   * attached to the photograph rather than the green drawer.
   */
  if (desktopHeader) {
    timeline.to(
      desktopHeader,
      {
        autoAlpha: 0,
        y: -6,
        duration: 0.25,
        ease: "power2.in",
      },
      0,
    );
  }

  timeline.to(
    drawer,
    {
      xPercent: -100,
      duration: 0.7,
      ease: "power2.inOut",
    },
    0,
  );

  timeline.to(
    backdrop,
    {
      autoAlpha: 0,
      duration: 0.45,
      ease: "power2.inOut",
    },
    0.12,
  );
}

function getFocusableElements(container) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(","),
    ),
  ).filter((element) => {
    if (element.closest("[inert]")) return false;
    if (element.getAttribute("aria-hidden") === "true") return false;

    return element.getClientRects().length > 0;
  });
}

export default function MenuDrawer({ onClose, returnFocusRef }) {
  const pathname = usePathname();

  const modalRef = useRef(null);
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);

  /*
   * This ref controls the floating desktop header sitting over
   * the photograph.
   */
  const desktopHeaderRef = useRef(null);

  const closeButtonRef = useRef(null);
  const isClosingRef = useRef(false);

  const previousPathnameRef = useRef(pathname);

  const [openSection, setOpenSection] = useState(null);

  /*
   * Prevent the page behind the modal navigation from scrolling.
   */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /*
   * Move keyboard focus into the dialog when it opens.
   */
  useEffect(() => {
    closeButtonRef.current?.focus({
      preventScroll: true,
    });
  }, []);

  const finishDrawerClose = useCallback(() => {
    onClose();

    window.requestAnimationFrame(() => {
      returnFocusRef?.current?.focus({
        preventScroll: true,
      });
    });
  }, [onClose, returnFocusRef]);

  const handleCloseDrawer = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;

    animateDrawerClose(
      drawerRef.current,
      backdropRef.current,
      desktopHeaderRef.current,
      finishDrawerClose,
    );
  }, [finishDrawerClose]);

  /*
   * Close once a client-side route change completes.
   */
  useEffect(() => {
    const previousPathname = previousPathnameRef.current;

    if (previousPathname !== pathname) {
      previousPathnameRef.current = pathname;
      handleCloseDrawer();
    }
  }, [pathname, handleCloseDrawer]);

  /*
   * Modal keyboard behavior:
   * - Escape closes the drawer.
   * - Tab and Shift+Tab remain inside the entire menu.
   */
  useEffect(() => {
    function handleKeyDown(event) {
      const modal = modalRef.current;

      if (!modal) return;

      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseDrawer();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(modal);

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !modal.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }

        return;
      }

      if (activeElement === lastElement || !modal.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseDrawer]);

  /*
   * Drawer entrance animation.
   */
  useGSAP(
    () => {
      const drawer = drawerRef.current;
      const backdrop = backdropRef.current;
      const desktopHeader = desktopHeaderRef.current;

      if (!drawer || !backdrop) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline();

        /*
         * Photograph / backdrop.
         */
        timeline.fromTo(
          backdrop,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          0,
        );

        /*
         * Green drawer.
         */
        timeline.fromTo(
          drawer,
          {
            xPercent: -100,
          },
          {
            xPercent: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          0,
        );

        /*
         * Logo + booking CTA.
         *
         * These arrive shortly after the photograph begins
         * appearing so they feel like part of the same reveal.
         */
        if (desktopHeader) {
          timeline.fromTo(
            desktopHeader,
            {
              autoAlpha: 0,
              y: -8,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            0.28,
          );
        }

        /*
         * Drawer navigation content.
         */
        timeline.from(
          drawer.querySelectorAll(".menu-reveal"),
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.42,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.3,
        );

        return () => {
          timeline.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(backdrop, {
          autoAlpha: 1,
        });

        gsap.set(drawer, {
          xPercent: 0,
        });

        if (desktopHeader) {
          gsap.set(desktopHeader, {
            autoAlpha: 1,
            y: 0,
          });
        }

        gsap.set(drawer.querySelectorAll(".menu-reveal"), {
          clearProps: "opacity,visibility,transform",
        });
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: modalRef,
    },
  );

  function toggleSection(title) {
    setOpenSection((currentSection) =>
      currentSection === title ? null : title,
    );
  }

  return (
    <div
      id="site-menu"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-menu-title"
      className="
        fixed
        inset-0
        z-[100]
      "
    >
      <h2 id="site-menu-title" className="sr-only">
        Site navigation
      </h2>

      {/* Full-screen visual backdrop */}
      <div
        ref={backdropRef}
        className="
          absolute
          inset-0
          bg-main
        "
      >
        {/* Right-side photograph */}
        <div
          aria-hidden="true"
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
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/10
            "
          />
        </div>
      </div>

      {/* Clicking photograph closes menu */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={handleCloseDrawer}
        className="
          absolute
          inset-y-0
          right-0
          z-[5]

          hidden

          cursor-default
          bg-transparent

          sm:block
          sm:left-[420px]

          lg:left-[min(42vw,420px)]
        "
      />

      <div
        ref={desktopHeaderRef}
        className="
          pointer-events-none

          absolute
          inset-x-0
          top-0
          z-20

          hidden
          h-[72px]

          items-center
          justify-end

          px-4

          sm:px-6
          md:px-8
          lg:flex
          lg:px-12
        "
      >
        {/* Logo — same position and size as NavBar */}
        <Link
          href="/"
          aria-label="Sabal House home"
          className="
            pointer-events-auto

            absolute
            left-1/2
            -translate-x-1/2

            transition-opacity
            duration-300

            hover:opacity-70

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
          "
        >
          <Image
            src={Logo}
            width={100}
            height={50}
            priority
            alt=""
            className="
              h-auto
              w-[82px]

              sm:w-[94px]
              md:w-[100px]
            "
          />
        </Link>

        {/* Booking CTA — same sizing as NavBar */}
        <Link
          href="/stay/accommodations"
          className="
            pointer-events-auto

            inline-flex
            min-h-11
            shrink-0
            items-center
            justify-center

            bg-black
            px-3
            py-2.5

            text-[10px]
            font-bold
            uppercase
            tracking-[0.04em]
            text-secondary

            transition-colors
            duration-300

            hover:bg-neutral-800

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white

            sm:px-4
            sm:text-xs

            md:text-sm
          "
        >
          Book Your Stay
        </Link>
      </div>

      {/* Green menu drawer */}
      <div
        ref={drawerRef}
        className="
          absolute
          left-0
          top-0
          z-10

          h-[100dvh]
          w-full

          overflow-hidden

          bg-main

          px-6
          py-6

          font-central-regular
          text-secondary

          sm:w-[420px]
          sm:px-8
          sm:py-8

          lg:w-[42vw]
          lg:max-w-[420px]
        "
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close navigation menu"
          onClick={handleCloseDrawer}
          className="
            absolute
            left-5
            top-5
            z-30

            flex
            min-h-11
            items-center
            gap-3

            px-1

            text-secondary

            transition-opacity
            duration-300

            hover:opacity-70

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-secondary
            focus-visible:ring-offset-4
            focus-visible:ring-offset-main

            sm:left-8
            sm:top-8
          "
        >
          <Image
            src={CloseSvg}
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 shrink-0"
          />

          <span className="text-xs font-bold uppercase">Close</span>
        </button>

        <nav
          aria-label="Site menu"
          className="
            relative
            z-10

            h-full
            overflow-y-auto
            overscroll-contain
          "
        >
          <div
            className="
              flex
              min-h-full
              flex-col
              items-start

              pb-[max(0.75rem,env(safe-area-inset-bottom))]
              pt-16

              sm:pt-20
            "
          >
            {/* Main accordions */}
            <div
              className="
                flex
                w-full
                max-w-[330px]
                flex-col
                gap-5

                sm:gap-7
              "
            >
              {menuSections.map((section) => {
                const isOpen = openSection === section.title;

                const panelId = `menu-${section.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}`;

                return (
                  <section key={section.title} className="menu-reveal">
                    <h3>
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
                          gap-6

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

                          lg:text-[2.5rem]
                        "
                      >
                        <span>{section.title}</span>

                        <Image
                          src={Chevron}
                          alt=""
                          width={16}
                          height={16}
                          className={`
                            mt-1
                            h-4
                            w-4
                            shrink-0

                            transition-transform
                            duration-300

                            ${isOpen ? "rotate-180" : "rotate-0"}
                          `}
                        />
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      aria-hidden={!isOpen}
                      inert={!isOpen || undefined}
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
                          {section.links.map((link) => {
                            const isCurrent = pathname === link.href;

                            return (
                              <Link
                                key={link.label}
                                href={link.href}
                                aria-current={isCurrent ? "page" : undefined}
                                className="
                                  w-fit

                                  py-1

                                  text-[18px]
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
                            );
                          })}
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

                pt-12
              "
            >
              <span aria-hidden="true" className="h-px w-28 bg-white/20" />

              <div className="flex flex-col gap-2">
                {menuFooterSections.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  const isCurrent =
                    !isExternal && link.href !== "#" && pathname === link.href;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-current={isCurrent ? "page" : undefined}
                      aria-label={
                        isExternal
                          ? `${link.label} (opens in a new tab)`
                          : undefined
                      }
                      className="
                        w-fit

                        py-1

                        text-xs
                        uppercase
                        tracking-[0.02em]

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
        </nav>

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
      </div>
    </div>
  );
}
