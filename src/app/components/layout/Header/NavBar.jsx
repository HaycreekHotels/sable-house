"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import whiteLogo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

const utilityLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
];

const mainLinks = [
  {
    label: "Stay",
    href: "/rooms",
    dropdown: [
      { label: "Rooms & Suites", href: "/rooms" },
      { label: "Packages & Offers", href: "/offers" },
      { label: "Corporate Travel", href: "/corporate-travel" },
    ],
  },
  {
    label: "Dine",
    href: "/dine",
    dropdown: [
      { label: "Oak Steak House", href: "/dine/oak-steak-house" },
      { label: "The Bar", href: "/dine/bar" },
    ],
  },
  {
    label: "Wedding & Events",
    href: "/events",
    dropdown: [
      { label: "Weddings", href: "/events/weddings" },
      { label: "Corporate Events", href: "/events/corporate-events" },
      { label: "Social Events", href: "/events/social-events" },
    ],
  },
  {
    label: "Explore",
    href: "/",
    dropdown: [{ label: "Local Events", href: "/local-events" }],
  },
];

export default function NavBar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const activeItem = "Stay";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 10) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNav(false);
        setOpenIndex(null);
      } else if (currentScrollY < lastScrollY) {
        setShowNav(true);
      }

      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full text-white transition-all duration-300 ${
        showNav || mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-main shadow-lg backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="px-4 pt-4 md:px-6 md:pt-5">
        {/* MOBILE NAV */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center text-white"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
              <span className="block h-0.5 w-6 bg-current" />
            </div>
          </button>

          <Link href="/" className="flex justify-center">
            <Image
              src={whiteLogo}
              alt="Sable House Hotel logo in offwhite color"
              className="h-auto w-28 sm:w-32"
              priority
            />
          </Link>

          <Link
            href="/book-now"
            className={`px-4 py-3 text-[12px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:opacity-90 ${
              isScrolled ? "bg-contrast" : "bg-main"
            }`}
          >
            Book Now
          </Link>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 border-t border-white/20 bg-main px-4 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {utilityLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm uppercase tracking-[0.16em] text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="tel:1234567890"
                className="text-sm uppercase tracking-[0.16em] text-white"
              >
                123.456.7890
              </a>

              <div className="mt-2 border-t border-white/20 pt-4">
                <div className="flex flex-col gap-4">
                  {mainLinks.map((item) => (
                    <div key={item.label} className="flex flex-col gap-2">
                      <Link
                        href={item.href}
                        className="text-sm uppercase tracking-[0.16em] text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>

                      {item.dropdown?.length > 0 && (
                        <div className="ml-4 flex flex-col gap-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="text-xs uppercase tracking-[0.12em] text-white/80"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP NAV */}
        <div className="mx-auto hidden max-w-475 items-start justify-between gap-10 lg:flex">
          <div className="mt-4 flex w-55 justify-center pt-2">
            <Link href="/">
              <Image
                src={whiteLogo}
                alt="Sable House Hotel logo in offwhite color"
                priority
                loading="eager"
              />
            </Link>
          </div>

          <div className="flex flex-1 flex-col items-end gap-8">
            <div
              className={`flex items-center gap-10 px-6 py-4 transition-colors duration-300 ${
                isScrolled ? "bg-white/5" : "bg-white/10"
              }`}
            >
              <div className="flex items-center gap-8">
                {utilityLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[14px] uppercase tracking-[0.18em] text-white transition-opacity duration-300 hover:opacity-75"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-8">
                <a
                  href="tel:1234567890"
                  className="text-[14px] uppercase tracking-[0.12em] text-white transition-opacity duration-300 hover:opacity-75"
                >
                  123.456.7890
                </a>
              </div>

              <div className="flex items-center">
                <Link
                  href="/book-now"
                  className={`px-10 py-4 text-[14px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:opacity-90 ${
                    isScrolled ? "bg-contrast" : "bg-main"
                  }`}
                >
                  Book Now
                </Link>
              </div>
            </div>

            <nav className="flex items-center gap-10 border-b border-white/30 pb-4">
              {mainLinks.map((item, index) => {
                const isActive = activeItem === item.label;
                const isOpen = openIndex === index;
                const isLastItem = index === mainLinks.length - 1;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenIndex(index)}
                    onMouseLeave={() => setOpenIndex(null)}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex border-b-2 pb-3 uppercase tracking-[0.14em] transition-all duration-300 ${
                        isActive || isOpen
                          ? "border-white text-white"
                          : "border-transparent text-white/95 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {isOpen && item.dropdown?.length > 0 && (
                      <div
                        className={`absolute top-full pt-4 ${
                          isLastItem ? "right-0" : "left-0"
                        }`}
                      >
                        <div
                          className={`min-w-62.5 px-6 py-5 shadow-xl backdrop-blur-md ${
                            isScrolled ? "bg-contrast" : "bg-main"
                          }`}
                        >
                          <div className="flex flex-col gap-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="text-[13px] uppercase tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-white"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
