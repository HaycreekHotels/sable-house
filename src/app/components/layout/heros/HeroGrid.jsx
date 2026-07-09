"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const heroTile = "hero-tile w-72 h-72 overflow-hidden";
const heroMedia = "media-tile w-full h-full object-cover";
const heroVideoTile = "col-start-2 row-start-2 w-72 h-72 overflow-hidden";

export default function HeroGrid() {
  const videoRef = useRef(null);

  useGSAP(() => {
    gsap.to(videoRef.current, {
      scale: 1.1,
      opacity: 0.5,
      duration: 1,
    });
  });

  return (
    <section className="min-h-screen w-full relative overflow-hidden grid place-items-center px-4">
      <div className="grid w-full grid-cols-4 grid-rows-3 gap-y-5 justify-items-center">
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroVideoTile} ref={videoRef}>
          <video
            className={heroMedia}
            src="https://cdn.pixabay.com/video/2021/09/22/89352-613200582_large.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className={heroTile}>
          <Image
            width={288}
            height={288}
            className={heroMedia}
            src="https://images.unsplash.com/photo-1782064230154-ba47c8714d9e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
