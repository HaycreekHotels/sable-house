import NavBar from "../components/layout/Header/NavBar";
import HeroVideo from "../components/layout/heros/HeroVideo";

const VIDEO_SRC =
  "https://sabal-house.b-cdn.net/flat%20hero/Sabal%20House%20-%20Promo.mp4";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-main">
      <NavBar />
      <HeroVideo videoSrc={VIDEO_SRC} />
    </main>
  );
}
