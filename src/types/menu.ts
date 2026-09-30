/**
 * Shape of the menu data. Sample data and the real menu.json must both match MenuData,
 * so swapping the data file does not require changes to any screen.
 */

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type Drink = {
  id: string;
  categoryId: Category['id'];
  name: string;
  description: string;
  /** Price in cents (e.g. 575 = $5.75) to avoid floating point rounding errors. */
  priceCents: number;
  /** Photo source. When missing, screens show a placeholder image. */
  image?: string;
};

export type MenuData = {
  categories: Category[];
  drinks: Drink[];
};
