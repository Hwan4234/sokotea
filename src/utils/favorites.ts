/**
 * Reads the stored favorites value. Anything unexpected (missing, broken JSON, wrong shape)
 * becomes an empty list, so a bad stored value can never crash the app.
 */
export function parseFavoriteIds(raw: string | null): string[] {
  if (!raw) {
    return [];
  }
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value)) {
      return [...new Set(value.filter((id): id is string => typeof id === 'string'))];
    }
  } catch {
    // Fall through to the empty list.
  }
  return [];
}

/** Adds the id if missing, removes it if present. Newest favorites come first. */
export function toggleFavoriteId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((existing) => existing !== id) : [id, ...ids];
}
