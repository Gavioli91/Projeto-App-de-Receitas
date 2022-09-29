import { IN_PROGRESS_RECIPES_KEY } from './globalVariables';

const DEFAULT_OBJECT = {
  drinks: {
  },
  meals: {
  },
};

if (!JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES_KEY))) {
  localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON.stringify(DEFAULT_OBJECT));
}

export const getObjectInStore = () => {
  const result = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES_KEY));
  return result;
};

export const setRecipeProgressInStore = ({ id, ingredient }, key, action) => {
  const recipesObject = getObjectInStore();

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
