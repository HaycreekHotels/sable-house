"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo({
  videoSrc,
  poster,
  eyebrow,
  headingStart = "A",
  headingMiddle = "Quiet Place",
  headingEnd = "To Come Alive.",
  className = "",
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      if (motionQuery.matches) {
        video.pause();
        setIsPlaying(false);
        return;
      }

      const playPromise = video.play();

      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", applyMotionPreference);
    };
  }, [videoSrc]);

  async function togglePlayback() {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Hero video could not be played:", error);
        setIsPlaying(false);
      }

      return;
    }

    video.pause();
    setIsPlaying(false);
  }

  return (
    <section
      aria-labelledby="hero-video-heading"
      className={`
        relative
        min-h-[100svh]
        w-full
        overflow-hidden
        bg-black
        ${className}
      `}
    >
      {/* Decorative background video */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Contrast treatment */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* Hero copy */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[100svh]
          w-full
          max-w-[1600px]
          items-center

          px-5
          pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))]
          pt-[max(5rem,env(safe-area-inset-top))]

          sm:px-8

          md:px-12
          md:pb-24
          md:pt-24

          lg:px-16

          xl:px-20
        "
      >
        <div className="w-full">
          {eyebrow && (
            <p
              className="
                mb-5
                text-[10px]
                font-medium
                uppercase
                tracking-[0.12em]
                text-secondary

                md:mb-7
                md:text-xs
              "
            >
              {eyebrow}
            </p>
          )}

          <h1
            id="hero-video-heading"
            className="
              flex
              w-full
              flex-col

              font-benton-regular
              text-[clamp(3rem,14vw,5rem)]
              font-normal
             
             
              text-secondary

              sm:text-[clamp(3.75rem,11vw,6rem)]

              md:grid
              md:grid-cols-[0.45fr_1.05fr_0.45fr_1.35fr]
              md:items-center
              md:gap-[2.5vw]
              md:text-[clamp(2.75rem,5.2vw,6rem)]
              

              xl:grid-cols-[0.4fr_1fr_0.55fr_1.35fr]
            "
          >
            <span className="self-start md:self-auto">{headingStart}</span>

            <span
              className="
                mt-1
                self-center

                md:mt-0
                md:self-auto
              "
            >
              {headingMiddle}
            </span>

            <span aria-hidden="true" className="hidden md:block" />

            <span
              className="
                mt-1
                self-end
                text-right

                md:mt-0
                md:self-auto
                md:text-left
              "
            >
              {headingEnd}
            </span>
          </h1>
        </div>
      </div>

      {/* Persistent playback control */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={
          isPlaying ? "Pause background video" : "Play background video"
        }
        aria-pressed={isPlaying}
        className="
          absolute
          bottom-[max(1.25rem,env(safe-area-inset-bottom))]
          right-5
          z-20

          flex
          h-12
          w-12
          items-center
          justify-center

          bg-black
          text-white

          transition-colors
          hover:bg-neutral-800

          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-white

          sm:right-8

          md:bottom-8
          md:right-12
          md:h-14
          md:w-14

          lg:right-16

          xl:right-20
        "
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <rect x="7" y="5" width="3.5" height="14" fill="currentColor" />
      <rect x="13.5" y="5" width="3.5" height="14" fill="currentColor" />
    </svg>
  );
}
