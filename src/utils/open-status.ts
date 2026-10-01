import type { DayHours, Weekday } from '@/config/store';

/** Index matches Date#getDay(): 0 = Sunday. */
const WEEKDAYS: Weekday[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  | {
      isOpen: false;
      /** Next opening time, or null if the store has no open days at all. */
      nextOpen: { day: Weekday; time: string; daysAhead: number } | null;
    };

/**
 * Whether the store is open at `now`, judged in the store's time zone (not the device's).
 * `hours` uses "HH:MM" 24-hour times; closing time is exclusive (21:00 means closed at 9:00pm).
 * Hours that pass midnight (e.g. 18:00-02:00) are not supported.
 */
export function getOpenStatus(
  now: Date,
  hours: Record<Weekday, DayHours>,
  timeZone: string
): OpenStatus {
  const { weekday, minutes } = getZonedTime(now, timeZone);
  const today = hours[weekday];

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { isOpen: true, closesAt: today.close };
  }
  if (today && minutes < toMinutes(today.open)) {
    return { isOpen: false, nextOpen: { day: weekday, time: today.open, daysAhead: 0 } };
  }

  const todayIndex = WEEKDAYS.indexOf(weekday);
  for (let daysAhead = 1; daysAhead <= 7; daysAhead++) {
    const day = WEEKDAYS[(todayIndex + daysAhead) % 7];
    const dayHours = hours[day];
    if (dayHours) {
      return { isOpen: false, nextOpen: { day, time: dayHours.open, daysAhead } };
    }
  }
  return { isOpen: false, nextOpen: null };
}

/** Text for the status line, e.g. "Open now · until 9pm" or "Closed · opens Mon 11am". */
export function formatOpenStatus(status: OpenStatus): string {
  if (status.isOpen) {
    return `Open now · until ${formatTime(status.closesAt)}`;
  }
  const { nextOpen } = status;
  if (!nextOpen) {
    return 'Closed';
  }
  const time = formatTime(nextOpen.time);
  if (nextOpen.daysAhead === 0) {
    return `Closed · opens ${time}`;
  }
  if (nextOpen.daysAhead === 1) {
    return `Closed · opens tomorrow ${time}`;
  }
  const day = nextOpen.day.charAt(0).toUpperCase() + nextOpen.day.slice(1, 3);
  return `Closed · opens ${day} ${time}`;
}

/** Days in the order shown on the Visit tab (week starts Monday, like sokotea.com). */
export const DISPLAY_WEEK: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

/** "11am – 9pm", or "Closed" for a day off. */
export function formatDayHours(dayHours: DayHours): string {
  return dayHours ? `${formatTime(dayHours.open)} – ${formatTime(dayHours.close)}` : 'Closed';
}

/** "21:00" -> "9pm", "11:30" -> "11:30am" (the style used on sokotea.com). */
export function formatTime(hhmm: string): string {
  const [hour, minute] = hhmm.split(':').map(Number);
  const suffix = hour < 12 ? 'am' : 'pm';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0 ? `${hour12}${suffix}` : `${hour12}:${String(minute).padStart(2, '0')}${suffix}`;
}

/**
 * Weekday and minutes since midnight at `now` in `timeZone`.
 * Uses Intl.DateTimeFormat#format (not formatToParts) with the en-US locale so the output is
 * the same on every JavaScript engine, including Hermes on iOS and Android.
 */
export function getZonedTime(now: Date, timeZone: string): { weekday: Weekday; minutes: number } {
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long' })
    .format(now)
    .toLowerCase() as Weekday;
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
  const [hour, minute] = (time.match(/(\d+):(\d+)/) ?? ['', '0', '0']).slice(1).map(Number);
  // Some engines print midnight as "24:00" when hour12 is false.
  return { weekday, minutes: (hour % 24) * 60 + minute };
}

function toMinutes(hhmm: string): number {
  const [hour, minute] = hhmm.split(':').map(Number);
  return hour * 60 + minute;
}
