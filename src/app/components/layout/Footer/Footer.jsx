"use client";

import Image from "next/image";
import Link from "next/link";

import whiteLogo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thesabalhouse/?utm_source=ig_web_button_share_sheet",
    external: true,
  },
  {
    label: "Facebook",
    href: "#", // Replace with actual Facebook URL
    external: false,
  },
  {
    label: "FAQ",
    href: "/faq",
    external: false,
  },
];

const utilityLinks = [
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

const linkStyles =
  "inline-block text-sm uppercase tracking-[-0.02em] text-white/95 transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-transparent sm:text-base lg:text-[15px]";

export default function Footer() {
  return (
    <footer className="bg-main text-white">
      <div
        className="
          mx-auto
          flex
          min-h-[220px]
          w-full
          flex-col
          gap-16
          px-6
          py-12
          sm:px-10
          md:min-h-[280px]
          md:px-12
          md:py-14
          lg:grid
          lg:grid-cols-[1fr_auto]
          lg:items-start
          lg:gap-24
          lg:px-16
          lg:py-14
          xl:min-h-[300px]
          xl:px-[4vw]
        "
      >
        {/* Logo */}
        <div className="flex items-start">
          <Link
            href="/"
            aria-label="Sabal House home"
            className="
              inline-block
              rounded-sm
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-4
              focus-visible:ring-offset-transparent
            "
          >
            <Image
              src={whiteLogo}
              alt=""
              width={200}
              height={190}
              className="
                h-auto
                w-[140px]
                sm:w-[160px]
                lg:w-[180px]
                xl:w-[200px]
              "
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 340px"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="
            grid
            w-full
            grid-cols-2
            gap-x-8
            gap-y-10
            sm:max-w-[540px]
            sm:gap-x-16
            md:gap-x-24
            lg:w-[560px]
            lg:max-w-none
            lg:gap-x-28
            xl:w-[600px]
          "
        >
          <ul className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            {socialLinks.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkStyles}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={linkStyles}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            {utilityLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkStyles}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
