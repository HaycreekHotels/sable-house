import FAQPageClient from "../components/layout/FAQ/FAQPageClient";
import { faqCategories } from "../data/faq";

export const metadata = {
  title: "Frequently Asked Questions | Sabal House Savannah",
  description:
    "Find answers about Sabal House Savannah reservations, cancellation policies, rates, check-in, amenities, pets, parking, and guest services.",
  alternates: { canonical: "/faq" },
};

function answerAsPlainText(blocks) {
  return blocks
    .map((block) => {
      if (block.type === "labeledParagraph") {
        return `${block.label} ${block.text}`;
      }

      if (block.type === "list") {
        return block.items.map((item) => `• ${item}`).join("\n");
      }

      return block.text ?? "";
    })
    .filter(Boolean)
    .join("\n\n");
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answerAsPlainText(faq.answer),
      },
    })),
  ),
};

export default function FAQPage() {
  return (
    <>
      <FAQPageClient categories={faqCategories} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
