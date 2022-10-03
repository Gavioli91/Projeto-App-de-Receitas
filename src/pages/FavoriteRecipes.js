import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import RecipesFilterByType from '../components/RecipesFilterByType';
import { FAVORITE_RECIPES_KEY } from '../utils/globalVariables';
import { getObjectInStore } from '../utils/localStorage';

function FavoriteRecipes() {
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [recipesFiltered, setRecipesFiltered] = useState([]);

  useEffect(() => {
    const getDoneRecipesFromStore = async () => {
      const response = getObjectInStore(FAVORITE_RECIPES_KEY);
      setFavoritedRecipes(response);
      setRecipesFiltered(response);
    };

    getDoneRecipesFromStore();
  }, []);

  const unfavoriteRecipe = (recipe) => {
    const newfavoriteRecipes = favoritedRecipes
      .filter((favoriteRecipe) => favoriteRecipe.id !== recipe.id);
    setFavoritedRecipes(newfavoriteRecipes);
    setRecipesFiltered(newfavoriteRecipes);
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(newfavoriteRecipes));
  };

  const filterRecipesByType = (filter) => {
    if (filter === 'all') return setRecipesFiltered(favoritedRecipes);
    const recipesTypes = favoritedRecipes.filter((recipe) => recipe.type === filter);
    setRecipesFiltered(recipesTypes);
  };

  return (
    <main>
      <Header />
      <RecipesFilterByType filterRecipes={ filterRecipesByType } />
      {recipesFiltered && recipesFiltered.map((recipe, index) => (
        <DoneRecipesCard
          key={ index }
          showItem
          index={ index }
          recipe={ recipe }
          unfavoriteRecipe={ unfavoriteRecipe }
        />
      )) }
    </main>
  );
}

export default FavoriteRecipes;
