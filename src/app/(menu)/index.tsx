import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CategoryChips, type Chip } from '@/components/category-chips';
import { DrinkCard } from '@/components/drink-card';
import { OrderButton } from '@/components/order-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Colors, Fonts, Spacing } from '@/constants/theme';
import { getAddOns, getCategories, getCategoryById, getDrinksByCategory } from '@/data/menu';
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

function DrinkList({ categoryId }: { categoryId: string }) {
  return (
    <>
      <SectionLabel>{getCategoryById(categoryId)?.name}</SectionLabel>
      {getDrinksByCategory(categoryId).map((drink) => (
        <DrinkCard key={drink.id} drink={drink} />
      ))}
    </>
  );
}

// Add-ons are a price list only; toppings are picked on the MealKeyway ordering page.
function AddOnList() {
  return (
    <>
      <SectionLabel>Add-ons</SectionLabel>
      {getAddOns().map((addOn) => (
        <View key={addOn.id} style={styles.addOnRow}>
          <ThemedText>{addOn.name}</ThemedText>
          <ThemedText style={styles.addOnPrice}>{formatPrice(addOn.priceCents)}</ThemedText>
        </View>
      ))}
    </>
  );
}

function SectionLabel({ children }: { children?: string }) {
  return (
    <ThemedText type="label" themeColor="textSecondary" style={styles.sectionLabel}>
      {children}
    </ThemedText>
  );
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
  sectionLabel: {
    marginTop: Spacing.one,
    marginBottom: Spacing.one,
  },
  addOnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  addOnPrice: {
    fontFamily: Fonts.bold,
    color: Colors.accent,
    fontVariant: ['tabular-nums'],
  },
});
