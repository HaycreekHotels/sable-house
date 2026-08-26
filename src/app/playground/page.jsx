import NavBar from "../components/layout/Header/NavBar";
import HeroVideo from "../components/layout/heros/HeroVideo";
import IntroSection from "../components/layout/Intro/IntroSection";
import FullWidth from "../components/layout/ScrollAnimation/FullWidth";
import TextBreak from "../components/layout/Intro/TextBreak";

const VIDEO_SRC =
  "https://sabal-house.b-cdn.net/flat%20hero/Sabal%20House%20-%20Promo.mp4";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <HeroVideo videoSrc={VIDEO_SRC} />
      <IntroSection label="Begin" heading="At Sabal House">
        <p>
          This text will be a short blurb about why they should start at Sabal
          House. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </IntroSection>
      <FullWidth />
      <TextBreak>
        Design isnt just what something looks like.{" "}
        <em>Its how it makes someone feel.</em>
      </TextBreak>
    </main>
  );
}
