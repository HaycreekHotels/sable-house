"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollStoryCards({
  cards,
  className = "",
  scrollPerStep = 0.85,
}) {
  const sectionRef = useRef(null);

  const firstImageRefs = useRef([]);
  const secondImageRefs = useRef([]);
  const textRefs = useRef([]);

  /*
    Each card becomes two visual states:

    Card 1:
      State 0 -> images 1 + 2
      State 1 -> images 3 + 4

    Card 2:
      State 2 -> images 1 + 2
      State 3 -> images 3 + 4
  */
  const imageStates = useMemo(() => {
    return cards.flatMap((card, cardIndex) => [
      {
        cardIndex,
        images: [card.images[0], card.images[1]],
      },
      {
        cardIndex,
        images: [card.images[2], card.images[3]],
      },
    ]);
  }, [cards]);

  useLayoutEffect(() => {
    if (!sectionRef.current || imageStates.length <= 1) {
      return;
    }

    // Respect the user's operating-system motion preference.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const firstImages = firstImageRefs.current;
      const secondImages = secondImageRefs.current;
      const texts = textRefs.current;

      /*
        Reset everything.

        Only the first image state and first text card
        are visible when the user reaches the section.
      */
      gsap.set([...firstImages, ...secondImages], {
        autoAlpha: 0,
        yPercent: 100,
      });

      gsap.set([firstImages[0], secondImages[0]], {
        autoAlpha: 1,
        yPercent: 0,
      });

      gsap.set(texts, {
        autoAlpha: 0,
        yPercent: 30,
      });

      gsap.set(texts[0], {
        autoAlpha: 1,
        yPercent: 0,
      });

      const numberOfTransitions = imageStates.length - 1;

      const timeline = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power3.inOut",
        },

        scrollTrigger: {
          trigger: sectionRef.current,

          // Pin as soon as the section fills the viewport.
          start: "top top",

          /*
            Each state gets its own section of scroll distance.

            Increase scrollPerStep if you want transitions
            to require more scrolling.
          */
          end: () =>
            `+=${window.innerHeight * scrollPerStep * numberOfTransitions}`,

          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          /*
            Helps each image/card state settle into place
            instead of stopping halfway between states.
          */
          snap:
            numberOfTransitions > 0
              ? {
                  snapTo: 1 / numberOfTransitions,
                  duration: {
                    min: 0.15,
                    max: 0.4,
                  },
                  delay: 0.05,
                  ease: "power1.inOut",
                }
              : false,
        },
      });

      /*
        Build one timeline transition for every state change.
      */
      for (let index = 0; index < imageStates.length - 1; index++) {
        const currentState = imageStates[index];
        const nextState = imageStates[index + 1];

        const label = `transition-${index}`;

        timeline.addLabel(label);

        /*
          CURRENT IMAGES
          Move upward and out of their containers.
        */
        timeline.to(
          [firstImages[index], secondImages[index]],
          {
            yPercent: -100,
            autoAlpha: 0,
          },
          label,
        );

        /*
          NEXT IMAGES
          Enter from beneath the image containers.
        */
        timeline.fromTo(
          [firstImages[index + 1], secondImages[index + 1]],
          {
            yPercent: 100,
            autoAlpha: 0,
          },
          {
            yPercent: 0,
            autoAlpha: 1,
          },
          label,
        );

        /*
          Only animate the text when we're moving
          from one card to another.

          Example:

          Card 1 state 0 -> Card 1 state 1
          Text does NOT change.

          Card 1 state 1 -> Card 2 state 0
          Text DOES change.
        */
        const changingCard = currentState.cardIndex !== nextState.cardIndex;

        if (changingCard) {
          timeline.to(
            texts[currentState.cardIndex],
            {
              yPercent: -35,
              autoAlpha: 0,
              duration: 0.75,
            },
            label,
          );

          timeline.fromTo(
            texts[nextState.cardIndex],
            {
              yPercent: 35,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.75,
            },
            `${label}+=0.15`,
          );
        }
      }
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, [imageStates, scrollPerStep]);

  if (!cards?.length) {
    return null;
  }

  return (
    <>
      {/* =====================================================
          ANIMATED VERSION
          Hidden automatically for reduced-motion users
      ====================================================== */}
      <section
        ref={sectionRef}
        aria-label="Featured stories"
        className={`relative bg-white motion-reduce:hidden ${className}`}
      >
        <div className="mx-auto flex min-h-[100svh] max-w-[1600px] items-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)] lg:gap-14 xl:gap-20">
            {/* =========================
                IMAGE AREA
            ========================== */}
            <div className="grid grid-cols-[1.15fr_1fr] items-end gap-3 sm:gap-5 lg:gap-6">
              {/* LARGE IMAGE */}
              <div className="relative h-[44svh] min-h-[300px] overflow-hidden bg-neutral-200 sm:h-[55svh] lg:h-[78vh] lg:max-h-[780px]">
                {imageStates.map((state, stateIndex) => {
                  const image = state.images[0];

                  return (
                    <img
                      key={`first-${state.cardIndex}-${stateIndex}`}
                      ref={(element) => {
                        firstImageRefs.current[stateIndex] = element;
                      }}
                      src={image.src}
                      alt={image.alt}
                      loading={stateIndex === 0 ? "eager" : "lazy"}
                      className={`absolute inset-0 h-full w-full object-cover will-change-transform ${
                        stateIndex === 0
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-full opacity-0"
                      }`}
                    />
                  );
                })}
              </div>

              {/* SMALL IMAGE */}
              <div className="relative h-[28svh] min-h-[190px] overflow-hidden bg-neutral-200 sm:h-[36svh] lg:h-[46vh] lg:max-h-[460px]">
                {imageStates.map((state, stateIndex) => {
                  const image = state.images[1];

                  return (
                    <img
                      key={`second-${state.cardIndex}-${stateIndex}`}
                      ref={(element) => {
                        secondImageRefs.current[stateIndex] = element;
                      }}
                      src={image.src}
                      alt={image.alt}
                      loading={stateIndex === 0 ? "eager" : "lazy"}
                      className={`absolute inset-0 h-full w-full object-cover will-change-transform ${
                        stateIndex === 0
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-full opacity-0"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* =========================
                CONTENT AREA
            ========================== */}
            <div
              className="relative min-h-[300px] overflow-hidden sm:min-h-[320px] lg:min-h-[430px]"
              aria-live="polite"
            >
              {cards.map((card, cardIndex) => (
                <article
                  key={card.id}
                  ref={(element) => {
                    textRefs.current[cardIndex] = element;
                  }}
                  className={`absolute inset-0 flex max-w-md flex-col justify-center will-change-transform ${
                    cardIndex === 0
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-8 opacity-0"
                  }`}
                >
                  {card.eyebrow && (
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-neutral-900">
                      {card.eyebrow}
                    </p>
                  )}

                  <h2 className="font-serif text-3xl leading-[1.05] tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.75rem]">
                    {card.title}
                  </h2>

                  {card.kicker && (
                    <p className="mt-8 text-xs font-medium uppercase tracking-wide text-neutral-800">
                      {card.kicker}
                    </p>
                  )}

                  <p className="mt-8 max-w-sm text-sm leading-6 text-neutral-700">
                    {card.description}
                  </p>

                  <div className="mt-6">
                    <a
                      href={card.cta.href}
                      className="inline-flex min-h-11 items-center justify-center bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
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

      {/* =====================================================
          ACCESSIBLE REDUCED-MOTION VERSION

          If someone has animation reduction enabled,
          don't pin the page or hide their content.
          Show every story normally instead.
      ====================================================== */}
      <section
        aria-label="Featured stories"
        className="hidden bg-white motion-reduce:block"
      >
        <div className="mx-auto max-w-7xl space-y-24 px-4 py-16 sm:px-6 lg:px-8">
          {cards.map((card) => (
            <article
              key={`static-${card.id}`}
              className="grid gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {card.images.map((image, index) => (
                  <img
                    key={`${card.id}-static-${index}`}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                ))}
              </div>

              <div className="flex max-w-lg flex-col justify-center">
                {card.eyebrow && (
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide">
                    {card.eyebrow}
                  </p>
                )}

                <h2 className="font-serif text-4xl leading-tight">
                  {card.title}
                </h2>

                {card.kicker && (
                  <p className="mt-8 text-xs font-medium uppercase tracking-wide">
                    {card.kicker}
                  </p>
                )}

                <p className="mt-8 leading-7 text-neutral-700">
                  {card.description}
                </p>

                <a
                  href={card.cta.href}
                  className="mt-6 inline-flex min-h-11 w-fit items-center justify-center bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
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
