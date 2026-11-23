export default function EditorialDetailGrid({ items, className = "" }) {
  const visible = items.filter(({ value }) => value != null && value !== "");
  if (!visible.length) return null;

  return (
    <dl
      className={`grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-10 sm:gap-y-10 ${className}`}
    >
      {visible.map(({ label, value, style = "display" }) => (
        <div key={label} className="min-w-0">
          <dt className="font-central-regular text-[10px] font-semibold uppercase tracking-[0.03em] sm:text-xs">
            {label}
          </dt>
          <dd
            className={`mt-5 break-words leading-[1.28] ${
              style === "tip"
                ? "max-w-[33ch] font-central-regular text-[13px] italic leading-[1.55] sm:text-[15px]"
                : "font-benton-light text-[clamp(1.1rem,2vw,1.55rem)] italic tracking-[-0.025em]"
            }`}
          >
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
