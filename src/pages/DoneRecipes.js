import React, { useState, useEffect } from 'react';
import { getObjectInStore } from '../utils/localStorage';
import { DONE_RECIPES_KEY } from '../utils/globalVariables';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';
import RecipesFilterByType from '../components/RecipesFilterByType';

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

  return (
    <main>
      <Header />
      <RecipesFilterByType filterRecipes={ filterRecipesByType } />
      {recipesFiltered && recipesFiltered.map((recipe, index) => (
        <DoneRecipesCard
          key={ index }
          showItem={ false }
          index={ index }
          recipe={ recipe }
        />
      )) }
    </main>
  );
}

export default DoneRecipes;
