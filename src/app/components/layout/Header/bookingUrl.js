const BOOKING_BASE_URL = "https://bookings.sabalhouse.com/book/dates-of-stay";

function parseISODate(dateString) {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function dateToISO(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayISO() {
  return dateToISO(new Date());
}

export function addDaysISO(dateString, days = 1) {
  const date = parseISODate(dateString);

  if (!date) return "";

  date.setDate(date.getDate() + days);

  return dateToISO(date);
}

export function formatDateParts(dateString) {
  const date = parseISODate(dateString);

  if (!date) {
    return {
      month: "",
      day: "",
      year: "",
      numeric: "",
    };
  }

  const monthNumber = String(date.getMonth() + 1).padStart(2, "0");
  const dayNumber = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());

  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
  })
    .format(date)
    .toUpperCase();

  return {
    month,
    day: dayNumber,
    year,
    numeric: `${monthNumber}/${dayNumber}/${year}`,
  };
}

function formatBookingDate(dateString) {
  const date = parseISODate(dateString);

  if (!date) return "";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function buildBookingUrl({ checkIn, checkOut }) {
  if (!checkIn || !checkOut) {
    return BOOKING_BASE_URL;
  }

  const dateIn = formatBookingDate(checkIn);
  const dateOut = formatBookingDate(checkOut);

  if (!dateIn || !dateOut) {
    return BOOKING_BASE_URL;
  }

  return `${BOOKING_BASE_URL}?datein=${dateIn}&dateout=${dateOut}`;
}
