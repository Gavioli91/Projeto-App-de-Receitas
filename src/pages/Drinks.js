import React, { useContext, useEffect } from 'react';
import RecipesCards from '../components/RecipesCards';
import SearchBarContext from '../context/SearchBarContext';
import { DRINKS_RECIPES_END_POINT, MAX_FOOD_CARDS } from '../utils/globalVariables';
import getRecipes from '../utils/recipesFetch';

function Drinks() {
  const { recipes, setRecipes } = useContext(SearchBarContext);

  useEffect(() => {
    const drinkRecipesFetch = async () => {
      const response = await getRecipes(DRINKS_RECIPES_END_POINT);
      setRecipes(response);
    };
    drinkRecipesFetch();
  }, []);

  return (
    <main>
      {recipes && recipes.slice(0, MAX_FOOD_CARDS).map(({
        strDrinkThumb,
        idDrink,
        strDrink,
      }, index) => (
        <section key={ idDrink }>
          <RecipesCards
            thumb={ strDrinkThumb }
            name={ strDrink }
            index={ index }
          />
        </section>
      ))}
    </main>
  );
}
export default Drinks;
