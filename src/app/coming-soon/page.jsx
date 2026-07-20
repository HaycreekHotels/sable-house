import HeroGrid from "../components/layout/heros/HeroGrid";
import LeafIntro from "../components/layout/Intro/LeafIntro";
import MakingOfSabalHouse from "../components/MakingOfSabalHouse/MakingOfSabalHouse";

export default function ComingSoon() {
  return (
    <main>
      <HeroGrid />
      <LeafIntro sectionId="leaf-intro" />
      <MakingOfSabalHouse />
    </main>
  );
}
