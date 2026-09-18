"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "@daypicker/react";

function isoToDate(dateString) {
  if (!dateString) return undefined;

  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function dateToISO(date) {
  if (!date) return "";

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatLongDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function BookingCalendarPopover({
  id,
  isOpen,
  placement = "block",
  checkIn,
  checkOut,
  minimumCheckIn,
  onRangeChange,
  onRequestClose,
}) {
  const popoverRef = useRef(null);

  const committedRange = useMemo(
    () => ({
      from: isoToDate(checkIn),
      to: isoToDate(checkOut),
    }),
    [checkIn, checkOut],
  );

  const minimumDate = useMemo(
    () => isoToDate(minimumCheckIn),
    [minimumCheckIn],
  );

  const [draftRange, setDraftRange] = useState(committedRange);
  const [month, setMonth] = useState(
    committedRange.from || minimumDate || new Date(),
  );

  useEffect(() => {
    if (!isOpen) return;

    setDraftRange(committedRange);
    setMonth(committedRange.from || minimumDate || new Date());
  }, [isOpen, committedRange, minimumDate]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      const target = event.target;

      if (!(target instanceof Element)) return;
      if (popoverRef.current?.contains(target)) return;
      if (target.closest('[data-booking-calendar-trigger="true"]')) return;

      onRequestClose(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onRequestClose(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen || !minimumDate) return null;

  const hasStartedNewRange = Boolean(draftRange?.from && !draftRange?.to);

  const instruction = hasStartedNewRange
    ? "Now choose your check-out date"
    : "Choose your check-in and check-out dates";

  const footerText = draftRange?.from
    ? draftRange.to
      ? `Selected stay: ${formatLongDate(draftRange.from)} through ${formatLongDate(
          draftRange.to,
        )}.`
      : `Check-in selected for ${formatLongDate(
          draftRange.from,
        )}. Choose a check-out date.`
    : "Choose a check-in date.";

  function handleSelect(nextRange) {
    if (!nextRange?.from) return;

    setDraftRange(nextRange);

    if (!nextRange.to) return;

    const nextCheckIn = dateToISO(nextRange.from);
    const nextCheckOut = dateToISO(nextRange.to);

    if (!nextCheckIn || !nextCheckOut || nextCheckOut <= nextCheckIn) return;

    onRangeChange(nextCheckIn, nextCheckOut);
    onRequestClose(true);
  }

  const placementClasses =
    placement === "banner"
      ? "bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2"
      : "right-0 top-[calc(100%+12px)]";

  return (
    <div
      ref={popoverRef}
      id={id}
      role="dialog"
      aria-modal="false"
      aria-label="Choose your stay dates"
      className={`
        absolute
        z-[60]
        w-[min(340px,calc(100vw-2rem))]
        overflow-hidden
        border
        border-main/20
        bg-secondary
        text-main
        shadow-xl
        ${placementClasses}
      `}
    >
      <div className="flex items-start justify-between gap-4 border-b border-main/15 px-5 py-4">
        <div>
          <p className="font-benton-regular text-2xl leading-none">
            Plan Your Stay
          </p>
          <p className="mt-1.5 text-[9px] font-central-regular uppercase tracking-[0.08em] text-main/65">
            {instruction}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRequestClose(true)}
          aria-label="Close calendar"
          className="flex h-9 w-9 shrink-0 items-center justify-center text-xl leading-none transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <DayPicker
          mode="range"
          resetOnSelect
          min={1}
          selected={draftRange}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          startMonth={minimumDate}
          disabled={{ before: minimumDate }}
          showOutsideDays={false}
          autoFocus
          footer={footerText}
          classNames={{
            root: "relative w-full select-none",
            months: "w-full",
            month: "w-full",
            month_caption:
              "flex h-11 items-center justify-center px-12 text-center",
            caption_label:
              "font-benton-regular text-xl leading-none tracking-[0.01em] text-main",
            nav: "pointer-events-none absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between",
            button_previous:
              "pointer-events-auto inline-flex h-10 w-10 items-center justify-center bg-transparent text-main transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-main disabled:cursor-not-allowed disabled:opacity-20",
            button_next:
              "pointer-events-auto inline-flex h-10 w-10 items-center justify-center bg-transparent text-main transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-main disabled:cursor-not-allowed disabled:opacity-20",
            chevron: "h-4 w-4 fill-current",
            month_grid: "mt-1 w-full border-collapse table-fixed",
            weekdays: "border-b border-main/10",
            weekday:
              "h-8 text-center text-[8px] font-central-regular font-normal uppercase tracking-[0.08em] text-main/55",
            weeks: "w-full",
            week: "w-full",
            day: "relative h-10 w-10 p-0 text-center align-middle sm:h-11 sm:w-11",
            day_button:
              "relative z-10 mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent font-central-regular text-[11px] text-main transition-colors duration-150 hover:bg-main/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-main sm:h-10 sm:w-10 sm:text-xs",
            selected: "",
            range_start:
              "bg-main/10 [&>button]:bg-main [&>button]:text-secondary",
            range_middle:
              "bg-main/10 [&>button]:rounded-none [&>button]:bg-transparent [&>button]:text-main",
            range_end:
              "bg-main/10 [&>button]:bg-main [&>button]:text-secondary",
            today:
              "[&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-main/45",
            disabled:
              "[&>button]:cursor-not-allowed [&>button]:text-main/25 [&>button]:line-through [&>button]:hover:bg-transparent",
            outside: "[&>button]:text-main/25",
            hidden: "invisible",
            footer: "sr-only",
          }}
        />
      </div>
    </div>
  );
}
