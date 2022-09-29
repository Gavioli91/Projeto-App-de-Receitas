import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getDrinksDetails, getMealsDetails } from '../utils/fetchRecipesDetails';

function RecipeInProgress() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const { id } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    const requestRecipesDetails = async () => {
      if (url.includes('/meals')) {
        const response = await getMealsDetails(id);
        setRecipeDetails(response.meals);
      }

      if (url.includes('/drinks')) {
        const response = await getDrinksDetails(id);
        setRecipeDetails(response.drinks);
      }
    };

    requestRecipesDetails();
  }, []);

  const checkIngredient = (target, ingredient) => {
    if (target.id === ingredient && target.checked) {
      target.parentNode.style.textDecoration = 'line-through';
      return;
    }
    target.parentNode.style.textDecoration = 'none';
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
            >
              <input
                type="checkbox"
                id={ recipe[ingredient] }
                name={ recipe[ingredient] }
                value={ recipe[ingredient] }
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
