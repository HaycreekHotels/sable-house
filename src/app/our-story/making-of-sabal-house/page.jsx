import HeroImage from "@/app/components/layout/heros/HeroImage";
import IntroSection from "@/app/components/layout/Intro/IntroSection";
import FullWidthSimple from "@/app/components/layout/ScrollAnimation/FullWidthSimple";
import StoryGallery from "@/app/components/layout/ScrollAnimation/StoryGallery";
import OpenLetterForm from "@/app/components/layout/forms/OpenLetterForm";

export default function StoryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-secondary text-black">
      <HeroImage
        image="https://sabal-house.b-cdn.net/making%20hero.jpg"
        alt="The new public space at the Sabal House Hotel with modern furniture and vibrant green plants"
      />
      <IntroSection
        className="bg-secondary"
        label="The"
        heading="Making of Sabal House"
        ctaHref="#form"
        ctaLabel="STAY INFORMED"
        leftText="From the beginning, Sabal House was imagined as a quieter way to experience Savannah, a place to arrive, find your footing, and become more attuned to the city around you."
      >
        That idea is taking shape through architecture, material, and the people
        behind it, bringing together a luxury new building and the restored
        Heritage Rooms as one Sabal House.
      </IntroSection>
      <FullWidthSimple />
      <StoryGallery />
      <div id="form">
        <OpenLetterForm
          backgroundImage="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-86.jpg"
          stampImage="/images/decorative/SH Wax Seal.png"
          eyebrow="LETTERS FROM SABAL HOUSE"
          description="Stay informed as Sabal House takes shape, with occasional notes from Savannah, and a first look at what’s to come."
          buttonLabel="STAY CLOSE"
          signature="Until Then."
        />
      </div>
    </main>
  );
}
