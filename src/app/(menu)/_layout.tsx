import { Stack } from 'expo-router';

import { store } from '@/config/store';

// Stack inside the Menu tab: the menu list, and later the drink detail pushed on top of it.
export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: store.name }} />
    </Stack>
  );
}
