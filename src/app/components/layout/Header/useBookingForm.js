"use client";

import { useMemo, useState } from "react";

import { trackEvent } from "@/app/lib/analytics";

import { addDaysISO, buildBookingUrl, getTodayISO } from "./bookingUrl";

const HOTEL_OPENING_DATE = "2026-12-15";

function getMinimumCheckInDate() {
  const today = getTodayISO();

  return today < HOTEL_OPENING_DATE ? HOTEL_OPENING_DATE : today;
}

export default function useBookingForm({ source = "booking_widget" } = {}) {
  // Initialize once instead of triggering another render after mount.
  const [initialDates] = useState(() => {
    const minimum = getMinimumCheckInDate();
    return {
      minimumCheckIn: minimum,
      checkOut: addDaysISO(minimum, 1),
    };
  });
  const minimumCheckIn = initialDates.minimumCheckIn;
  const [checkIn, setCheckIn] = useState(initialDates.minimumCheckIn);
  const [checkOut, setCheckOut] = useState(initialDates.checkOut);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  const minimumCheckOut = useMemo(() => {
    if (!checkIn) return minimumCheckIn;

    return addDaysISO(checkIn, 1);
  }, [checkIn, minimumCheckIn]);

  function handleCheckInChange(nextCheckIn) {
    if (!nextCheckIn || nextCheckIn < minimumCheckIn) return;

    setCheckIn(nextCheckIn);

    if (!checkOut || checkOut <= nextCheckIn) {
      setCheckOut(addDaysISO(nextCheckIn, 1));
    }
  }

  function handleDateRangeChange(nextCheckIn, nextCheckOut) {
    if (!nextCheckIn || !nextCheckOut) return;
    if (nextCheckIn < minimumCheckIn) return;
    if (nextCheckOut <= nextCheckIn) return;

    setCheckIn(nextCheckIn);
    setCheckOut(nextCheckOut);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!checkIn || !checkOut || checkOut <= checkIn) return;

    const bookingUrl = buildBookingUrl({
      checkIn,
      checkOut,
      rooms,
      guests,
    });

    trackEvent("begin_booking", {
      source,
      check_in: checkIn,
      check_out: checkOut,
      rooms,
      guests,
    });

    window.location.assign(bookingUrl);
  }

  return {
    minimumCheckIn,
    checkIn,
    checkOut,
    minimumCheckOut,
    rooms,
    guests,
    setCheckOut,
    setRooms,
    setGuests,
    handleCheckInChange,
    handleDateRangeChange,
    handleSubmit,
  };
}
