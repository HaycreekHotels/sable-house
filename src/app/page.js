import HeroVideo from "./components/layout/heros/HeroVideo";
import IntroSection from "./components/layout/Intro/IntroSection";
import FullWidth from "./components/layout/ScrollAnimation/FullWidth";
import TextBreak from "./components/layout/Intro/TextBreak";
import ScrollStoryCards from "./components/layout/ScrollAnimation/ScrollStoryCards";
import OpenLetterForm from "./components/layout/forms/OpenLetterForm";

const VIDEO_SRC =
  "https://sabal-house.b-cdn.net/flat%20hero/Sabal%20House%20-%20Promo.mp4";

const storyCards = [
  {
    id: "crafting-sabal-house",

    eyebrow: "DETAILED HOSPITALITY",

    title: "Crafting Sabal House",

    kicker: "SHAPED BY MANY HANDS.",

    description:
      "Deeply inspired and shaped by the undeniable spirit of our native coast, Sabal House has taken form slowly and with intention. Through a shared point of view and the hands of those bringing it to life, every decision tells part of the story of a place that belongs to Savannah while finding an expression entirely its own. ",

    cta: {
      label: "Our Story",
      href: "/our-story/making-of-sabal-house",
    },

    images: [
      {
        src: "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Pat.jpeg",
        alt: "Exterior of Sabal House",
      },
      {
        src: "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Sabal%20House%20Construction%20Image.jpeg",
        alt: "Interior details of Sabal House",
      },
      {
        src: "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-8.jpeg",
        alt: "Craftsman working on Sabal House",
      },
      {
        src: "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-19.jpeg",
        alt: "Finished architectural detail",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F6F2]">
      <HeroVideo videoSrc={VIDEO_SRC} />
      <IntroSection
        className="bg-[#F7F6F2]"
        label="Begin"
        heading="At Sabal House"
        leftText="Beyond the famous squares lies a quieter, deeper Savannah. One measured by the shift of the tides, the perfume of night-blooming vines, and secrets kept by ancient moss."
      >
        Sabal House anchors itself in this interplay of urban heritage and
        natural landscape. Situated directly across from Oglethorpe Square, our
        space is an homage to the native Sabal leaf and the enduring,
        atmospheric beauty of the Georgia coast.
      </IntroSection>
      <FullWidth
        images={[
          {
            src: "https://sabal-house.b-cdn.net/making%20of%20sabal%20house/Guestroom.jpg",
            alt: "Contemporary guest room at Sabal House",
            eyebrow: "Stay",
            title: "Sabal House Rooms",
            description:
              "A lighter, more contemporary expression of Sabal House. Refined finishes, thoughtful layouts, and a calm sense of ease within the new building.",
            ctaLabel: "Explore Your Stay",
            ctaHref: "/stay/accommodations",
          },
          {
            src: "https://sabal-house.b-cdn.net/ricks-videos/Heritage%20Rooms.png",
            alt: "Seating and interior details inside a Sabal House guest room",
            eyebrow: "Stay",
            title: "Heritage Rooms",
            description:
              "Set within the former Presidents' Quarters, these rooms retain original hardwood floors, historic details, and the individual character of the building.",
            ctaLabel: "Discover Heritage Rooms",
            ctaHref: "/stay/accommodations",
          },
        ]}
      />
      <TextBreak>
        We transform hospitality into an intimate immersion, blending polished
        coastal sophistication with the honest pulse of Savannah.
      </TextBreak>
      <ScrollStoryCards cards={storyCards} />
      <OpenLetterForm
        backgroundImage="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-86.jpg"
        stampImage="/images/decorative/SH Wax Seal.png"
        eyebrow="LETTERS FROM SABAL HOUSE"
        description="Stay informed as Sabal House takes shape, with occasional notes from Savannah, and a first look at what’s to come."
        buttonLabel="STAY CLOSE"
        signature="Until Then."
      />
    </main>
  );
}
