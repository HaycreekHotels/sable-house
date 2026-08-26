import EditorialHero from "@/app/components/layout/heros/EditorialHero";
import FullWidthSimple from "@/app/components/layout/ScrollAnimation/FullWidthSimple";
import StoryGallery from "@/app/components/layout/ScrollAnimation/StoryGallery";

export default function StoryPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-secondary text-black">
      <EditorialHero
        image="https://images.unsplash.com/photo-1685035891125-61de1e2183d2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAlt="Historic fountain surrounded by trees at Sabal House"
        titleParts={["The", "Making", "of Sabal House"]}
        description="From the beginning, Sabal House was imagined as a quieter way to experience Savannah, a place to arrive, find your footing, and become more attuned to the city around you. That idea is taking shape through architecture, material, and the people behind it, bringing together a luxury new building and the restored Heritage Rooms as one Sabal House."
        footer="Told by the people shaping it."
        priority
      />
      <FullWidthSimple />
      <StoryGallery />
    </main>
  );
}
