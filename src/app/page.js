import HeroFlatGrid from "./components/layout/heros/HeroFlatGrid";
import LeafIntro from "./components/layout/Intro/LeafIntro";
import MakingOfSabalHouse from "./components/MakingOfSabalHouse/MakingOfSabalHouse";

const homeTitle = "Sabal House | Hotel Opening December 2026 in Savannah";

const homeDescription =
  "Sabal House is a new hotel opening December 2026 in Savannah’s Historic District. Follow the journey, get opening updates, and contact our team.";

export const metadata = {
  title: {
    absolute: homeTitle,
  },

  description: homeDescription,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "/",

    siteName: "Sabal House",

    title: homeTitle,

    description:
      "Sabal House is coming to Savannah’s Historic District in December 2026. Follow the hotel’s journey, receive opening updates, and contact our team for more information.",

    images: [
      {
        url: "/images/sabal-house-og.jpg",

        width: 1200,

        height: 630,

        alt: "Savannah, Georgia, home of Sabal House",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: homeTitle,

    description:
      "Sabal House is coming to Savannah’s Historic District in December 2026. Follow along for opening updates and more information.",

    images: ["/images/sabal-house-og.jpg"],
  },
};

export default function Home() {
  return (
    <main>
      <HeroFlatGrid />

      <LeafIntro />

      <MakingOfSabalHouse />
    </main>
  );
}
