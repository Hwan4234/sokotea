import Storage from 'expo-sqlite/kv-store';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { parseFavoriteIds, toggleFavoriteId } from '@/utils/favorites';

// Bump the version if the stored format ever changes.
const STORAGE_KEY = 'favorites:v1';

type FavoritesContextValue = {
  /** Favorite drink ids, newest first. May include ids that are no longer on the menu. */
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

/**
 * Keeps favorite drink ids on the device (expo-sqlite key-value store) and shares them with
 * every screen. Wrap the app with this in src/app/_layout.tsx.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Read synchronously on first render so hearts never flash empty before loading.
  const [favoriteIds, setFavoriteIds] = useState(() =>
    parseFavoriteIds(Storage.getItemSync(STORAGE_KEY))
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) => {
      const next = toggleFavoriteId(current, id);
      Storage.setItemSync(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite: (id: string) => favoriteIds.includes(id),
      toggleFavorite,
    }),
    [favoriteIds, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const value = useContext(FavoritesContext);
  if (!value) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return value;
}
