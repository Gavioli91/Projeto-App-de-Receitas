import { ERROR_MESSAGE } from './globalVariables';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const searchDrinksByIngridients = async (ingredient) => {
  try {
    const request = await fetch(`${BASE_URL}filter.php?i=${ingredient}`);
    const response = await request.json();
    return response.drinks;
  } catch {
    global.alert(ERROR_MESSAGE);
  }
};

export const searchDrinksByName = async (name) => {
  try {
    const request = await fetch(`${BASE_URL}search.php?s=${name}`);
    const response = await request.json();
    return response.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const searchDrinksByFirstLetter = async (letter) => {
  try {
    const request = await fetch(`${BASE_URL}search.php?f=${letter}`);
    const response = await request.json();
    return response.drinks;
  } catch {
    global.alert('Your search must have only 1 (one) character');
  }
};
