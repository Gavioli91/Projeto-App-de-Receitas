import React, { useContext, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import { getDrinksDetails, getMealsDetails } from '../utils/fetchRecipesDetails';

function RecipeDetails() {
  const { id } = useParams();
  const { url } = useRouteMatch();

  console.log(id);
  const { dataRecipesDetails,
    setDataRecipesDetails,
  } = useContext(RecipesDetailsContext);

  useEffect(() => {
    const requestRecipesDetails = async () => {
      if (url.includes('/meals')) {
        const response = await getMealsDetails(id);
        setDataRecipesDetails(response);
      }

      if (url.includes('/drinks')) {
        const response = await getDrinksDetails(id);
        setDataRecipesDetails(response);
      }
    };

    requestRecipesDetails();
  }, []);

  console.log(dataRecipesDetails);
  return (<p>{route}</p>);
}

export default RecipeDetails;
