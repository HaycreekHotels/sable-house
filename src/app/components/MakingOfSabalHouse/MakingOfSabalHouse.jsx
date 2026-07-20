"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { gsap } from "gsap";
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

  useGSAP(
    () => {
      const section = sectionRef.current;
      const header = headerRef.current;
      const grid = gridRef.current;

      if (!section || !header || !grid) {
        return;
      }

      const cards = gsap.utils.toArray("[data-video-card]", section);

      const media = gsap.matchMedia();

      media.add(
        {
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reducedMotion = context.conditions?.reducedMotion;

          if (reducedMotion) {
            gsap.set(header, {
              autoAlpha: 1,
              y: 0,
              clearProps: "transform,opacity,visibility",
            });

            gsap.set(cards, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              clearProps: "transform,opacity,visibility",
            });

            return;
          }

          gsap.set(header, {
            autoAlpha: 0,
            y: 30,
          });

          gsap.set(cards, {
            autoAlpha: 0,
            y: 80,
            scale: 0.98,
            transformOrigin: "center bottom",
          });

          const revealTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
              invalidateOnRefresh: true,
            },
          });

          revealTimeline.to(header, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
          });

          revealTimeline.to(
            cards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1.6,
              stagger: 0.28,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
            },
            "-=0.2",
          );
        },
      );

      return () => {
        media.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  async function handlePlayVideo(index) {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) {
      return;
    }

    videoRefs.current.forEach((video, videoIndex) => {
      if (!video || videoIndex === index) {
        return;
      }

      resetVideo(video);
    });

    // Keep the new poster visible until Safari renders the video.
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

      requestAnimationFrame(() => {
        playButtonRefs.current[index]?.focus();
      });
    }
  }

  function handleCloseVideo(index) {
    const video = videoRefs.current[index];

    if (!video) {
      return;
    }

    resetVideo(video);
    setStartedVideoIndex(null);
    setActiveVideoIndex(null);

    requestAnimationFrame(() => {
      playButtonRefs.current[index]?.focus();
    });
  }

  function handleVideoEnded(index) {
    const video = videoRefs.current[index];

    if (!video) {
      return;
    }

    const shouldRestoreFocus = document.activeElement === video;

    resetVideo(video);
    setStartedVideoIndex(null);
    setActiveVideoIndex(null);

    if (shouldRestoreFocus) {
      requestAnimationFrame(() => {
        playButtonRefs.current[index]?.focus();
      });
    }
  }
  function resetVideo(video) {
    if (!video) {
      return;
    }

    video.pause();

    try {
      video.currentTime = 0;
    } catch (error) {
      console.warn("The video could not be rewound.", error);
    }

    video.load();
  }
  return (
    <section
      ref={sectionRef}
      aria-labelledby="making-of-sabal-house-title"
      className="px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:pb-12 lg:pt-0"
    >
      <div className="mx-auto max-w-6xl">
        <header ref={headerRef} className="mx-auto max-w-6xl text-center">
          <h2
            id="making-of-sabal-house-title"
            className="text-balance font-benton-regular text-4xl leading-tight text-stone-950 sm:text-[56px]"
          >
            Crafting Sabal House
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-pretty font-central-regular text-base leading-7 text-stone-900 sm:text-[16px] sm:leading-[1.5]">
            Sabal House is being shaped by many hands, each bringing a distinct
            understanding of Savannah, hospitality, home. Meet the people
            intentionally and thoughtfully bringing this story to life.
          </p>
        </header>

        <div
          ref={gridRef}
          className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-24 xl:grid-cols-3 xl:gap-x-20"
        >
          {VIDEO_STORIES.map((story, index) => {
            const isActive = activeVideoIndex === index;

            const titleId = `${story.id}-title`;
            const descriptionId = `${story.id}-description`;

            return (
              <article
                key={story.id}
                id={story.id}
                data-video-card
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="mx-auto w-full max-w-sm"
              >
                <h3 id={titleId} className="sr-only">
                  {story.name}, {story.role}
                </h3>

                <div className="group relative isolate aspect-[9/16] overflow-hidden bg-stone-950">
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
                        handleCloseVideo(index);
                      }
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={story.videoUrl} type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>

                  <Image
                    src={story.posterUrl}
                    alt=""
                    fill
                    aria-hidden="true"
                    sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
                    className={`
    pointer-events-none
    z-10
    object-cover
    transition-opacity
    duration-300
    motion-reduce:transition-none
    ${isActive && startedVideoIndex === index ? "opacity-0" : "opacity-100"}
  `}
                  />

                  {!isActive ? (
                    <>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-[15] bg-transparent transition-colors duration-500 group-hover:bg-black/35 group-focus-within:bg-black/35 motion-reduce:transition-none"
                      />

                      <button
                        ref={(node) => {
                          playButtonRefs.current[index] = node;
                        }}
                        type="button"
                        aria-describedby={descriptionId}
                        onClick={() => handlePlayVideo(index)}
                        className="absolute inset-0 z-20 cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white"
                      >
                        <span className="sr-only">
                          Play video interview with {story.name}, {story.role}
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCloseVideo(index)}
                      className="absolute right-3 top-3 z-20 grid size-11 cursor-pointer place-items-center bg-stone-950/95 text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
                    >
                      <span className="sr-only">
                        Close video interview with {story.name}
                      </span>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="size-5 stroke-current"
                        fill="none"
                        strokeWidth="2"
                      >
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
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
