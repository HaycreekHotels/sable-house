// app/restaurants/[slug]/page.jsx

import { notFound } from "next/navigation";
import RestaurantDetailPage from "../../components/dine/RestaurantDetailPage";
import { restaurants } from "../../data/restaurants";

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const restaurant = restaurants.find((restaurant) => restaurant.slug === slug);

  if (!restaurant) {
    return {
      title: "Restaurant Not Found",
    };
  }

  return {
    title: `${restaurant.title} | Sabal House`,
    description: restaurant.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const restaurant = restaurants.find((restaurant) => restaurant.slug === slug);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantDetailPage restaurant={restaurant} />;
}
