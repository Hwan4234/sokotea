import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme';
import type { Drink } from '@/types/menu';

type Props = {
  drink: Drink;
  style?: StyleProp<ViewStyle>;
  /** Size of the placeholder cup icon. */
  iconSize?: number;
};

/**
 * Drink photo, or a cream placeholder with a cup icon when the drink has no image yet.
 * The caller sets the size through `style`.
 */
export function DrinkPhoto({ drink, style, iconSize = 28 }: Props) {
  if (drink.image) {
    return (
      <View style={[styles.frame, style]}>
        <Image
          source={drink.image}
          contentFit="cover"
          accessibilityLabel={drink.name}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  return (
    <View style={[styles.frame, styles.placeholder, style]} accessibilityElementsHidden>
      <SymbolView
        name={{ ios: 'cup.and.saucer', android: 'local_cafe' }}
        tintColor={Colors.border}
        size={iconSize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSelected,
  },
});
