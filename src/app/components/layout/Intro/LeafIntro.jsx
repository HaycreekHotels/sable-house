import Image from "next/image";

import leafDecorative from "../../../../../public/images/decorative/SH_Leaf_Brown.png";

export default function LeafIntro({
  title = "A Quiet Place To Come Alive",
  intro = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex.",
  ctaLabel = "Stay Informed",
}) {
  return (
    <section className="relative isolate min-h-176 overflow-hidden px-6 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/2"
      >
        <Image
          src={leafDecorative}
          alt=""
          fill
          className="object-contain object-left opacity-[0.08]"
          sizes="50vw"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/2"
      >
        <Image
          src={leafDecorative}
          alt=""
          fill
          className="object-contain object-right opacity-[0.08]"
          sizes="50vw"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-128 max-w-xl flex-col items-center justify-center text-center">
        <h2>{title}</h2>
        <p>{intro}</p>
        <button type="button">{ctaLabel}</button>
      </div>
    </section>
  );
}
