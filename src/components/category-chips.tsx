import { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export type Chip = { id: string; label: string };

type Props = {
  chips: Chip[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Horizontally scrollable row of pill-shaped chips (the real menu has too many for one line). */
export function CategoryChips({ chips, selectedId, onSelect }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const chipX = useRef<Record<string, number>>({});

  const handlePress = (id: string) => {
    onSelect(id);
    // Bring the tapped chip into view, with a little of the previous chip still visible.
    const x = chipX.current[id] ?? 0;
    scrollRef.current?.scrollTo({ x: Math.max(0, x - Spacing.five), animated: true });
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {chips.map((chip) => {
        const selected = chip.id === selectedId;
        return (
          <Pressable
            key={chip.id}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => handlePress(chip.id)}
            onLayout={(event) => {
              chipX.current[chip.id] = event.nativeEvent.layout.x;
            }}
            style={[styles.chip, selected && styles.chipSelected]}>
            <ThemedText style={[styles.label, selected && styles.labelSelected]}>
              {chip.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
  },
  chip: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundElement,
  },
  chipSelected: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },
  labelSelected: {
    fontFamily: Fonts.bold,
    color: Colors.onAccent,
  },
});
