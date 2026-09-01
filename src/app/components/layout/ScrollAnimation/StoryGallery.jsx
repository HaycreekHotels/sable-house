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
       * The stories occupy one pinned viewport and transition in place.
       */
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (cards.length < 2) return;

          const setActiveCard = (activeIndex) => {
            cards.forEach((card, index) => {
              const isActive = index === activeIndex;

              card.setAttribute("aria-hidden", isActive ? "false" : "true");
              card.inert = !isActive;
            });

            /*
             * Stop audio/video from a story once the user scrolls to a
             * different story.
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
           * Card one begins visible. Later cards stay in the same physical
           * viewport but their individual pieces begin below the frame.
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
              end: () =>
                `+=${window.innerHeight * numberOfTransitions}`,
              pin: section,
              pinSpacing: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,

              onUpdate: (self) => {
                const activeIndex = Math.min(
                  cards.length - 1,
                  Math.max(
                    0,
                    Math.round(self.progress * numberOfTransitions),
                  ),
                );

                setActiveCard(activeIndex);
              },
            },
          });

          cards.slice(1).forEach((nextCard, index) => {
            const currentCard = cards[index];

            const currentPieces =
              currentCard.querySelectorAll(".story-piece");

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
       * MOBILE / TABLET
       *
       * Keep the stories in normal document flow. Each story reveals once as
       * it enters the viewport rather than pinning several full-screen cards.
       */
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          cards.forEach((card) => {
            gsap.from(card.querySelectorAll(".story-piece"), {
              y: 40,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            });
          });
        },
      );

      /*
       * REDUCED MOTION
       *
       * CSS changes the desktop section/cards back into normal document flow;
       * these sets ensure no GSAP transform or opacity state can remain.
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
     * Only one interview plays at a time.
     */
    videoRefs.current.forEach((otherVideo, otherIndex) => {
      if (
        otherVideo &&
        otherIndex !== index &&
        !otherVideo.paused
      ) {
        otherVideo.pause();
      }
    });

    if (video.paused) {
      try {
        /*
         * Playback follows an explicit user gesture, so audible playback is
         * permitted by modern browsers.
         */
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

        md:h-[100svh]
        md:overflow-hidden

        motion-reduce:md:h-auto
        motion-reduce:md:overflow-visible
      "
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
              w-full
              items-center

              px-0
              py-14

              sm:py-16

              md:absolute
              md:inset-0
              md:h-[100svh]
              md:py-0

              motion-reduce:md:relative
              motion-reduce:md:inset-auto
              motion-reduce:md:h-auto
              motion-reduce:md:min-h-[100svh]
              motion-reduce:md:py-16
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
                px-5

                sm:px-7

                md:h-full
                md:grid-cols-[minmax(220px,1fr)_minmax(300px,0.95fr)_minmax(220px,0.9fr)]
                md:items-center
                md:gap-[3vw]
                md:px-[5vw]

                xl:grid-cols-[1.05fr_0.9fr_0.85fr]
              "
            >
              {/* STORY COPY */}
              <div
                className="
                  story-piece
                  flex
                  flex-col

                  md:h-[82svh]
                  md:justify-between
                  md:py-8
                "
              >
                <div>
                  <p
                    className="
                      mb-2
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.04em]

                      md:text-xs
                    "
                  >
                    {story.eyebrow}
                  </p>

                  <h2
                    className="
                      font-benton-regular
                      text-[clamp(2.25rem,10vw,3rem)]
                      leading-[1]
                      tracking-[-0.035em]

                      md:text-[clamp(2.125rem,3.5vw,3.75rem)]
                      md:leading-[1.08]
                    "
                  >
                    {story.name}
                  </h2>

                  <p
                    className="
                      mt-6
                      max-w-[31rem]
                      text-[14px]
                      leading-[1.6]

                      sm:text-[15px]

                      md:mt-10
                      md:text-[clamp(13px,1vw,17px)]
                    "
                  >
                    {story.description}
                  </p>
                </div>

                <blockquote
                  className="
                    mt-9
                    max-w-[32rem]
                    font-benton-regular
                    text-[clamp(1.9rem,8vw,2.4rem)]
                    italic
                    leading-[1.1]
                    tracking-[-0.025em]

                    md:mt-0
                    md:text-[clamp(1.6rem,2.75vw,3.5rem)]
                    md:leading-[1.08]
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

                  md:h-[86svh]
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

                {/* The full portrait is the play/pause target. */}
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

                      group-hover:bg-neutral-800

                      md:h-16
                      md:w-16
                    "
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </span>
                </button>
              </div>

              {/* SUPPORTING IMAGE */}
              <figure
                className="
                  story-piece
                  self-end

                  md:mb-[7svh]
                "
              >
                <figcaption
                  className="
                    mb-2
                    text-[9px]
                    font-medium
                    uppercase
                    leading-[1.2]
                    tracking-[0.02em]

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
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
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
      className="h-5 w-5"
      fill="none"
    >
      <rect x="7" y="5" width="3.5" height="14" fill="currentColor" />
      <rect x="13.5" y="5" width="3.5" height="14" fill="currentColor" />
    </svg>
  );
}
