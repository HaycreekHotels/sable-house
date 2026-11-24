"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FAQItem from "./FAQItem";

gsap.registerPlugin(useGSAP);

export default function FAQPageClient({ categories }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const panelsRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const panel = panelsRef.current?.querySelector('[data-active="true"]');
      if (!panel) return;

      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
        },
      );
    },
    { scope: panelsRef, dependencies: [activeCategory], revertOnUpdate: true },
  );

  if (!categories?.length) return null;

  return (
    <main className="min-h-screen bg-secondary text-foreground mt-5 md:mt-12">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-12 sm:px-8 sm:pb-28 lg:pt-[52px] lg:mt-25">
        <header className="mx-auto max-w-[520px] text-center ">
          <h1 className="font-benton-regular text-[clamp(2.25rem,3.6vw,2.75rem)] leading-[1.14] tracking-[-0.025em]">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-6 max-w-[475px] font-central-regular  text-[15px] leading-[1.4] sm:text-[16px]">
            Find answers to frequently asked questions about your stay at Sabal
            House. If there’s anything else you’d like to know, our team is
            always happy to help.
          </p>
        </header>

        <div className="mx-auto mt-14 grid max-w-[930px] grid-cols-1 items-start gap-8 sm:mt-20 lg:mt-[116px] lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-[74px]">
          {/* Desktop navigation mirrors the reference design. */}
          <nav
            className="hidden min-h-[585px] bg-[#dcd9d1] px-10 py-8 lg:block"
            aria-label="FAQ categories"
          >
            <p className="mb-4 font-central-regular text-[11px] uppercase tracking-[0.02em]">
              Select category
            </p>
            <ul className="space-y-[9px]">
              {categories.map((category) => {
                const selected = activeCategory === category.id;

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-controls={`faq-category-${category.id}`}
                      onClick={() => setActiveCategory(category.id)}
                      className={`font-benton-regular text-left text-[22px] leading-[1.26] underline-offset-[3px] transition-colors duration-200 hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main motion-reduce:transition-none ${
                        selected ? "underline decoration-[1px]" : "no-underline"
                      }`}
                    >
                      {category.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Native select is more usable than a 7-item tall sidebar on mobile. */}
          <div className="lg:hidden">
            <label
              htmlFor="faq-category-select"
              className="mb-3 block font-central-regular text-[12px] uppercase tracking-[0.06em]"
            >
              Select category
            </label>
            <div className="relative">
              <select
                id="faq-category-select"
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
                className="min-h-14 w-full appearance-none rounded-none border border-[#aea99e] bg-[#dcd9d1] px-4 pr-12 font-benton-regular text-[20px] text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2"
              >
                <path d="m5 9 7 7 7-7" />
              </svg>
            </div>
          </div>

          <div ref={panelsRef} className="min-w-0 lg:pt-5">
            {/* Keep every category in the HTML for crawlers; hide only visually. */}
            {categories.map((category) => {
              const active = activeCategory === category.id;

              return (
                <section
                  key={category.id}
                  id={`faq-category-${category.id}`}
                  aria-label={category.title}
                  data-active={active ? "true" : "false"}
                  hidden={!active}
                >
                  <h2 className="sr-only">{category.title}</h2>
                  <div>
                    {category.faqs.map((faq) => (
                      <FAQItem key={faq.id} faq={faq} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
