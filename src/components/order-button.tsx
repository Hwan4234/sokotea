import { SymbolView } from 'expo-symbols';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { store } from '@/config/store';
import { Colors, Fonts, Spacing } from '@/constants/theme';

/** Opens the MealKeyway ordering page in the in-app browser. Styled like "Order now" on sokotea.com. */
export function OrderButton() {
  const openOrderPage = () =>
    openBrowserAsync(store.orderUrl, {
      presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
      controlsColor: Colors.accent,
      toolbarColor: Colors.background,
    });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Opens the online ordering page"
      onPress={openOrderPage}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <SymbolView
        name={{ ios: 'bag', android: 'shopping_bag' }}
        tintColor={Colors.onAccent}
        size={18}
      />
      <ThemedText style={styles.label}>Order now</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderRadius: 8,
    backgroundColor: Colors.accent,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: Fonts.bold,
    color: Colors.onAccent,
  },
});
