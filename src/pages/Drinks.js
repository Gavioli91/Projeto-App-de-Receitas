import React, { useEffect, useState } from 'react';
import createMenu from '../utils/createMenu';
import {
  DRINKS_CATEGORYS_END_POINT,
  DRINKS_RECIPES_END_POINT,
  MIN_CATEGORY_LENGTH,
} from '../utils/globalVariables';
import { getRecipes, getRecipesFromCategory } from '../utils/recipesFetch';

function Drinks() {
  const [drinksRecipes, setDrinksRecipes] = useState([]);
  const [drinksCategorys, setDrinksCategorys] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const drinkRecipesFetch = async () => {
      const response = await getRecipes(DRINKS_RECIPES_END_POINT);
      setDrinksRecipes(response);
    };

    const drinkCategoryFetch = async () => {
      const response = await getRecipes(DRINKS_CATEGORYS_END_POINT);
      setDrinksCategorys(response);
    };

    drinkRecipesFetch();
    drinkCategoryFetch();
  }, []);

  const drinksFromCategory = async ({ target: { value } }) => {
    if (currentCategory === value) {
      setDrinksCategory([]);
      setCurrentCategory('');
      return;
    }
    const response = await getRecipesFromCategory(value, 'drinks');
    setDrinksCategory(response);
    setCurrentCategory(value);
  };

  const clearFilters = () => {
    setDrinksCategory([]);
  };

  return (
    <main>
      <section>
        <div>
          {drinksCategorys.slice(0, MIN_CATEGORY_LENGTH).map(({ strCategory }) => (
            <input
              type="button"
              key={ strCategory }
              value={ strCategory }
              id={ strCategory }
              onClick={ drinksFromCategory }
              name="categories"
              data-testid={ `${strCategory}-category-filter` }
            />
          ))}
          <input
            type="button"
            data-testid="All-category-filter"
            onClick={ clearFilters }
            value="All"
          />
        </div>
      </section>
      <section>
        {
          drinksCategory.length === 0
            ? createMenu(drinksRecipes)
            : createMenu(drinksCategory)
        }
      </section>
    </main>
  );
}
export default Drinks;
