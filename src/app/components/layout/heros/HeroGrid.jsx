"use client";

import Image from "next/image";
import { useRef } from "react";
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
    alt: "",
  },
  {
    id: "interior-02",
    type: "image",
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-03",
    type: "image",
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-04",
    type: "image",
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-05",
    type: "image",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },

  // Row 2
  {
    id: "interior-06",
    type: "image",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-07",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "hero-video-placeholder",
    type: "video-placeholder",
  },
  {
    id: "interior-08",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-09",
    type: "image",
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },

  // Row 3
  {
    id: "interior-10",
    type: "image",
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-11",
    type: "image",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-12",
    type: "image",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1740&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-13",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    alt: "",
  },
  {
    id: "interior-14",
    type: "image",
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop",
    alt: "",
  },
];

const tileClass =
  "hero-tile relative min-h-0 min-w-0 overflow-hidden border border-black/40 bg-neutral-900";

const placeholderClass =
  "video-placeholder relative col-start-1 row-start-2 min-h-0 min-w-0 overflow-hidden border border-black/40 bg-neutral-900";

const mediaClass = "h-full w-full object-cover";

export default function HeroGrid() {
  const sectionRef = useRef(null);
  const placeholderRef = useRef(null);
  const videoLayerRef = useRef(null);
  const heroCopyRef = useRef(null);

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
    <>
      {/* Top branding row */}
      <header className="flex justify-center p-6 sm:p-8 bg-main">
        <Image
          src={logo}
          alt="Sabal House logo"
          priority
          className="h-auto w-28 sm:w-34 lg:w-44"
        />
      </header>
      <section
        ref={sectionRef}
        aria-labelledby="hero-title"
        className="relative h-svh w-full overflow-hidden bg-secondary"
      >
        <div className="flex h-full min-h-0 flex-col  px-3 pb-3 pt-6 sm:px-6 sm:pb-6 sm:pt-8 lg:px-10 lg:pb-8 lg:pt-10 ">
          {/* The grid consumes all remaining viewport height */}
          <div className="flex min-h-0 flex-1 justify-center ">
            <div
              aria-hidden="true"
              className="grid min-h-0 flex-1 grid-cols-5 grid-rows-3 gap-2 sm:gap-3 lg:gap-4"
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
                      alt={item.alt}
                      fill
                      sizes="20vw"
                      className={mediaClass}
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          ref={videoLayerRef}
          className="pointer-events-none opacity-0"
          aria-hidden="true"
        >
          <video
            className={mediaClass}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div
          ref={heroCopyRef}
          className="pointer-events-none absolute inset-0 z-30 grid translate-y-10 place-items-center px-5 text-center opacity-0 sm:px-6"
        >
          <div className="max-w-[90vw] sm:max-w-2xl lg:max-w-4xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/75 sm:mb-4 sm:text-sm">
              Interior Design Studio
            </p>

            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Step Into the Story
            </h1>

            <p className="mt-4 text-base leading-7 text-white/80 sm:mt-6 sm:text-lg md:text-xl md:leading-8">
              Thoughtfully designed spaces that feel cinematic, personal, and
              deeply lived in.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
