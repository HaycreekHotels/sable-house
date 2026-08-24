"use client";

import Link from "next/link";
import Image from "next/image";

import Leaf from "../../../../../public/images/decorative/SH_Leaf_Brown.png";

const menuSections = [
  {
    title: "Our Story",
    links: [
      {
        label: "The Making of Sabal House",
        href: "/our-story/making-of-sabal-house",
      },
      { label: "Artist Journal", href: "/our-story/artist-journal" },
    ],
  },
  {
    title: "Stay",
    links: [
      { label: "Accommodations", href: "/stay/accommodations" },
      { label: "Offers", href: "/stay/offers" },
    ],
  },
  {
    title: "Beyond The Square",
    links: [
      { label: "Curated Guide", href: "/beyond-the-square/curated-guide" },
      { label: "Savannah Events", href: "/beyond-the-square/savannah-events" },
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

export default function MenuDrawer() {
  return (
    <nav className="fixed top-0 left-0 z-50 h-dvh w-full max-w-132.5 bg-main p-8">
      <div className="drawer-container flex flex-col items-start gap-5">
        <button className="menu-header" type="button">
          X CLOSE
        </button>
        <div className="main-section">
          {menuSections.map((section) => {
            return (
              <section
                key={section.title}
                className="flex flex-col text-secondary"
              >
                <h2 className="text-3xl">{section.title} &#x2304;</h2>
                {section.links.map((link) => {
                  return (
                    <Link className="text-xl" key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  );
                })}
              </section>
            );
          })}
        </div>
        <div className="footer-section flex flex-col ">
          <span className="bg-white rounded-lg h-px opacity-20 w-full  transition-all delay-150 ease-in-out"></span>
          {menuFooterSections.map((link) => {
            return (
              <Link
                className="text-white text-lg uppercase"
                key={link.label}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="decorative-leaf absolute rotate-[-30deg] bottom-0 right-0">
          <Image src={Leaf} alt="" width={250} height={250} />
        </div>
      </div>
    </nav>
  );
}
