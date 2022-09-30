import React, { useContext, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import { getDrinksDetails, getMealsDetails } from '../utils/fetchRecipesDetails';
import { DRINKS_RECIPES_END_POINT,
  MEALS_RECIPES_END_POINT,
} from '../utils/globalVariables';
import { getRecipes } from '../utils/recipesFetch';
import RecipesDetailsButton from './RecipesDetailsButton';
import RecipesDetailsCard from './RecipesDetailsCard';
import RecipesRecomendations from './RecipesRecomendations';

function RecipeDetails() {
  const { id } = useParams();
  const { url } = useRouteMatch();

  const { setDataRecipesDetails,
    setMeals,
    setDrinks,
    getDoneRecipes,
  } = useContext(RecipesDetailsContext);

  useEffect(() => {
    const requestRecipesDetails = async () => {
      if (url.includes('/meals')) {
        setMeals([]);
        const response = await getMealsDetails(id);
        setDataRecipesDetails(response.meals);

        const responseDrinks = await getRecipes(DRINKS_RECIPES_END_POINT);
        setDrinks(responseDrinks);
      }

      if (url.includes('/drinks')) {
        setDrinks([]);
        const response = await getDrinksDetails(id);
        setDataRecipesDetails(response.drinks);
        const responseMeals = await getRecipes(MEALS_RECIPES_END_POINT);
        setMeals(responseMeals);
      }
    };

    const doneRecipesData = localStorage.getItem('doneRecipes');

    if (JSON.parse(doneRecipesData) !== null) getDoneRecipes(id);
    requestRecipesDetails();
  }, []);

  return (
    <>
      <RecipesDetailsCard />
      <RecipesRecomendations />
      <RecipesDetailsButton />
    </>
  );
}

export default RecipeDetails;
