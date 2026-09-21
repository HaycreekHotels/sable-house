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

function addDays(date, amount = 1) {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + amount);

  return nextDate;
}

function formatLongDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatShortDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
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

  /*
   * Used so changes to the booking widget while the calendar
   * is open don't overwrite the user's in-progress selection.
   */
  const wasOpenRef = useRef(false);

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

  /*
   * Sync the calendar to the booking form only when the
   * calendar first opens.
   *
   * We intentionally DO NOT continually synchronize while
   * the calendar is open because the booking widget is now
   * updated after each click.
   */
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setDraftRange(committedRange);
      setMonth(committedRange.from || minimumDate || new Date());
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, committedRange, minimumDate]);

  /*
   * Close calendar on outside click or Escape.
   */
  useEffect(() => {
    if (!isOpen) return undefined;

    function handlePointerDown(event) {
      const target = event.target;

      if (!(target instanceof Element)) return;

      if (popoverRef.current?.contains(target)) return;

      if (target.closest('[data-booking-calendar-trigger="true"]')) {
        return;
      }

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

  if (!isOpen || !minimumDate) {
    return null;
  }

  const hasCheckIn = Boolean(draftRange?.from);

  const hasCompleteRange = Boolean(draftRange?.from && draftRange?.to);

  const isSelectingCheckout = Boolean(draftRange?.from && !draftRange?.to);

  let instruction = "Choose your check-in and check-out dates";

  if (isSelectingCheckout) {
    instruction = "Now choose your check-out date";
  }

  if (hasCompleteRange) {
    instruction = "Stay dates selected";
  }

  /*
   * Accessible description announced by DayPicker.
   */
  const footerText = draftRange?.from
    ? draftRange.to
      ? `Selected stay: ${formatLongDate(
          draftRange.from,
        )} through ${formatLongDate(draftRange.to)}.`
      : `Check-in selected for ${formatLongDate(
          draftRange.from,
        )}. Choose a check-out date.`
    : "Choose a check-in date.";

  /*
   * Handle calendar selections.
   *
   * First click:
   * - visually selects check-in
   * - immediately updates the booking widget
   * - temporarily gives checkout the following day
   *
   * Second click:
   * - completes the visual range
   * - immediately updates checkout
   * - keeps calendar open so the range remains visible
   */
  function handleSelect(nextRange) {
    if (!nextRange?.from) return;

    setDraftRange(nextRange);

    const nextCheckIn = dateToISO(nextRange.from);

    if (!nextCheckIn) return;

    /*
     * First click of a new range.
     */
    if (!nextRange.to) {
      const temporaryCheckOut = dateToISO(addDays(nextRange.from, 1));

      onRangeChange(nextCheckIn, temporaryCheckOut);

      return;
    }

    /*
     * Completed range.
     */
    const nextCheckOut = dateToISO(nextRange.to);

    if (!nextCheckOut || nextCheckOut <= nextCheckIn) {
      return;
    }

    onRangeChange(nextCheckIn, nextCheckOut);

    /*
     * Don't automatically close here.
     *
     * Keeping the calendar open lets the guest clearly see
     * the green selected dates and connecting range.
     */
  }

  const placementClasses =
    placement === "banner"
      ? `
          bottom-[calc(100%+12px)]
          left-1/2
          -translate-x-1/2
        `
      : `
          right-0
          top-[calc(100%+12px)]
        `;

  /*
   * Range styling
   *
   * Start + End:
   * Brand green circles.
   *
   * Middle:
   * Thin gray horizontal line behind the dates.
   */
  const rangeStartClasses = `
    relative

    ${
      hasCompleteRange
        ? `
          before:pointer-events-none
          before:absolute
          before:left-1/2
          before:right-0
          before:top-1/2
          before:z-0
          before:h-px
          before:-translate-y-1/2
          before:bg-black/25
          before:content-['']
        `
        : ""
    }

    [&>button]:!bg-main
    [&>button]:!text-secondary
  `;

  const rangeMiddleClasses = `
    relative

    before:pointer-events-none
    before:absolute
    before:inset-x-0
    before:top-1/2
    before:z-0
    before:h-px
    before:-translate-y-1/2
    before:bg-black/25
    before:content-['']

    [&>button]:!bg-transparent
    [&>button]:!text-main
  `;

  const rangeEndClasses = `
    relative

    before:pointer-events-none
    before:absolute
    before:left-0
    before:right-1/2
    before:top-1/2
    before:z-0
    before:h-px
    before:-translate-y-1/2
    before:bg-black/25
    before:content-['']

    [&>button]:!bg-main
    [&>button]:!text-secondary
  `;

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
      {/* Header */}
      <div
        className="
          flex
          items-start
          justify-between
          gap-4

          border-b
          border-main/15

          px-5
          py-4
        "
      >
        <div>
          <p
            className="
              font-benton-regular
              text-2xl
              leading-none
            "
          >
            Plan Your Stay
          </p>

          <p
            className="
              mt-1.5

              text-[9px]
              font-central-regular
              uppercase
              tracking-[0.08em]

              text-main/65
            "
          >
            {instruction}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRequestClose(true)}
          aria-label="Close calendar"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center

            text-xl
            leading-none

            transition-opacity

            hover:opacity-60

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-main
          "
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      {/* Calendar */}
      <div
        className="
          px-4
          pb-4
          pt-3

          sm:px-5
          sm:pb-5
        "
      >
        <DayPicker
          mode="range"
          resetOnSelect
          min={1}
          selected={draftRange}
          onSelect={handleSelect}
          month={month}
          onMonthChange={setMonth}
          startMonth={minimumDate}
          disabled={{
            before: minimumDate,
          }}
          showOutsideDays={false}
          autoFocus
          footer={footerText}
          classNames={{
            root: `
              relative
              w-full
              select-none
            `,

            months: "w-full",

            month: "w-full",

            month_caption: `
              flex
              h-11
              items-center
              justify-center

              px-12

              text-center
            `,

            caption_label: `
              font-benton-regular
              text-xl
              leading-none
              tracking-[0.01em]

              text-main
            `,

            nav: `
              pointer-events-none
              absolute
              inset-x-0
              top-0
              z-10

              flex
              h-11
              items-center
              justify-between
            `,

            button_previous: `
              pointer-events-auto

              inline-flex
              h-10
              w-10
              items-center
              justify-center

              bg-transparent
              text-main

              transition-opacity

              hover:opacity-55

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-1
              focus-visible:outline-main

              disabled:cursor-not-allowed
              disabled:opacity-20
            `,

            button_next: `
              pointer-events-auto

              inline-flex
              h-10
              w-10
              items-center
              justify-center

              bg-transparent
              text-main

              transition-opacity

              hover:opacity-55

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-1
              focus-visible:outline-main

              disabled:cursor-not-allowed
              disabled:opacity-20
            `,

            chevron: `
              h-4
              w-4
              fill-current
            `,

            month_grid: `
              mt-1
              w-full

              table-fixed
              border-collapse
            `,

            weekdays: `
              border-b
              border-main/10
            `,

            weekday: `
              h-8

              text-center
              text-[8px]

              font-central-regular
              font-normal
              uppercase
              tracking-[0.08em]

              text-main/55
            `,

            weeks: "w-full",

            week: "w-full",

            day: `
              relative

              h-10
              w-10

              p-0

              text-center
              align-middle

              sm:h-11
              sm:w-11
            `,

            day_button: `
              relative
              z-10

              mx-auto

              inline-flex
              h-9
              w-9
              items-center
              justify-center

              rounded-full

              bg-transparent

              font-central-regular
              text-[11px]

              text-main

              transition-colors
              duration-150

              hover:bg-main/10

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-1
              focus-visible:outline-main

              sm:h-10
              sm:w-10
              sm:text-xs
            `,

            selected: "",

            /*
             * Green check-in circle.
             */
            range_start: rangeStartClasses,

            /*
             * Gray connector running underneath
             * the dates between check-in/out.
             */
            range_middle: rangeMiddleClasses,

            /*
             * Green check-out circle.
             */
            range_end: rangeEndClasses,

            today: `
              [&>button]:ring-1
              [&>button]:ring-inset
              [&>button]:ring-main/45
            `,

            disabled: `
              [&>button]:cursor-not-allowed
              [&>button]:text-main/25
              [&>button]:line-through

              [&>button]:hover:bg-transparent
            `,

            outside: `
              [&>button]:text-main/25
            `,

            hidden: "invisible",

            /*
             * DayPicker's footer remains available
             * to screen readers.
             */
            footer: "sr-only",
          }}
        />

        {/* Visible selection summary */}
        <div
          className="
            mt-4

            border-t
            border-main/15

            pt-4
          "
        >
          <div
            aria-live="polite"
            className="
              min-h-[34px]

              text-center

              font-central-regular
              text-[9px]
              uppercase
              leading-relaxed
              tracking-[0.06em]

              text-main/65
            "
          >
            {!hasCheckIn && <span>Select your check-in date</span>}

            {isSelectingCheckout && (
              <span>
                {formatShortDate(draftRange.from)}
                {" — "}
                Select checkout
              </span>
            )}

            {hasCompleteRange && (
              <span>
                {formatShortDate(draftRange.from)}
                {" — "}
                {formatShortDate(draftRange.to)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onRequestClose(true)}
            className="
              mt-3

              flex
              min-h-11
              w-full
              items-center
              justify-center

              bg-main

              px-4
              py-2.5

              text-[10px]
              font-central-regular
              uppercase
              tracking-[0.06em]

              text-secondary

              transition-opacity
              duration-200

              hover:opacity-90

              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-main
            "
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
