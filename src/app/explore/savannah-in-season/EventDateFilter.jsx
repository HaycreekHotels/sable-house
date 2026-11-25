"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DayPicker } from "@daypicker/react";
import {
  formatISODate,
  formatEventDate,
  parseISODate,
} from "@/app/lib/savannahEventDates";

function formatRange(range) {
  if (!range?.from) return "Select your dates";
  const from = formatEventDate(formatISODate(range.from));
  const to = range.to ? formatEventDate(formatISODate(range.to)) : null;
  return to && to !== from ? `${from} – ${to}` : from;
}

const calendarClassNames = {
  root: "relative w-full select-none",
  months: "w-full",
  month: "w-full",
  month_caption: "flex h-12 items-center justify-center px-12",
  caption_label: "font-benton-regular text-[24px] leading-none text-main",
  nav: "pointer-events-none absolute inset-x-0 top-0 z-10 flex h-12 items-center justify-between",
  button_previous:
    "pointer-events-auto inline-flex h-11 w-11 items-center justify-center text-main hover:opacity-65 focus-visible:outline-2 focus-visible:outline-main disabled:opacity-30",
  button_next:
    "pointer-events-auto inline-flex h-11 w-11 items-center justify-center text-main hover:opacity-65 focus-visible:outline-2 focus-visible:outline-main disabled:opacity-30",
  chevron: "h-4 w-4 fill-current",
  month_grid: "mt-3 w-full table-fixed border-collapse",
  weekdays: "border-b border-main/20",
  weekday:
    "h-9 text-center font-central-regular text-[10px] font-normal uppercase tracking-wider text-main/65",
  day: "h-10 w-10 p-0 text-center align-middle sm:h-11 sm:w-11",
  day_button:
    "relative z-10 mx-auto flex h-9 w-9 items-center justify-center rounded-full font-central-regular text-[13px] text-main hover:bg-main/10 focus-visible:outline-2 focus-visible:outline-main sm:h-10 sm:w-10",
  selected: "",
  range_start: "[&>button]:!bg-main [&>button]:!text-secondary",
  range_middle: "[&>button]:!bg-main/15 [&>button]:!rounded-none",
  range_end: "[&>button]:!bg-main [&>button]:!text-secondary",
  today: "[&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-main/40",
  disabled:
    "[&>button]:cursor-not-allowed [&>button]:opacity-30 [&>button]:line-through",
  outside: "[&>button]:opacity-30",
  hidden: "invisible",
  footer: "sr-only",
};

export default function EventDateFilter({ today, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? undefined);
  const [month, setMonth] = useState(() => value?.from ?? parseISODate(today));
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) close(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    // Allow keyboard users to navigate directly to the visible calendar.
    const id = requestAnimationFrame(() =>
      panelRef.current?.querySelector("button:not(:disabled)")?.focus(),
    );
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  function toggle() {
    if (!open) {
      setDraft(value ?? undefined);
      setMonth(value?.from ?? parseISODate(today));
    }
    setOpen((current) => !current);
  }

  function apply() {
    if (!draft?.from) {
      onChange(null);
    } else {
      onChange({
        from: draft.from,
        to: draft.to ?? draft.from,
      });
    }
    close(true);
  }

  function reset() {
    setDraft(undefined);
    onChange(null);
    close(true);
  }

  return (
    <div ref={containerRef} className="relative min-w-0 md:justify-self-start">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="events-date-panel"
        onClick={toggle}
        className="inline-flex min-h-12 max-w-full items-center gap-3 px-1 font-central-regular text-[11px] uppercase tracking-[0.03em] hover:text-main focus-visible:outline-2 focus-visible:outline-main sm:text-[12px]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="h-4 w-4 shrink-0"
        >
          <rect x="3.5" y="5.5" width="17" height="15" rx="1" />
          <path d="M7 3v5M17 3v5M3.5 10h17" />
        </svg>
        <span className="truncate">{formatRange(value)}</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="events-date-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Filter Savannah events by dates"
          className="absolute left-0 top-[calc(100%+10px)] z-40 w-[min(420px,calc(100vw-2rem))] border border-main/15 bg-secondary px-5 py-6 text-main shadow-2xl sm:px-7 sm:py-7"
        >
          <p className="sr-only">
            Choose a date or a date range. The selected days are inclusive.
          </p>
          <DayPicker
            mode="range"
            resetOnSelect
            selected={draft}
            onSelect={setDraft}
            month={month}
            onMonthChange={setMonth}
            startMonth={parseISODate(today)}
            disabled={{ before: parseISODate(today) }}
            showOutsideDays={false}
            classNames={calendarClassNames}
            footer={
              draft?.from
                ? `Selected: ${formatRange(draft)}. Choose Done to filter the events.`
                : "Choose a date or date range, then press Done."
            }
          />
          <div className="mt-5 border-t border-main/20 pt-4">
            <p className="min-h-6 text-center font-central-regular text-[11px] uppercase tracking-widest text-main/70">
              {draft?.from ? formatRange(draft) : "Choose your dates"}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="min-h-12 flex-1 border border-main px-3 font-central-regular text-[12px] uppercase tracking-wide hover:bg-main/10 focus-visible:outline-2 focus-visible:outline-main"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={apply}
                className="min-h-12 flex-[2] bg-main px-4 font-central-regular text-[12px] uppercase tracking-wide text-secondary transition-colors hover:bg-main/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
