"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imageSrc =
  "https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const videoSrc =
  "https://cdn.pixabay.com/video/2021/09/22/89352-613200582_large.mp4";

const heroTile = "hero-tile w-72 h-72 overflow-hidden ";
const heroMedia = "w-full h-full object-cover";
const videoPlaceholder =
  "video-placeholder col-start-2 row-start-2 w-72 h-72 overflow-hidden ";

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

      if (!section || !placeholder || !videoLayer || !heroCopy) return;

      const setVideoStartPosition = () => {
        const sectionBox = section.getBoundingClientRect();
        const placeholderBox = placeholder.getBoundingClientRect();

        gsap.set(videoLayer, {
          position: "absolute",
          top: placeholderBox.top - sectionBox.top,
          left: placeholderBox.left - sectionBox.left,
          width: placeholderBox.width,
          height: placeholderBox.height,
          zIndex: 20,
          opacity: 1,

          overflow: "hidden",
        });

        gsap.set(heroCopy, {
          opacity: 0,
          y: 40,
        });
      };

      setVideoStartPosition();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1600",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          onRefresh: setVideoStartPosition,
        },
      });

      tl.to(videoLayer, {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",

        ease: "none",
      });

      tl.to(
        ".hero-tile",
        {
          opacity: 0,
          scale: 0.9,
          ease: "none",
        },
        "<",
      );

      tl.to(heroCopy, {
        opacity: 1,
        y: 0,
        duration: 0.25,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative grid h-screen w-full place-items-center overflow-hidden"
    >
      <div className="grid w-full grid-cols-4 grid-rows-3 gap-4 px-4 justify-items-center">
        {Array.from({ length: 12 }).map((_, index) => {
          const isVideoSpot = index === 5;

          if (isVideoSpot) {
            return (
              <div
                key={index}
                ref={placeholderRef}
                className={videoPlaceholder}
              />
            );
          }

          return (
            <div key={index} className={heroTile}>
              <Image
                width={288}
                height={288}
                className={heroMedia}
                src={imageSrc}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <div ref={videoLayerRef} className="pointer-events-none opacity-0">
        <video
          className={heroMedia}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div
        ref={heroCopyRef}
        className="pointer-events-none absolute inset-0 z-30 grid place-items-center px-6 text-center"
      >
        <h1 className="max-w-4xl text-5xl font-bold text-white md:text-7xl">
          Step Into the Story
        </h1>
      </div>
    </section>
  );
}
