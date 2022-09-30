import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesDetailsContext from './RecipesDetailsContext';
import { DONE_RECIPES_KEY, IN_PROGRESS_RECIPES_KEY } from '../utils/globalVariables';

function RecipesDetailsProvider({ children }) {
  const [dataRecipesDetails, setDataRecipesDetails] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [startRecipeButtonVisible, setStartRecipeButtonVisible] = useState(true);
  const [continueRecipe, setContinueRecipe] = useState(false);

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
