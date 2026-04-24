import HeroImage from "../components/layout/Heros/HeroImage";
import MosaicGallery from "../components/galleries/MosaicGallery";

export const metadata = {
  title: "Gallery | Sable House",
  description: "View the Newly built sable house",
};

export default function Page() {
  return (
    <>
      <HeroImage
        image="https://images.unsplash.com/photo-1597199813662-c1f22fee941c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Green summer in savannah georgia"
      />
      <MosaicGallery />{" "}
    </>
  );
}
