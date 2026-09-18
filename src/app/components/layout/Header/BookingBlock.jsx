"use client";

import { useEffect, useRef, useState } from "react";

import BookingCalendarPopover from "./BookingCalendarPopover";
import BookingDateInput from "./BookingDateInput";
import useBookingForm from "./useBookingForm";

export default function BookingBlock({
  id = "site-booking-block",
  isVisible = true,
}) {
  const {
    minimumCheckIn,
    checkIn,
    checkOut,
    handleDateRangeChange,
    handleSubmit,
  } = useBookingForm();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const lastTriggerRef = useRef(null);

  const calendarId = `${id}-calendar`;

  useEffect(() => {
    if (!isVisible) {
      setIsCalendarOpen(false);
    }
  }, [isVisible]);

  function handleOpenCalendar(event) {
    lastTriggerRef.current = event.currentTarget;
    setIsCalendarOpen(true);
  }

  function handleCloseCalendar(restoreFocus = true) {
    setIsCalendarOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        lastTriggerRef.current?.focus();
      });
    }
  }

  return (
    <aside
      id={id}
      aria-label="Book your stay"
      aria-hidden={!isVisible}
      inert={!isVisible || undefined}
      className={`
        fixed
        right-4
        top-[88px]
        z-40
        w-[min(220px,calc(100vw-2rem))]

        transition-all
        duration-300
        ease-out

        sm:right-6
        md:right-8
        lg:right-12
        lg:top-[96px]

        ${
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }
      `}
    >
      <form onSubmit={handleSubmit} className="relative w-full shadow-sm">
        <div className="bg-main px-4 py-3 text-center text-xs font-central-regular uppercase tracking-[0.05em] text-secondary sm:text-sm">
          Book Your Stay
        </div>

        <div className="grid grid-cols-2">
          <BookingDateInput
            id="booking-block-check-in"
            label="Check in"
            value={checkIn}
            onOpen={handleOpenCalendar}
            calendarId={calendarId}
            isCalendarOpen={isCalendarOpen}
          />

          <BookingDateInput
            id="booking-block-check-out"
            label="Check out"
            value={checkOut}
            onOpen={handleOpenCalendar}
            calendarId={calendarId}
            isCalendarOpen={isCalendarOpen}
          />
        </div>

        <button
          type="submit"
          className="flex min-h-11 w-full items-center justify-center bg-main px-4 py-2 text-[10px] font-central-regular uppercase tracking-[0.05em] text-secondary transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!checkIn || !checkOut}
        >
          Check Availability
        </button>

        <BookingCalendarPopover
          id={calendarId}
          isOpen={isCalendarOpen}
          placement="block"
          checkIn={checkIn}
          checkOut={checkOut}
          minimumCheckIn={minimumCheckIn}
          onRangeChange={handleDateRangeChange}
          onRequestClose={handleCloseCalendar}
        />
      </form>
    </aside>
  );
}
