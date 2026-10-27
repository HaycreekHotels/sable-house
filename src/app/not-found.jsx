import Image from "next/image";
import Link from "next/link";

// Uses an existing Sabal House asset; no new images are required.
import sabalLeaf from "../../public/images/decorative/SH_Leaf_Brown.png";

/**
 * Root App Router 404 page.
 */
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative isolate flex min-h-[100svh] flex-1 items-center justify-center overflow-hidden bg-secondary px-6 pb-24 pt-36 text-secondary sm:px-10 lg:px-16"
    >
      {/* Decorative banner at the top to address the transparent header. Lazy patch will fix later. */}
      <div
        aria-hidden="true"
        className="bg-main w-full h-18 absolute pointer-events-none top-0"
      ></div>
      {/* Decorative */}
      <Image
        src={sabalLeaf}
        alt=""
        aria-hidden="true"
        loading="lazy"
        sizes="(max-width: 640px) 85vw, 45vw"
        className="pointer-events-none absolute -bottom-24 -right-24 z-0 h-auto w-[85vw] max-w-[680px] -rotate-12 select-none opacity-[0.12] sm:-bottom-40 sm:-right-28 sm:w-[45vw]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p className="font-central-regular text-xs uppercase tracking-[0.2em] text-main sm:text-sm">
          404 &mdash; Page Not Found
        </p>

        <h1 className="mt-6 font-benton-regular text-[clamp(3.25rem,8vw,6.75rem)] leading-[1.02] tracking-[-0.035em] text-main sm:mt-8">
          A little off course.
        </h1>

        <p className="mt-6 max-w-lg font-central-regular text-base leading-relaxed text-main sm:mt-8 sm:text-lg">
          The page you were looking for couldn’t be found. Let us guide you back
          to Sabal House.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center justify-center border border-secondary bg-main px-8 py-3 font-central-regular text-sm uppercase tracking-[0.06em] text-secondary transition-colors duration-200 hover:bg-transparent hover:text-main hover:border-2 hover:border-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:mt-11"
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
