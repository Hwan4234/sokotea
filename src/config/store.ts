/**
 * Store facts shown in the app, taken from https://sokotea.com.
 * Update this file (not the screens) when any of these change.
 */

export type Weekday =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

/** Opening hours in 24-hour "HH:MM" store-local time, or null when closed all day. */
export type DayHours = { open: string; close: string } | null;

const OPEN_DAY: DayHours = { open: '11:00', close: '21:00' };

export const store = {
  name: 'SOKO TEA',
  address: {
    street: '2043 NW Monroe Ave',
    city: 'Corvallis',
    state: 'OR',
    zip: '97330',
    full: '2043 NW Monroe Ave, Corvallis, OR 97330',
  },
  phone: {
    display: '(541) 207-3128',
    /** E.164 format for tel: links. */
    tel: '+15412073128',
  },
  instagram: {
    handle: '@soko.tea',
    url: 'https://www.instagram.com/soko.tea/',
  },
  /** MealKeyway ordering page (the "Order now" button on sokotea.com). */
  orderUrl:
    'https://order.mealkeyway.com/customer/release/index?mid=32626d5a63705148436344494e5344724742384f76413d3d',
  /** Open/closed status is always computed in the store's time zone, not the device's. */
  timeZone: 'America/Los_Angeles',
  hours: {
    sunday: null,
    monday: OPEN_DAY,
    tuesday: OPEN_DAY,
    wednesday: OPEN_DAY,
    thursday: OPEN_DAY,
    friday: OPEN_DAY,
    saturday: OPEN_DAY,
  } satisfies Record<Weekday, DayHours>,
} as const;
