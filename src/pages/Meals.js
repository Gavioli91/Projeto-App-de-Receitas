import React, { useContext, useEffect } from 'react';
import RecipesCards from '../components/RecipesCards';
import SearchBarContext from '../context/SearchBarContext';
import { MAX_FOOD_CARDS, MEALS_RECIPES_END_POINT } from '../utils/globalVariables';
import getRecipes from '../utils/recipesFetch';

function Meals() {
  const { recipes, setRecipes } = useContext(SearchBarContext);

  useEffect(() => {
    const mealsRecepiesFetch = async () => {
      const response = await getRecipes(MEALS_RECIPES_END_POINT);
      setRecipes(response);
    };
    mealsRecepiesFetch();
  }, []);

  return (
    <main className="mealsItems">
      {recipes && recipes.slice(0, MAX_FOOD_CARDS).map(({
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
