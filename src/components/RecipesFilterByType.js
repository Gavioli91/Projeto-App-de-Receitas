import React from 'react';
import PropTypes from 'prop-types';

function RecipesFilterByType({ filterRecipes }) {
  const filterRecipesType = (type) => {
    switch (type) {
    case 'Drinks':
      return filterRecipes('drink');
    case 'Meals':
      return filterRecipes('meal');
    default:
      return filterRecipes('all');
    }
  };

  return (
    <div>
      <button
        onClick={ () => filterRecipesType('All') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterRecipesType('Meals') }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterRecipesType('Drinks') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
    </div>
  );
}

RecipesFilterByType.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
};

export default RecipesFilterByType;
