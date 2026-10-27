import AccommodationsClient from "./AccommodationsClient";

export const metadata = {
  title: "Rooms & Suites at Sabal House",

  description:
    "Distinctive rooms and suites at Sabal House, including Heritage accommodations with hardwood floors, fireplaces, and historic character.",

  alternates: {
    canonical: "/stay/accommodations",
  },

  openGraph: {
    type: "website",

    url: "/stay/accommodations",

    title: "Rooms & Suites in Savannah, GA | Sabal House",

    description:
      "Explore Sabal House Rooms and Heritage Rooms at Sabal House in Savannah.",
  },
};

export default function AccommodationsPage() {
  return <AccommodationsClient />;
}
