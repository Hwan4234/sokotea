// Import each weight from its own path. The package root would bundle all 16 font files.
import { NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans/400Regular';
import { NunitoSans_600SemiBold } from '@expo-google-fonts/nunito-sans/600SemiBold';
import { NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans/700Bold';
import { NunitoSans_800ExtraBold } from '@expo-google-fonts/nunito-sans/800ExtraBold';
import { useFonts } from 'expo-font';
import { DefaultTheme, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import AppTabs from '@/components/app-tabs';
import { Colors, Fonts } from '@/constants/theme';
import { FavoritesProvider } from '@/hooks/use-favorites';

// Keep the splash screen up until the fonts are loaded, so the app never flashes the
// system font before switching to Nunito Sans.
SplashScreen.preventAutoHideAsync();

// Colors and fonts used by navigation UI (headers, back buttons).
const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.accent,
    background: Colors.background,
    card: Colors.background,
    text: Colors.text,
    border: Colors.border,
  },
  fonts: {
    regular: { fontFamily: Fonts.regular, fontWeight: 'normal' },
    medium: { fontFamily: Fonts.semiBold, fontWeight: 'normal' },
    bold: { fontFamily: Fonts.bold, fontWeight: 'normal' },
    heavy: { fontFamily: Fonts.extraBold, fontWeight: 'normal' },
  },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  // If loading fails, the app still starts and falls back to the system font.
  if (!ready) {
    return null;
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <FavoritesProvider>
        <AppTabs />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
