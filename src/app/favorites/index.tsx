import { SymbolView } from 'expo-symbols';
import { ScrollView, StyleSheet } from 'react-native';

import { DrinkCard } from '@/components/drink-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, Spacing } from '@/constants/theme';
import { getDrinkById } from '@/data/menu';
import { useFavorites } from '@/hooks/use-favorites';
import type { Drink } from '@/types/menu';

export default function FavoritesScreen() {
  const { favoriteIds } = useFavorites();
  // Skip ids that are no longer on the menu (e.g. after the menu data changes).
  const drinks = favoriteIds
    .map((id) => getDrinkById(id))
    .filter((drink): drink is Drink => drink !== undefined);

  if (drinks.length === 0) {
    return (
      <ThemedView style={styles.empty}>
        <SymbolView
          name={{ ios: 'heart', android: 'favorite_border' }}
          tintColor={Colors.border}
          size={40}
        />
        <ThemedText style={styles.emptyTitle}>No favorites yet</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.emptyHint}>
          Tap the heart on a drink to save it here.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.list}>
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} detailPathname="/favorites/drink/[id]" />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset,
  },
  emptyTitle: {
    marginTop: Spacing.two,
  },
  emptyHint: {
    textAlign: 'center',
  },
});
