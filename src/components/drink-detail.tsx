import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { DrinkPhoto } from '@/components/drink-photo';
import { OrderButton } from '@/components/order-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, Fonts, Spacing } from '@/constants/theme';
import { getAddOns, getDrinkById } from '@/data/menu';
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
  const hasAddOns = getAddOns().length > 0;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: drink.name }} />

      <DrinkPhoto drink={drink} style={styles.photo} iconSize={56} />

      <View style={styles.heading}>
        <ThemedText type="subtitle" themeColor="accent" style={styles.name}>
          {drink.name}
        </ThemedText>
        <ThemedText themeColor="textSecondary">{drink.description}</ThemedText>
      </View>

      <View style={styles.prices}>
        <PriceRow label="Regular" cents={regular} />
        {large !== undefined && <PriceRow label="Large" cents={large} />}
      </View>

      {/* Toppings are chosen on the MealKeyway ordering page; the full list is in the Add-ons chip. */}
      {hasAddOns && (
        <ThemedText type="small" themeColor="textSecondary">
          Add-ons available when you order.
        </ThemedText>
      )}

      <OrderButton />
    </ScrollView>
  );
}

function PriceRow({ label, cents }: { label: string; cents: number }) {
  return (
    <View style={styles.priceRow}>
      <ThemedText type="label" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText style={styles.price}>{formatPrice(cents)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: BottomTabInset,
  },
  photo: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  heading: {
    gap: Spacing.one,
  },
  name: {
    fontFamily: Fonts.extraBold,
  },
  prices: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.accent,
    fontVariant: ['tabular-nums'],
  },
});
