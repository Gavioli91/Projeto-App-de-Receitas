import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesDetailsContext from './RecipesDetailsContext';

function RecipesDetailsProvider({ children }) {
  const [dataRecipesDetails, setDataRecipesDetails] = useState([]);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const contextValue = {
    dataRecipesDetails,
    setDataRecipesDetails,
    meals,
    setMeals,
    drinks,
    setDrinks,
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
