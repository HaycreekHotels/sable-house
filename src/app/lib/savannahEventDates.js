/** Savannah-local calendar utilities. Store event dates as YYYY-MM-DD, not UTC timestamps.
 * This prevents an event vanishing a day early for guests in other time zones. */
export const SAVANNAH_TIME_ZONE = "America/New_York";

export function savannahToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SAVANNAH_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

export function parseISODate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatISODate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function shiftISODate(iso, days) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function weekday(iso) {
  return new Date(`${iso}T12:00:00Z`).getUTCDay();
}

function nextWeeklyDate(iso, dayOfWeek) {
  return shiftISODate(iso, (dayOfWeek - weekday(iso) + 7) % 7);
}

/** Return the first actual scheduled event date on/after fromISO and on/before throughISO.
 * Recurring and irregular-night schedules only match days when the event operates.
 */
export function nextOccurrence(event, fromISO, throughISO = null) {
  const schedule = event.schedule;
  let date = null;

  if (schedule.type === "range") {
    date = fromISO > schedule.start ? fromISO : schedule.start;
    if (date > schedule.end) return null;
  } else if (schedule.type === "dates") {
    date = schedule.dates.find((item) => item >= fromISO) ?? null;
  } else if (schedule.type === "weekly") {
    date = nextWeeklyDate(
      fromISO > (schedule.start ?? "0000-01-01")
        ? fromISO
        : (schedule.start ?? fromISO),
      schedule.weekday,
    );
    if (schedule.end && date > schedule.end) return null;
  } else {
    return null;
  }

  if (!date || (throughISO && date > throughISO)) return null;
  return date;
}

function savannahTime(now) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SAVANNAH_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${values.hour}:${values.minute}`;
}

function occurrenceHasEnded(event, occurrenceDate, today, now) {
  if (occurrenceDate !== today) return false;
  if (event.schedule.type === "weekly" && event.endsTime) {
    return savannahTime(now) >= event.endsTime;
  }
  const explicitEnd = event.schedule.endTimes?.[occurrenceDate] ?? event.endsAt;
  return Boolean(explicitEnd && now.getTime() >= Date.parse(explicitEnd));
}

export function visibleEvents(
  events,
  today,
  fromISO = null,
  toISO = null,
  now = new Date(),
) {
  const start = fromISO && fromISO > today ? fromISO : today;
  const through = toISO ?? fromISO ?? null;
  return events
    .filter((event) => !event.status || event.status === "published")
    .map((event) => {
      let nextDate = nextOccurrence(event, start, through);
      // Same-day time-bound events have already ended: try the next scheduled
      // date rather than incorrectly showing an expired performance or market.
      if (nextDate && occurrenceHasEnded(event, nextDate, today, now)) {
        nextDate = nextOccurrence(event, shiftISODate(nextDate, 1), through);
      }
      return { event, nextDate };
    })
    .filter(({ nextDate }) => nextDate !== null)
    .sort(
      (a, b) =>
        a.nextDate.localeCompare(b.nextDate) || a.event.order - b.event.order,
    );
}

export function savannahOffsetForDate(iso) {
  const zone =
    new Intl.DateTimeFormat("en-US", {
      timeZone: SAVANNAH_TIME_ZONE,
      timeZoneName: "shortOffset",
    })
      .formatToParts(new Date(`${iso}T12:00:00Z`))
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT-5";
  const match = zone.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return "-05:00";
  return `${match[1]}${match[2].padStart(2, "0")}:${match[3] ?? "00"}`;
}

export function formatEventDate(
  iso,
  options = { month: "short", day: "numeric" },
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    ...options,
  }).format(new Date(`${iso}T12:00:00Z`));
}
