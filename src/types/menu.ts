/**
 * Shape of the menu data. Sample data and the real menu.json must both match MenuData,
 * so swapping the data file does not require changes to any screen.
 *
 * All prices are in cents (e.g. 575 = $5.75) to avoid floating point rounding errors.
 */

export type Category = {
  id: string;
  name: string;
  /**
   * Drinks shown in this category, in display order. A drink can appear in more than one
   * category (e.g. a "Signature" category that highlights drinks from other categories).
   */
  drinkIds: Drink['id'][];
};

export type Drink = {
  id: string;
  name: string;
  /** Short ingredient-style description, e.g. "matcha, milk". */
  description: string;
  /** Some drinks only come in regular size, so large is optional. */
  priceCents: {
    regular: number;
    large?: number;
  };
  /** Photo source. When missing, screens show a placeholder image. */
  image?: string;
};

/** Toppings that can be added to a drink (boba, jelly, foam, ...). */
export type AddOn = {
  id: string;
  name: string;
  priceCents: number;
};

export type MenuData = {
  categories: Category[];
  drinks: Drink[];
  addOns: AddOn[];
};
