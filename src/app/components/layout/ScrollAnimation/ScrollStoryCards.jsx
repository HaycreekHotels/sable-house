"use client";

import { useLayoutEffect, useMemo, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollStoryCards({
  cards = [],
  className = "",
  scrollPerStep = 0.8,
}) {
  const sectionRef = useRef(null);
  const firstImageRefs = useRef([]);
  const secondImageRefs = useRef([]);
  const textRefs = useRef([]);

  /*
   * Only cards with the four images required by this component participate
   * in the animated story.
   */
  const usableCards = useMemo(() => {
    return cards.filter(
      (card) => Array.isArray(card.images) && card.images.length >= 4,
    );
  }, [cards]);

  /*
   * Every story card creates two visual image states:
   *
   * Card 1
   *   state 0 -> images 1 + 2
   *   state 1 -> images 3 + 4
   *
   * Card 2
   *   state 2 -> images 1 + 2
   *   state 3 -> images 3 + 4
   */
  const imageStates = useMemo(() => {
    return usableCards.flatMap((card, cardIndex) => [
      {
        cardIndex,
        images: [card.images[0], card.images[1]],
      },
      {
        cardIndex,
        images: [card.images[2], card.images[3]],
      },
    ]);
  }, [usableCards]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || imageStates.length <= 1) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const firstImages = firstImageRefs.current
        .slice(0, imageStates.length)
        .filter(Boolean);

      const secondImages = secondImageRefs.current
        .slice(0, imageStates.length)
        .filter(Boolean);

      const textPanels = textRefs.current
        .slice(0, usableCards.length)
        .filter(Boolean);

      if (
        firstImages.length !== imageStates.length ||
        secondImages.length !== imageStates.length ||
        textPanels.length !== usableCards.length
      ) {
        return;
      }

      const numberOfTransitions = imageStates.length - 1;
      const safeScrollPerStep = Math.max(0.4, Number(scrollPerStep) || 0.8);

      /*
       * Initial image positions.
       */
      firstImages.forEach((image, index) => {
        gsap.set(image, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: index + 1,
          force3D: true,
        });
      });

      secondImages.forEach((image, index) => {
        gsap.set(image, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: index + 1,
          force3D: true,
        });
      });

      /*
       * Initial text positions.
       */
      gsap.set(textPanels, {
        autoAlpha: 0,
        yPercent: 10,
        force3D: true,
      });

      gsap.set(textPanels[0], {
        autoAlpha: 1,
        yPercent: 0,
      });

      /*
       * Keep only the relevant story exposed to assistive technology.
       */
      const setAccessibleState = (stateIndex) => {
        const activeCardIndex = imageStates[stateIndex].cardIndex;

        firstImages.forEach((image, index) => {
          image.setAttribute(
            "aria-hidden",
            index === stateIndex ? "false" : "true",
          );
        });

        secondImages.forEach((image, index) => {
          image.setAttribute(
            "aria-hidden",
            index === stateIndex ? "false" : "true",
          );
        });

        textPanels.forEach((panel, index) => {
          const isActive = index === activeCardIndex;

          panel.setAttribute("aria-hidden", isActive ? "false" : "true");
          panel.inert = !isActive;
        });
      };

      setAccessibleState(0);

      /*
       * Main pinned story timeline.
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * safeScrollPerStep * numberOfTransitions}`,
          pin: section,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          snap:
            numberOfTransitions > 0
              ? {
                  snapTo: 1 / numberOfTransitions,
                  duration: {
                    min: 0.12,
                    max: 0.3,
                  },
                  delay: 0.04,
                  ease: "power1.inOut",
                }
              : false,

          onUpdate: (self) => {
            const stateIndex = Math.min(
              imageStates.length - 1,
              Math.max(0, Math.round(self.progress * numberOfTransitions)),
            );

            setAccessibleState(stateIndex);
          },
        },
      });

      timeline.addLabel("state-0", 0);

      for (let index = 0; index < numberOfTransitions; index += 1) {
        const nextIndex = index + 1;
        const currentState = imageStates[index];
        const nextState = imageStates[nextIndex];
        const stepStart = index;

        /*
         * Incoming image pair scrolls upward over the current pair.
         */
        timeline.to(
          [firstImages[nextIndex], secondImages[nextIndex]],
          {
            yPercent: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          stepStart,
        );

        /*
         * Change text only when moving into a new story card.
         */
        if (currentState.cardIndex !== nextState.cardIndex) {
          timeline.to(
            textPanels[currentState.cardIndex],
            {
              yPercent: -10,
              autoAlpha: 0,
              duration: 0.42,
              ease: "power2.in",
            },
            stepStart,
          );

          timeline.fromTo(
            textPanels[nextState.cardIndex],
            {
              yPercent: 10,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.52,
              ease: "power2.out",
            },
            stepStart + 0.42,
          );
        }

        timeline.addLabel(`state-${nextIndex}`, nextIndex);
      }

      const refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        window.cancelAnimationFrame(refreshFrame);
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    }, section);

    return () => {
      context.revert();
    };
  }, [imageStates, scrollPerStep, usableCards]);

  if (!usableCards.length || !imageStates.length) {
    return null;
  }

  return (
    <>
      {/* Animated experience */}
      <section
        ref={sectionRef}
        aria-label="Featured stories"
        className={`
          relative
          h-[100svh]
          w-full
          overflow-hidden
          bg-secondary
          motion-reduce:hidden
          ${className}
        `}
      >
        <div
          className="
            mx-auto
            grid
            h-full
            w-full
            max-w-[1720px]

            grid-rows-[42svh_minmax(0,1fr)]
            gap-5
            px-4
            pb-[max(1.25rem,env(safe-area-inset-bottom))]
            pt-4

            sm:grid-rows-[47svh_minmax(0,1fr)]
            sm:gap-6
            sm:px-6
            sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]
            sm:pt-6

            lg:grid-cols-[minmax(0,1.55fr)_minmax(430px,0.9fr)]
            lg:grid-rows-1
            lg:gap-[clamp(2.5rem,4vw,5rem)]
            lg:px-6
            lg:py-0

            xl:px-8
          "
        >
          {/* IMAGE COMPOSITION */}
          <div
            className="
              grid
              min-h-0
              grid-cols-[1.17fr_1fr]
              items-end
              gap-3

              sm:gap-4

              lg:self-end
              lg:gap-6
              lg:pb-[4.5svh]
            "
          >
            {/* Tall image */}
            <div
              className="
                relative
                h-full
                min-h-0
                overflow-hidden
                bg-neutral-200

                lg:h-[86.5svh]
                lg:max-h-[850px]
              "
            >
              {imageStates.map((state, stateIndex) => {
                const image = state.images[0];

                return (
                  <img
                    key={`large-${state.cardIndex}-${stateIndex}`}
                    ref={(element) => {
                      firstImageRefs.current[stateIndex] = element;
                    }}
                    src={image.src}
                    alt={image.alt || ""}
                    aria-hidden={stateIndex !== 0}
                    loading={stateIndex === 0 ? "eager" : "lazy"}
                    fetchPriority={stateIndex === 0 ? "high" : "auto"}
                    decoding="async"
                    draggable="false"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      h-full
                      w-full
                      select-none
                      object-cover
                      will-change-transform
                    "
                  />
                );
              })}
            </div>

            {/* Short image */}
            <div
              className="
                relative
                h-[64%]
                min-h-0
                overflow-hidden
                bg-neutral-200

                lg:h-[48svh]
                lg:max-h-[470px]
              "
            >
              {imageStates.map((state, stateIndex) => {
                const image = state.images[1];

                return (
                  <img
                    key={`small-${state.cardIndex}-${stateIndex}`}
                    ref={(element) => {
                      secondImageRefs.current[stateIndex] = element;
                    }}
                    src={image.src}
                    alt={image.alt || ""}
                    aria-hidden={stateIndex !== 0}
                    loading={stateIndex === 0 ? "eager" : "lazy"}
                    fetchPriority={stateIndex === 0 ? "high" : "auto"}
                    decoding="async"
                    draggable="false"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      h-full
                      w-full
                      select-none
                      object-cover
                      will-change-transform
                    "
                  />
                );
              })}
            </div>
          </div>

          {/* TEXT COMPOSITION */}
          <div
            className="
              relative
              min-h-0
              overflow-hidden

              lg:h-full
            "
          >
            {usableCards.map((card, cardIndex) => (
              <article
                key={card.id}
                ref={(element) => {
                  textRefs.current[cardIndex] = element;
                }}
                aria-hidden={cardIndex !== 0}
                inert={cardIndex !== 0}
                className="
                  absolute
                  inset-0

                  flex
                  w-full
                  max-w-[520px]
                  flex-col
                  items-start
                  justify-start

                  overflow-y-auto
                  pb-3
                  pr-2

                  will-change-[transform,opacity]

                  sm:pb-5

                  lg:top-[18.5svh]
                  lg:bottom-auto
                  lg:overflow-visible
                  lg:pb-0
                  lg:pr-0
                "
              >
                {card.eyebrow && (
                  <p
                    className="
                      font-central-regular
                      text-[10px]
                      font-normal
                      uppercase
                      leading-none
                      tracking-[0.035em]
                      text-neutral-900

                      sm:text-[11px]

                      lg:text-[15px]
                    "
                  >
                    {card.eyebrow}
                  </p>
                )}

                <h2
                  className="
                    mt-3
                    font-benton-regular
                    text-[clamp(2rem,8vw,3rem)]
                    font-normal
                    leading-[0.98]
                    tracking-[-0.03em]
                    text-neutral-950

                    sm:mt-4
                    sm:text-[clamp(2.35rem,6vw,3.35rem)]

                    lg:mt-7
                    lg:text-[clamp(3rem,3.6vw,4rem)]
                    lg:leading-[0.98]
                  "
                >
                  {card.title}
                </h2>

                {card.kicker && (
                  <p
                    className="
                      mt-5
                      max-w-[460px]

                      font-central-regular
                      text-[10px]
                      font-normal
                      uppercase
                      leading-[1.35]
                      tracking-[0.025em]
                      text-neutral-900

                      sm:mt-6
                      sm:text-[11px]

                      lg:mt-14
                      lg:text-[15px]
                    "
                  >
                    {card.kicker}
                  </p>
                )}

                <p
                  className="
                    mt-5
                    max-w-[500px]

                    text-left
                    text-[12px]
                    leading-[1.55]
                    text-neutral-800

                    sm:mt-6
                    sm:text-[13px]
                    sm: pr-12

                    md:pr-36

                    lg:mt-12
                    lg:text-[16px]
                    lg:leading-[1.55]
                  "
                >
                  {card.description}
                </p>

                {card.cta?.href && card.cta?.label && (
                  <a
                    href={card.cta.href}
                    className="
                      mt-6
                      inline-flex
                      min-h-11
                      min-w-[180px]
                      items-center
                      justify-center

                      bg-main
                      px-6
                      py-3

                      font-central-regular
                      text-md
                      uppercase
                      
                      text-white

                       transition-colors
                  duration-300
                  ease-out

                   hover:bg-transparent
            hover:border-2
            hover:border-main
            hover:text-main

                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-black

                      lg:mt-9
                      lg:min-h-[52px]
                      lg:min-w-[220px]
                      lg:text-[15px]
                    "
                  >
                    {card.cta.label}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reduced-motion fallback */}
      <section
        aria-label="Featured stories"
        className="hidden bg-secondary motion-reduce:block"
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            space-y-20
            px-4
            py-14

            sm:px-6

            lg:space-y-28
            lg:px-8
            lg:py-20
          "
        >
          {usableCards.map((card) => (
            <article
              key={`static-${card.id}`}
              className="
                grid
                gap-8

                lg:grid-cols-[minmax(0,1.55fr)_minmax(420px,0.9fr)]
                lg:items-center
                lg:gap-[clamp(2.5rem,5vw,6rem)]
              "
            >
              <div className="grid grid-cols-[1.17fr_1fr] items-end gap-3 sm:gap-5">
                {card.images.slice(0, 2).map((image, index) => (
                  <img
                    key={`${card.id}-static-${index}`}
                    src={image.src}
                    alt={image.alt || ""}
                    loading="lazy"
                    decoding="async"
                    className={`
                      w-full
                      object-cover
                      ${index === 0 ? "aspect-[4/5]" : "aspect-[1.08/1]"}
                    `}
                  />
                ))}
              </div>

              <div className="flex max-w-[520px] flex-col items-start">
                {card.eyebrow && (
                  <p className="font-central-regular text-[11px] uppercase tracking-[0.035em] lg:text-[15px]">
                    {card.eyebrow}
                  </p>
                )}

                <h2
                  className="
                    mt-4
                    font-benton-regular
                    text-[clamp(2.35rem,9vw,3.35rem)]
                    leading-[0.98]
                    tracking-[-0.03em]

                    lg:mt-7
                    lg:text-[clamp(3rem,3.6vw,4rem)]
                  "
                >
                  {card.title}
                </h2>

                {card.kicker && (
                  <p className="mt-7 font-central-regular text-[11px] uppercase leading-snug tracking-[0.025em] lg:mt-12 lg:text-[15px]">
                    {card.kicker}
                  </p>
                )}

                <p className="mt-6 max-w-[500px] text-left text-sm leading-[1.6] text-neutral-700 lg:mt-10 lg:text-[16px] lg:leading-[1.55]">
                  {card.description}
                </p>

                {card.cta?.href && card.cta?.label && (
                  <a
                    href={card.cta.href}
                    className="
                      mt-7
                      inline-flex
                      min-h-11
                      min-w-[180px]
                      items-center
                      justify-center

                      bg-main
                      px-6
                      py-3

                      font-central-regular
                      text-[12px]
                      uppercase
                      tracking-[0.035em]
                      text-white

                      transition-colors
                      duration-200
                      hover:bg-neutral-800

                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-4
                      focus-visible:outline-black

                      lg:mt-9
                      lg:min-h-[52px]
                      lg:min-w-[220px]
                      lg:text-[15px]
                    "
                  >
                    {card.cta.label}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
