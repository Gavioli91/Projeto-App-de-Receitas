import React, { useEffect, useState } from 'react';
import RecipesCards from '../components/RecipesCards';
import { MAX_FOOD_CARDS, MEALS_RECIPES_END_POINT } from '../utils/globalVariables';
import getRecipes from '../utils/recipesFetch';

function Meals() {
  const [mealsRecipes, setMealsRecipes] = useState([]);

  useEffect(() => {
    const mealsRecepiesFetch = async () => {
      const response = await getRecipes(MEALS_RECIPES_END_POINT);
      setMealsRecipes(response);
    };
    mealsRecepiesFetch();
  });

  return (
    <main>
      {mealsRecipes.slice(0, MAX_FOOD_CARDS).map(({
        strMealThumb,
        idMeal,
        strMeal,
      }, index) => (
        <section key={ idMeal }>
          <RecipesCards
            thumb={ strMealThumb }
            name={ strMeal }
            index={ index }
          />
        </section>
      ))}
    </main>
  );
}
export default Meals;
