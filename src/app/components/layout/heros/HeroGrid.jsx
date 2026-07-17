"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "../../../../../public/images/logos/SH_Primary Logo Offwhite.png";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC =
  "https://cdn.pixabay.com/video/2021/09/22/89352-613200582_large.mp4";

const VIDEO_POSTER =
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop";

const GRID_ITEMS = [
  // Row 1
  {
    id: "interior-01",
    type: "image",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-02",
    type: "image",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-03",
    type: "image",
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-04",
    type: "image",
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-05",
    type: "image",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1740&auto=format&fit=crop",
  },

  // Row 2
  {
    id: "interior-06",
    type: "image",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-07",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "hero-video-placeholder",
    type: "video-placeholder",
  },
  {
    id: "interior-08",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "interior-09",
    type: "image",
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1740&auto=format&fit=crop",
  },

  // Row 3
  {
    id: "interior-10",
    type: "image",
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-11",
    type: "image",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-12",
    type: "image",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "interior-13",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "interior-14",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
  },
];

const tileClass =
  "hero-tile relative min-h-0 min-w-0 overflow-hidden bg-neutral-900";

const placeholderClass =
  "video-placeholder relative col-start-1 row-start-2 min-h-0 min-w-0 overflow-hidden bg-neutral-900";

const mediaClass = "h-full w-full object-cover";

export default function HeroGrid() {
  const sectionRef = useRef(null);
  const placeholderRef = useRef(null);
  const videoLayerRef = useRef(null);
  const videoRef = useRef(null);
  const heroCopyRef = useRef(null);

  const [isVideoPaused, setIsVideoPaused] = useState(true);

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
            bg-black/60
            px-5
            py-6
            text-white
            shadow-2xl
            backdrop-blur-[2px]
            sm:max-w-2xl
            sm:px-8
            sm:py-8
            lg:max-w-4xl
            lg:px-12
            lg:py-10
          "
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] sm:mb-4 sm:text-sm">
            Interior Design Studio
          </p>

          <h1
            id="hero-title"
            className="
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            "
          >
            Step Into the Story
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
            Thoughtfully designed spaces that feel cinematic, personal, and
            deeply lived in.
          </p>
        </div>
      </div>

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
