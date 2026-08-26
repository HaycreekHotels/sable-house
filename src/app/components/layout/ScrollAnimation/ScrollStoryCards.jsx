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

  // Each card creates two visual states:
  // state A -> images 1 + 2
  // state B -> images 3 + 4
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

    let context;
    let cancelled = false;

    const firstImages = firstImageRefs.current.filter(Boolean);
    const secondImages = secondImageRefs.current.filter(Boolean);
    const textPanels = textRefs.current.filter(Boolean);
    const allImages = [...firstImages, ...secondImages];

    if (
      firstImages.length !== imageStates.length ||
      secondImages.length !== imageStates.length ||
      textPanels.length !== cards.length
    ) {
      return undefined;
    }

    // Wait for every image layer to finish decoding before ScrollTrigger starts.
    // This is especially important with remote image CDNs + a pinned section.
    const waitForImages = allImages.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }

      if (typeof img.decode === "function") {
        return img.decode().catch(() => undefined);
      }

      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    });

    Promise.allSettled(waitForImages).then(() => {
      if (cancelled) return;

      context = gsap.context(() => {
        /*
          IMAGE ANIMATION IMPORTANT:

          There is intentionally NO opacity / visibility animation on the images.
          Every non-active image begins one full image-height below its frame.

          During a transition:
          - current image moves from 0% -> -100%
          - next image moves from 100% -> 0%

          Because both move together, the frame is always covered by an image.
          This removes the gray-box gap that can happen when opacity/autoAlpha,
          Tailwind opacity utilities, visibility, and async image loading overlap.
        */
        gsap.set(firstImages, {
          yPercent: 100,
          force3D: true,
        });

        gsap.set(secondImages, {
          yPercent: 100,
          force3D: true,
        });

        gsap.set([firstImages[0], secondImages[0]], {
          yPercent: 0,
        });

        // Text can fade because it does not expose the image background.
        gsap.set(textPanels, {
          autoAlpha: 0,
          yPercent: 16,
          force3D: true,
        });

        gsap.set(textPanels[0], {
          autoAlpha: 1,
          yPercent: 0,
        });

        const numberOfTransitions = imageStates.length - 1;

        const timeline = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "power2.inOut",
          },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * scrollPerStep * numberOfTransitions}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / numberOfTransitions,
              duration: { min: 0.12, max: 0.3 },
              delay: 0.05,
              ease: "power1.inOut",
            },
          },
        });

        for (let index = 0; index < numberOfTransitions; index += 1) {
          const currentState = imageStates[index];
          const nextState = imageStates[index + 1];
          const label = `state-${index}`;

          timeline.addLabel(label);

          // The outgoing and incoming images move at exactly the same time.
          // No fade = no moment where the gray frame can show through.
          timeline.to(
            [firstImages[index], secondImages[index]],
            {
              yPercent: -100,
            },
            label,
          );

          timeline.to(
            [firstImages[index + 1], secondImages[index + 1]],
            {
              yPercent: 0,
            },
            label,
          );

          // Only swap text when crossing into a new card.
          if (currentState.cardIndex !== nextState.cardIndex) {
            timeline.to(
              textPanels[currentState.cardIndex],
              {
                yPercent: -16,
                autoAlpha: 0,
                duration: 0.65,
              },
              label,
            );

            timeline.fromTo(
              textPanels[nextState.cardIndex],
              {
                yPercent: 16,
                autoAlpha: 0,
              },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.65,
              },
              `${label}+=0.18`,
            );
          }
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, section);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [cards, imageStates, scrollPerStep]);

  if (!cards.length || !imageStates.length) {
    return null;
  }

  return (
    <>
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
                      decoding="async"
                      fetchPriority={stateIndex < 2 ? "high" : "auto"}
                      draggable="false"
                      onError={() => {
                        console.error(
                          `ScrollStoryCards: failed to load image: ${image.src}`,
                        );
                      }}
                      // Keep transform/opacity utilities off this element.
                      // GSAP owns transform completely.
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover will-change-transform"
                      style={{
                        transform:
                          stateIndex === 0
                            ? "translate3d(0, 0%, 0)"
                            : "translate3d(0, 100%, 0)",
                      }}
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
                      decoding="async"
                      fetchPriority={stateIndex < 2 ? "high" : "auto"}
                      draggable="false"
                      onError={() => {
                        console.error(
                          `ScrollStoryCards: failed to load image: ${image.src}`,
                        );
                      }}
                      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover will-change-transform"
                      style={{
                        transform:
                          stateIndex === 0
                            ? "translate3d(0, 0%, 0)"
                            : "translate3d(0, 100%, 0)",
                      }}
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
                  aria-hidden={cardIndex === 0 ? "false" : "true"}
                  className="absolute inset-0 flex max-w-[390px] flex-col justify-start pt-5 will-change-[transform,opacity] lg:pt-[22svh]"
                  style={
                    cardIndex === 0
                      ? {
                          opacity: 1,
                          visibility: "visible",
                          transform: "translate3d(0, 0, 0)",
                        }
                      : {
                          opacity: 0,
                          visibility: "hidden",
                          transform: "translate3d(0, 2rem, 0)",
                        }
                  }
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
