"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function OpenLetterForm({
  backgroundImage = "/images/letter-background-placeholder.jpg",
  stampImage = "/images/stamp-placeholder.png",

  eyebrow = "LETTERS FROM SABAL HOUSE",
  description = "Stay informed as we continue to build something special. Join our list for occasional updates.",
  buttonLabel = "STAY CLOSE",
  signature = "Until Then.",

  onSubmit,
  className = "",
}) {
  const sectionRef = useRef(null);
  const letterRef = useRef(null);
  const stampRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (onSubmit) {
      const formData = new FormData(event.currentTarget);

      onSubmit({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        zipCode: formData.get("zipCode"),
      });
    }
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * Entire letter entrance
         */
        gsap.from(letterRef.current, {
          opacity: 0,
          y: 45,
          scale: 0.985,
          duration: 1.15,
          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        /*
         * Stamp entrance
         */
        gsap.from(stampRef.current, {
          opacity: 0,
          y: -18,
          rotate: -8,
          scale: 0.8,
          duration: 1.15,
          delay: 0.15,
          ease: "back.out(1.4)",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        /*
         * Header copy
         */
        gsap.from("[data-letter-copy]", {
          opacity: 0,
          y: 12,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",

          scrollTrigger: {
            trigger: letterRef.current,
            start: "top 72%",
            once: true,
          },
        });

        /*
         * Form fields fade in one at a time.
         */
        gsap.from("[data-form-field]", {
          opacity: 0,
          y: 18,
          duration: 0.9,
          stagger: 0.18,
          delay: 0.25,
          ease: "power2.out",

          scrollTrigger: {
            trigger: letterRef.current,
            start: "top 70%",
            once: true,
          },
        });

        /*
         * CTA + signature
         */
        gsap.from("[data-letter-footer]", {
          opacity: 0,
          y: 12,
          duration: 0.8,
          stagger: 0.14,
          delay: 0.85,
          ease: "power2.out",

          scrollTrigger: {
            trigger: letterRef.current,
            start: "top 70%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-labelledby="open-letter-heading"
    >
      {/* Subtle image overlay for readability */}
      <div className="absolute inset-0 bg-black/5" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-5xl">
        <div
          ref={letterRef}
          className="
            relative
            mx-auto
            w-full
            max-w-[820px]
            bg-[#f7f3ee]
            px-6
            pb-12
            pt-20
            shadow-[0_12px_50px_rgba(0,0,0,0.08)]
            sm:px-12
            sm:pb-16
            sm:pt-24
            md:px-20
            lg:px-28
          "
        >
          {/* Stamp */}
          <div
            ref={stampRef}
            className="
              absolute
              left-1/2
              top-0
              z-10
              h-20
              w-20
              -translate-x-1/2
              -translate-y-1/2
              sm:h-24
              sm:w-24
            "
            aria-hidden="true"
          >
            <img
              src={stampImage}
              alt=""
              className="h-full w-full object-contain drop-shadow-md"
            />
          </div>

          {/* Header */}
          <header className="mx-auto max-w-xl text-center">
            <p
              data-letter-copy
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-neutral-900
                sm:text-xs
              "
            >
              {eyebrow}
            </p>

            <h2 id="open-letter-heading" data-letter-copy className="sr-only">
              Join the Sabal House mailing list
            </h2>

            <p
              data-letter-copy
              className="
                mx-auto
                mt-5
                max-w-md
                text-xs
                leading-5
                text-neutral-800
                sm:mt-6
                sm:text-sm
                sm:leading-6
              "
            >
              {description}
            </p>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-lg sm:mt-12"
          >
            {/* Name fields */}
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10">
              <div data-form-field className="group">
                <label
                  htmlFor="open-letter-first-name"
                  className="
                    mb-2
                    block
                    text-center
                    text-[10px]
                    font-medium
                    text-neutral-900
                    sm:text-xs
                  "
                >
                  First Name
                </label>

                <input
                  id="open-letter-first-name"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  className="
                    w-full
                    border-0
                    border-b
                    border-neutral-400
                    bg-transparent
                    px-1
                    py-1.5
                    text-center
                    text-sm
                    text-neutral-950
                    outline-none
                    transition-colors
                    duration-300
                    focus:border-neutral-950
                    focus:ring-0
                  "
                />
              </div>

              <div data-form-field className="group">
                <label
                  htmlFor="open-letter-last-name"
                  className="
                    mb-2
                    block
                    text-center
                    text-[10px]
                    font-medium
                    text-neutral-900
                    sm:text-xs
                  "
                >
                  Last Name
                </label>

                <input
                  id="open-letter-last-name"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  className="
                    w-full
                    border-0
                    border-b
                    border-neutral-400
                    bg-transparent
                    px-1
                    py-1.5
                    text-center
                    text-sm
                    text-neutral-950
                    outline-none
                    transition-colors
                    duration-300
                    focus:border-neutral-950
                    focus:ring-0
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div data-form-field className="mx-auto mt-7 max-w-sm sm:mt-9">
              <label
                htmlFor="open-letter-email"
                className="
                  mb-2
                  block
                  text-center
                  text-[10px]
                  font-medium
                  text-neutral-900
                  sm:text-xs
                "
              >
                Email Address
              </label>

              <input
                id="open-letter-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="
                  w-full
                  border-0
                  border-b
                  border-neutral-400
                  bg-transparent
                  px-1
                  py-1.5
                  text-center
                  text-sm
                  text-neutral-950
                  outline-none
                  transition-colors
                  duration-300
                  focus:border-neutral-950
                  focus:ring-0
                "
              />
            </div>

            {/* Zip */}
            <div data-form-field className="mx-auto mt-7 max-w-[170px] sm:mt-9">
              <label
                htmlFor="open-letter-zip"
                className="
                  mb-2
                  block
                  text-center
                  text-[10px]
                  font-medium
                  text-neutral-900
                  sm:text-xs
                "
              >
                Zip Code
              </label>

              <input
                id="open-letter-zip"
                type="text"
                name="zipCode"
                autoComplete="postal-code"
                inputMode="numeric"
                className="
                  w-full
                  border-0
                  border-b
                  border-neutral-400
                  bg-transparent
                  px-1
                  py-1.5
                  text-center
                  text-sm
                  text-neutral-950
                  outline-none
                  transition-colors
                  duration-300
                  focus:border-neutral-950
                  focus:ring-0
                "
              />
            </div>

            {/* Button */}
            <div data-letter-footer className="mt-9 flex justify-center">
              <button
                type="submit"
                className="
                  min-w-[150px]
                  bg-black
                  px-7
                  py-3
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.04em]
                  text-white
                  transition
                  duration-300
                  hover:bg-neutral-800
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-black
                  active:scale-[0.98]
                  sm:text-xs
                "
              >
                {buttonLabel}
              </button>
            </div>

            {/* Signature */}
            <p
              data-letter-footer
              className="
                mt-7
                text-center
                font-serif
                text-sm
                italic
                text-neutral-950
                sm:text-base
              "
            >
              {signature}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
