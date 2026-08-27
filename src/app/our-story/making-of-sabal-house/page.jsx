import HeroImage from "@/app/components/layout/heros/HeroImage";
import ThreeColSection from "@/app/components/layout/Intro/ThreeColSection";
import FullWidthSimple from "@/app/components/layout/ScrollAnimation/FullWidthSimple";
import StoryGallery from "@/app/components/layout/ScrollAnimation/StoryGallery";

export default function StoryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-black">
      <HeroImage
        image="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-57.jpeg"
        alt="AHHHHH"
      />
      <ThreeColSection
        label="The"
        heading="Making"
        hr="Of Sabal House"
        content="From the beginning, Sabal House was imagined as a quieter way to experience Savannah, a place to arrive, find your footing, and become more attuned to the city areound you."
        cr="That idea is taking shape through architecture, material, and the people behind it, bringing together a luxury new building and the restored Heritage Rooms as one Sabal House."
        eyebrow="TOLD BY THE PEOPLE SHAPING IT"
        className="mb-[1px] bg-[#f7f6f2]"
      />
      <FullWidthSimple />
      <StoryGallery />
    </main>
  );
}
