import UnmarkedDoorClient from "./UnmarkedDoorClient";
import { unmarkedDoorSections } from "./unmarkedDoorData";

export const metadata = {
  title: { absolute: "The Unmarked Door | Sabal House" },
  description: "An invitation to discover a different side of Savannah.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function UnmarkedDoorPage() {
  return <UnmarkedDoorClient sections={unmarkedDoorSections} />;
}
