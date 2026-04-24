"use clinet";

import HeroImage from "../components/layout/Heros/HeroImage";
import ContactPageSection from "../components/contact/ContactPageSection";

export default function contact() {
  return (
    <>
      <HeroImage
        image="https://images.unsplash.com/photo-1592663283246-c843227611ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="arial view of downtown georiga"
      />
      <ContactPageSection />
    </>
  );
}
