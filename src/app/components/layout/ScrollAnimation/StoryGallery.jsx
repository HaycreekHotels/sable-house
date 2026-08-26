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
    poster: "/images/posters/Pat-Shay-Poster.jpg",

    image:
      "https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Mass timber construction at Sabal House",
    imageCaption: "MASS TIMBER · GEORGIA YELLOW PINE",
  },

  {
    id: 2,
    eyebrow: "THE STEWARD",
    name: "Angela King",
    description:
      "Angela brings a deeply personal point of view to Sabal House, rooted in family, preservation, and the feeling of creating somewhere that feels immediately familiar.",
    quote:
      "“It’s a slower pace. It’s a comforting feeling. It’s a warmth that is indescribable.”",

    video:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Reel_ex3fnx.mp4",
    poster: "/images/posters/Angela-King-Poster.jpg",

    image:
      "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Spanish moss hanging from a tree in Savannah",
    imageCaption: "SPANISH MOSS · SAVANNAH’S LIVING LANDSCAPE",
  },

  {
    id: 3,
    eyebrow: "THE DESIGNER",
    name: "Maria Gossett",
    description:
      "Maria draws from Savannah’s living, organic character, carrying the calm of the natural landscape into the interiors and allowing the city’s natural story to continue from outside in.",
    quote:
      "“When you step into the building, you have this overwhelming sense of calm that really only nature can give you.”",

    video:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Maria_mh89i8.mp4",
    poster: "/images/posters/Maria-Gossett-Poster.jpg",

    image:
      "https://images.unsplash.com/photo-1597199813431-9c7c6e63a7bf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Interior material details at Sabal House",
    imageCaption: "TABBY · A MATERIAL OF THE LOWCOUNTRY",
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
                      font-serif
                      text-[38px]
                      leading-[0.95]
                      tracking-[-0.04em]
                      md:text-[clamp(34px,3vw,58px)]
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
                    mt-12
                    max-w-[32rem]
                    font-serif
                    text-[27px]
                    italic
                    leading-[1.22]
                    tracking-[-0.035em]

                    md:mt-0
                    md:text-[clamp(25px,2.2vw,42px)]
                  "
                >
                  {story.quote}
                </blockquote>
              </div>

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
    story-piece
    pointer-events-auto
    relative
    mx-auto
    block
    aspect-[0.62]
    w-full
    max-w-[420px]
    cursor-pointer
    appearance-none
    overflow-hidden
    border-0
    bg-neutral-200
    p-0

    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-4
    focus-visible:outline-black

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
              </button>

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
