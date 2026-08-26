"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import MenuDrawer from "./MenuDrawer";

import Logo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 40);
    }

    // Check initial position in case the page loads while already scrolled.
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
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-20
          w-full
          items-center
          justify-between
          px-6
          transition-colors
          duration-500
          ease-out
          md:px-8
          lg:px-12
          ${isScrolled || isOpen ? "bg-main" : "bg-transparent"}
        `}
      >
        {/* Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          className="
            relative
            flex
            h-6
            w-10
            cursor-pointer
            flex-col
            justify-between
            bg-transparent
            p-0
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
          "
          aria-label="Open menu"
          aria-controls="site-menu"
          aria-expanded={isOpen}
          onClick={handleOpenMenu}
        >
          <span
            aria-hidden="true"
            className="
              h-px
              w-full
              rounded-lg
              bg-white
              transition-transform
              duration-300
              ease-out
            "
          />

          <span
            aria-hidden="true"
            className="
              h-px
              w-full
              rounded-lg
              bg-white
              transition-transform
              duration-300
              ease-out
            "
          />

          <span
            aria-hidden="true"
            className="
              h-px
              w-full
              rounded-lg
              bg-white
              transition-transform
              duration-300
              ease-out
            "
          />
        </button>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Sabal House home"
          className="
            absolute
            left-1/2
            -translate-x-1/2
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
            className="h-auto w-[90px] sm:w-[100px]"
            alt="Sabal House"
          />
        </Link>

        {/* Booking CTA */}
        <Link
          className="
            flex
            items-center
            justify-center
            bg-black
            px-3
            py-2
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            text-secondary
            transition-colors
            duration-300
            hover:bg-neutral-800
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white
            sm:px-4
            sm:text-xs
            md:text-sm
          "
          href="#"
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
