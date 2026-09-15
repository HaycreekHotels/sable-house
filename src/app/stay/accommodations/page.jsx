import AccommodationsClient from "./AccommodationsClient";

export const metadata = {
  title: "Accommodations",

  description:
    "Explore accommodations at Sabal House in Savannah, including contemporary Sabal House Rooms and the character-filled Heritage Rooms.",

  alternates: {
    canonical: "/stay/accommodations",
  },

  openGraph: {
    type: "website",

    url: "/stay/accommodations",

    title: "Accommodations | Sabal House",

    description:
      "Explore Sabal House Rooms and Heritage Rooms at Sabal House in Savannah.",
  },
};

export default function AccommodationsPage() {
  return <AccommodationsClient />;
}
