const DEFAULT_BOOKING_URL = "/stay/accommodations";

const QUERY_KEYS = {
  checkIn: process.env.NEXT_PUBLIC_BOOKING_CHECKIN_PARAM || "checkin",
  checkOut: process.env.NEXT_PUBLIC_BOOKING_CHECKOUT_PARAM || "checkout",
  rooms: process.env.NEXT_PUBLIC_BOOKING_ROOMS_PARAM || "rooms",
  guests: process.env.NEXT_PUBLIC_BOOKING_GUESTS_PARAM || "guests",
};

export function getTodayISO() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

export function addDaysISO(dateString, amount = 1) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  date.setDate(date.getDate() + amount);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function formatDateParts(dateString) {
  if (!dateString) {
    return {
      month: "Select",
      day: "—",
      year: "Date",
      numeric: "Select date",
    };
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return {
    month: new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date),
    day: String(day),
    year: String(year),
    numeric: `${String(month).padStart(2, "0")}/${String(day).padStart(
      2,
      "0",
    )}/${year}`,
  };
}

export function buildBookingUrl({ checkIn, checkOut, rooms = 1, guests = 2 }) {
  const baseUrl = process.env.NEXT_PUBLIC_BOOKING_URL || DEFAULT_BOOKING_URL;

  // This helper is called from client-side form submission only.
  const url = new URL(baseUrl, window.location.origin);

  url.searchParams.set(QUERY_KEYS.checkIn, checkIn);
  url.searchParams.set(QUERY_KEYS.checkOut, checkOut);
  url.searchParams.set(QUERY_KEYS.rooms, String(rooms));
  url.searchParams.set(QUERY_KEYS.guests, String(guests));

  return url.toString();
}
