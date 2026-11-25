"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Use the same GSAP setup and reduced-motion convention as the existing site.
gsap.registerPlugin(useGSAP, ScrollTrigger);

const INTRO_VIDEO =
  "https://sabal-house.b-cdn.net/unmarked-door/Final%20Door%20Swinging.mp4";
const INTRO_FADE_MS = 350;

const FADE_BEFORE_END_SECONDS = 0.22;

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

function DestinationCard({ card, wide }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const headingId = useId();

  return (
    <article data-door-reveal className="min-w-0">
      <div
        className={`relative w-full overflow-hidden bg-[#dcd9d3] ${
          wide ? "aspect-[5/4]" : "aspect-[4/5]"
        }`}
      >
        {card.image ? (
          <div data-door-image className="absolute -inset-[3%]">
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
              <dl className="grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-6 sm:gap-y-10">
                <div className="min-w-0">
                  <dt className="font-central-regular text-[10px] font-semibold leading-[1.4] uppercase tracking-[0.025em] sm:text-[11px]">
                    Location
                  </dt>
                  <dd className="mt-5 font-benton-light text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.2] italic tracking-[-0.025em] break-words">
                    {card.location}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="font-central-regular text-[10px] font-semibold leading-[1.4] uppercase tracking-[0.025em] sm:text-[11px]">
                    Best for
                  </dt>
                  <dd className="mt-5 font-benton-light text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.2] italic tracking-[-0.025em]">
                    {card.bestFor}
                  </dd>
                </div>
                <div className="col-span-2 min-w-0">
                  <dt className="font-central-regular text-[10px] font-semibold leading-[1.4] uppercase tracking-[0.025em] sm:text-[11px]">
                    A little tip
                  </dt>
                  <dd className="mt-4 max-w-[50ch] font-central-regular text-[13px] leading-[1.65] italic text-foreground sm:text-[14px]">
                    {card.tip}
                  </dd>
                </div>
              </dl>
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

function EditorialSection({ section }) {
  const wide = section.cards.length === 2;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="mx-auto w-full max-w-[1720px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-28"
    >
      <div
        data-door-reveal
        className="mb-10 grid max-w-[1000px] grid-cols-1 items-start gap-4 sm:mb-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] md:gap-9 lg:mb-16"
      >
        <h2
          id={`${section.id}-heading`}
          className="font-benton-light text-[clamp(2rem,3.2vw,3.15rem)] leading-[1.1] tracking-[-0.05em]"
        >
          {section.title}
        </h2>
        <p className="max-w-[570px] font-central-regular text-[15px] leading-[1.6] sm:text-base lg:text-[17px]">
          {section.description}
        </p>
      </div>

      <div
        className={`grid gap-x-5 gap-y-12 sm:gap-x-6 sm:gap-y-14 lg:gap-x-8 ${
          wide
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {section.cards.map((card) => (
          <DestinationCard key={card.id} card={card} wide={wide} />
        ))}
      </div>
    </section>
  );
}

function OpeningEditorial({ headingRef }) {
  return (
    <header className="mx-auto w-full max-w-[1720px] px-5 pt-12 pb-14 sm:px-8 sm:pt-20 sm:pb-20 lg:px-12 lg:pt-24 lg:pb-24 xl:px-16">
      <h1
        ref={headingRef}
        data-door-intro
        id="unmarked-door-title"
        tabIndex={-1}
        className="flex flex-wrap items-start justify-between gap-x-[0.24em] gap-y-1 font-benton-regular  text-[clamp(3.3rem,8.5vw,9rem)] leading-[3] tracking-[-0.015em] focus:outline-none"
      >
        <span></span>
        <span>The Unmarked Door</span>
        <span></span>
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-y-12 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6 xl:col-span-6">
          <div data-door-intro className="max-w-[500px] lg:ml-[9%]">
            <h2 className="max-w-[280px] font-central-regular text-base leading-[1.35] font-semibold tracking-[0.015em] uppercase sm:text-[17px]">
              A different side of Savannah, just for you
            </h2>
            <div className="mt-8 max-w-[455px] space-y-6 font-central-regular text-[15px] leading-[1.68] sm:text-[16px]">
              <p>
                Some of Savannah’s best places are the ones you might otherwise
                walk right past. An unassuming door down a quiet lane could lead
                you to a cocktail bar where the drinks are thoughtfully made and
                conversations with strangers turn into an evening well spent.
              </p>
              <p>As our guest, we’d love to share a few of them with you.</p>
              <p>
                Consider this our collection of places worth knowing. Each
                chosen for something that makes it distinctly Savannah, and each
                an invitation to discover a little more of the city.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-7 lg:mt-36">
            <div
              data-door-intro
              className="relative aspect-[4/5] overflow-hidden bg-[#dcd9d3]"
            >
              <Image
                src="https://sabal-house.b-cdn.net/unmarked-door/intro-brick.jpg"
                alt="Weathered brickwork among Savannah trees"
                fill
                priority
                sizes="(max-width: 639px) 44vw, (max-width: 1023px) 35vw, 22vw"
                className="object-cover"
              />
            </div>
            <div
              data-door-intro
              className="relative aspect-[4/5] overflow-hidden bg-[#dcd9d3]"
            >
              <Image
                src="https://sabal-house.b-cdn.net/unmarked-door/intro-moss.jpg"
                alt="Sunlight filtering through the Spanish moss in Savannah"
                fill
                priority
                sizes="(max-width: 639px) 44vw, (max-width: 1023px) 35vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div
          data-door-intro
          className="lg:col-span-5 lg:col-start-8 lg:pt-20 xl:pt-28"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#dcd9d3]">
            <Image
              src="https://sabal-house.b-cdn.net/unmarked-door/intro-house.jpg"
              alt="Savannah townhouse with dark shutters and a red front door"
              fill
              priority
              sizes="(max-width: 1023px) calc(100vw - 40px), 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function UnmarkedDoorClient({ sections }) {
  const [introPhase, setIntroPhase] = useState("playing");
  const mainRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const restoreScrollRef = useRef(null);

  // Restore the original inline overflow values exactly once. Calling this
  // directly from the skip/ended handler is important: scrolling should NOT
  // depend on React finishing an animation or running a later effect cleanup.
  const releaseScrollLock = useCallback(() => {
    const restore = restoreScrollRef.current;
    if (restore) {
      restoreScrollRef.current = null;
      restore();
    }
  }, []);

  const finishIntro = useCallback(() => {
    releaseScrollLock();
    videoRef.current?.pause();
    setIntroPhase((phase) => (phase === "playing" ? "leaving" : phase));
  }, [releaseScrollLock]);

  // Only lock while the video is playing. Returning to this page or unmounting
  // during playback also releases the lock (including in React Strict Mode).
  useEffect(() => {
    if (introPhase !== "playing") return undefined;

    const body = document.body;
    const html = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    restoreScrollRef.current = () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };

    return releaseScrollLock;
  }, [introPhase, releaseScrollLock]);

  // Reduced-motion visitors go straight to the page. Otherwise play once and
  // provide a safety fallback if the browser never fires media events.
  useEffect(() => {
    if (introPhase !== "playing") return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      releaseScrollLock();
      videoRef.current?.pause();
      setIntroPhase("done");
      return undefined;
    }

    const safetyTimer = window.setTimeout(finishIntro, 6500);
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(finishIntro);
      }
    }

    return () => window.clearTimeout(safetyTimer);
  }, [introPhase, finishIntro, releaseScrollLock]);

  // The overlay begins fading as soon as the video finishes or Skip is clicked.
  // The document has already been unlocked by finishIntro at this point.
  useEffect(() => {
    if (introPhase !== "leaving") return undefined;

    const transitionTimer = window.setTimeout(() => {
      setIntroPhase("done");
    }, INTRO_FADE_MS + 30);

    return () => window.clearTimeout(transitionTimer);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "done") return undefined;

    // Give keyboard and screen-reader users a meaningful position after the
    // dialog disappears, without jumping the scroll position.
    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [introPhase]);

  useGSAP(
    () => {
      if (introPhase === "playing" || !mainRef.current) return undefined;

      const main = mainRef.current;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const entrance = gsap.utils.toArray("[data-door-intro]", main);
        gsap.fromTo(
          entrance,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.105,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform",
          },
        );

        const revealItems = gsap.utils.toArray("[data-door-reveal]", main);
        revealItems.forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 35 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.05,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
      });

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray("[data-door-image]", main).forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -2 },
              {
                yPercent: 2,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );
          });
        },
      );

      return () => mm.revert();
    },
    {
      scope: mainRef,
      dependencies: [introPhase === "playing"],
      revertOnUpdate: true,
    },
  );

  return (
    <>
      {introPhase !== "done" && (
        <div
          role="dialog"
          aria-modal={introPhase === "playing"}
          aria-label="Opening film for The Unmarked Door"
          inert={introPhase === "leaving"}
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-secondary transition-opacity duration-[350ms] ease-in-out motion-reduce:transition-none ${
            introPhase === "leaving"
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            onEnded={finishIntro}
            onError={finishIntro}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (
                Number.isFinite(video.duration) &&
                video.duration > 0 &&
                video.duration - video.currentTime <= FADE_BEFORE_END_SECONDS
              ) {
                finishIntro();
              }
            }}
            className="h-full w-full object-contain"
          >
            <source src={INTRO_VIDEO} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={finishIntro}
            disabled={introPhase !== "playing"}
            className="absolute bottom-6 right-6 z-10 min-h-11 border-b border-current px-2 py-2 font-central-regular text-[12px] tracking-[0.08em] uppercase text-foreground transition-colors hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main sm:bottom-10 sm:right-10"
          >
            Skip introduction
          </button>
        </div>
      )}

      <main
        ref={mainRef}
        aria-label="The Unmarked Door — a Savannah guest guide"
        aria-hidden={introPhase === "playing"}
        inert={introPhase === "playing"}
        className="min-h-screen w-full flex-1 overflow-x-clip bg-secondary text-foreground"
      >
        {/* Heading receives focus when the intro is skipped or ends. */}
        <OpeningEditorial headingRef={headingRef} />
        {sections.map((section) => (
          <EditorialSection key={section.id} section={section} />
        ))}
        <div className="h-16 sm:h-24 lg:h-32" aria-hidden="true" />
      </main>
    </>
  );
}
