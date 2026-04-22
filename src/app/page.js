import HeroVideo from "./components/layout/heros/HeroVideo";
import ParallaxIntroduction from "./components/features/ParallaxIntroduction";

const introduction = {
  header: "Sable House Hotel",
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
export default function Home() {
  return (
    <div>
      <HeroVideo videoSrc="https://cdn.pixabay.com/video/2021/09/22/89352-613200582_large.mp4" />
      <ParallaxIntroduction intro={introduction} />
    </div>
  );
}
