import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { store } from '@/config/store';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useNow } from '@/hooks/use-now';
import { formatOpenStatus, getOpenStatus } from '@/utils/open-status';

/**
 * "Open now · until 9pm" / "Closed · opens tomorrow 11am", judged in the store's time zone.
 * Like sokotea.com: accent color with a dot when open, soft gray when closed.
 */
export function OpenStatusLine() {
  const now = useNow();
  const status = getOpenStatus(now, store.hours, store.timeZone);
  const color = status.isOpen ? Colors.accent : Colors.textSecondary;

  return (
    <View style={styles.row} accessible accessibilityRole="text">
      <View style={[styles.dot, { backgroundColor: color }]} />
      <ThemedText type="small" style={[styles.text, { color }]}>
        {formatOpenStatus(status)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontFamily: Fonts.semiBold,
  },
});
