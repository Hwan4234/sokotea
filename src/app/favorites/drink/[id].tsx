import { useLocalSearchParams } from 'expo-router';

import { DrinkDetail } from '@/components/drink-detail';

// URL: /favorites/drink/<drink id>. Same detail as the Menu tab, but opened inside the
// Favorites tab so the back button returns to the favorites list.
export default function FavoriteDrinkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <DrinkDetail id={id} />;
}
