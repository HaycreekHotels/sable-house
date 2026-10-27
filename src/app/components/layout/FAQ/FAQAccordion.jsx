import { faqCategories, faqs, featuredFaqIds } from "@/app/data/faqs";

function FAQItem({ item, groupName, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;

  return (
    <details
      name={groupName}
      className="group/faq border-b border-contrast/25 first:border-t"
    >
      <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left outline-none transition-colors duration-200 hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <Heading className="font-central-regular text-[1rem] leading-[1.5] tracking-[0.005em] text-foreground sm:text-[1.075rem]">
          {item.question}
        </Heading>
        <span
          aria-hidden="true"
          className="relative block size-6 shrink-0 text-main"
        >
          <span className="absolute top-1/2 left-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open/faq:rotate-90 motion-reduce:transition-none" />
        </span>
      </summary>

      <div className="max-w-[65ch] pb-6 pr-10 font-central-regular text-[0.95rem] leading-[1.8] text-contrast sm:text-base">
        <p>{item.answer}</p>
        {item.bullets?.length > 0 && (
          <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-main">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
        {item.note && <p className="mt-4 text-sm">{item.note}</p>}
        {item.link && (
          <p className="mt-3">
            <a
              href={item.link.href}
              className="underline decoration-current underline-offset-4 hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
            >
              {item.link.label}
            </a>
          </p>
        )}
      </div>
    </details>
  );
}

/**
 * Drop-in server component for the homepage or other Sabal House pages.
 */
export default function FAQAccordion({
  id = "sabal-house-faq",
  eyebrow = "BEFORE YOU ARRIVE",
  title = "Good to Know.",
  description = "A few thoughtful answers to help you settle into Savannah.",
  items = faqs,
  featuredIds = featuredFaqIds,
  categories = faqCategories,
  className = "",
}) {
  // Unapproved drafts stay in the data file but are never output in page HTML.
  const publishedItems = items.filter((item) => item.status !== "needs-review");
  const byId = new Map(publishedItems.map((item) => [item.id, item]));
  const featuredSet = new Set(featuredIds);
  const featured = featuredIds.map((faqId) => byId.get(faqId)).filter(Boolean);
  const others = categories
    .map((category) => ({
      ...category,
      items: publishedItems.filter(
        (item) => item.category === category.id && !featuredSet.has(item.id),
      ),
    }))
    .filter((category) => category.items.length > 0);
  const remainingCount = others.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );

  if (publishedItems.length === 0) return null;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`w-full bg-secondary text-foreground ${className}`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 sm:px-10 sm:py-24 md:px-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16 lg:px-20 lg:py-32 xl:gap-24 xl:px-24 2xl:px-32">
        <div className="lg:pt-2">
          <p className="font-central-regular text-[0.72rem] font-medium tracking-[0.2em] text-contrast uppercase sm:text-xs">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-6 max-w-[12ch] font-benton-regular text-[clamp(2.9rem,5.1vw,5.8rem)] leading-[1.05] tracking-[-0.035em] text-foreground"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-[31ch] font-central-regular text-base leading-[1.85] text-contrast sm:text-lg">
            {description}
          </p>
        </div>

        <div className="min-w-0">
          <div>
            {featured.map((item) => (
              <FAQItem key={item.id} item={item} groupName={`${id}-featured`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
