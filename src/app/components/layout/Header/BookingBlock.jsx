"use client";

import BookingDateInput from "./BookingDateInput";
import useBookingForm from "./useBookingForm";

export default function BookingBlock({
  id = "site-booking-block",
  isVisible = true,
}) {
  const {
    today,
    checkIn,
    checkOut,
    minimumCheckOut,
    setCheckOut,
    handleCheckInChange,
    handleSubmit,
  } = useBookingForm();

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
      <form onSubmit={handleSubmit} className="w-full shadow-sm">
        <div className="grid grid-cols-2">
          <BookingDateInput
            id="booking-block-check-in"
            label="Check in"
            value={checkIn}
            min={today}
            onChange={handleCheckInChange}
          />

          <BookingDateInput
            id="booking-block-check-out"
            label="Check out"
            value={checkOut}
            min={minimumCheckOut}
            onChange={setCheckOut}
          />
        </div>

        <button
          type="submit"
          className="flex min-h-11 w-full items-center justify-center bg-main px-4 py-2 text-[10px] font-central-regular uppercase tracking-[0.05em] text-secondary transition-opacity duration-200 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!checkIn || !checkOut}
        >
          Check Availability
        </button>
      </form>
    </aside>
  );
}
