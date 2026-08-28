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

    eyebrow: "Lorem & Ipsum",

    title: "Crafting Sabal House",

    kicker: "Shaped by many hands.",

    description:
      "This text will be a short blurb about who we are. Explore the craftsmanship, collaboration, and attention to detail behind Sabal House.",

    cta: {
      label: "Our Story",
      href: "#",
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
    <main className="min-h-screen">
      <HeroVideo videoSrc={VIDEO_SRC} />
      <IntroSection label="Begin" heading="At Sabal House">
        <p>
          This text will be a short blurb about why they should start at Sabal
          House. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </IntroSection>
      <FullWidth />
      <TextBreak>
        Design isnt just what something looks like.{" "}
        <em>Its how it makes someone feel.</em>
      </TextBreak>
      <ScrollStoryCards cards={storyCards} />
      <OpenLetterForm
        backgroundImage="https://sabal-house.b-cdn.net/making%20of%20sabal%20house/SabalHouse-86.jpg"
        stampImage="/images/decorative/SH Wax Seal.png"
        eyebrow="LETTERS FROM SABAL HOUSE"
        description="Stay informed as we continue to build Sabal House. Sign up to receive occasional updates from us."
        buttonLabel="STAY CLOSE"
        signature="Until Then."
      />
    </main>
  );
}
