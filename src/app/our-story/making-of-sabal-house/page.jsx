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
        content="Designed as a thoughtful retreat from the familiar, Sabal House offers a space to arrive, find your footing, and listen to the pulse of Savannah. "
        cr="This philosophy takes form in every material, line, and detail, seamlessly bridging our newly crafted architectural sanctuary with the restored Heritage Rooms."
        eyebrow="TOLD BY THE PEOPLE SHAPING IT"
        className="-mb-[80px] bg-[#f7f6f2]"
      />
      <FullWidthSimple />
      <StoryGallery />
    </main>
  );
}
