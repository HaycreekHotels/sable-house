import HeroImage from "../components/layout/heros/HeroImage";
import IntroSection from "../components/layout/Intro/IntroSection";
import RoomsSuitesGrid from "../components/cards/RoomSuitesGrid";

export const metadata = {
  title: "Rooms | Sable House",
  description: "The room types at the sable house hotel",
};

export default function rooms() {
  return (
    <section>
      <HeroImage
        image="https://images.unsplash.com/photo-1654064550568-fb282026c165?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="interior of the king guestroom"
      />
      <IntroSection
        heading="Luxury Rooms"
        intro={[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "All rooms at Sable House are 18 and older with a 2 person max occupancy.",
        ]}
      />
      <RoomsSuitesGrid />
    </section>
  );
}
