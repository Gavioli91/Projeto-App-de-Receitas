import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getDrinksDetails, getMealsDetails } from '../utils/fetchRecipesDetails';
import { setRecipeProgressInStore, getObjectInStore } from '../utils/localStorage';

function RecipeInProgress() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const [path, setPath] = useState('');

  const { id } = useParams();
  const { url } = useRouteMatch();

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
    const ingredientsInStorage = getObjectInStore();
    if (url.includes('/meals')) setIngredientsChecked(ingredientsInStorage.meals[id]);
    if (url.includes('/drinks')) setIngredientsChecked(ingredientsInStorage.drinks[id]);
  };

  useEffect(() => {
    updateIngredientsChecked();
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
                ingredientsChecked?.includes(recipe[ingredient])
                  ? { textDecoration: 'line-through' }
                  : { textDecoration: 'none' }
              }
            >
              <input
                type="checkbox"
                id={ recipe[ingredient] }
                name={ recipe[ingredient] }
                value={ recipe[ingredient] }
                checked={ ingredientsChecked?.includes(recipe[ingredient]) }
                onChange={ ({ target }) => checkIngredient(target, recipe[ingredient]) }
              />
              { recipe[ingredient] }
            </label>
          </li>
        ));

        const {
          strMealThumb, strMeal, strCategory,
          idDrink, strDrinkThumb, strInstructions, strDrink,
        } = recipe;

        return (
          <div key={ strMeal || idDrink }>
            <img
              width="350px"
              data-testid="recipe-photo"
              src={ strMealThumb || strDrinkThumb }
              alt={ strMeal || strDrink }
            />
            <h2 data-testid="recipe-title">{ strMeal || strDrink }</h2>
            <button type="button" data-testid="favorite-btn">favorite</button>
            <button type="button" data-testid="share-btn">share</button>
            <h3 data-testid="recipe-category">{ strCategory }</h3>
            <ul data-testid="instructions">
              { listToDo }
            </ul>
            <h3>Intruções</h3>
            <p>{ strInstructions }</p>
            <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
          </div>
        );
      })}
    </main>
  );
}

export default RecipeInProgress;
