"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC =
  "https://res.cloudinary.com/dnhvjwqak/video/upload/v1784433896/Sabal_House_-_Draft_2_p29tun.mp4";

const VIDEO_POSTER = "../../../../../public/images/logos/video poster.png";

const GRID_ITEMS = [
  // Row 1
  {
    id: "interior-01",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784516660/1st_1_bngnyk.jpg",
  },
  {
    id: "interior-02",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784516661/2nd_1_fdsk8x.jpg",
  },
  {
    id: "interior-03",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784516660/6th_1_xcwern.jpg",
  },
  {
    id: "interior-04",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784563887/5th_1_f7vso4.jpg",
  },
  {
    id: "interior-05",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784563883/3rd_1_1_iyegwg.jpg",
  },

  // Row 2
  {
    id: "interior-06",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784516660/7th_khgxp8.jpg",
  },
  {
    id: "hero-video-placeholder",
    type: "video-placeholder",
  },
  {
    id: "interior-08",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784516661/8th_1_inhxmt.jpg",
  },
  {
    id: "interior-09",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784516660/9th_1_wy6oup.jpg",
  },
];

const tileClass =
  "hero-tile relative min-h-0 min-w-0 overflow-hidden bg-neutral-900";

const placeholderClass =
  "video-placeholder relative col-start- row-start-2 min-h-0 min-w-0 overflow-hidden bg-neutral-900";

const mediaClass = "h-full w-full object-cover";

