import PrivacyClient from "../components/privacy/privacyClient";

export const metadata = {
  title: "Privacy Policy",

  description:
    "Read the Sabal House privacy policy and learn how information collected through the Sabal House website is handled.",

  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
