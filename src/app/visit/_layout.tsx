import { Stack } from 'expo-router';

export default function VisitLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Visit' }} />
    </Stack>
  );
}