export default function HeroFlatGrid() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const placeholderRef = useRef(null);
  const videoLayerRef = useRef(null);
  const videoRef = useRef(null);
  const heroCopyRef = useRef(null);

  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    let hasScrolled = window.scrollY > 10;

    const revealTimer = window.setTimeout(() => {
      if (!hasScrolled) {
        setShowScrollIndicator(true);
      }
    }, 1800);

    function handleFirstScroll() {
      hasScrolled = true;
      setShowScrollIndicator(false);
      window.clearTimeout(revealTimer);
    }

    window.addEventListener("scroll", handleFirstScroll, {
      passive: true,
    });

    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener("scroll", handleFirstScroll);
    };
  }, []);

  function handleScrollIndicatorClick() {
    setShowScrollIndicator(false);

    const prefersReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollBy({
      top: Math.max(window.innerHeight * 0.35, 240),
      behavior: prefersReduceMotion ? "auto" : "smooth",
    });
  }

  async function handleVideoToggle() {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        setIsVideoPaused(true);
      }

      return;
    }

    video.pause();
  }

  useGSAP(
    () => {
      const section = sectionRef.current;
      const placeholder = placeholderRef.current;
      const videoLayer = videoLayerRef.current;
      const heroCopy = heroCopyRef.current;
      const video = videoRef.current;

      if (!section || !placeholder || !videoLayer || !heroCopy) {
        return;
      }

      function getStartBounds() {
        const sectionBox = section.getBoundingClientRect();
        const placeholderBox = placeholder.getBoundingClientRect();

        return {
          top: placeholderBox.top - sectionBox.top,
          left: placeholderBox.left - sectionBox.left,
          width: placeholderBox.width,
          height: placeholderBox.height,
        };
      }

      function getScrollDistance() {
        const width = window.innerWidth;

        if (width < 640) {
          return "+=950";
        }

        if (width < 1024) {
          return "+=1250";
        }

        return "+=1600";
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        video?.pause();

        gsap.set(videoLayer, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 20,
          autoAlpha: 1,
          overflow: "hidden",
        });

        gsap.set(".hero-tile", {
          autoAlpha: 0,
        });

        gsap.set(heroCopy, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(videoLayer, {
          position: "absolute",
          zIndex: 20,
          overflow: "hidden",
          autoAlpha: 1,
          willChange: "top, left, width, height",
        });

        gsap.set(heroCopy, {
          autoAlpha: 0,
          y: 30,
          scale: 0.7,
          transformOrigin: "center center",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: getScrollDistance,
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.addLabel("expansionStart", 0);

        // Grow the video from its grid tile to full screen.
        timeline.fromTo(
          videoLayer,
          {
            top: () => getStartBounds().top,
            left: () => getStartBounds().left,
            width: () => getStartBounds().width,
            height: () => getStartBounds().height,
          },
          {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            duration: 2,
            ease: "none",
          },
          "expansionStart",
        );

        // Fade the surrounding collage while the video expands.
        timeline.to(
          ".hero-tile",
          {
            autoAlpha: 0,
            scale: 0.92,
            duration: 2,
            ease: "none",
          },
          "expansionStart",
        );

        // Reveal and grow the overlay shortly after expansion begins.
        timeline.fromTo(
          heroCopy,
          {
            autoAlpha: 0,
            y: 30,
            scale: 0.7,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power2.out",
          },
          "expansionStart+=0.35",
        );

        // The video reaches full screen here.
        timeline.addLabel("fullScreen", "expansionStart+=2");

        // Fade the overlay only after full-screen expansion.
        timeline.to(
          heroCopy,
          {
            autoAlpha: 0,
            y: -20,
            scale: 1.02,
            duration: 0.65,
            ease: "power1.in",
          },
          "fullScreen+=0.1",
        );
      });

      return () => {
        media.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="
        relative
        isolate
        ml-[calc(50%_-_50vw)]
        grid
        h-svh
        w-screen
        max-w-none
        grid-rows-[auto_minmax(0,1fr)]
        overflow-hidden
        bg-secondary
      "
    >
      {/* Brand header */}
      <header className="relative z-10 flex w-full shrink-0 items-center justify-center bg-main px-4 py-3 sm:py-4 lg:py-4">
        <Image
          src={logo}
          alt="Sabal House"
          loading="eager"
          className="h-auto w-24 sm:w-24 lg:w-28"
        />
      </header>

      {/* Decorative image collage */}
      <div className="min-h-0 p-2 sm:p-3 lg:p-4">
        <div
          aria-hidden="true"
          className="
            grid
            h-full
            min-h-0
            w-full
            grid-cols-3
            grid-rows-3
            gap-1.5

            sm:gap-2
            lg:gap-6

            landscape:grid-cols-3
            landscape:grid-rows-3
          "
        >
          {GRID_ITEMS.map((item) => {
            if (item.type === "video-placeholder") {
              return (
                <div
                  key={item.id}
                  ref={placeholderRef}
                  className={placeholderClass}
                />
              );
            }

            return (
              <div key={item.id} className={tileClass}>
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(orientation: portrait) 33vw, 20vw"
                  className={mediaClass}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated video and overlay */}
      <div ref={videoLayerRef} className="pointer-events-none opacity-0">
        <video
          id="hero-background-video"
          ref={videoRef}
          aria-hidden="true"
          className={mediaClass}
          poster={VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsVideoPaused(false)}
          onPause={() => setIsVideoPaused(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Your browser does not support background video playback.
        </video>

        <div
          ref={heroCopyRef}
          className="
      absolute
      inset-0
      z-10
      grid
      place-items-center
      overflow-hidden
      px-4
      text-center
      opacity-0
      sm:px-6
    "
        >
          <div
            className="
        max-w-[calc(100vw-2rem)]
        px-5
        py-6
        text-white
        sm:max-w-2xl
        sm:px-8
        sm:py-8
        lg:max-w-full
        lg:px-12
        lg:py-10
      "
          >
            <h1
              id="hero-title"
              className="
          font-benton-light
          text-2xl
          font-bold
          leading-tight
          text-shadow-lg
          sm:text-5xl
          md:text-6xl
          lg:text-[68px]
        "
            >
              <span className="font-central-regular font-normal">
                Introducing
              </span>
              <br />
              Savannah Beyond The Square
            </h1>

            <p
              className="
          absolute
          bottom-20
          left-1/2
          w-[calc(100%-2rem)]
          max-w-2xl
          -translate-x-1/2
          text-center
          font-central-regular
          text-xs
          uppercase
          leading-relaxed
          tracking-[0.12em]
          text-white
          sm:bottom-16
          sm:text-base
          md:bottom-12
          md:text-xl
          lg:bottom-10
          lg:text-2xl
        "
            >
              Unveiling Sabal House
              <br />
              December 2026
            </p>
          </div>
        </div>
      </div>

      {/* Scroll prompt */}
      {showScrollIndicator && (
        <button
          type="button"
          onClick={handleScrollIndicatorClick}
          className="
      absolute
      bottom-4
      left-1/2
      z-40
      flex
      min-h-11
      -translate-x-1/2
      flex-col
      items-center
      justify-center
      gap-2
      border
      border-white/80
      bg-black/70
      px-5
      py-3
      text-xs
      font-semibold
      uppercase
      tracking-[0.16em]
      text-white
      shadow-lg
      backdrop-blur-sm
      transition-colors
      duration-300
      hover:bg-black
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-4
      focus-visible:outline-white
      motion-reduce:transition-none
      sm:bottom-6
    "
        >
          <span>Scroll to explore</span>

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="
        h-5
        w-5
        animate-bounce
        motion-reduce:animate-none
      "
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Accessible video playback control */}
      <button
        type="button"
        aria-controls="hero-background-video"
        onClick={handleVideoToggle}
        className="
          absolute
          bottom-3
          right-3
          z-40
          min-h-11
          min-w-11
          border
          border-white/80
          bg-black/75
          px-4
          py-2
          text-xs
          font-semibold
          uppercase
          tracking-[0.12em]
          text-white
          shadow-lg
          transition-colors
          hover:bg-black
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-white
          motion-reduce:transition-none
          sm:bottom-4
          sm:right-4
        "
      >
        {isVideoPaused ? "Play video" : "Pause video"}
      </button>
    </section>
  );
}
