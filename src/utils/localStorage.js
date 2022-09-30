import {
  DONE_RECIPES_KEY,
  FAVORITE_RECIPES_KEY,
  IN_PROGRESS_RECIPES_KEY,
} from './globalVariables';

const DEFAULT_IN_PROGRESS_OBJECT = {
  drinks: {},
  meals: {},
};

if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES_KEY))) {
  localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON
    .stringify(DEFAULT_IN_PROGRESS_OBJECT));
}

if (!JSON.parse(localStorage.getItem(FAVORITE_RECIPES_KEY))) {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem(DONE_RECIPES_KEY))) {
  localStorage.setItem(DONE_RECIPES_KEY, JSON.stringify([]));
}

export const getObjectInStore = (storeKey) => {
  const result = JSON.parse(localStorage.getItem(storeKey));
  return result;
};

export const setRecipeProgressInStore = ({ id, ingredient }, key, action) => {
  const recipesObject = getObjectInStore(IN_PROGRESS_RECIPES_KEY);

  if (recipesObject[key][id]) {
    const filteredIngredients = recipesObject[key][id]
      .filter((items) => items !== ingredient);

    if (action === 'remove') recipesObject[key] = { [id]: filteredIngredients };
    else recipesObject[key] = { [id]: [...recipesObject[key][id], ingredient] };
  } else {
    recipesObject[key] = { [id]: [ingredient] };
  }

  localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON.stringify(recipesObject));
};

export const setRecipesInStore = (recipe, localStorageKey) => {
  const recipesArray = getObjectInStore(localStorageKey);

  const checkRepeatedItem = recipesArray
    .some((item) => item.id === recipe.id);

  if (checkRepeatedItem) {
    const filteredArray = recipesArray
      .filter((item) => item.id !== recipe.id);

    localStorage.setItem(localStorageKey, JSON.stringify(filteredArray));
  } else {
    const newArray = [...recipesArray, recipe];
    localStorage.setItem(localStorageKey, JSON.stringify(newArray));
  }
};
