import Image from "next/image";

import HeroImage from "@/app/components/layout/heros/HeroImage";
import LogoIntro from "@/app/components/layout/Intro/LogoIntro";
import ThreeImageColumn from "@/app/components/layout/Decorative/ThreeImageColumn";

import OakLogo from "../../../../public/images/logos/oak_logo.png";

export const metadata = {
  title: "Oak Steakhouse",

  description:
    "Discover Oak Steakhouse at Sabal House, opening in early 2027 in Savannah’s Historic District with classic American fare, exceptional steaks, and a curated wine program.",

  alternates: {
    canonical: "/dine/oak-steakhouse",
  },

  openGraph: {
    type: "website",
    url: "/dine/oak-steakhouse",
    title: "Oak Steakhouse | Sabal House",
    description:
      "Discover Oak Steakhouse at Sabal House, bringing classic American fare, exceptional steaks, thoughtful hospitality, and a curated wine program to Savannah’s Historic District.",
    images: [
      {
        url: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_hero.jpg",
        alt: "Oak Steakhouse dining experience at Sabal House in Savannah",
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
