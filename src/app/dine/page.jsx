import HeroImage from "../components/layout/Heros/HeroImage";
import IntroSection from "../components/layout/Intro/IntroSection";
import RestaurantFeatureCard from "../components/cards/RestaurantFeatureCard";

import { restaurants } from "../data/restaurants";

export const metadata = {
  title: "Dine | Sable House",
  description:
    "Dine at one of the two in-house resturaunts at the Sable House ",
};

export default function Page() {
  return (
    <section>
      <HeroImage
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="A plate of ceaser salad"
      />
      <IntroSection
        heading="Southern Tastes"
        intro={[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ]}
      />
      {restaurants.map((restaurant, index) => (
        <RestaurantFeatureCard
          key={restaurant.id}
          eyebrow={restaurant.eyebrow}
          title={restaurant.title}
          description={restaurant.description}
          hours={restaurant.hours}
          image={restaurant.image}
          imageAlt={restaurant.imageAlt}
          slug={restaurant.slug}
          reservationUrl={restaurant.reservationUrl}
          imagePosition={index % 2 === 0 ? "right" : "left"}
        />
      ))}
    </section>
  );
}
