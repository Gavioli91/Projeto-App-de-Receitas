import { ERROR_MESSAGE } from './globalVariables';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const searchMealsByIngridients = async (ingredient) => {
  try {
    const request = await fetch(`${BASE_URL}filter.php?i=${ingredient}`);
    const response = await request.json();
    if (response.meals === null) return global.alert(ERROR_MESSAGE);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchMealsByName = async (name) => {
  try {
    const request = await fetch(`${BASE_URL}search.php?s=${name}`);
    const response = await request.json();
    if (response.meals === null) return global.alert(ERROR_MESSAGE);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const searchMealsByFirstLetter = async (letter) => {
  try {
    const request = await fetch(`${BASE_URL}search.php?f=${letter}`);
    const response = await request.json();
    return response;
  } catch {
    global.alert('Your search must have only 1 (one) character');
  }
};
