import HeroImage from "../components/layout/Heros/HeroImage";
import IntroSection from "../components/layout/Intro/IntroSection";
import OffersPackagesSection from "../components/cards/OffersPackagesSection";

export const metadata = {
  title: "Offers & Pacakages | Sable House",
  description: "The current Offers and Packages for guest bookings",
};

export default function Offer() {
  return (
    <section>
      <HeroImage
        image="https://images.unsplash.com/photo-1672667178022-62694b8920f5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Historic building"
      />
      <IntroSection
        heading="Heighten Your Stay"
        intro={[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "All rooms at Sable House are 18 and older with a 2 person max occupancy.",
        ]}
      />
      <OffersPackagesSection />
    </section>
  );
}
