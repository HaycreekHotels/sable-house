"use client";

import { useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stories = [
  {
    id: 1,
    eyebrow: "THE ARCHITECT",
    name: "Pat Shay",
    description:
      "Pat considers how new architecture can sit thoughtfully beside Savannah’s historic fabric, complementing what is already there rather than competing with it.",
    quote:
      "“Savannah, in many ways, is a conversation with history that’s ongoing.”",

    video:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/pat_opcrnn.mp4",
    poster:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Pat.jpeg",

    image:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Sabal%20House%20Construction%20Image.jpeg",
    imageAlt: "Mass timber construction at Sabal House",
    imageCaption: "MASS TIMBER · GEORGIA YELLOW PINE",
  },

  {
    id: 2,
    eyebrow: "THE DESIGNER",
    name: "Maria Gossett",
    description:
      "Maria draws from Savannah’s living, organic character, carrying the calm of the natural landscape into the interiors and allowing the city’s natural story to continue from outside in.",
    quote:
      "“When you step into the building, you have this overwhelming sense of calm that really only nature can give you.”",

    video:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Maria_mh89i8.mp4",
    poster:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Maria.jpeg",

    image:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Chair.jpeg",
    imageAlt: "Interior material details at Sabal House",
    imageCaption: "TABBY · A MATERIAL OF THE LOWCOUNTRY",
  },
  {
    id: 3,
    eyebrow: "THE STEWARD",
    name: "Angela King",
    description:
      "Angela brings a deeply personal point of view to Sabal House, rooted in family, preservation, and the feeling of creating somewhere that feels immediately familiar.",
    quote:
      "“It’s a slower pace. It’s a comforting feeling. It’s a warmth that is indescribable.”",

    video:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Reel_ex3fnx.mp4",
    poster:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-8.jpeg",

    image:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-19.jpeg",
    imageAlt: "Spanish moss hanging from a tree in Savannah",
    imageCaption: "SPANISH MOSS · SAVANNAH’S LIVING LANDSCAPE",
  },
];

export default function StoryGallery() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".story-card");
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (cards.length < 2) return;

          cards.slice(1).forEach((card) => {
            const pieces = card.querySelectorAll(".story-piece");

            gsap.set(card, {
              autoAlpha: 1,
            });

            gsap.set(pieces, {
              yPercent: 115,
              autoAlpha: 0,
            });
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * (cards.length - 1)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.slice(1).forEach((nextCard, index) => {
            const currentCard = cards[index];

            const currentPieces = currentCard.querySelectorAll(".story-piece");

            const nextPieces = nextCard.querySelectorAll(".story-piece");

            const position = index;

            timeline.to(
              currentPieces,
              {
                yPercent: -30,
                autoAlpha: 0,
                duration: 0.75,
                ease: "none",
                stagger: 0.025,
              },
              position,
            );

            timeline.to(
              nextPieces,
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: "none",
                stagger: 0.06,
              },
              position + 0.08,
            );
          });
        },
      );

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          cards.forEach((card) => {
            gsap.from(card.querySelectorAll(".story-piece"), {
              y: 60,
              autoAlpha: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
            });
          });
        },
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, {
          position: "relative",
          inset: "auto",
          opacity: 1,
          visibility: "visible",
        });

        cards.forEach((card) => {
          gsap.set(card.querySelectorAll(".story-piece"), {
            y: 0,
            yPercent: 0,
            opacity: 1,
            visibility: "visible",
          });
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  async function toggleVideo(index) {
    const video = videoRefs.current[index];

    if (!video) return;

    // Pause any other playing video
    if (
      playingVideo !== null &&
      playingVideo !== index &&
      videoRefs.current[playingVideo]
    ) {
      videoRefs.current[playingVideo].pause();
    }

    if (video.paused) {
      try {
        // The user clicked the video, so audio playback is allowed
        video.muted = false;
        video.volume = 1;

        await video.play();

        setPlayingVideo(index);
      } catch (error) {
        console.error(`Could not play video ${index}:`, error);
      }
    } else {
      video.pause();
      setPlayingVideo(null);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Meet the people behind Sabal House"
      className="relative bg-[#f7f6f2] text-[#151515] md:h-screen md:overflow-hidden"
    >
      {stories.map((story, index) => {
        const isPlaying = playingVideo === index;

        return (
          <article
            key={story.id}
            className="
    story-card
    pointer-events-none
    relative
    flex
    min-h-screen
    w-full
    items-center
    py-16

    md:absolute
    md:inset-0
    md:h-screen
    md:py-0
  "
            style={{
              zIndex: index + 1,
            }}
          >
            <div
              className="
                mx-auto
                grid
                w-full
                max-w-[1600px]
                grid-cols-1
                gap-10
                px-6

                md:h-full
                md:grid-cols-[minmax(220px,1fr)_minmax(300px,0.95fr)_minmax(220px,0.9fr)]
                md:items-center
                md:gap-[3vw]
                md:px-[5vw]

                xl:grid-cols-[1.05fr_0.9fr_0.85fr]
              "
            >
              <div
                className="
                  story-piece
                  flex
                  flex-col
                  md:h-[82vh]
                  md:justify-between
                  md:py-8
                "
              >
                <div>
                  <p className="mb-1 text-[11px] font-medium tracking-[-0.01em] md:text-xs">
                    {story.eyebrow}
                  </p>

                  <h2
                    className="
                      font-benton-regular
                      text-[38px]
                       leading-[1.22]
                    tracking-[-0.02em]
                      md:text-[clamp(34px,3.5vw,60px)]
                    "
                  >
                    {story.name}
                  </h2>

                  <p
                    className="
                      mt-8
                      max-w-[31rem]
                      text-[15px]
                      leading-[1.5]
                      md:mt-12
                      md:text-[clamp(13px,1vw,17px)]
                    "
                  >
                    {story.description}
                  </p>
                </div>

                <blockquote
                  className="
                    
                    max-w-[32rem]
                    font-benton-regular
                    text-[36px]
                    italic
                    leading-[1.22]
                    tracking-[-0.02em]

                  mb-12
                    md:text-[clamp(25px,2.75vw,56px)]
                  "
                >
                  {story.quote}
                </blockquote>
              </div>

              {/* PORTRAIT VIDEO */}
              <div
                className="
    story-piece
    pointer-events-auto
    relative
    mx-auto
    aspect-[0.62]
    w-full
    max-w-[420px]
    overflow-hidden
    bg-neutral-200

    md:h-[86vh]
    md:max-h-[900px]
    md:w-full
    md:max-w-none
  "
              >
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element;
                  }}
                  src={story.video}
                  poster={story.poster}
                  loop
                  playsInline
                  preload="metadata"
                  className="
      pointer-events-none
      h-full
      w-full
      object-cover
    "
                  onPlay={() => setPlayingVideo(index)}
                  onPause={() => {
                    setPlayingVideo((current) =>
                      current === index ? null : current,
                    );
                  }}
                  onError={(event) => {
                    const video = event.currentTarget;

                    console.error(`Video failed: ${story.name}`, {
                      src: story.video,
                      code: video.error?.code,
                      message: video.error?.message,
                    });
                  }}
                />

                {/* Whole portrait remains clickable */}
                <button
                  type="button"
                  onClick={() => toggleVideo(index)}
                  aria-label={
                    isPlaying
                      ? `Pause video featuring ${story.name}`
                      : `Play video featuring ${story.name}`
                  }
                  aria-pressed={isPlaying}
                  className="
      absolute
      inset-0
      z-10

      cursor-pointer

      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-4
      focus-visible:outline-black
    "
                >
                  {/* Visible play / pause control */}
                  <span
                    aria-hidden="true"
                    className="
        absolute
        bottom-0
        right-0

        flex
        h-14
        w-14
        items-center
        justify-center

        bg-black
        text-white

        transition-colors
        duration-300

        md:h-16
        md:w-16
      "
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </span>
                </button>
              </div>

              <figure
                className="
                  story-piece
                  self-end
                  md:mb-[7vh]
                "
              >
                <figcaption
                  className="
                    mb-2
                    text-[9px]
                    font-medium
                    uppercase
                    leading-none
                    tracking-[-0.01em]
                    md:text-[10px]
                  "
                >
                  {story.imageCaption}
                </figcaption>

                <div
                  className="
                    aspect-[1.05]
                    w-full
                    overflow-hidden
                    bg-neutral-200

                    md:aspect-[1.05]
                  "
                >
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </figure>
            </div>
          </article>
        );
      })}
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
