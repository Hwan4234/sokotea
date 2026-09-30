import { Stack } from 'expo-router';

import { HeaderOptions } from '@/constants/theme';

export default function FavoritesLayout() {
  return (
    <Stack screenOptions={HeaderOptions}>
      <Stack.Screen name="index" options={{ title: 'Favorites' }} />
    </Stack>
  );
}
