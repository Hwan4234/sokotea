import { parseFavoriteIds, toggleFavoriteId } from '@/utils/favorites';

describe('parseFavoriteIds', () => {
  it('reads a stored list of ids', () => {
    expect(parseFavoriteIds('["yuzu-matcha","cloud-matcha"]')).toEqual([
      'yuzu-matcha',
      'cloud-matcha',
    ]);
  });

  it.each([
    ['nothing stored', null],
    ['empty string', ''],
    ['broken JSON', '["yuzu-matcha"'],
    ['not a list', '{"id":"yuzu-matcha"}'],
  ])('returns an empty list for %s', (_, raw) => {
    expect(parseFavoriteIds(raw)).toEqual([]);
  });

  it('drops non-string entries and duplicates', () => {
    expect(parseFavoriteIds('["a", 1, null, "b", "a"]')).toEqual(['a', 'b']);
  });
});

describe('toggleFavoriteId', () => {
  it('adds a new id to the front', () => {
    expect(toggleFavoriteId(['a'], 'b')).toEqual(['b', 'a']);
  });

  it('removes an existing id', () => {
    expect(toggleFavoriteId(['b', 'a'], 'b')).toEqual(['a']);
  });
});
