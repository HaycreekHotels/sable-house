import HeroFlatGrid from "./components/layout/heros/HeroFlatGrid";
import LeafIntro from "./components/layout/Intro/LeafIntro";
import MakingOfSabalHouse from "./components/MakingOfSabalHouse/MakingOfSabalHouse";

export default function Home() {
  return (
    <main>
      <HeroFlatGrid />
      <LeafIntro />
      <MakingOfSabalHouse />
    </main>
  );
}
