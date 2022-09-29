import { FAVORITE_RECIPES_KEY, IN_PROGRESS_RECIPES_KEY } from './globalVariables';

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

export const setFavoritesRecipesInStore = (recipe) => {
  const favoritesArray = getObjectInStore(FAVORITE_RECIPES_KEY);

  const checkRepeatedItem = favoritesArray
    .some((favoriteItem) => favoriteItem.id === recipe.id);

  if (checkRepeatedItem) {
    const filteredFavoritesArray = favoritesArray
      .filter((favoriteItem) => favoriteItem.id !== recipe.id);

    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(filteredFavoritesArray));
  } else {
    const newFavotiresArray = [...favoritesArray, recipe];
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(newFavotiresArray));
  }
};
