"use client";
import Image from "next/image";

export default function HeroImage({ image, alt }) {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/25" />
    </section>
  );
}
