"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialDetailGrid from "../components/layout/cards/EditorialDetailGrid";
import { SAVANNAH_EVENT_CATEGORIES } from "../data/savannahEvents";
import {
  formatEventDate,
  formatISODate,
  savannahToday,
  visibleEvents,
} from "../lib/savannahEventDates";
import EventDateFilter from "./EventDateFilter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Chevron({ expanded }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[18px] w-[18px] shrink-0 transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
    >
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

function CategoryFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const close = useCallback((focusTrigger = false) => {
    setOpen(false);
    if (focusTrigger) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) close();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="relative min-w-0 md:justify-self-end" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="events-category-list"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-12 max-w-full items-center gap-2 px-1 font-central-regular text-[11px] uppercase tracking-[0.03em] hover:text-main focus-visible:outline-2 focus-visible:outline-main sm:text-[12px]"
      >
        <span className="truncate">{value || "Categories"}</span>
        <Chevron expanded={open} />
      </button>
      {open && (
        <div
          id="events-category-list"
          aria-label="Filter events by category"
          className="absolute right-0 top-[calc(100%+10px)] z-30 w-[min(350px,calc(100vw-2rem))] border border-main/10 bg-[#e5ded3] px-7 pb-9 pt-8 text-foreground shadow-xl sm:px-8"
        >
          <p className="mb-7 font-central-regular text-xs uppercase tracking-[0.07em]">
            Categories
          </p>
          <div
            className="flex flex-col gap-2"
            role="group"
            aria-label="Event categories"
          >
            {SAVANNAH_EVENT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={value === category}
                onClick={() => onChange(value === category ? null : category)}
                className={`min-h-11 border-b py-1.5 text-left font-benton-light text-[clamp(1.35rem,2.8vw,1.8rem)] leading-[1.05] tracking-[-0.035em] transition-colors hover:text-main focus-visible:outline-2 focus-visible:outline-main ${value === category ? "border-foreground text-main" : "border-transparent"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              close(true);
            }}
            className="mt-7 min-h-11 border-b border-main/40 font-central-regular text-xs uppercase tracking-[0.04em] hover:text-main focus-visible:outline-2 focus-visible:outline-main"
          >
            All categories
          </button>
        </div>
      )}
    </div>
  );
}

function EventRow({ item }) {
  const { event, nextDate } = item;
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const headingId = useId();
  const isRecurring = event.schedule.type === "weekly";
  const details = [
    { label: "Location", value: event.location },
    {
      label: event.fromHotel ? "From Sabal House" : "Admission",
      value: event.fromHotel ?? event.admission,
    },
    {
      label: event.fromHotel ? "Admission" : "Next date",
      value: event.fromHotel
        ? event.admission
        : formatEventDate(nextDate, {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
    },
    { label: "A little tip", value: event.tip, style: "tip" },
  ];

  return (
    <article
      data-events-reveal
      className="border-b border-[#d6d0c5] py-6 sm:py-8"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-[minmax(124px,0.85fr)_minmax(0,3fr)_minmax(102px,0.8fr)] md:gap-x-10">
        <div className="pt-1 md:pt-7">
          <p className="font-benton-light text-[clamp(1.5rem,2.6vw,2rem)] italic leading-[1.1] tracking-[-0.05em]">
            {event.displayDate}
          </p>
        </div>
        <div className="min-w-0">
          <p className="mb-1 font-central-regular text-[10px] uppercase tracking-[0.015em] leading-[1.45] sm:text-[11px]">
            <span className="font-semibold">{event.category}</span>
            <span aria-hidden="true" className="mx-1.5 text-main">
              ●
            </span>
            {event.eyebrow}
          </p>
          <h2 id={headingId} className="m-0">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setExpanded((old) => !old)}
              className="group flex min-h-12 w-full items-center justify-between gap-4 text-left font-benton-light text-[clamp(1.75rem,3.2vw,2.65rem)] leading-[1.07] tracking-[-0.055em] transition-colors hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
            >
              <span>{event.title}</span>
              <Chevron expanded={expanded} />
              <span className="sr-only">
                {expanded ? "Hide details" : "Show details"}
              </span>
            </button>
          </h2>
          <div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            aria-hidden={!expanded}
            inert={!expanded}
            onTransitionEnd={(event) => {
              if (
                event.target === event.currentTarget &&
                event.propertyName === "grid-template-rows"
              ) {
                ScrollTrigger.refresh();
              }
            }}
            className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="pt-5 font-central-regular text-[14px] font-semibold leading-[1.6] sm:text-[15px]">
                {event.fullDate}
              </p>
              {isRecurring && (
                <p className="mt-1 font-central-regular text-[13px] text-main">
                  Next market:{" "}
                  {formatEventDate(nextDate, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              )}
              <p className="mt-5 max-w-[58ch] font-central-regular text-[15px] leading-[1.65] sm:text-[16px]">
                {event.description}
              </p>
              <div className="mt-8 border-t border-[#afa99c] pb-7 pt-8 sm:mt-9 sm:pt-9">
                <EditorialDetailGrid items={details} />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 md:justify-self-end md:pt-7">
          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center border-b border-foreground/50 font-central-regular text-[11px] uppercase tracking-[0.035em] transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
            >
              Visit website{" "}
              <span className="sr-only">
                for {event.title} (opens in a new tab)
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function EventsClient({ events, serverToday }) {
  const [today, setToday] = useState(serverToday);
  const [category, setCategory] = useState(null);
  const [range, setRange] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const refresh = () => setToday(savannahToday());
    refresh();
    const timer = setInterval(refresh, 60_000);
    const onVisibility = () => {
      if (!document.hidden) refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const startDate = range?.from ? formatISODate(range.from) : null;
  const endDate = range?.to ? formatISODate(range.to) : null;
  const filtered = useMemo(
    () =>
      visibleEvents(
        events.filter(
          (event) => !category || event.categories.includes(category),
        ),
        today,
        startDate,
        endDate,
      ),
    [events, today, category, startDate, endDate],
  );

  useGSAP(
    () => {
      const matchMedia = gsap.matchMedia();
      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const nodes = gsap.utils.toArray(
          "[data-events-reveal]",
          rootRef.current,
        );
        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: node, start: "top 94%", once: true },
            },
          );
        });
      });
      ScrollTrigger.refresh();
      return () => matchMedia.revert();
    },
    {
      scope: rootRef,
      dependencies: [category, startDate, endDate, today],
      revertOnUpdate: true,
    },
  );

  function clearFilters() {
    setCategory(null);
    setRange(null);
  }

  return (
    <main
      ref={rootRef}
      className="min-w-0 flex-1 bg-secondary text-foreground"
      id="main-content"
    >
      <a
        href="#events-page-title"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-20 focus:z-[80] focus:bg-secondary focus:px-4 focus:py-3 focus:text-main focus:outline-2 focus:outline-main"
      >
        Skip to event content
      </a>
      <section
        aria-label="Savannah streets"
        className="relative h-[52vh] min-h-[330px] max-h-[650px] overflow-hidden bg-main"
      >
        <Image
          src="https://sabal-house.b-cdn.net/savannah-year-round/savannah-year-round-header.png"
          alt="Tree-lined Savannah avenue in the historic district"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
      </section>

      <section
        aria-labelledby="events-page-title"
        className="mx-auto max-w-[920px] px-6 pb-10 pt-16 text-center sm:pb-16 sm:pt-20 lg:pt-24"
      >
        <p
          data-events-reveal
          className="font-central-regular text-[11px] uppercase tracking-[0.055em]"
        >
          A city for every season
        </p>
        <h1
          data-events-reveal
          id="events-page-title"
          className="mt-5 font-benton-light text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] tracking-[-0.05em]"
        >
          Savannah on the Calendar
        </h1>
        <p
          data-events-reveal
          className="mx-auto mt-7 max-w-[56ch] font-central-regular text-[15px] leading-[1.6] sm:text-[17px]"
        >
          There’s always a reason to visit Savannah. From the gardens opening
          their gates in spring to the festivals, markets, and celebrations that
          bring the city together, there’s something to look forward to
          throughout the year.
        </p>
        <p
          data-events-reveal
          className="mx-auto mt-6 font-central-regular text-[15px] leading-[1.6] sm:text-[17px]"
        >
          Take a look at what’s coming up. We’d love to welcome you for it.
        </p>
      </section>

      <section
        aria-label="Savannah events list and filters"
        className="mx-auto w-full max-w-[1230px] px-5 pb-24 sm:px-8 lg:pb-36"
      >
        <div className="relative z-20 grid grid-cols-2 items-center gap-x-4 gap-y-2 border-b border-[#cfc8bc] pb-4 md:grid-cols-3 md:pb-6">
          <EventDateFilter today={today} value={range} onChange={setRange} />
          <div className="col-span-2 row-start-2 justify-self-center md:col-span-1 md:col-start-2 md:row-start-1">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-12 items-center border-b border-current px-3 font-central-regular text-[11px] uppercase tracking-[0.04em] transition-colors hover:text-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main sm:text-[12px]"
            >
              All Events
            </button>
          </div>
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        <p
          aria-live="polite"
          aria-atomic="true"
          className="mt-5 font-central-regular text-xs text-foreground/65"
        >
          Showing {filtered.length} upcoming{" "}
          {filtered.length === 1 ? "event" : "events"}
          {category ? ` in ${category}` : ""}
          {range ? " for your selected dates" : ""}.
        </p>

        <div className="mx-auto mt-4 max-w-[1030px]">
          {filtered.length ? (
            filtered.map((item) => <EventRow key={item.event.id} item={item} />)
          ) : (
            <div className="py-20 text-center sm:py-28">
              <h2 className="font-benton-light text-3xl tracking-[-0.035em]">
                Nothing on the calendar just yet.
              </h2>
              <p className="mx-auto mt-4 max-w-[45ch] font-central-regular text-sm leading-relaxed">
                Try a different category or another date range to see more of
                Savannah.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-7 min-h-11 border-b border-main font-central-regular text-xs uppercase tracking-wide hover:text-main focus-visible:outline-2 focus-visible:outline-main"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
