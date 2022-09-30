import React, { useState, useEffect } from 'react';
import { getObjectInStore } from '../utils/localStorage';
import { DONE_RECIPES_KEY } from '../utils/globalVariables';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  useEffect(() => {
    const getDoneRecipesFromStore = async () => {
      const response = getObjectInStore(DONE_RECIPES_KEY);
      setDoneRecipes(response);
      setRecipesFiltered(response);
    };

    getDoneRecipesFromStore();
  }, []);

  const filterRecipesByType = (filter) => {
    if (filter === 'all') return setRecipesFiltered(doneRecipes);
    const recipesTypes = doneRecipes.filter((recipe) => recipe.type === filter);
    setRecipesFiltered(recipesTypes);
  };

  const filterRecipes = (type) => {
    switch (type) {
    case 'Drinks':
      return filterRecipesByType('drink');
    case 'Meals':
      return filterRecipesByType('meal');
    default:
      return filterRecipesByType('all');
    }
  };

  return (
    <main>
      <Header />
      <button
        onClick={ () => filterRecipes('All') }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ () => filterRecipes('Meals') }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ () => filterRecipes('Drinks') }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      {recipesFiltered && recipesFiltered.map((recipe, index) => (
        <DoneRecipesCard key={ index } index={ index } recipe={ recipe } />
      )) }
    </main>
  );
}

export default DoneRecipes;
