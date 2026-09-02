"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import gsap from "gsap";

import whiteLogo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

import hayCreekLogo from "../../../../../public/images/logos/HC_Logotype.png";
import tenAndFiveLogo from "../../../../../public/images/logos/Final_Logo Black.png";

const footerLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thesabalhouse/?utm_source=ig_web_button_share_sheet",
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592632106578",
    external: true,
  },
  {
    label: "Stay Informed",
    href: "/#open-letter-form",
    external: false,
    scrollTarget: "open-letter-form",
  },
];

const footerLinkStyles = `
  inline-block
  text-[15px]
  font-central-regular
  tracking-[-0.02em]
  text-secondary

  transition-opacity
  duration-300

  hover:opacity-60

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-secondary
  focus-visible:ring-offset-4
  focus-visible:ring-offset-main

  sm:text-base
  lg:text-[18px]
`;

const utilityLinkStyles = `
  inline-flex
  min-h-11
  items-center

  text-sm
  font-central-regular
  tracking-[-0.02em]
  text-black

  transition-opacity
  duration-300

  hover:opacity-60

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-black
  focus-visible:ring-offset-4
  focus-visible:ring-offset-secondary

  lg:text-[18px]
`;

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  function handleStayInformed(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Already on the homepage:
     * smoothly scroll directly to the form.
     */
    if (pathname === "/") {
      const target = document.getElementById("open-letter-form");

      if (!target) return;

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", "/#open-letter-form");

      return;
    }

    /*
     * Tell the homepage that this navigation specifically
     * wants the OpenLetterForm.
     */
    sessionStorage.setItem("sabal-scroll-target", "open-letter-form");

    if (prefersReducedMotion) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      router.push("/#open-letter-form", {
        scroll: false,
      });

      return;
    }

    gsap.to(document.body, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",

      onComplete: () => {
        /*
         * Reset the outgoing page before routing so the
         * homepage starts its GSAP calculations from the top.
         */
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });

        /*
         * Put the hash in the URL immediately.
         */
        router.push("/#open-letter-form", {
          scroll: false,
        });
      },
    });

    window.setTimeout(() => {
      if (document.body.style.opacity === "0") {
        gsap.to(document.body, {
          opacity: 1,
          duration: 0.25,
          clearProps: "opacity",
        });
      }
    }, 3000);
  }

  return (
    <footer
      className="
        bg-main
        px-4
        pb-4
        pt-12
        text-secondary

        sm:px-6
        sm:pb-6
        sm:pt-14

        md:px-8

        lg:px-6
        lg:pb-5
        lg:pt-14
      "
    >
      {/* Main footer area */}
      <div
        className="
          mx-auto
          grid
          w-full
          grid-cols-1
          gap-12

          pb-14

          md:grid-cols-2
          md:gap-x-12
          md:gap-y-14

          lg:min-h-[30px]
          lg:grid-cols-[1fr_auto_1fr]
          lg:items-start
          lg:gap-12
          lg:pb-12
        "
      >
        {/* Footer links */}
        <nav
          aria-label="Footer links"
          className="
            flex
            flex-col
            gap-2

            md:self-start

            lg:pl-[3vw]
            lg:pt-7
          "
        >
          {footerLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className={footerLinkStyles}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={link.scrollTarget ? handleStayInformed : undefined}
                className={footerLinkStyles}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Main Sabal House logo */}
        <div
          className="
            flex
            items-start
            justify-start

            md:col-span-2
            md:row-start-1
            md:justify-center

            lg:col-span-1
            lg:col-start-2
            lg:row-start-1
          "
        >
          <Link
            href="/"
            aria-label="Sabal House home"
            className="
              inline-block

              transition-opacity
              duration-300

              hover:opacity-80

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-secondary
              focus-visible:ring-offset-4
              focus-visible:ring-offset-main
            "
          >
            <Image
              src={whiteLogo}
              alt=""
              width={300}
              height={260}
              className="
                h-auto
                w-[180px]

                sm:w-[200px]
                md:w-[220px]

                lg:w-[260px]

                xl:w-[280px]
                2xl:w-[330px]
              "
              sizes="
                (max-width: 640px) 230px,
                (max-width: 768px) 280px,
                (max-width: 1024px) 340px,
                (max-width: 1280px) 360px,
                (max-width: 1536px) 430px,
                470px
              "
              priority={false}
            />
          </Link>
        </div>

        {/* Contact information */}
        <div
          className="
            flex
            flex-col
            gap-7

            md:col-start-2
            md:row-start-2
            md:items-end
            md:text-right

            lg:col-start-3
            lg:row-start-1
            lg:justify-self-end
            lg:pr-[3vw]
            lg:pt-6
          "
        >
          <address
            className="
              max-w-[260px]

              text-[15px]
              font-central-regular
              not-italic
              leading-[1.35]
              tracking-[-0.02em]

              sm:text-base
              lg:text-[18px]
            "
          >
            225 E. President St,
            <br />
            Savannah GA, 31401
          </address>

          <a
            href="tel:+19122331600"
            className="
              w-fit

              text-[15px]
              font-central-regular
              tracking-[-0.02em]

              transition-opacity
              duration-300

              hover:opacity-60

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-secondary
              focus-visible:ring-offset-4
              focus-visible:ring-offset-main

              sm:text-base
              lg:text-[18px]
            "
          >
            912-233-1600
          </a>
        </div>
      </div>

      {/* Bottom utility bar */}
      <div
        className="
          bg-secondary
          text-black

          px-5
          py-5

          sm:px-7

          lg:min-h-[92px]
          lg:px-[3vw]
          lg:py-4
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-6

            sm:grid-cols-2

            lg:grid-cols-[1fr_1.25fr_1.25fr_1fr]
            lg:gap-8
          "
        >
          {/* Privacy */}
          <div className="flex sm:justify-start">
            <Link href="/privacy" className={utilityLinkStyles}>
              Privacy
            </Link>
          </div>

          {/* Hay Creek */}
          <div
            className="
              flex
              items-center
              gap-3

              sm:justify-end

              lg:justify-center
            "
          >
            <span
              className="
                whitespace-nowrap
                text-xs
                font-central-regular
                text-black

                sm:text-sm
                lg:text-[16px]
              "
            >
              Managed by
            </span>

            <Image
              src={hayCreekLogo}
              alt="Hay Creek"
              width={180}
              height={60}
              className="
                h-auto
                w-[130px]

                lg:w-[150px]
              "
            />
          </div>

          {/* 10and5 Creative */}
          <div
            className="
              flex
              items-center
              gap-3

              sm:justify-start

              lg:justify-center
            "
          >
            <span
              className="
                whitespace-nowrap
                text-xs
                font-central-regular
                text-black

                sm:text-sm
                lg:text-[16px]
              "
            >
              Designed by
            </span>

            <Image
              src={tenAndFiveLogo}
              alt="10and5 Creative"
              width={160}
              height={70}
              className="
                h-auto
                w-[105px]

                lg:w-[125px]
              "
            />
          </div>

          {/* Accessibility */}
          <div
            className="
              flex

              sm:justify-end

              lg:justify-end
            "
          >
            <Link href="/accessibility" className={utilityLinkStyles}>
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
