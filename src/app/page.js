import HeroCarousel from "./components/layout/heros/HeroCarousel";

const hero = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1592663283246-c843227611ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Placeholder alt text",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1597199813662-c1f22fee941c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Placeholder alt text",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1667489012747-d4bbc525486f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Placeholder alt text",
  },
];

export default function Home() {
  return (
    <div>
      <HeroCarousel slides={hero} />
    </div>
  );
}
