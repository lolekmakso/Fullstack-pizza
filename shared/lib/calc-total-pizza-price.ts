import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants/pizza';

/**
 * Функція для підрахунку загальної вартості піци
 *
 * @param type - тип тіста обраної піци
 * @param size - розмір обраної піци
 * @param items - список варіантів
 * @param ingredients - список інгредієнтів
 * @param selectedIngredients - обрані інгредієнти
 *
 * @returns number загальна вартість
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
