import { DRINKS_RECIPES_END_POINT, MEALS_RECIPES_END_POINT } from './globalVariables';

const getRecipes = async (endPoint) => {
  const request = await fetch(endPoint);
  const response = await request.json();

  if (endPoint === MEALS_RECIPES_END_POINT) {
    return response.meals;
  }
  if (endPoint === DRINKS_RECIPES_END_POINT) {
    return response.drinks;
  }
};

export default getRecipes;
