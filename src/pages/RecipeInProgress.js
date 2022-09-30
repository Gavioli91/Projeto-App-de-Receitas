import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { getDrinksDetails, getMealsDetails } from '../utils/fetchRecipesDetails';
import {
  DONE_RECIPES_KEY,
  FAVORITE_RECIPES_KEY,
  IN_PROGRESS_RECIPES_KEY,
} from '../utils/globalVariables';

import {
  setRecipeProgressInStore,
  getObjectInStore,
  setRecipesInStore,
} from '../utils/localStorage';
import shareButtonIcon from '../images/shareIcon.svg';
import favoriteButtonIconActive from '../images/blackHeartIcon.svg';
import favoriteButtonIconDisabled from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const [path, setPath] = useState('');
  const [visibleItem, setVisibleItem] = useState({
    share: false,
    favorite: false,
    enableFinishBtn: false,
  });
  const { id } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const requestRecipesDetails = async () => {
      if (url.includes('/meals')) {
        const response = await getMealsDetails(id);
        setPath('meals');
        setRecipeDetails(response.meals);
      }

      if (url.includes('/drinks')) {
        const response = await getDrinksDetails(id);
        setPath('drinks');
        setRecipeDetails(response.drinks);
      }
    };

    requestRecipesDetails();
  }, []);

  const updateIngredientsChecked = () => {
    const ingredientsInStorage = getObjectInStore(IN_PROGRESS_RECIPES_KEY);

    if (url.includes('/meals')) setIngredientsChecked(ingredientsInStorage.meals[id]);
    if (url.includes('/drinks')) setIngredientsChecked(ingredientsInStorage.drinks[id]);
  };

  const updateFavoritedRecipes = () => {
    const favoritesRecipesInStorage = getObjectInStore(FAVORITE_RECIPES_KEY);

    const checkFavorited = favoritesRecipesInStorage.some((recipe) => recipe.id === id);
    setVisibleItem((prevState) => ({ ...prevState, favorite: checkFavorited }));
  };

  useEffect(() => {
    updateIngredientsChecked();
    updateFavoritedRecipes();
  }, []);

  const checkIngredient = (target, ingredient) => {
    if (target.id === ingredient && target.checked) {
      target.parentNode.style.textDecoration = 'line-through';
      setRecipeProgressInStore({ id, ingredient }, path, 'add');
      updateIngredientsChecked();
      return;
    }
    setRecipeProgressInStore({ id, ingredient }, path, 'remove');
    target.parentNode.style.textDecoration = 'none';
    updateIngredientsChecked();
  };

  const favoriteRecipe = (recipe) => {
    const favoriteRecipeObject = {
      id: recipe.idMeal || recipe.idDrink,
      type: path === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: path === 'meals' ? '' : 'Alcoholic',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    setRecipesInStore(favoriteRecipeObject, FAVORITE_RECIPES_KEY);
    setVisibleItem((prevState) => ({ ...prevState, favorite: !prevState.favorite }));
  };

  const shareRecipe = (recipeId) => {
    navigator
      .clipboard
      .writeText(`http://localhost:3000/${path}/${recipeId}`);
    setVisibleItem((prevState) => ({ ...prevState, share: true }));
  };

  const getDate = () => {
    const data = new Date();

    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const day = data.getDate().toString().padStart(2, '0');
    const year = data.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTagsFromRecipe = (tags) => {
    if (tags) return tags.split(',');
    return [];
  };

  const redirectToDoneRecipes = (recipe) => {
    const doneRecipeObject = {
      id: recipe.idMeal || recipe.idDrink,
      type: path === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: path === 'meals' ? '' : 'Alcoholic',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: getDate(),
      tags: getTagsFromRecipe(recipe.strTags),
    };
    setRecipesInStore(doneRecipeObject, DONE_RECIPES_KEY);
    history.push('/done-recipes');
  };

  const ingredientsCheckedList = () => {
    const ingredientsInStorage = getObjectInStore(IN_PROGRESS_RECIPES_KEY);

    const objKey = url.includes('/meals') ? 'meals' : 'drinks';
    const listOfIngredientsChecked = ingredientsInStorage[objKey][id];

    return listOfIngredientsChecked;
  };

  return (
    <main>
      { recipeDetails.map((recipe) => {
        const ingredients = Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key]);

        const listToDo = ingredients.map((ingredient, index) => (
          <li key={ ingredient }>
            <label
              htmlFor={ recipe[ingredient] }
              id={ ingredient }
              data-testid={ `${index}-ingredient-step` }
              style={
                ingredientsChecked?.includes(`${recipe[ingredient]}-${index}`)
                  ? { textDecoration: 'line-through' }
                  : { textDecoration: 'none' }
              }
            >
              <input
                type="checkbox"
                id={ `${recipe[ingredient]}-${index}` }
                name={ recipe[ingredient] }
                value={ recipe[ingredient] }
                checked={ ingredientsChecked?.includes(`${recipe[ingredient]}-${index}`) }
                onChange={ ({
                  target,
                }) => checkIngredient(target, `${recipe[ingredient]}-${index}`) }
              />
              { recipe[ingredient] }
            </label>
          </li>
        ));
        const {
          strMealThumb, strMeal, strCategory, idMeal,
          idDrink, strDrinkThumb, strInstructions, strDrink,
        } = recipe;

        return (
          <div key={ idMeal || idDrink }>
            <img
              width="350px"
              data-testid="recipe-photo"
              name="recipe-photo"
              src={ strMealThumb || strDrinkThumb }
              alt={ strMeal || strDrink }
            />
            <h2 data-testid="recipe-title">{ strMeal || strDrink }</h2>
            <button
              onClick={ () => favoriteRecipe(recipe) }
              type="button"
              name="favorite-btn"
              src={
                visibleItem.favorite
                  ? favoriteButtonIconActive
                  : favoriteButtonIconDisabled
              }
              data-testid="favorite-btn"
            >
              {
                visibleItem.favorite
                  ? <img src={ favoriteButtonIconActive } alt="favorite recipe" />
                  : <img src={ favoriteButtonIconDisabled } alt="favorite recipe" />
              }
            </button>
            <button
              type="button"
              data-testid="share-btn"
              name="share-btn"
              src={ shareButtonIcon }
              onClick={ () => shareRecipe(idDrink || idMeal) }
            >
              {
                visibleItem.share
                  ? 'Link copied!'
                  : (<img src={ shareButtonIcon } alt="share" />)
              }
            </button>
            <h3 data-testid="recipe-category">{ strCategory }</h3>
            <ul data-testid="instructions">
              { listToDo }
            </ul>
            <h3>Intruções</h3>
            <p>{ strInstructions }</p>
            <button
              disabled={ ingredientsCheckedList()?.length !== ingredients.length }
              data-testid="finish-recipe-btn"
              type="button"
              onClick={ () => redirectToDoneRecipes(recipe) }
            >
              Finalizar
            </button>
          </div>
        );
      })}
    </main>
  );
}

export default RecipeInProgress;
