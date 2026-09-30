import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { getCategories, getDrinksByCategory } from '@/data/menu';
import { formatPrice } from '@/utils/price';

// Plain list to test navigation. The real menu design comes in week 1, step 6.
export default function MenuScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      {getCategories().map((category) => (
        <ThemedView key={category.id} style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            {category.name.toUpperCase()}
          </ThemedText>
          {getDrinksByCategory(category.id).map((drink) => (
            <Link
              key={drink.id}
              href={{ pathname: '/drink/[id]', params: { id: drink.id } }}
              asChild>
              <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
                <ThemedText>{drink.name}</ThemedText>
                <ThemedText themeColor="textSecondary">
                  {formatPrice(drink.priceCents.regular)}
                </ThemedText>
              </Pressable>
            </Link>
          ))}
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  section: {
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  pressed: {
    opacity: 0.5,
  },
});
