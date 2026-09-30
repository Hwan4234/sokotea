import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { DrinkPhoto } from '@/components/drink-photo';
import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import type { Drink } from '@/types/menu';
import { formatPrice } from '@/utils/price';

/** One drink in the menu list: photo, name, description, and prices. Opens the detail screen. */
export function DrinkCard({ drink }: { drink: Drink }) {
  const { regular, large } = drink.priceCents;

  return (
    <Link href={{ pathname: '/drink/[id]', params: { id: drink.id } }} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <DrinkPhoto drink={drink} style={styles.photo} />

        <View style={styles.text}>
          <ThemedText style={styles.name}>{drink.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {drink.description}
          </ThemedText>
        </View>

        {/* Like sokotea.com: "R" / "L" size labels only when there is a large size. */}
        <View style={styles.prices}>
          <Price cents={regular} size={large !== undefined ? 'R' : undefined} />
          {large !== undefined && <Price cents={large} size="L" />}
        </View>
      </Pressable>
    </Link>
  );
}

function Price({ cents, size }: { cents: number; size?: 'R' | 'L' }) {
  return (
    <ThemedText style={styles.price}>
      {formatPrice(cents)}
      {size && <ThemedText style={styles.size}> {size}</ThemedText>}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  pressed: {
    opacity: 0.6,
  },
  photo: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    gap: Spacing.half,
  },
  name: {
    fontFamily: Fonts.bold,
  },
  prices: {
    alignItems: 'flex-end',
  },
  price: {
    fontFamily: Fonts.bold,
    color: Colors.accent,
    // Same width for every digit so prices line up.
    fontVariant: ['tabular-nums'],
  },
  size: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
