import React, { useContext, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import { getDrinksDetails, getMealsDetails } from '../utils/fetchRecipesDetails';
import RecipesDetailsCard from './RecipesDetailsCard';

function RecipeDetails() {
  const { id } = useParams();
  const { url } = useRouteMatch();

  const { setDataRecipesDetails } = useContext(RecipesDetailsContext);

  useEffect(() => {
    const requestRecipesDetails = async () => {
      if (url.includes('/meals')) {
        const response = await getMealsDetails(id);
        setDataRecipesDetails(response.meals);
      }

      if (url.includes('/drinks')) {
        const response = await getDrinksDetails(id);
        setDataRecipesDetails(response.drinks);
      }
    };

    requestRecipesDetails();
  }, []);

  return (<RecipesDetailsCard />);
}

export default RecipeDetails;
