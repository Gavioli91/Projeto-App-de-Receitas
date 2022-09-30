import React, { useContext } from 'react';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import '../styles/RecipesDetailsButton.css';

function RecipesDetailsButton() {
  const { startRecipeButtonVisible, continueRecipe } = useContext(RecipesDetailsContext);

  return (
    <div>
      { startRecipeButtonVisible && (
        <div className="button-container">
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="button-start-recipes"
          >
            { continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>)}
    </div>
  );
}

export default RecipesDetailsButton;
