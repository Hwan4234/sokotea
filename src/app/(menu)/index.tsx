import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CategoryChips, type Chip } from '@/components/category-chips';
import { OrderButton } from '@/components/order-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { getAddOns, getCategories, getDrinksByCategory } from '@/data/menu';
import { formatPrice } from '@/utils/price';

// Add-ons are shown as the last chip, like the menu on sokotea.com.
const ADD_ONS_CHIP_ID = 'add-ons';

const chips: Chip[] = [
  ...getCategories().map((category) => ({ id: category.id, label: category.name })),
  ...(getAddOns().length > 0 ? [{ id: ADD_ONS_CHIP_ID, label: 'Add-ons' }] : []),
];

export default function MenuScreen() {
  const [selectedId, setSelectedId] = useState(chips[0]?.id ?? '');
  const listRef = useRef<ScrollView>(null);

  const select = (id: string) => {
    setSelectedId(id);
    listRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    // collapsable={false} keeps "tap the tab to scroll to top" working with a wrapper view.
    <View collapsable={false} style={styles.screen}>
      {/* Fixed area: stays in place while the list scrolls. */}
      <ThemedView style={styles.top}>
        <View style={styles.orderButton}>
          <OrderButton />
        </View>
        <CategoryChips chips={chips} selectedId={selectedId} onSelect={select} />
      </ThemedView>

      <ScrollView ref={listRef} contentContainerStyle={styles.list}>
        {selectedId === ADD_ONS_CHIP_ID ? <AddOnList /> : <DrinkList categoryId={selectedId} />}
      </ScrollView>
    </View>
  );
}

// Plain rows for now. Drink cards come in week 1, step 6-3.
function DrinkList({ categoryId }: { categoryId: string }) {
  return getDrinksByCategory(categoryId).map((drink) => (
    <Link key={drink.id} href={{ pathname: '/drink/[id]', params: { id: drink.id } }} asChild>
      <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <ThemedText>{drink.name}</ThemedText>
        <ThemedText themeColor="accent">{formatPrice(drink.priceCents.regular)}</ThemedText>
      </Pressable>
    </Link>
  ));
}

function AddOnList() {
  return getAddOns().map((addOn) => (
    <View key={addOn.id} style={styles.row}>
      <ThemedText>{addOn.name}</ThemedText>
      <ThemedText themeColor="accent">{formatPrice(addOn.priceCents)}</ThemedText>
    </View>
  ));
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  top: {
    gap: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
  },
  orderButton: {
    paddingHorizontal: Spacing.four,
  },
  list: {
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
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
