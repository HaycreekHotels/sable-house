"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Leaf from "../../../../../public/images/decorative/SH_Leaf_Brown.png";
import CloseSvg from "../../../../../public/images/decorative/x.svg";

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
  {
    title: "Beyond The Square",
    links: [
      {
        label: "Curated Guide",
        href: "/beyond-the-square/curated-guide",
      },
      {
        label: "Savannah Events",
        href: "/beyond-the-square/savannah-events",
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
  if (!drawer || !backdrop) return;

  const tl = gsap.timeline({
    onComplete,
  });

  tl.to(
    drawer,
    {
      xPercent: -100,
      duration: 1,
      ease: "power2.in",
    },
    0,
  );

  tl.to(
    backdrop,
    {
      opacity: 0,
      duration: 0.5,
    },
    0,
  );
}

export default function MenuDrawer({ onClose, returnFocusRef }) {
  const drawerRef = useRef(null);
  const backdropRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock scrolling while the drawer exists.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Move keyboard focus into the drawer when it opens.
  useEffect(() => {
    closeButtonRef.current?.focus({
      preventScroll: true,
    });
  }, []);

  // Shared "the drawer has finished closing" behavior.
  function finishDrawerClose() {
    returnFocusRef.current?.focus({
      preventScroll: true,
    });

    onClose();
  }

  // Escape should use the same animated close behavior.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        animateDrawerClose(
          drawerRef.current,
          backdropRef.current,
          finishDrawerClose,
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, returnFocusRef]);

  // Opening animation.
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(drawerRef.current, {
        xPercent: -100,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(
        backdropRef.current,
        {
          opacity: 0,
          ease: "power2.out",
          duration: 0.5,
        },
        "-=0.9",
      );

      tl.from(
        ".menu-reveal",
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.6",
      );
    },
    {
      scope: drawerRef,
    },
  );

  function handleCloseDrawer() {
    animateDrawerClose(
      drawerRef.current,
      backdropRef.current,
      finishDrawerClose,
    );
  }

  return (
    <>
      {/* Backdrop */}
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        className="fixed inset-0 z-40 bg-black/40"
        onClick={handleCloseDrawer}
      />

      {/* Drawer */}
      <nav
        id="site-menu"
        ref={drawerRef}
        aria-label="Site menu"
        className="fixed top-0 left-0 z-50 h-dvh w-full max-w-132.5 bg-main p-8 font-central-regular text-secondary overflow-hidden"
      >
        <div className="drawer-container flex flex-col items-start gap-14">
          {/* Close button */}
          <button
            ref={closeButtonRef}
            aria-label="Close menu"
            className="menu-reveal flex items-center gap-2 font-light"
            type="button"
            onClick={handleCloseDrawer}
          >
            <span>
              <Image src={CloseSvg} alt="" width={30} height={30} />
            </span>

            <span className="uppercase font-bold text-sm">Close</span>
          </button>

          {/* Main Links */}
          <div className="main-section flex flex-col gap-8">
            {menuSections.map((section) => {
              return (
                <section
                  key={section.title}
                  className="menu-reveal flex flex-col text-secondary gap-2"
                >
                  <h2 className="flex items-baseline gap-3 text-3xl font-benton-regular">
                    <span>{section.title}</span>

                    <span aria-hidden="true" className="text-2xl font-light">
                      &#x2304;
                    </span>
                  </h2>

                  {section.links.map((link) => {
                    return (
                      <Link
                        className="text-sm"
                        key={link.label}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </section>
              );
            })}
          </div>

          {/* Footer Menu */}
          <div className="menu-reveal footer-section flex flex-col gap-6">
            <span className="bg-white rounded-lg h-px opacity-20 w-35" />

            <div className="flex flex-col gap-2">
              {menuFooterSections.map((link) => {
                return (
                  <Link
                    className="text-white text-xs uppercase"
                    key={link.label}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Decorative Leaf */}
          <div
            aria-hidden="true"
            className="decorative-leaf absolute -rotate-45 -bottom-35 -right-40"
          >
            <Image src={Leaf} alt="" width={500} height={500} />
          </div>
        </div>
      </nav>
    </>
  );
}
