"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { VIDEO_STORIES } from "./videoStories";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MakingOfSabalHouse() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const videoRefs = useRef([]);
  const playButtonRefs = useRef([]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [startedVideoIndex, setStartedVideoIndex] = useState(null);

  /*
   * Subtle entrance animation.
   *
   * The original component already had the refs/imports for GSAP but the
   * animation hook was empty. This keeps the motion restrained and gives
   * reduced-motion users the static layout immediately.
   */
  useGSAP(
    () => {
      const section = sectionRef.current;
      const header = headerRef.current;
      const grid = gridRef.current;

      if (!section || !header || !grid) return;

      const cards = gsap.utils.toArray("[data-video-card]", grid);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
          defaults: {
            ease: "power2.out",
          },
        });

        timeline.fromTo(
          header.children,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
        );

        timeline.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
          },
          "-=0.38",
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...header.children, ...cards], {
          clearProps: "opacity,visibility,transform",
        });
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  async function handlePlayVideo(index) {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) return;

    /*
     * Only one interview can play at a time.
     */
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video || videoIndex === index) return;

      resetVideo(video);
    });

    /*
     * Keep the poster image visible until the browser has actually rendered
     * playback. This avoids a brief gray/black frame in Safari.
     */
    setStartedVideoIndex(null);
    setActiveVideoIndex(index);

    try {
      await selectedVideo.play();

      selectedVideo.focus({
        preventScroll: true,
      });
    } catch (error) {
      console.error("The video could not begin playback.", error);

      resetVideo(selectedVideo);
      setStartedVideoIndex(null);
      setActiveVideoIndex(null);

      window.requestAnimationFrame(() => {
        playButtonRefs.current[index]?.focus({
          preventScroll: true,
        });
      });
    }
  }

  function handleCloseVideo(index) {
    const video = videoRefs.current[index];

    if (!video) return;

    resetVideo(video);
    setStartedVideoIndex(null);
    setActiveVideoIndex(null);

    window.requestAnimationFrame(() => {
      playButtonRefs.current[index]?.focus({
        preventScroll: true,
      });
    });
  }

  function handleVideoEnded(index) {
    const video = videoRefs.current[index];

    if (!video) return;

    const shouldRestoreFocus = document.activeElement === video;

    resetVideo(video);
    setStartedVideoIndex(null);
    setActiveVideoIndex(null);

    if (shouldRestoreFocus) {
      window.requestAnimationFrame(() => {
        playButtonRefs.current[index]?.focus({
          preventScroll: true,
        });
      });
    }
  }

  function resetVideo(video) {
    if (!video) return;

    video.pause();

    try {
      video.currentTime = 0;
    } catch (error) {
      console.warn("The video could not be rewound.", error);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="making-of-sabal-house-title"
      className="
        w-full
        px-5
        py-20

        sm:px-8
        sm:py-24

        lg:px-10
        lg:pb-16
        lg:pt-0
      "
    >
      <div className="mx-auto max-w-[1400px]">
        <header
          ref={headerRef}
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >
          <h2
            id="making-of-sabal-house-title"
            className="
              text-balance
              font-benton-regular
              text-[clamp(2.4rem,10vw,3.5rem)]
              leading-[0.98]
              tracking-[-0.035em]
              text-stone-950

              md:text-[clamp(3rem,5vw,4.5rem)]
            "
          >
            The Making of Sabal House
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl

              text-pretty
              font-central-regular
              text-[14px]
              leading-[1.65]
              text-stone-900

              sm:mt-6
              sm:text-base
              sm:leading-[1.6]
            "
          >
            Sabal House is being shaped by many hands, each bringing a distinct
            understanding of Savannah, hospitality, and home. Meet the people
            intentionally and thoughtfully bringing this story to life.
          </p>
        </header>

        <div
          ref={gridRef}
          className="
            mt-12
            grid
            grid-cols-1
            gap-x-8
            gap-y-12

            sm:mt-14
            sm:gap-y-14

            md:grid-cols-2
            md:gap-x-8

            lg:mt-20
            lg:gap-x-10

            xl:grid-cols-3
            xl:gap-x-14
            xl:gap-y-16
          "
        >
          {VIDEO_STORIES.map((story, index) => {
            const isActive = activeVideoIndex === index;
            const hasStarted = startedVideoIndex === index;

            const titleId = `${story.id}-title`;
            const descriptionId = `${story.id}-description`;

            return (
              <article
                key={story.id}
                id={story.id}
                data-video-card
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="
                  mx-auto
                  w-full
                  max-w-[390px]
                "
              >
                <h3 id={titleId} className="sr-only">
                  {story.name}, {story.role}
                </h3>

                <div
                  className="
                    group
                    relative
                    isolate
                    aspect-[9/16]
                    overflow-hidden
                    bg-stone-950
                  "
                >
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    poster={story.posterUrl}
                    preload="metadata"
                    playsInline
                    controls={isActive}
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`Video interview with ${story.name}, ${story.role}`}
                    aria-describedby={descriptionId}
                    onPlaying={() => {
                      setStartedVideoIndex(index);
                    }}
                    onEnded={() => handleVideoEnded(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        event.preventDefault();
                        handleCloseVideo(index);
                      }
                    }}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                  >
                    <source src={story.videoUrl} type="video/mp4" />

                    {story.captionsUrl && (
                      <track
                        kind="captions"
                        src={story.captionsUrl}
                        srcLang="en"
                        label="English"
                        default
                      />
                    )}

                    Your browser does not support HTML video.
                  </video>

                  {/*
                   * Explicit poster layer prevents Safari from flashing a
                   * blank frame while switching into playback.
                   */}
                  <Image
                    src={story.posterUrl}
                    alt=""
                    fill
                    aria-hidden="true"
                    sizes="
                      (min-width: 1280px) 390px,
                      (min-width: 768px) 50vw,
                      100vw
                    "
                    className={`
                      pointer-events-none
                      z-10
                      object-cover

                      transition-opacity
                      duration-300

                      motion-reduce:transition-none

                      ${
                        isActive && hasStarted
                          ? "opacity-0"
                          : "opacity-100"
                      }
                    `}
                  />

                  {!isActive ? (
                    <>
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          z-[15]

                          bg-black/10

                          transition-colors
                          duration-300

                          group-hover:bg-black/30
                          group-focus-within:bg-black/30

                          motion-reduce:transition-none
                        "
                      />

                      <button
                        ref={(node) => {
                          playButtonRefs.current[index] = node;
                        }}
                        type="button"
                        aria-label={`Play video interview with ${story.name}, ${story.role}`}
                        aria-describedby={descriptionId}
                        onClick={() => handlePlayVideo(index)}
                        className="
                          absolute
                          inset-0
                          z-20

                          cursor-pointer
                          bg-transparent

                          focus-visible:outline-none
                          focus-visible:ring-4
                          focus-visible:ring-inset
                          focus-visible:ring-white
                        "
                      >
                        <span
                          aria-hidden="true"
                          className="
                            absolute
                            bottom-0
                            right-0

                            grid
                            size-14
                            place-items-center

                            bg-black
                            text-white

                            transition-colors
                            duration-300

                            group-hover:bg-neutral-800

                            sm:size-16
                          "
                        >
                          <PlayIcon />
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCloseVideo(index)}
                      aria-label={`Close video interview with ${story.name}`}
                      className="
                        absolute
                        right-3
                        top-3
                        z-20

                        grid
                        size-11
                        place-items-center

                        bg-stone-950/95
                        text-white

                        transition-colors
                        hover:bg-stone-800

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-white
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-stone-950
                      "
                    >
                      <CloseIcon />
                    </button>
                  )}
                </div>

                <p id={descriptionId} className="sr-only">
                  {story.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
    >
      <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 stroke-current"
      fill="none"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
