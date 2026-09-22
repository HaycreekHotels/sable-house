"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import MenuDrawer from "./MenuDrawer";
import BookingBlock from "./BookingBlock";
import BookingBanner from "./BookingBanner";

import LogoWhite from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";
import LogoBlack from "../../../../../public/images/logos/SH_Primary Logo Black.png";

const BOOKING_WIDGET_VARIANTS = {
  block: BookingBlock,
  banner: BookingBanner,
};

export default function NavBar({ bookingWidgetVariant = "block" }) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingWidgetVisible, setIsBookingWidgetVisible] = useState(false);

  const menuButtonRef = useRef(null);

  const isHomePage = pathname === "/";
  const isStayPage = pathname === "/stay" || pathname.startsWith("/stay/");
  const useDarkNav = isStayPage && !isScrolled && !isOpen;

  const BookingWidget =
    BOOKING_WIDGET_VARIANTS[bookingWidgetVariant] || BookingBlock;

  const bookingWidgetId =
    bookingWidgetVariant === "banner"
      ? "site-booking-banner"
      : "site-booking-block";

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

  // Booking widget behavior:
  // 1. Auto-open only when entering the homepage.
  // 2. Start hidden when entering every other route.
  // 3. The navbar Book button can open it from any route.
  // 4. Once the visitor scrolls, dismiss it and keep it hidden until Book is
  //    clicked again. Scrolling back to the top does not reopen it.
  useEffect(() => {
    setIsBookingWidgetVisible(isHomePage);

    let lastScrollY = window.scrollY;

    function dismissBookingWidgetOnScroll() {
      const currentScrollY = window.scrollY;
      const hasActuallyMoved = Math.abs(currentScrollY - lastScrollY) > 2;

      lastScrollY = currentScrollY;

      if (hasActuallyMoved) {
        setIsBookingWidgetVisible(false);
      }
    }

    window.addEventListener("scroll", dismissBookingWidgetOnScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", dismissBookingWidgetOnScroll);
    };
  }, [isHomePage, pathname]);

  function handleOpenMenu() {
    setIsBookingWidgetVisible(false);
    setIsOpen(true);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  function handleBookingButtonClick() {
    setIsBookingWidgetVisible(true);
  }

  const bookingButtonClasses = `
    inline-flex
    min-h-11
    shrink-0
    items-center
    justify-center

    ${isScrolled ? "bg-secondary text-main" : "bg-main text-secondary"}

    px-3
    py-2.5

    text-[10px]
    font-central-regular
    uppercase
    tracking-[0.04em]

    transition-colors
    duration-300

    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-white

    sm:px-4
    sm:text-xs
    md:text-sm
  `;

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
            group

            inline-flex
            min-h-11
            shrink-0
            cursor-pointer
            items-center
            justify-center
            gap-3

            bg-transparent
            px-1

            transition-opacity
            duration-300

            hover:opacity-70

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
          <span
            aria-hidden="true"
            className="flex h-[18px] w-7 flex-col justify-between sm:w-8"
          >
            {[0, 1, 2].map((line) => (
              <span
                key={line}
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
            ))}
          </span>

          <span
            aria-hidden="true"
            className={`
              text-[11px]
              font-central-regular
              uppercase
              tracking-[0.12em]

              transition-colors
              duration-500
              ease-out

              sm:text-xs

              ${useDarkNav ? "text-black" : "text-white"}
            `}
          >
            Menu
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
            className="h-auto w-[82px] sm:w-[94px] md:w-[100px]"
          />
        </Link>

        {/* Booking CTA */}
        <button
          type="button"
          aria-controls={bookingWidgetId}
          aria-expanded={isBookingWidgetVisible && !isOpen}
          onClick={handleBookingButtonClick}
          className={bookingButtonClasses}
        >
          <span className="hidden sm:inline">Book Your Stay</span>
          <span className="sm:hidden">Book</span>
        </button>
      </nav>

      <BookingWidget
        id={bookingWidgetId}
        isVisible={isBookingWidgetVisible && !isOpen}
      />

      {isOpen && (
        <MenuDrawer onClose={handleCloseMenu} returnFocusRef={menuButtonRef} />
      )}
    </>
  );
}
