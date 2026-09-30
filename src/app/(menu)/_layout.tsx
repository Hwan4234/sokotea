import { Stack } from 'expo-router';

import { store } from '@/config/store';
import { HeaderOptions } from '@/constants/theme';

// Stack inside the Menu tab: the menu list, with the drink detail (drink/[id]) pushed on top.
// The detail screen sets its own title from the drink name.
export default function MenuLayout() {
  return (
    <Stack screenOptions={HeaderOptions}>
      <Stack.Screen name="index" options={{ title: store.name }} />
    </Stack>
  );
}
