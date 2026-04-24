"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroImage from "../layout/heros/HeroImage";

gsap.registerPlugin(ScrollTrigger);

const improvements = [
  {
    title: "Language Tagging",
    body: "Each page on our website is compatible with language information-assist systems, including audible speak-back software and Braille translators. We are also working to provide sign language interpretation and prerecorded audio content in synchronized media as an alternative to text.",
  },
  {
    title: "More Label Tags",
    body: "We continue adding clearer labels and titles throughout the site so guests can find content more easily and navigate with fewer keystrokes.",
  },
  {
    title: "Image Text Alternatives",
    body: "We are adding and refining image descriptions across the site to improve access for guests using assistive technology, while also making content easier to understand without relying on color alone.",
  },
  {
    title: "Easier Keyboard Access",
    body: "We are continuously improving keyboard navigation so visitors can move through the website more efficiently and access important content with ease.",
  },
  {
    title: "Re-Sizing Text",
    body: "We are improving support for text resizing, spacing, contrast, and zoom so the reading experience remains clear and comfortable across a wide range of user needs.",
  },
  {
    title: "Video and Audio Controls",
    body: "We are adding easier-to-find controls for prerecorded audio and video content to support a more accessible media experience.",
  },
];

export default function AccessibilityClient() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", {
        y: 28,
        opacity: 0,
      });

      gsap.to("[data-hero-copy]", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.utils.toArray("[data-reveal]").forEach((element, index) => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index % 3 === 0 ? 0 : 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.utils.toArray("[data-card]").forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#f5f3ee] text-[#1e1e1a]">
      <section className="relative">
        <HeroImage
          image="https://images.pexels.com/photos/31546897/pexels-photo-31546897.jpeg?_gl=1*1otm8uc*_ga*NDk4MjAzNTUwLjE3NzQyNDMxMDQ.*_ga_8JE65Q40S6*czE3NzY4ODQ0MjckbzYkZzEkdDE3NzY4ODUxOTIkajU5JGwwJGgw"
          alt="Vibrant green trees overcasting a sunny street in a small town neighborhood"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-12 md:px-8 md:pb-16 lg:pb-20">
            <div data-hero-copy className="max-w-2xl translate-y-6 opacity-0">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/80 md:text-xs">
                The Sabal House
              </p>
              <h1 className="text-4xl font-medium leading-tight text-white md:text-6xl">
                Accessibility,
                <span className="block text-white/85">
                  for Savannah, Georgia.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                We are committed to making our digital experience more
                inclusive, intuitive, and uSabal for every guest visiting The
                Sabal House in Savannah, Georgia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div data-reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
              Our commitment
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight md:text-5xl">
              A more inclusive stay begins with a more accessible website.
            </h2>
          </div>

          <div
            data-reveal
            className="space-y-5 text-sm leading-7 text-[#4f4d46] md:text-base"
          >
            <p>
              We at The Sabal House are committed to making our services and
              products accessible to everyone. We maintain an accessibility
              initiative focused on continuous website improvements for guests
              with disabilities.
            </p>
            <p>
              Our goal is to support evolving accessibility standards, including
              WCAG 2.0 Level AA, EN 301 549, and applicable accessibility
              regulations, to the best of our ability.
            </p>
            <p>
              We believe access to information should be seamless, regardless of
              how someone navigates, reads, hears, or interacts with the web.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div data-reveal className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
              Ongoing improvements
            </p>
            <h2 className="mt-3 text-3xl font-medium md:text-4xl">
              Focus areas across the website
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4f4d46] md:text-base">
              We are actively refining the experience in the following areas to
              make navigation clearer, content easier to understand, and digital
              interactions more flexible.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {improvements.map((item) => (
              <article
                key={item.title}
                data-card
                className="rounded-3xl border border-black/8 bg-[#faf8f4] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-lg font-medium text-[#1e1e1a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#4f4d46]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <article
            data-reveal
            className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-10"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
              Standards
            </p>
            <h2 className="mt-3 text-2xl font-medium md:text-3xl">
              Partial Conformance
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4f4d46] md:text-base">
              Some pages may not yet fully conform where accessibility support
              is limited or where third-party content introduces constraints.
              When that occurs, we continue working toward improved compliance
              and a more consistent experience.
            </p>
          </article>

          <article
            data-reveal
            className="rounded-[2rem] border border-black/8 bg-[#1f1f1b] p-8 text-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:p-10"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
              Partnership
            </p>
            <h2 className="mt-3 text-2xl font-medium md:text-3xl">
              Web Accessibility Partner
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
              We work with a dedicated accessibility partner to review content,
              support ongoing updates, and help integrate improvements that make
              our website easier to use for all visitors.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#ece8df]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div data-reveal>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
                Looking ahead
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-tight md:text-5xl">
                Accessibility is an ongoing part of how we improve.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4f4d46] md:text-base">
                We will continue reviewing legacy systems, updating digital
                experiences, and evolving alongside current accessibility
                standards so more guests can browse and book with confidence.
              </p>
            </div>

            <div
              data-reveal
              className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-10"
            >
              <h2 className="text-2xl font-medium md:text-3xl">
                Need assistance?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#4f4d46] md:text-base">
                If you encounter any accessibility barriers while using our
                website, we welcome your feedback, questions, and suggestions.
              </p>

              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-sm uppercase tracking-[0.22em] text-[#6c6a63]">
                  Contact
                </p>
                <address className="mt-4 space-y-3 text-base text-[#1e1e1a] not-italic">
                  <p className="font-medium">Michael Mount</p>
                  <p>
                    <a
                      href="tel:1234567890"
                      className="transition-opacity hover:opacity-60"
                    >
                      123.456.8790
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:info@sabalhouse.com"
                      className="break-all transition-opacity hover:opacity-60"
                    >
                      info@sabalhouse.com
                    </a>
                  </p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
