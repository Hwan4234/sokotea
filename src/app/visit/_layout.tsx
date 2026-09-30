import { Stack } from 'expo-router';

import { HeaderOptions } from '@/constants/theme';

export default function VisitLayout() {
  return (
    <Stack screenOptions={HeaderOptions}>
      <Stack.Screen name="index" options={{ title: 'Visit' }} />
    </Stack>
  );
}
