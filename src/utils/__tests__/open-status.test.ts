import { store } from '@/config/store';
import { formatOpenStatus, formatTime, getOpenStatus } from '@/utils/open-status';

// All instants are written in UTC; comments give the Pacific time.
// 2026-10-05 is a Monday in daylight saving time (PDT = UTC-7).
// 2026-01-05 is a Monday in standard time (PST = UTC-8).
const status = (iso: string) => getOpenStatus(new Date(iso), store.hours, store.timeZone);
const text = (iso: string) => formatOpenStatus(status(iso));

describe('getOpenStatus', () => {
  it('is closed one minute before opening, and opens later today', () => {
    // Mon 10:59am PDT
    expect(status('2026-10-05T17:59:00Z')).toEqual({
      isOpen: false,
      nextOpen: { day: 'monday', time: '11:00', daysAhead: 0 },
    });
  });

  it('is open at exactly 11:00am', () => {
    // Mon 11:00am PDT
    expect(status('2026-10-05T18:00:00Z')).toEqual({ isOpen: true, closesAt: '21:00' });
  });

  it('is still open at 8:59pm', () => {
    // Mon 8:59pm PDT (already Tuesday in UTC)
    expect(status('2026-10-06T03:59:00Z')).toEqual({ isOpen: true, closesAt: '21:00' });
  });

  it('is closed at exactly 9:00pm, and opens tomorrow', () => {
    // Mon 9:00pm PDT
    expect(status('2026-10-06T04:00:00Z')).toEqual({
      isOpen: false,
      nextOpen: { day: 'tuesday', time: '11:00', daysAhead: 1 },
    });
  });

  it('is closed after midnight, and opens later the same day', () => {
    // Mon 12:30am PDT
    expect(status('2026-10-05T07:30:00Z')).toEqual({
      isOpen: false,
      nextOpen: { day: 'monday', time: '11:00', daysAhead: 0 },
    });
  });

  it('skips Sunday after Saturday closing', () => {
    // Sat 9:00pm PDT
    expect(status('2026-10-11T04:00:00Z')).toEqual({
      isOpen: false,
      nextOpen: { day: 'monday', time: '11:00', daysAhead: 2 },
    });
  });

  it('is closed all day Sunday', () => {
    // Sun 12:00pm PDT
    expect(status('2026-10-11T19:00:00Z')).toEqual({
      isOpen: false,
      nextOpen: { day: 'monday', time: '11:00', daysAhead: 1 },
    });
  });

  it('uses standard time (PST) in winter', () => {
    // Mon 10:59am PST
    expect(status('2026-01-05T18:59:00Z').isOpen).toBe(false);
    // Mon 11:00am PST
    expect(status('2026-01-05T19:00:00Z').isOpen).toBe(true);
  });

  it('returns no next opening when every day is closed', () => {
    const closed = {
      sunday: null,
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
    };
    expect(getOpenStatus(new Date('2026-10-05T18:00:00Z'), closed, store.timeZone)).toEqual({
      isOpen: false,
      nextOpen: null,
    });
  });
});

describe('formatOpenStatus', () => {
  it('shows closing time when open', () => {
    expect(text('2026-10-05T18:00:00Z')).toBe('Open now · until 9pm');
  });

  it('shows opening time later today', () => {
    expect(text('2026-10-05T17:59:00Z')).toBe('Closed · opens 11am');
  });

  it('says tomorrow for the next day', () => {
    expect(text('2026-10-06T04:00:00Z')).toBe('Closed · opens tomorrow 11am');
  });

  it('shows the weekday when opening is two or more days away', () => {
    expect(text('2026-10-11T04:00:00Z')).toBe('Closed · opens Mon 11am');
  });
});

describe('formatTime', () => {
  it.each([
    ['00:00', '12am'],
    ['11:00', '11am'],
    ['11:30', '11:30am'],
    ['12:00', '12pm'],
    ['21:00', '9pm'],
    ['21:05', '9:05pm'],
  ])('%s -> %s', (input, expected) => {
    expect(formatTime(input)).toBe(expected);
  });
});
