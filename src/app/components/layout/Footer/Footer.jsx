"use client";

import Image from "next/image";
import Link from "next/link";

import whiteLogo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

const footerLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy", href: "/privacy" },
  { label: "Policies", href: "/polices" },
];

export default function Footer() {
  return (
    <footer className="bg-main text-white">
      <div className="mx-auto max-w-400 px-6 py-16 md:mx-10 md:my-20 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-12">
            <div>
              <Image
                src={whiteLogo}
                alt="The Sable House Hotel Logo in White"
                className="h-auto w-64 md:w-64"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h4 className="text-sm uppercase tracking-[0.18em] text-white/85">
                  Contact Us
                </h4>
                <a
                  href="tel:1234567890"
                  className="mt-5 text-2xl text-white/90 md:text-2xl"
                >
                  123.456.7890
                </a>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-[0.18em] text-white/85">
                  Find Us
                </h4>
                <p className="mt-5 text-2xl text-white/90 md:text-2xl">
                  124 Abercorn St, Savannah, GA 31401
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:pl-10">
            <h4 className="text-lg text-center text-white uppercase md:text-xl">
              Sign Up For Our Newsletter
            </h4>
            <form className="flex flex-col gap-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <label className="flex flex-col">
                  <span className="text-2xl text-white/90 md:text-3xl">
                    First Name
                  </span>
                  <input
                    type="text"
                    className="mt-4 border-b border-white/40 bg-transparent pb-3 text-lg text-white outline-none placeholder:text-white/50"
                  />
                </label>
                <label className="flex flex-col">
                  <span className="text-2xl text-white/90 md:text-3xl">
                    Last Name
                  </span>
                  <input
                    type="text"
                    className="mt-4 border-b border-white/40 bg-transparent pb-3 text-lg text-white outline-none placeholder:text-white/50"
                  />
                </label>
              </div>
              <label className="flex flex-col">
                <span className="text-2xl text-white/90 md:text-3xl">
                  Email
                </span>
                <input
                  type="email"
                  className="mt-4 border-b border-white/40 bg-transparent pb-3 text-lg text-white outline-none placeholder:text-white/50"
                />
              </label>
              <p className="text-center text-lg text-white/80 md:text-xl">
                Keep up to date with news, specials, and events!
              </p>
            </form>
          </div>
        </div>

        <div className="my-14 h-px w-full bg-white/50" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap items-center gap-6 md:gap-8"></div>
            <div className="space-y-2 text-sm uppercase tracking-[0.08em] text-white/75 md:text-base">
              <p>Managed by Hay Creek Hotels</p>
              <p>Designed bt 10and5Creative</p>
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm uppercase tracking-[0.14em] text-white/85 md:text-base">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-opacity duration-300 hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-md text-white/70 md:text-lg">
              &#9400; 2026 THE SABAL HOUSE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
