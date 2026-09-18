"use client";

import { useEffect, useRef, useState } from "react";

import BookingCalendarPopover from "./BookingCalendarPopover";
import BookingDateInput from "./BookingDateInput";
import useBookingForm from "./useBookingForm";

function NumberSelect({ id, label, value, onChange, min = 1, max = 8 }) {
  const options = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index,
  );

  return (
    <label
      htmlFor={id}
      className="relative block min-w-0 px-2 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-main"
    >
      <span className="block text-center text-[9px] font-central-regular uppercase tracking-[0.08em] text-main sm:text-[10px]">
        {label}
      </span>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1 block w-full appearance-none bg-transparent text-center font-serif text-xl leading-none text-main outline-none sm:text-2xl"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {String(option).padStart(2, "0")}
          </option>
        ))}
      </select>

      <span aria-hidden="true" className="mt-2 block h-px w-full bg-main/60" />
    </label>
  );
}

export default function BookingBanner({
  id = "site-booking-banner",
  isVisible = true,
}) {
  const {
    minimumCheckIn,
    checkIn,
    checkOut,
    rooms,
    guests,
    setRooms,
    setGuests,
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
        inset-x-0
        bottom-0
        z-40

        border-t
        border-main/15
        bg-secondary

        transition-all
        duration-300
        ease-out

        ${
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0"
        }
      `}
    >
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto grid w-full max-w-5xl grid-cols-2 items-end gap-x-2 gap-y-1 px-4 py-3 sm:grid-cols-[1.35fr_1.35fr_.7fr_.7fr_auto] sm:gap-5 sm:px-6 md:px-8"
      >
        <BookingDateInput
          id="booking-banner-check-in"
          label="Check in"
          value={checkIn}
          onOpen={handleOpenCalendar}
          calendarId={calendarId}
          isCalendarOpen={isCalendarOpen}
          variant="line"
        />

        <BookingDateInput
          id="booking-banner-check-out"
          label="Check out"
          value={checkOut}
          onOpen={handleOpenCalendar}
          calendarId={calendarId}
          isCalendarOpen={isCalendarOpen}
          variant="line"
        />

        <NumberSelect
          id="booking-banner-rooms"
          label="Rooms"
          value={rooms}
          onChange={setRooms}
          max={6}
        />

        <NumberSelect
          id="booking-banner-guests"
          label="Guests"
          value={guests}
          onChange={setGuests}
          max={12}
        />

        <button
          type="submit"
          disabled={!checkIn || !checkOut}
          className="col-span-2 flex min-h-11 items-center justify-center bg-main px-5 py-3 text-[10px] font-central-regular uppercase tracking-[0.05em] text-secondary transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-1 sm:min-w-[154px] sm:self-center sm:text-xs"
        >
          Book Your Stay
        </button>

        <BookingCalendarPopover
          id={calendarId}
          isOpen={isCalendarOpen}
          placement="banner"
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
