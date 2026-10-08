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
    alt: "Craft cocktail served under a glass dome at Oak Steakhouse, a fine dining steakhouse and seafood restaurant in historic Savannah, Georgia.",
  },
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_steak.jpg",
    alt: "Sliced grilled steak served on a wooden board with fresh herbs at Oak Steakhouse, a fine dining restaurant in Savannah's Historic District.",
  },
  {
    src: "https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_oyster.jpg",
    alt: "Baked oysters topped with herbs and golden cheese on a bed of ice, showcasing the upscale seafood dining experience at Oak Steakhouse in Savannah, Georgia.",
  },
];

export default function OakPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-secondary text-black">
      <HeroImage
        image="https://sabal-house.b-cdn.net/Oak%20Steakhous/oak_hero.jpg"
        alt="Fine dining spread featuring grilled steaks, fresh oysters, lobster, and gourmet sides at Oak Steakhouse in Savannah's Historic District, Georgia."
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
