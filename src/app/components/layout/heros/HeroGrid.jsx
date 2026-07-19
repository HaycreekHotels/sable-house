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

const VIDEO_POSTER =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop";

const GRID_ITEMS = [
  // Row 1
  {
    id: "interior-01",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431948/1st_m3hsdp.jpg",
  },
  {
    id: "interior-02",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431945/2nd_zuqgao.jpg",
  },
  {
    id: "interior-03",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431946/3rd_kq3a7y.jpg",
  },
  {
    id: "interior-04",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431945/4th_igbefl.jpg",
  },
  {
    id: "interior-05",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431947/5th_xbmlxk.jpg",
  },

  // Row 2
  {
    id: "interior-06",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431948/6th_oa4pdx.jpg",
  },
  {
    id: "hero-video-placeholder",
    type: "video-placeholder",
  },
  {
    id: "interior-08",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431948/8th_sfhuul.jpg",
  },
  {
    id: "interior-09",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431947/9th_rnp2ly.jpg",
  },
  {
    id: "interior-10",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431946/10th_r15mxi.jpg",
  },

  // Row 3
  {
    id: "interior-11",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431946/11th_wxezve.jpg",
  },
  {
    id: "interior-12",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431949/12th_ug70iw.jpg",
  },
  {
    id: "interior-13",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431949/13th_glnahg.jpg",
  },
  {
    id: "interior-14",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431950/14th_y4gvfh.jpg",
  },
  {
    id: "interior-15",
    type: "image",
    src: "https://res.cloudinary.com/dnhvjwqak/image/upload/v1784431950/15th_emwqep.jpg",
  },
];

const tileClass =
  "hero-tile relative min-h-0 min-w-0 overflow-hidden bg-neutral-900";

const placeholderClass =
  "video-placeholder relative col-start-2 row-start-2 min-h-0 min-w-0 overflow-hidden bg-neutral-900";

const mediaClass = "h-full w-full object-cover";

export default function HeroGrid() {
  const sectionRef = useRef(null);
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
      const video = videoLayer?.querySelector("video");

      if (!section || !placeholder || !videoLayer || !heroCopy) return;

      const getStartBounds = () => {
        const sectionBox = section.getBoundingClientRect();
        const placeholderBox = placeholder.getBoundingClientRect();

        return {
          top: placeholderBox.top - sectionBox.top,
          left: placeholderBox.left - sectionBox.left,
          width: placeholderBox.width,
          height: placeholderBox.height,
        };
      };

      const getScrollDistance = () => {
        const width = window.innerWidth;

        if (width < 640) return "+=950";
        if (width < 1024) return "+=1250";

        return "+=1600";
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        video?.pause();

        gsap.set(videoLayer, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 20,
          opacity: 1,
          overflow: "hidden",
        });

        gsap.set(".hero-tile", {
          opacity: 0,
        });

        gsap.set(heroCopy, {
          opacity: 1,
          y: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(videoLayer, {
          position: "absolute",
          zIndex: 20,
          overflow: "hidden",
          opacity: 1,
          willChange: "top, left, width, height",
        });

        gsap.set(heroCopy, {
          opacity: 0,
          y: 40,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: getScrollDistance,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
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
            ease: "none",
          },
        );

        tl.to(
          ".hero-tile",
          {
            opacity: 0,
            scale: 0.92,
            ease: "none",
          },
          "<",
        );

        tl.to(heroCopy, {
          opacity: 1,
          y: 0,
          duration: 0.25,
        });

        tl.to(heroCopy, {
          opacity: 0,
          y: 0,
          duration: 0.5,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
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
      <header className="relative z-10 flex w-full shrink-0 items-center justify-center bg-main px-4 py-3 sm:py-4 lg:py-5">
        <Image
          src={logo}
          alt="Sabal House"
          loading="eager"
          className="h-auto w-28 sm:w-36 lg:w-44"
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
            grid-rows-5
            gap-1.5

            sm:gap-2
            lg:gap-3

            landscape:grid-cols-5
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

      {/* Decorative animated video */}
      <div
        ref={videoLayerRef}
        className="pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <video
          id="hero-background-video"
          ref={videoRef}
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
      </div>

      {/* Hero content */}
      <div
        ref={heroCopyRef}
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          grid
          translate-y-10
          place-items-center
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
            backdrop-blur-[2px]
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
            font-benton-regular
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              sm:text-5xl
              md:text-6xl
              lg:text-8xl
              text-shadow-lg
            "
          >
            Savannah Beyond The Square
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-central-regular text-sm uppercase leading-6 sm:mt-6 sm:text-xl sm:leading-8 md:text-2xl">
            Unveiling Sabal House | December 2026
          </p>
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
