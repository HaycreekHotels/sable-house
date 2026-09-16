"use client";

import { useRef } from "react";

import { formatDateParts } from "./bookingUrl";

export default function BookingDateInput({
  id,
  label,
  value,
  min,
  onChange,
  variant = "card",
}) {
  const inputRef = useRef(null);
  const date = formatDateParts(value);

  function openDatePicker() {
    const input = inputRef.current;

    if (!input) return;

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
        return;
      }
    } catch {}

    input.focus({ preventScroll: true });
    input.click();
  }

  const accessibleDate = value ? date.numeric : "No date selected";

  if (variant === "line") {
    return (
      <div className="relative block min-w-0 px-2 py-2">
        <button
          type="button"
          aria-label={`${label}: ${accessibleDate}. Open calendar`}
          onClick={openDatePicker}
          className="group block w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main"
        >
          <span className="block text-center text-[9px] font-central-regular uppercase tracking-[0.08em] text-main sm:text-[10px]">
            {label}
          </span>

          <span
            aria-hidden="true"
            className="mt-1 block whitespace-nowrap text-center font-benton-regular text-xl leading-none text-main sm:text-2xl"
          >
            {date.numeric}
          </span>

          <span
            aria-hidden="true"
            className="mt-2 block h-px w-full bg-main/60"
          />
        </button>

        <input
          ref={inputRef}
          id={id}
          type="date"
          value={value}
          min={min}
          required
          tabIndex={-1}
          aria-label={label}
          onChange={(event) => onChange(event.target.value)}
          className="sr-only"
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[92px] flex-col items-center justify-center border-r border-main/25 bg-secondary text-main last:border-r-0">
      <button
        type="button"
        aria-label={`${label}: ${accessibleDate}. Open calendar`}
        onClick={openDatePicker}
        className="group flex min-h-[92px] w-full cursor-pointer flex-col items-center justify-center px-2 py-2 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-main"
      >
        <span
          aria-hidden="true"
          className="text-[10px] font-central-regular leading-none"
        >
          {date.month}
        </span>

        <span
          aria-hidden="true"
          className="my-1 font-benton-regular text-[34px] "
        >
          {date.day}
        </span>

        <span
          aria-hidden="true"
          className="text-[10px] font-central-regular leading-none"
        >
          {date.year}
        </span>
      </button>

      <input
        ref={inputRef}
        id={id}
        type="date"
        value={value}
        min={min}
        required
        tabIndex={-1}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
        className="sr-only"
      />
    </div>
  );
}
