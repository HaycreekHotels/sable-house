"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import MenuDrawer from "./MenuDrawer";

import LogoWhite from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";
import LogoBlack from "../../../../../public/images/logos/SH_Primary Logo Black.png";

export default function NavBar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuButtonRef = useRef(null);

  const isStayPage = pathname === "/stay" || pathname.startsWith("/stay/");

  const useDarkNav = isStayPage && !isScrolled && !isOpen;

  useEffect(() => {
    function handleScroll() {
      const nextScrolledState = window.scrollY > 40;

      setIsScrolled((currentState) =>
        currentState === nextScrolledState ? currentState : nextScrolledState,
      );
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleOpenMenu() {
    setIsOpen(true);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <nav
        aria-label="Primary navigation"
        aria-hidden={isOpen ? "true" : undefined}
        inert={isOpen || undefined}
        className={`
          fixed
          inset-x-0
          top-0
          z-50

          flex
          h-[72px]
          w-full
          items-center
          justify-between

          px-4

          transition-colors
          duration-500
          ease-out

          sm:px-6
          md:px-8
          lg:px-12

          ${isScrolled || isOpen ? "bg-main" : "bg-transparent"}
        `}
      >
        {/* Menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-controls="site-menu"
          aria-expanded={isOpen}
          onClick={handleOpenMenu}
          className={`
            relative

            flex
            h-11
            w-11
            shrink-0
            cursor-pointer
            items-center
            justify-center

            bg-transparent

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2

            ${
              useDarkNav
                ? "focus-visible:outline-black"
                : "focus-visible:outline-white"
            }
          `}
        >
          <span
            aria-hidden="true"
            className="
              flex
              h-5
              w-8
              flex-col
              justify-between
            "
          >
            <span
              className={`
                h-px
                w-full
                rounded-full

                transition-colors
                duration-500
                ease-out

                ${useDarkNav ? "bg-black" : "bg-white"}
              `}
            />

            <span
              className={`
                h-px
                w-full
                rounded-full

                transition-colors
                duration-500
                ease-out

                ${useDarkNav ? "bg-black" : "bg-white"}
              `}
            />

            <span
              className={`
                h-px
                w-full
                rounded-full

                transition-colors
                duration-500
                ease-out

                ${useDarkNav ? "bg-black" : "bg-white"}
              `}
            />
          </span>
        </button>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Sabal House home"
          className={`
            absolute
            left-1/2
            -translate-x-1/2

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4

            ${
              useDarkNav
                ? "focus-visible:outline-black"
                : "focus-visible:outline-white"
            }
          `}
        >
          <Image
            src={useDarkNav ? LogoBlack : LogoWhite}
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

        {/* Booking CTA */}
        <Link
          href="/stay/accommodations"
          className="
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
          <span className="hidden sm:inline">Book Your Stay</span>
          <span className="sm:hidden">Book</span>
        </Link>
      </nav>

      {isOpen && (
        <MenuDrawer onClose={handleCloseMenu} returnFocusRef={menuButtonRef} />
      )}
    </>
  );
}
