import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet } from 'react-native';

import { GlassColors } from '@/constants/theme';
import { useFavorites } from '@/hooks/use-favorites';

/** Heart toggle for the drink detail header. Filled when the drink is a favorite. */
export function FavoriteButton({ drinkId, drinkName }: { drinkId: string; drinkName: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(drinkId);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={favorite ? `Remove ${drinkName} from favorites` : `Add ${drinkName} to favorites`}
      accessibilityState={{ selected: favorite }}
      hitSlop={8}
      onPress={() => toggleFavorite(drinkId)}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <SymbolView
        name={
          favorite
            ? { ios: 'heart.fill', android: 'favorite' }
            : { ios: 'heart', android: 'favorite_border' }
        }
        // Header buttons are drawn with Liquid Glass on iOS 26 (see GlassColors).
        tintColor={GlassColors.accent}
        size={22}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  pressed: {
    opacity: 0.6,
  },
});
