"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1740&auto=format&fit=crop",
    alt: "Elegant guest room at sabal House",
    size: "small",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1740&auto=format&fit=crop",
    alt: "Boutique hotel room detail",
    size: "small",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1740&auto=format&fit=crop",
    alt: "Luxury hotel interior lounge",
    size: "wide",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1740&auto=format&fit=crop",
    alt: "sabal House bedroom design",
    size: "largeWide",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1740&auto=format&fit=crop",
    alt: "Hotel room seating area",
    size: "small",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1740&auto=format&fit=crop",
    alt: "Refined suite interior",
    size: "small",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1740&auto=format&fit=crop",
    alt: "sabal House bathroom interior",
    size: "medium",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1740&auto=format&fit=crop",
    alt: "Boutique hotel suite with warm light",
    size: "largeWide",
  },
];

const sizeClasses = {
  small: "md:col-span-2 md:row-span-2",
  medium: "md:col-span-4 md:row-span-3",
  wide: "md:col-span-6 md:row-span-2",
  largeWide: "md:col-span-6 md:row-span-3",
  tall: "md:col-span-3 md:row-span-4",
};

export default function MosaicGallery({
  eyebrow = "sabal House",
  heading = "Gallery",
  intro = "Explore the spaces, textures, and quiet details that shape the Sabal House experience.",
  images = galleryImages,
}) {
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-header-item",
        {
          autoAlpha: 0,
          y: 28,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".gallery-header",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".gallery-tile",
        {
          autoAlpha: 0,
          y: 45,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [images]);

  useEffect(() => {
    if (!selectedImage || !modalRef.current) return;

    gsap.fromTo(
      modalRef.current,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.25,
        ease: "power2.out",
      },
    );

    gsap.fromTo(
      ".modal-image-wrapper",
      {
        autoAlpha: 0,
        scale: 0.96,
        y: 20,
      },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      },
    );
  }, [selectedImage]);

  function closeModal() {
    if (!modalRef.current) {
      setSelectedImage(null);
      return;
    }

    gsap.to(modalRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setSelectedImage(null),
    });
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full bg-secondary px-5 py-20 text-main md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="gallery-header mb-12 max-w-3xl">
            <p className="gallery-header-item mb-4 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
              {eyebrow}
            </p>

            <h2 className="gallery-header-item font-serif text-5xl leading-tight opacity-0 md:text-7xl">
              {heading}
            </h2>

            <p className="gallery-header-item mt-6 max-w-2xl text-base leading-8 text-main/75 opacity-0 md:text-lg">
              {intro}
            </p>
          </div>

          <div className="gallery-grid grid auto-rows-[220px] grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[110px]">
            {images.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`gallery-tile group relative overflow-hidden bg-main/10 opacity-0 ${
                  sizeClasses[image.size] || sizeClasses.small
                }`}
                aria-label={`Open image: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="pointer-events-none absolute inset-0 bg-main/0 transition-colors duration-500 group-hover:bg-main/20" />

                <span className="pointer-events-none absolute bottom-4 right-4 border border-secondary bg-main/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-main/85 px-5 py-10 opacity-0"
          onClick={closeModal}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-secondary text-2xl leading-none text-secondary transition-colors hover:bg-secondary hover:text-main"
            aria-label="Close image preview"
          >
            ×
          </button>

          <div
            className="modal-image-wrapper relative h-[75vh] w-full max-w-6xl opacity-0"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
