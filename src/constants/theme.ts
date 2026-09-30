/**
 * Design values taken from sokotea.com so the app matches the website.
 * Each color notes the CSS variable it comes from in the site's stylesheet.
 *
 * The app is light mode only for v1 because the website has no dark mode.
 * To add dark mode later, add a second palette and pick it in `useTheme()`.
 */

import { DynamicColorIOS, Platform, type ColorValue } from 'react-native';

export const Colors = {
  /** --ink: body text */
  text: '#3a3538',
  /** --ink-soft: descriptions, small labels */
  textSecondary: '#6e6468',
  /** --bg: page background */
  background: '#f7f4ed',
  /** --paper: slightly lighter surface (cards, tab bar items) */
  backgroundElement: '#faf8f4',
  /** --cream: selected surface, photo placeholders */
  backgroundSelected: '#fef4e1',
  /** --accent: headings, prices, selected items, Order now button */
  accent: '#3a5786',
  /** --cream: text on top of accent */
  onAccent: '#fef4e1',
  /** --beige: dividers and decoration only (too low contrast for text) */
  border: '#c9a77c',
} as const;

export type ThemeColor = keyof typeof Colors;

/**
 * On iOS 26, Liquid Glass (header buttons, tab bar) replaces plain colors with its own,
 * switching between light and dark depending on the content behind the glass. It only keeps
 * a dynamic color, so pass both variants: `light` is the brand color, `dark` stays readable
 * if the glass turns dark. Other platforms use the light value as a plain color.
 */
function glassColor(light: string, dark: string): ColorValue {
  return Platform.OS === 'ios' ? DynamicColorIOS({ light, dark }) : light;
}

/** Colors for native controls drawn with Liquid Glass on iOS 26. */
export const GlassColors = {
  accent: glassColor(Colors.accent, Colors.onAccent),
  textSecondary: glassColor(Colors.textSecondary, '#d9d2c7'),
};

/**
 * Nunito Sans, the website font. On native each weight is a separate font family,
 * so use these names instead of `fontWeight`. Loaded in src/app/_layout.tsx.
 */
export const Fonts = {
  regular: 'NunitoSans_400Regular',
  semiBold: 'NunitoSans_600SemiBold',
  bold: 'NunitoSans_700Bold',
  extraBold: 'NunitoSans_800ExtraBold',
  mono: Platform.select({ ios: 'ui-monospace', default: 'monospace' }),
} as const;

/** Header style shared by the Stack in every tab. */
export const HeaderOptions = {
  headerTintColor: GlassColors.accent,
  headerTitleStyle: { fontFamily: Fonts.extraBold, color: Colors.accent },
  headerShadowVisible: false,
  // Back button shows only the arrow, without the previous screen's title.
  headerBackButtonDisplayMode: 'minimal',
} as const;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
