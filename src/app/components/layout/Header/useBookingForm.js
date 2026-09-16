"use client";

import { useEffect, useMemo, useState } from "react";

import { addDaysISO, buildBookingUrl, getTodayISO } from "./bookingUrl";

export default function useBookingForm() {
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const localToday = getTodayISO();

    setToday(localToday);
    setCheckIn(localToday);
    setCheckOut(addDaysISO(localToday, 1));
  }, []);

  const minimumCheckOut = useMemo(() => {
    if (!checkIn) return today;

    return addDaysISO(checkIn, 1);
  }, [checkIn, today]);

  function handleCheckInChange(nextCheckIn) {
    setCheckIn(nextCheckIn);

    if (!checkOut || checkOut <= nextCheckIn) {
      setCheckOut(addDaysISO(nextCheckIn, 1));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!checkIn || !checkOut) return;

    const bookingUrl = buildBookingUrl({
      checkIn,
      checkOut,
      rooms,
      guests,
    });

    window.location.assign(bookingUrl);
  }

  return {
    today,
    checkIn,
    checkOut,
    minimumCheckOut,
    rooms,
    guests,
    setCheckOut,
    setRooms,
    setGuests,
    handleCheckInChange,
    handleSubmit,
  };
}
