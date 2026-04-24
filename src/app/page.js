import HeroVideo from "./components/layout/heros/HeroVideo";
import ParallaxIntroduction from "./components/features/ParallaxIntroduction";
import OverlapCarouselSection from "./components/features/OverlapCarouselSection";
import FeatureCarousel from "./components/features/FeatureCarousel";
import ScatteredGallerySection from "./components/galleries/ScatteredGallerySection";

const introduction = {
  header: "Sabal House Hotel",
  sub: "Lorem ipsum dolor sit amet consectetur adipiscing elit & sapien",
  lt: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.",
  image1:
    "https://images.unsplash.com/photo-1599666782476-691b0014fd87?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt1: "standin alt text",
  image2:
    "https://images.unsplash.com/photo-1489715063951-a75aed17df07?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt2: "Stand in text",
  st: "Lorem Ipsum",
};

const roomSlides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Interior of King Guest Room",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1680210851458-b7dc5685e06e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Double Twin Bed Guest Room",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1648132274182-1bd07089d2c9?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "A card placed on a guest bed from the maid",
  },
];

const DineSlides = [
  {
    id: 1,
    eyebrow: "DINE",
    title: "Oak Steak House",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.",
    link: "/dine/oak-steak-house",
    linkText: "View More",
    image:
      "https://images.unsplash.com/photo-1671522636018-485ef1f7cd8f?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "A diner about to dig into a plate of a freshly cooked steak covering in garlic butter and a side of fires",
  },
  {
    id: 2,
    eyebrow: "DINE",
    title: "The Bar",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.",
    link: "/dine/bar",
    linkText: "View More",
    image:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "The Mansion Bar with its historic rock fireplace and original wooden bar loaded with a wide range of liquoirs and spirts",
  },
];

const EventsCard = {
  img1: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt1: "A newlywed couple sharing their first dance surround by loved ones",
  img2: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt2: "A group of friends all dining at a highend gastropub",
  img3: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt3: "a table of flowers for wedding guests",
  img4: "https://images.unsplash.com/photo-1774543091182-d55b4a039d5c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt4: "A group of bar goers with a tower of champagne",
  eyebrow: "Let Us",
  title: "Host Your Event",
  content:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
  href: "/events",
};

export default function Home() {
  return (
    <div>
      <HeroVideo videoSrc="https://cdn.pixabay.com/video/2021/09/22/89352-613200582_large.mp4" />
      <ParallaxIntroduction intro={introduction} />
      <OverlapCarouselSection
        slides={roomSlides}
        eyebrow="Southern Comfort"
        title="Hometown Charm in each Room"
        content="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere."
        href="/rooms"
        label="Explore Rooms"
        mediaRight="true"
      />
      <FeatureCarousel slides={DineSlides} />
      <ScatteredGallerySection card={EventsCard} />
    </div>
  );
}
