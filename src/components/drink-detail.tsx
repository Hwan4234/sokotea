import { Stack } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { getDrinkById } from '@/data/menu';
import { formatPrice } from '@/utils/price';

/**
 * Drink detail body. Route files (e.g. src/app/(menu)/drink/[id].tsx) only read the id from
 * the URL and render this, so the same detail can be shown from more than one tab.
 */
export function DrinkDetail({ id }: { id: string }) {
  const drink = getDrinkById(id);

  if (!drink) {
    return (
      <ThemedView style={styles.notFound}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <ThemedText themeColor="textSecondary">Drink not found</ThemedText>
      </ThemedView>
    );
  }

  const { regular, large } = drink.priceCents;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: drink.name }} />
      <ThemedText type="subtitle">{drink.name}</ThemedText>
      <ThemedText themeColor="textSecondary">{drink.description}</ThemedText>
      <ThemedText>
        Regular {formatPrice(regular)}
        {large !== undefined && ` · Large ${formatPrice(large)}`}
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.two,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: BottomTabInset,
  },
});
