import Image from "next/image";

import HeroImage from "@/app/components/layout/heros/HeroImage";
import LogoIntro from "@/app/components/layout/Intro/LogoIntro";
import ThreeImageColumn from "@/app/components/layout/Decorative/ThreeImageColumn";

import OakLogo from "../../../../public/images/logos/oak_logo.png";

export const metadata = {
  title: "Oak Steakhouse",

  description:
    "Prepare your appetiate as the newly built Steakhouse is coming to Savannah, Gegoria and housed at the newly renavated Sabal House Inn!",

  alternates: {
    canonical: "/dine/oak-steakhouse",
  },

  openGraph: {
    type: "article",

    url: "/dine/oak-steakhouse",

    title: "Oak Steakhouse| Sabal House",

    description:
      "Learn more about the newly built resturaunt coming to Savannah, Gegoria.",

    images: [
      {
        url: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_hero.jpg",
        alt: "A dinning table stacked high with a fresh seafood tower and surround by steak plates.",
      },
    ],
  },
};

const columnImages = [
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_cola.jpg",
    alt: "A dark cocktail beneath a glass cloche on a wooden serving board.",
  },
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_steak.jpg",
    alt: "A sliced T-bone steak served on a wooden board with grilled onions.",
  },
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_oyster.jpg",
    alt: "Baked oysters topped with herbs and a golden, savory crust.",
  },
];

export default function OakPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-secondary text-black">
      <HeroImage
        image="https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_hero.jpg"
        alt="High end dishes of steak, lobster, salmon, and more stacked on a surf and turf tower paired with red wine"
      />

      <LogoIntro
        logo={OakLogo}
        eyebrow="OPENING IN EARLY 2027"
        label="Where Classic Steakhouse"
        heading="Tradition Meets Historic Savannah."
        leftText="
Opening in early 2027, Oak Steakhouse will bring its signature culinary experience to the heart of the Historic District, pairing classic American fare, exceptional steaks, thoughtful hospitality, and a curated wine program with a distinctly Savannah setting."
      />
      <ThreeImageColumn images={columnImages} />
    </main>
  );
}
