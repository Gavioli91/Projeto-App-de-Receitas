import {
  DRINKS_RECIPES_END_POINT,
  MEALS_CATEGORYS_END_POINT,
  MEALS_RECIPES_END_POINT,
  MEALS_FROM_CATEGORY_END_POINT,
  DRINKS_CATEGORYS_END_POINT,
  DRINKS_FROM_CATEGORY_END_POINT,
} from './globalVariables';

export const getRecipes = async (endPoint) => {
  const request = await fetch(endPoint);
  const response = await request.json();

  switch (endPoint) {
  case MEALS_RECIPES_END_POINT: return response.meals;
  case MEALS_CATEGORYS_END_POINT: return response.meals;
  case DRINKS_CATEGORYS_END_POINT: return response.drinks;
  case DRINKS_RECIPES_END_POINT: return response.drinks;
  default: return { error: 'Erro' };
  }
};

export const getRecipesFromCategory = async (category, type) => {
  if (type === 'meals') {
    const request = await fetch(`${MEALS_FROM_CATEGORY_END_POINT}${category}`);
    const response = await request.json();
    return response.meals;
  }
  if (type === 'drinks') {
    const request = await fetch(`${DRINKS_FROM_CATEGORY_END_POINT}${category}`);
    const response = await request.json();
    return response.drinks;
  }
};
