import React, { useEffect, useState } from 'react';
import RecipesCards from '../components/RecipesCards';
import { DRINKS_RECIPES_END_POINT, MAX_FOOD_CARDS } from '../utils/globalVariables';
import getRecipes from '../utils/recipesFetch';

function Drinks() {
  const [drinksRecipes, setDrinksRecipes] = useState([]);

  useEffect(() => {
    const drinkRecipesFetch = async () => {
      const response = await getRecipes(DRINKS_RECIPES_END_POINT);
      setDrinksRecipes(response);
    };
    drinkRecipesFetch();
  });

  return (
    <main>
      {drinksRecipes.slice(0, MAX_FOOD_CARDS).map(({
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
