import React, { useContext } from 'react';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import '../styles/RecipesDetailsButton.css';

function RecipesDetailsButton() {
  const { startRecipeButtonVisible } = useContext(RecipesDetailsContext);

  return (
    <div>
      { startRecipeButtonVisible && (
        <div className="button-container">
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="button-start-recipes"
          >
            Start Recipe
          </button>
        </div>)}
    </div>
  );
}

export default RecipesDetailsButton;
