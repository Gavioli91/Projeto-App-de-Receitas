import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesDetailsContext from './RecipesDetailsContext';

function RecipesDetailsProvider({ children }) {
  const [dataRecipesDetails, setDataRecipesDetails] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [startRecipeButtonVisible, setStartRecipeButtonVisible] = useState(true);

  const getDoneRecipes = (id) => {
    const doneRecipesData = localStorage.getItem('doneRecipes');

    console.log(typeof JSON.parse(doneRecipesData));
    const isRecipeDone = (JSON.parse(doneRecipesData)).some((recipe) => recipe.id === id);

    if (isRecipeDone === true) setStartRecipeButtonVisible(false);
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
