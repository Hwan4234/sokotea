/**
 * The only place that reads the menu data file. Screens call these functions instead of
 * importing menu.json directly, so replacing menu.json (sample -> real menu) is enough to
 * update the whole app.
 */

import type { AddOn, Category, Drink, MenuData } from '@/types/menu';

import menuJson from './menu.json';

// Assigning to MenuData makes `tsc` fail if menu.json does not match the expected shape.
const menu: MenuData = menuJson;

const drinksById = new Map(menu.drinks.map((drink) => [drink.id, drink]));

export function getCategories(): Category[] {
  return menu.categories;
}

export function getCategoryById(id: string): Category | undefined {
  return menu.categories.find((category) => category.id === id);
}

/** Drinks in a category, in display order. Unknown drink IDs are skipped. */
export function getDrinksByCategory(categoryId: string): Drink[] {
  const category = getCategoryById(categoryId);
  if (!category) {
    return [];
  }
  return category.drinkIds
    .map((id) => drinksById.get(id))
    .filter((drink): drink is Drink => drink !== undefined);
}

export function getDrinkById(id: string): Drink | undefined {
  return drinksById.get(id);
}

export function getAddOns(): AddOn[] {
  return menu.addOns;
}
