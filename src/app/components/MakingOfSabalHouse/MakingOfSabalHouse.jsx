"use client";

import { useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { VIDEO_STORIES } from "./videoStories";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MakingOfSabalHouse() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const videoRefs = useRef([]);
  const playButtonRefs = useRef([]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  useGSAP(
    () => {
      const grid = gridRef.current;

      if (!grid) {
        return;
      }

      const cards = gsap.utils.toArray("[data-video-card]", sectionRef.current);

      if (!cards.length) {
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          motionAllowed: "(prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reducedMotion } = context.conditions;

          if (reducedMotion) {
            gsap.set(cards, {
              clearProps: "all",
            });

            return;
          }

          gsap.from(cards, {
            opacity: 0,
            y: 64,
            scale: 0.985,
            duration: 1.15,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true,
            },
          });
        },
      );

      return () => media.revert();
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

    setActiveVideoIndex(index);

    try {
      await selectedVideo.play();

      selectedVideo.focus({
        preventScroll: true,
      });
    } catch (error) {
      console.error("The video could not begin playback.", error);

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
    setActiveVideoIndex(null);

    requestAnimationFrame(() => {
      playButtonRefs.current[index]?.focus();
    });
  }

  function handleVideoEnded(index) {
    const video = videoRefs.current[index];
    const shouldRestoreFocus = document.activeElement === video;

    resetVideo(video);
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
    video.currentTime = 0;
    video.load();
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="making-of-sabal-house-title"
      className=" px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-6xl text-center">
          <h2
            id="making-of-sabal-house-title"
            className="text-balance font-serif text-4xl leading-tight text-stone-950 italic sm:text-5xl"
          >
            The Making of Sabal House
          </h2>

          <p className="mx-auto mt-6 max-w-6xl text-pretty text-base leading-7 text-stone-900 sm:text-lg sm:leading-8">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex.
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
                className="mx-auto w-full max-w-sm"
              >
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

                  {!isActive ? (
                    <>
                      <div
                        ref={(node) => {
                          playButtonRefs.current[index] = node;
                        }}
                        onClick={() => handlePlayVideo(index)}
                        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 text-center transition-colors duration-500 group-hover:bg-black/35 group-focus-within:bg-black/35 motion-reduce:transition-none"
                      ></div>

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
