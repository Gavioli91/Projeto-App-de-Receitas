const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const searchDrinksByIngridients = async (ingredient) => {
  const request = await fetch(`${BASE_URL}filter.php?i=${ingredient}`);
  const response = await request.json();
  return response;
};

export const searchDrinksByFirstLetter = async (letter) => {
  const request = await fetch(`${BASE_URL}search.php?f=${letter}`);
  const response = await request.json();
  return response;
};

export const searchDrinksByName = async (name) => {
  const request = await fetch(`${BASE_URL}search.php?s=${name}`);
  const response = await request.json();
  return response;
};
