const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';
const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';

export const searchMealsByIngridients = async (ingredient) => {
  try {
    const request = await fetch(`${BASE_URL}filter.php?i=${ingredient}`);
    const response = await request.json();
    return response;
  } catch {
    global.alert(ERROR_MESSAGE);
  }
};

export const searchMealsByName = async (name) => {
  try {
    const request = await fetch(`${BASE_URL}search.php?s=${name}`);
    const response = await request.json();
    return response;
  } catch {
    global.alert(ERROR_MESSAGE);
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
