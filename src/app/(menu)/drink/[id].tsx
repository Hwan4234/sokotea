import { useLocalSearchParams } from 'expo-router';

import { DrinkDetail } from '@/components/drink-detail';

// URL: /drink/<drink id>, e.g. /drink/cloud-matcha
export default function MenuDrinkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <DrinkDetail id={id} />;
}
