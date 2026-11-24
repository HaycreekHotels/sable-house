"use client";

import Image from "next/image";
import { useId, useState } from "react";
import EditorialDetailGrid from "./EditorialDetailGrid";

function Chevron({ expanded }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 shrink-0 transition-transform duration-500 ease-out motion-reduce:transition-none ${
        expanded ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 9 8 7 8-7" />
    </svg>
  );
}

export default function EditorialPlaceCard({ card, wide = true }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const headingId = useId();

  return (
    <article data-door-reveal data-editorial-card className="min-w-0">
      <div
        className={`relative w-full overflow-hidden bg-[#dcd9d3] ${
          wide ? "aspect-[5/4]" : "aspect-[4/5]"
        }`}
      >
        {card.image ? (
          <div
            data-door-image
            data-editorial-image
            className="absolute -inset-[3%]"
          >
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              loading="lazy"
              sizes={
                wide
                  ? "(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 46vw, 45vw"
                  : "(max-width: 639px) calc(100vw - 40px), (max-width: 767px) 46vw, 30vw"
              }
              className="object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#d9d9d9]" aria-hidden="true" />
        )}
      </div>

      <div className="pt-3 sm:pt-4">
        <p className="font-central-regular text-[10px] leading-[1.5] tracking-[0.015em] uppercase sm:text-[11px]">
          {card.eyebrow}
        </p>
        <h3 className="mt-2" id={headingId}>
          <button
            type="button"
            aria-controls={panelId}
            aria-expanded={expanded}
            aria-label={`${expanded ? "Hide" : "Read"} more about ${card.title}`}
            onClick={() => setExpanded((open) => !open)}
            className="group flex min-h-11 w-full items-center justify-between gap-4 text-left font-benton-light text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[1.12] tracking-[-0.05em] transition-colors duration-300 hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
          >
            <span>{card.title}</span>
            <span className="text-[#676962] transition-colors group-hover:text-main">
              <Chevron expanded={expanded} />
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          aria-hidden={!expanded}
          inert={!expanded}
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
            expanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            {/* Long-form editorial copy above the divider, as in the supplied reference. */}
            <p className="pt-5 pb-6 font-central-regular text-[14px] leading-[1.7] text-foreground sm:text-[15px] lg:text-[16px]">
              {card.blurb}
            </p>

            <div className="border-t border-[#adafa1] pt-7 pb-5 sm:pt-8">
              <EditorialDetailGrid
                className="!gap-y-9 sm:!gap-y-10"
                items={[
                  { label: "Location", value: card.location },
                  { label: "Best for", value: card.bestFor },
                  {
                    label: "A little tip",
                    value: card.tip,
                    style: "tip",
                    span: 2,
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {card.href && (
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex min-h-9 items-center border-b border-[#b2ada3] pb-0.5 font-central-regular text-[11px] tracking-[0.03em] uppercase transition-colors hover:border-main hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
          >
            {card.linkLabel ?? "Visit website"}
            <span className="sr-only">
              {" "}
              for {card.title} (opens in a new tab)
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
