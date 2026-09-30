import { ScrollView, StyleSheet } from 'react-native';

import { OrderButton } from '@/components/order-button';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, Spacing } from '@/constants/theme';

// Store info (address, hours, directions, phone, Instagram) comes in week 1, step 10.
export default function VisitScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <OrderButton />
      <ThemedText themeColor="textSecondary" style={styles.placeholder}>
        Store info coming soon
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  placeholder: {
    textAlign: 'center',
  },
});
