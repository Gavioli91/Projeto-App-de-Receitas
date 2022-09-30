import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesDetailsContext from './RecipesDetailsContext';
import { DONE_RECIPES_KEY, IN_PROGRESS_RECIPES_KEY } from '../utils/globalVariables';

function RecipesDetailsProvider({ children }) {
  const history = useHistory();

  const [dataRecipesDetails, setDataRecipesDetails] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [startRecipeButtonVisible, setStartRecipeButtonVisible] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);
  const [recipeInProgressId, setRecipeInProgressId] = useState();
  const [recipeInProgressRoute, setRecipeInProgressRoute] = useState();

  const getDoneRecipes = (id) => {
    const doneRecipesData = localStorage.getItem(DONE_RECIPES_KEY);

    const isRecipeDone = (JSON.parse(doneRecipesData)).some((recipe) => recipe.id === id);

    if (isRecipeDone === true) setStartRecipeButtonVisible(false);
  };

  const getOngoingRecipes = (id, url) => {
    const ongoingRecipes = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES_KEY));

    if (url.includes('/drinks')) {
      console.log(Object.entries(ongoingRecipes.drinks));
      const isDrinksUnfinished = Object.entries(ongoingRecipes.drinks).some((recipe) => (
        recipe[0] === id));
      setContinueRecipe(isDrinksUnfinished);
    }

    if (url.includes('/meals')) {
      const isMealUnfinished = Object.entries(ongoingRecipes.meals).some((recipe) => (
        recipe[0] === id));
      setContinueRecipe(isMealUnfinished);
    }
  };

  const getRecipeRouteAndId = (recipeId, recipeUrl) => {
    setRecipeInProgressId(recipeId);
    setRecipeInProgressRoute(recipeUrl);
  };

  const handleStartbuttonClick = () => {
    if (recipeInProgressRoute.includes('/meals')) {
      history.push(`/meals/${recipeInProgressId}/in-progress`);
    } else if (recipeInProgressRoute.includes('/drinks')) {
      history.push(`/drinks/${recipeInProgressId}/in-progress`);
    }
  };

  const contextValue = {
    startRecipeButtonVisible,
    dataRecipesDetails,
    setDataRecipesDetails,
    meals,
    setMeals,
    drinks,
    setDrinks,
    getDoneRecipes,
    getOngoingRecipes,
    continueRecipe,
    handleStartbuttonClick,
    getRecipeRouteAndId,
  };

  return (
    <RecipesDetailsContext.Provider value={ contextValue }>
      {children}
    </RecipesDetailsContext.Provider>
  );
}

RecipesDetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesDetailsProvider;
