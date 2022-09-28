const BASE_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const getMealsDetails = async (id) => {
  const response = await fetch(`${BASE_URL_MEALS}${id}`);
  const data = await response.json();
  return data;
};

export const getDrinksDetails = async (id) => {
  const response = await fetch(`${BASE_URL_DRINKS}${id}`);
  const data = await response.json();
  return data;
};
