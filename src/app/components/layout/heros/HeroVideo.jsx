export default function HeroVideo({ videoSrc }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 grid grid-cols-4 justify-center items-center px-6 text-6xl bg-black/40">
        <p className="font-benton-regular text-secondary ">A</p>
        <p className="font-benton-regular text-secondary  ">Quiet Place</p>
        <p></p>
        <p className="font-benton-regular text-secondary ">To Come Alive.</p>
      </div>
    </section>
  );
}
