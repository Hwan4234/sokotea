/**
 * Links that open other apps (Maps, Phone, Instagram). These use Linking.openURL, not the
 * in-app browser, so the phone opens the right app when it is installed.
 */

/** Apple Maps on iOS, Google Maps elsewhere (the same link sokotea.com uses). */
export function directionsUrl(address: string, platform: string): string {
  const destination = encodeURIComponent(address);
  return platform === 'ios'
    ? `https://maps.apple.com/?daddr=${destination}`
    : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

/** `tel:` link from an E.164 phone number such as "+15412073128". */
export function phoneUrl(e164: string): string {
  return `tel:${e164}`;
}
