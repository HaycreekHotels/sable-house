import NavBar from "../components/layout/Header/NavBar";
import HeroVideo from "../components/layout/heros/HeroVideo";
import IntroSection from "../components/layout/Intro/IntroSection";
import FullWidth from "../components/layout/ScrollAnimation/FullWidth";
import TextBreak from "../components/layout/Intro/TextBreak";
import ScrollStoryCards from "../components/layout/ScrollAnimation/ScrollStoryCards";
import OpenLetterForm from "../components/layout/forms/OpenLetterForm";

const VIDEO_SRC =
  "https://sabal-house.b-cdn.net/flat%20hero/Sabal%20House%20-%20Promo.mp4";

const storyCards = [
  {
    id: "beyond-the-square",

    eyebrow: "Art & Culture",

    title: "Beyond The Square",

    kicker: "The Savannah worth knowing often sits just beyond the obvious.",

    description:
      "This text will be a short blurb about who we are. Discover the places, people, and stories that shape the city beyond the familiar.",

    cta: {
      label: "Explore Beyond",
      href: "#",
    },

    images: [
      {
        src: "https://images.unsplash.com/photo-1489715063951-a75aed17df07?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Historic architecture in Savannah",
      },
      {
        src: "https://images.unsplash.com/photo-1600791608938-6d50caed69d1?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Savannah cultural district",
      },
      {
        src: "https://images.unsplash.com/photo-1599666782476-691b0014fd87?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Local Savannah art gallery",
      },
      {
        src: "https://images.unsplash.com/photo-1597199813662-c1f22fee941c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Outdoor gathering space in Savannah",
      },
    ],
  },

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
        src: "https://images.unsplash.com/photo-1641600354119-aba42f88fc45?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Exterior of Sabal House",
      },
      {
        src: "https://images.unsplash.com/photo-1667489012747-d4bbc525486f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Interior details of Sabal House",
      },
      {
        src: "https://images.unsplash.com/photo-1592663283246-c843227611ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Craftsman working on Sabal House",
      },
      {
        src: "https://images.unsplash.com/photo-1667489012975-d3756b70e8f5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Finished architectural detail",
      },
    ],
  },
];

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
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
        backgroundImage="https://sabal-house.b-cdn.net/flat%20hero/10th.jpg"
        stampImage="/images/decorative/SH Wax Seal.png"
        eyebrow="LETTERS FROM SABAL HOUSE"
        description="Stay informed as we continue to build Sabal House. Sign up to receive occasional updates from us."
        buttonLabel="STAY CLOSE"
        signature="Until Then."
      />
    </main>
  );
}
