import Image from "next/image";
import Link from "next/link";

import leafDecorative from "../../../../../public/images/decorative/SH_Leaf_Brown.png";

const ALLOWED_HEADING_LEVELS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

const SECTION_CLASSES =
  "relative isolate min-h-[36rem] overflow-hidden bg-[#f7f3ec] px-5 py-16 sm:min-h-[40rem] sm:px-8 sm:py-20 md:min-h-176 md:px-10 md:py-24";

const CONTENT_CLASSES =
  "relative z-10 mx-auto flex min-h-[24rem] max-w-xl flex-col items-center justify-center text-center sm:min-h-[28rem] md:min-h-128";

const HEADING_CLASSES =
  "max-w-2xl text-balance font-serif text-4xl leading-[1.05] tracking-tight text-stone-900 italic sm:text-5xl lg:text-6xl";

const INTRO_CLASSES =
  "mt-6 max-w-md text-pretty text-base leading-7 text-stone-800 sm:mt-8 sm:text-lg sm:leading-8";

const CTA_CLASSES =
  "mt-10 inline-flex min-h-11 items-center border-b border-stone-900 px-2 pb-2 text-sm font-medium uppercase tracking-[0.08em] text-stone-900 transition-colors duration-200 hover:border-stone-600 hover:text-stone-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f3ec] motion-reduce:transition-none sm:mt-12";

const LEAF_CONFIG = {
  left: {
    wrapper:
      "pointer-events-none absolute -left-28 top-6 z-0 size-72 sm:-left-24 sm:size-[22rem] md:-left-56 md:top-1/2 md:size-[50rem] md:-translate-y-1/2 lg:-left-48 lg:size-[58rem]",
    image:
      "rotate-[38deg] object-contain opacity-[0.045] sm:opacity-[0.05] md:rotate-[72deg] md:opacity-[0.06]",
    sizes:
      "(max-width: 639px) 18rem, (max-width: 767px) 22rem, (max-width: 1023px) 50rem, 58rem",
  },

  right: {
    wrapper:
      "pointer-events-none absolute -right-32 bottom-0 z-0 size-80 sm:-right-28 sm:size-[24rem] md:-right-56 md:top-1/2 md:bottom-auto md:size-[50rem] md:-translate-y-1/2 lg:-right-48 lg:size-[58rem]",
    image:
      "rotate-[-38deg] -scale-x-100 object-contain opacity-[0.045] sm:opacity-[0.05] md:rotate-[-72deg] md:opacity-[0.06]",
    sizes:
      "(max-width: 639px) 20rem, (max-width: 767px) 24rem, (max-width: 1023px) 50rem, 58rem",
  },
};

function LeafDecoration({ side }) {
  const config = LEAF_CONFIG[side];

  return (
    <div aria-hidden="true" className={config.wrapper}>
      <Image
        src={leafDecorative}
        alt=""
        fill
        className={config.image}
        sizes={config.sizes}
      />
    </div>
  );
}

export default function LeafIntro({
  title = "A Quiet Place To Come Alive",
  intro = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex.",
  ctaLabel = "Stay Informed",
  ctaHref = "#newsletter",
  headingLevel = "h2",
  sectionId,
}) {
  const Heading = ALLOWED_HEADING_LEVELS.has(headingLevel)
    ? headingLevel
    : "h2";

  const headingId = sectionId ? `${sectionId}-heading` : undefined;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className={SECTION_CLASSES}
    >
      <LeafDecoration side="left" />
      <LeafDecoration side="right" />

      <div className={CONTENT_CLASSES}>
        <Heading id={headingId} className={HEADING_CLASSES}>
          {title}
        </Heading>

        <p className={INTRO_CLASSES}>{intro}</p>

        {ctaLabel && ctaHref ? (
          <Link href={ctaHref} className={CTA_CLASSES}>
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
