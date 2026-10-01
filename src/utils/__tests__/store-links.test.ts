import { store } from '@/config/store';
import { DISPLAY_WEEK, formatDayHours } from '@/utils/open-status';
import { directionsUrl, phoneUrl } from '@/utils/store-links';

describe('directionsUrl', () => {
  it('opens Apple Maps on iOS', () => {
    expect(directionsUrl(store.address.full, 'ios')).toBe(
      'https://maps.apple.com/?daddr=2043%20NW%20Monroe%20Ave%2C%20Corvallis%2C%20OR%2097330'
    );
  });

  it('opens Google Maps on Android, like sokotea.com', () => {
    expect(directionsUrl(store.address.full, 'android')).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=2043%20NW%20Monroe%20Ave%2C%20Corvallis%2C%20OR%2097330'
    );
  });
});

describe('phoneUrl', () => {
  it('builds a tel: link', () => {
    expect(phoneUrl(store.phone.tel)).toBe('tel:+15412073128');
  });
});

describe('weekly hours', () => {
  it('lists the store hours Monday to Sunday', () => {
    expect(DISPLAY_WEEK.map((day) => formatDayHours(store.hours[day]))).toEqual([
      '11am – 9pm',
      '11am – 9pm',
      '11am – 9pm',
      '11am – 9pm',
      '11am – 9pm',
      '11am – 9pm',
      'Closed',
    ]);
  });
});
