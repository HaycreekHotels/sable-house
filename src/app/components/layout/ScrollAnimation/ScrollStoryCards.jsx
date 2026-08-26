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
    Each card creates two visual states.

    Card 1:
      state 0 -> images 1 + 2
      state 1 -> images 3 + 4

    Card 2:
      state 2 -> images 5 + 6
      state 3 -> images 7 + 8
  */
  const imageStates = useMemo(() => {
    return cards.flatMap((card, cardIndex) => {
      if (!Array.isArray(card.images) || card.images.length < 4) {
        return [];
      }

      return [
        {
          cardIndex,
          images: [card.images[0], card.images[1]],
        },
        {
          cardIndex,
          images: [card.images[2], card.images[3]],
        },
      ];
    });
  }, [cards]);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || imageStates.length <= 1) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const firstImages = firstImageRefs.current.filter(Boolean);
      const secondImages = secondImageRefs.current.filter(Boolean);
      const textPanels = textRefs.current.filter(Boolean);

      if (
        firstImages.length !== imageStates.length ||
        secondImages.length !== imageStates.length ||
        textPanels.length !== cards.length
      ) {
        return;
      }

      const numberOfTransitions = imageStates.length - 1;

      /*
        GSAP is now the ONLY thing that owns image transforms.

        There are deliberately no inline transform styles on the <img>
        elements. The previous version had an inline translate3d(0, 100%, 0)
        AND GSAP yPercent: 100, which could effectively place an image two
        frame-heights below the viewport.

        State 0 starts visible.
        Every later state starts exactly one frame below.
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
        Text panels are stacked in the same position.
      */
      gsap.set(textPanels, {
        autoAlpha: 0,
        yPercent: 14,
        force3D: true,
      });

      gsap.set(textPanels[0], {
        autoAlpha: 1,
        yPercent: 0,
      });

      const setAccessibleCard = (cardIndex) => {
        textPanels.forEach((panel, index) => {
          const isActive = index === cardIndex;

          panel.setAttribute("aria-hidden", isActive ? "false" : "true");

          /*
            `inert` is a boolean DOM property.

            Do not use setAttribute("inert", "") with React 19 / Next 16.
          */
          panel.inert = !isActive;
        });
      };

      setAccessibleCard(0);

      /*
        One GSAP timeline unit = one visual scroll step.

        With two cards the sequence is:

        time 0:
          Card 1 text
          images 1 + 2

        time 1:
          Card 1 text
          images 3 + 4

        time 2:
          Card 2 text
          images 5 + 6

        time 3:
          Card 2 text
          images 7 + 8
      */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${window.innerHeight * scrollPerStep * numberOfTransitions}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          snap: {
            snapTo: 1 / numberOfTransitions,
            duration: { min: 0.12, max: 0.3 },
            delay: 0.04,
            ease: "power1.inOut",
          },

          onUpdate: (self) => {
            const stateIndex = Math.min(
              imageStates.length - 1,
              Math.max(0, Math.round(self.progress * numberOfTransitions)),
            );

            setAccessibleCard(imageStates[stateIndex].cardIndex);
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
          Only the incoming image pair moves.

          The previous image remains underneath, so when scrolling forward
          the new pair rises over it. When scrolling backward, the new pair
          moves back down and reveals the previous pair again.
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
          Change text only when crossing from one card to another.
        */
        if (currentState.cardIndex !== nextState.cardIndex) {
          timeline.to(
            textPanels[currentState.cardIndex],
            {
              yPercent: -14,
              autoAlpha: 0,
              duration: 0.42,
              ease: "power2.in",
            },
            stepStart,
          );

          timeline.fromTo(
            textPanels[nextState.cardIndex],
            {
              yPercent: 14,
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

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      context.revert();
    };
  }, [cards, imageStates, scrollPerStep]);

  if (!cards.length || !imageStates.length) {
    return null;
  }

  return (
    <>
      {/* Animated version */}
      <section
        ref={sectionRef}
        aria-label="Featured stories"
        className={`relative bg-white motion-reduce:hidden ${className}`}
      >
        <div className="mx-auto flex min-h-[100svh] max-w-[1600px] items-center px-4 py-4 sm:px-6 lg:px-3 lg:py-2 xl:px-5">
          <div className="grid w-full gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.84fr)] lg:gap-10 xl:gap-14">
            {/* IMAGE COMPOSITION */}
            <div className="grid grid-cols-[1.17fr_1fr] items-end gap-3 sm:gap-4 lg:gap-5">
              {/* Tall image */}
              <div className="relative h-[40svh] min-h-[270px] overflow-hidden bg-neutral-200 sm:h-[50svh] lg:h-[calc(100svh-1rem)] lg:max-h-[900px]">
                {imageStates.map((state, stateIndex) => {
                  const image = state.images[0];

                  return (
                    <img
                      key={`large-${state.cardIndex}-${stateIndex}`}
                      ref={(element) => {
                        firstImageRefs.current[stateIndex] = element;
                      }}
                      src={image.src}
                      alt={image.alt}
                      loading="eager"
                      fetchPriority={stateIndex < 2 ? "high" : "auto"}
                      draggable="false"
                      onError={() => {
                        console.error(
                          `ScrollStoryCards: failed to load image: ${image.src}`,
                        );
                      }}
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover will-change-transform"
                    />
                  );
                })}
              </div>

              {/* Short image */}
              <div className="relative h-[26svh] min-h-[175px] overflow-hidden bg-neutral-200 sm:h-[32svh] lg:h-[46svh] lg:max-h-[460px]">
                {imageStates.map((state, stateIndex) => {
                  const image = state.images[1];

                  return (
                    <img
                      key={`small-${state.cardIndex}-${stateIndex}`}
                      ref={(element) => {
                        secondImageRefs.current[stateIndex] = element;
                      }}
                      src={image.src}
                      alt={image.alt}
                      loading="eager"
                      fetchPriority={stateIndex < 2 ? "high" : "auto"}
                      draggable="false"
                      onError={() => {
                        console.error(
                          `ScrollStoryCards: failed to load image: ${image.src}`,
                        );
                      }}
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover will-change-transform"
                    />
                  );
                })}
              </div>
            </div>

            {/* TEXT COMPOSITION */}
            <div className="relative min-h-[300px] overflow-hidden lg:min-h-0">
              {cards.map((card, cardIndex) => (
                <article
                  key={card.id}
                  ref={(element) => {
                    textRefs.current[cardIndex] = element;
                  }}
                  aria-hidden={cardIndex !== 0}
                  inert={cardIndex !== 0}
                  className="absolute inset-0 flex max-w-[390px] flex-col justify-start pt-5 will-change-[transform,opacity] lg:pt-[22svh]"
                >
                  {card.eyebrow && (
                    <p className="mb-2 text-[10px] font-medium uppercase leading-none tracking-[0.02em] text-neutral-900 lg:text-[11px]">
                      {card.eyebrow}
                    </p>
                  )}

                  <h2 className="font-serif text-[2rem] leading-[1.03] tracking-[-0.025em] text-neutral-950 sm:text-[2.25rem] lg:text-[2.2rem] xl:text-[2.55rem]">
                    {card.title}
                  </h2>

                  {card.kicker && (
                    <p className="mt-7 max-w-[320px] text-[10px] font-medium uppercase leading-[1.25] tracking-[0.01em] text-neutral-900 lg:mt-8 lg:text-[11px]">
                      {card.kicker}
                    </p>
                  )}

                  <p className="mt-7 max-w-[340px] text-[12px] leading-[1.5] text-neutral-800 lg:mt-8 lg:text-[12px]">
                    {card.description}
                  </p>

                  <div className="mt-5 lg:mt-6">
                    <a
                      href={card.cta.href}
                      className="inline-flex min-h-8 items-center justify-center bg-black px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.02em] text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                    >
                      {card.cta.label}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reduced-motion fallback */}
      <section
        aria-label="Featured stories"
        className="hidden bg-white motion-reduce:block"
      >
        <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8">
          {cards.map((card) => (
            <article
              key={`static-${card.id}`}
              className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:gap-12"
            >
              <div className="grid grid-cols-2 items-end gap-3 sm:gap-4">
                {card.images.map((image, index) => (
                  <img
                    key={`${card.id}-static-${index}`}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                ))}
              </div>

              <div className="flex max-w-sm flex-col justify-center">
                {card.eyebrow && (
                  <p className="mb-2 text-[10px] font-medium uppercase">
                    {card.eyebrow}
                  </p>
                )}

                <h2 className="font-serif text-3xl leading-tight">
                  {card.title}
                </h2>

                {card.kicker && (
                  <p className="mt-7 text-[10px] font-medium uppercase leading-snug">
                    {card.kicker}
                  </p>
                )}

                <p className="mt-7 text-sm leading-6 text-neutral-700">
                  {card.description}
                </p>

                <a
                  href={card.cta.href}
                  className="mt-5 inline-flex min-h-8 w-fit items-center justify-center bg-black px-5 py-2 text-[10px] font-semibold uppercase text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
                >
                  {card.cta.label}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
