"use client";

import { formatDateParts } from "./bookingUrl";

export default function BookingDateInput({
  id,
  label,
  value,
  onOpen,
  calendarId,
  isCalendarOpen = false,
  variant = "card",
}) {
  const date = formatDateParts(value);
  const accessibleDate = value ? date.numeric : "No date selected";

  const sharedButtonProps = {
    id,
    type: "button",
    "aria-label": `${label}: ${accessibleDate}. Open date calendar`,
    "aria-haspopup": "dialog",
    "aria-controls": calendarId,
    "aria-expanded": isCalendarOpen,
    "data-booking-calendar-trigger": "true",
    onClick: onOpen,
  };

  if (variant === "line") {
    return (
      <div className="relative block min-w-0 px-2 py-2">
        <button
          {...sharedButtonProps}
          className="group block w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
        >
          <span className="block text-center text-[9px] font-central-regular uppercase tracking-[0.08em] text-main sm:text-[10px]">
            {label}
          </span>

          <span
            aria-hidden="true"
            className="mt-1 block whitespace-nowrap text-center font-serif text-xl leading-none text-main sm:text-2xl"
          >
            {date.numeric}
          </span>

          <span
            aria-hidden="true"
            className="mt-2 block h-px w-full bg-main/60"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[92px] flex-col items-center justify-center border-r border-main/25 bg-secondary text-main last:border-r-0">
      <button
        {...sharedButtonProps}
        className="group flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center gap-4 px-2 py-2 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-main"
      >
        <span
          aria-hidden="true"
          className="text-[13px] font-central-regular leading-none"
        >
          {date.month}
        </span>

        <span
          aria-hidden="true"
          className="my-1 font-benton-regular text-[45px] leading-[0.9]"
        >
          {date.day}
        </span>

        <span
          aria-hidden="true"
          className="text-[13px] font-central-regular leading-none"
        >
          {date.year}
        </span>
      </button>
    </div>
  );
}
