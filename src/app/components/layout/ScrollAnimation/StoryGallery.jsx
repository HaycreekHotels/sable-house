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
    captions: null,
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
    captions: null,
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
    captions: null,
    image:
      "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-19.jpeg",
    imageAlt: "Spanish moss hanging from a tree in Savannah",
    imageCaption: "SPANISH MOSS · SAVANNAH’S LIVING LANDSCAPE",
  },
];

export default function StoryGallery() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([]);
  const activeDesktopCardRef = useRef(0);

  const [playingVideo, setPlayingVideo] = useState(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = gsap.utils.toArray(".story-card");

      if (!section || !cards.length) return;

      const mm = gsap.matchMedia();

      /*
       * DESKTOP
       *
       * Stories share one pinned viewport.
       * Each story transitions into the same editorial layout.
       */
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (cards.length < 2) return;

          const setActiveCard = (activeIndex) => {
            cards.forEach((card, index) => {
              const isActive = index === activeIndex;

              card.setAttribute("aria-hidden", isActive ? "false" : "true");

              card.inert = !isActive;
            });

            /*
             * Stop an interview when its story leaves the viewport.
             */
            if (activeDesktopCardRef.current !== activeIndex) {
              const previousVideo =
                videoRefs.current[activeDesktopCardRef.current];

              if (previousVideo && !previousVideo.paused) {
                previousVideo.pause();
              }

              activeDesktopCardRef.current = activeIndex;

              setPlayingVideo((current) =>
                current === activeIndex ? current : null,
              );
            }
          };

          /*
           * First card is visible.
           * Following cards begin below the frame.
           */
          cards.forEach((card, index) => {
            const pieces = card.querySelectorAll(".story-piece");

            gsap.set(card, {
              autoAlpha: 1,
            });

            if (index === 0) {
              gsap.set(pieces, {
                yPercent: 0,
                autoAlpha: 1,
              });
            } else {
              gsap.set(pieces, {
                yPercent: 115,
                autoAlpha: 0,
              });
            }
          });

          activeDesktopCardRef.current = 0;
          setActiveCard(0);

          const numberOfTransitions = cards.length - 1;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",

              end: () => `+=${window.innerHeight * numberOfTransitions}`,

              pin: section,
              pinSpacing: true,
              scrub: 1,

              anticipatePin: 1,
              invalidateOnRefresh: true,

              onUpdate: (self) => {
                const activeIndex = Math.min(
                  cards.length - 1,
                  Math.max(0, Math.round(self.progress * numberOfTransitions)),
                );

                setActiveCard(activeIndex);
              },
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

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();

            cards.forEach((card) => {
              card.removeAttribute("aria-hidden");
              card.inert = false;
            });
          };
        },
      );

      /*
       * MOBILE + TABLET
       *
       * Keep each story in document flow instead of pinning
       * three columns into a narrow viewport.
       */
      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          cards.forEach((card) => {
            gsap.from(card.querySelectorAll(".story-piece"), {
              y: 34,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.07,
              ease: "power2.out",

              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                once: true,
              },
            });
          });
        },
      );

      /*
       * REDUCED MOTION
       */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        cards.forEach((card) => {
          card.removeAttribute("aria-hidden");
          card.inert = false;

          gsap.set(card, {
            clearProps: "opacity,visibility,transform",
          });

          gsap.set(card.querySelectorAll(".story-piece"), {
            clearProps: "opacity,visibility,transform",
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

    /*
     * Only one interview can play at once.
     */
    videoRefs.current.forEach((otherVideo, otherIndex) => {
      if (otherVideo && otherIndex !== index && !otherVideo.paused) {
        otherVideo.pause();
      }
    });

    if (video.paused) {
      try {
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
      className="
        relative
        bg-[#f7f6f2]
        text-[#151515]

        lg:h-[100svh]
        lg:overflow-hidden

        motion-reduce:lg:h-auto
        motion-reduce:lg:overflow-visible
      "
    >
      {stories.map((story, index) => {
        const isPlaying = playingVideo === index;

        const videoId = `story-video-${story.id}`;

        return (
          <article
            key={story.id}
            className="
              story-card
              pointer-events-none

              relative
              w-full

              px-5
              py-16

              sm:px-8
              sm:py-20

              md:px-12

              lg:absolute
              lg:inset-0
              lg:h-[100svh]
              lg:px-0
              lg:py-0

              motion-reduce:lg:relative
              motion-reduce:lg:inset-auto
              motion-reduce:lg:h-auto
              motion-reduce:lg:min-h-[100svh]
              motion-reduce:lg:py-20
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
                grid-cols-1
                gap-10

                lg:h-full
                lg:grid-cols-[1.08fr_1fr_0.95fr]
                lg:items-stretch
                lg:gap-x-[1.8vw]
                lg:gap-y-0
                lg:pl-[7.5vw]
                lg:pr-[2.4vw]
              "
            >
              {/* =========================================
                  LEFT COLUMN
              ========================================== */}
              <div
                className="
                  story-piece

                  flex
                  flex-col

                  lg:h-[59svh]
                  lg:self-end
                  lg:justify-between
                  lg:mb-[9svh]
                "
              >
                {/* Intro copy */}
                <div
                  className="
                    max-w-[31rem]

                    lg:max-w-[29rem]
                  "
                >
                  <p
                    className="
                      mb-2

                      text-[11px]
                      font-central-regular
                      uppercase
                      tracking-[0.02em]

                      sm:text-xs

                      lg:mb-2
                      lg:text-[clamp(14px,1.05vw,18px)]
                    "
                  >
                    {story.eyebrow}
                  </p>

                  <h2
                    className="
                      font-benton-regular

                      text-[clamp(2.5rem,11vw,3.5rem)]
                      leading-[0.95]
                      tracking-[-0.035em]

                      lg:text-[clamp(2.75rem,3.25vw,3.4rem)]
                      lg:leading-[1]
                    "
                  >
                    {story.name}
                  </h2>

                  <p
                    className="
                      mt-7
                      max-w-[31rem]

                      text-[15px]
                      leading-[1.55]

                      sm:text-[16px]

                      lg:mt-12
                      lg:max-w-[28rem]
                      lg:text-[clamp(16px,1.28vw,21px)]
                      lg:leading-[1.42]
                    "
                  >
                    {story.description}
                  </p>

                  {/* Interview CTA */}
                  <button
                    type="button"
                    aria-controls={videoId}
                    aria-pressed={isPlaying}
                    onClick={() => toggleVideo(index)}
                    className="
                      pointer-events-auto

                      mt-7
                      inline-flex
                      min-h-11
                      w-fit
                      items-center

                      border-b
                      border-black

                      text-[13px]
                      font-central-regular
                      uppercase
                      tracking-[0.01em]

                      transition-opacity
                      duration-300

                      hover:opacity-55

                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-black

                      sm:text-sm

                      lg:mt-8
                      lg:min-h-0
                      lg:pb-1
                      lg:text-[clamp(15px,1.2vw,20px)]
                    "
                  >
                    {isPlaying ? "Pause Interview" : "Watch Interview"}
                  </button>
                </div>

                {/* Quote */}
                <blockquote
                  className="
                    mt-12
                    max-w-[34rem]

                    text-center
                    font-benton-regular
                    text-[clamp(1.8rem,8vw,2.5rem)]
                    leading-[1.12]
                    tracking-[-0.03em]

                    lg:mt-0
                    lg:max-w-[21rem]
                    lg:text-[clamp(1.75rem,2vw,2.15rem)]
                    lg:leading-[1.2]
                  "
                >
                  {story.quote}
                </blockquote>
              </div>

              {/* =========================================
                  CENTER — PORTRAIT VIDEO
              ========================================== */}
              <div
                className="
                  story-piece
                  pointer-events-auto

                  relative

                  mx-auto
                  aspect-[0.62]
                  w-full
                  max-w-[520px]

                  overflow-hidden
                  bg-neutral-200

                  lg:mx-0
                  lg:mb-[0.8svh]
                  lg:h-[94.5svh]
                  lg:max-h-none
                  lg:w-full
                  lg:max-w-none
                  lg:self-end
                "
              >
                <video
                  id={videoId}
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
                >
                  {story.captions && (
                    <track
                      kind="captions"
                      src={story.captions}
                      srcLang="en"
                      label="English"
                      default
                    />
                  )}
                </video>

                {/* Entire portrait remains clickable */}
                <button
                  type="button"
                  onClick={() => toggleVideo(index)}
                  aria-label={
                    isPlaying
                      ? `Pause interview with ${story.name}`
                      : `Play interview with ${story.name}`
                  }
                  aria-controls={videoId}
                  aria-pressed={isPlaying}
                  className="
                    group
                    absolute
                    inset-0
                    z-10

                    cursor-pointer

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-white
                  "
                >
                  {/* Play / pause square */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      right-0

                      flex
                      h-16
                      w-16
                      items-center
                      justify-center

                      bg-black
                      text-white

                      transition-colors
                      duration-300

                      group-hover:bg-neutral-800

                      sm:h-[72px]
                      sm:w-[72px]

                      lg:h-[86px]
                      lg:w-[86px]
                    "
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </span>
                </button>
              </div>

              {/* =========================================
                  RIGHT — SUPPORTING IMAGE
              ========================================== */}
              <figure
                className="
                  story-piece

                  w-full

                  lg:mb-[1.5svh]
                  lg:self-end
                "
              >
                <figcaption
                  className="
                    mb-2

                    text-[9px]
                    font-central-regular
                    uppercase
                    leading-[1.2]
                    tracking-[0.01em]

                    sm:text-[10px]

                    lg:mb-2
                    lg:text-right
                    lg:text-[clamp(9px,0.75vw,12px)]
                  "
                >
                  {story.imageCaption}
                </figcaption>

                <div
                  className="
                    aspect-[1.06]
                    w-full
                    overflow-hidden
                    bg-neutral-200
                  "
                >
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-6
        w-6

        lg:h-7
        lg:w-7
      "
      fill="none"
    >
      <path d="M8 5L19 12L8 19V5Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="
        h-6
        w-6

        lg:h-7
        lg:w-7
      "
      fill="none"
    >
      <rect x="7" y="5" width="3.5" height="14" fill="currentColor" />

      <rect x="13.5" y="5" width="3.5" height="14" fill="currentColor" />
    </svg>
  );
}
