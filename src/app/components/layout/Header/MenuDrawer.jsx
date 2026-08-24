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
    label: "Countact Us",
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
    <>
      <button
        className="bg-transparent cursor-pointer flex flex-col justify-between h-6 w-10 p-0"
        aria-label="Menu"
        aria-expanded="false"
      >
        <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
        <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
        <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
      </button>
      <nav className="h-screen max-w-1/2">
        <div className="drawer-container">
          <div className="menu-header">X CLOSE</div>
          <div className="main-section">
            {menuSections.map((section) => {
              return (
                <section key={section.title}>
                  <h2>{section.title} &#x2304;</h2>
                  {section.links.map((link) => {
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>;
                  })}
                </section>
              );
            })}
          </div>
          <div className="footer-section ">
            <span className="bg-white rounded-lg h-px w-full transition-all delay-150 ease-in-out"></span>
            {menuFooterSections.map((link) => {
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>;
            })}
          </div>
          <div className="decorative-leaf absolute rotate-[-30deg]">
            <Image src={Leaf} alt="" width={250} height={250} />
          </div>
        </div>
      </nav>
    </>
  );
}
