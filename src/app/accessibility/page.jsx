import AccessibilityClient from "../components/accessibility/AccessibilityClient";

export const metadata = {
  title: "Accessibility",

  description:
    "Read the Sabal House website accessibility statement and learn about our commitment to providing an accessible digital experience.",

  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return <AccessibilityClient />;
}
