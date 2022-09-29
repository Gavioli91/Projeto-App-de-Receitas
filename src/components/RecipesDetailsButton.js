import React from 'react';
import '../styles/RecipesDetailsButton.css';

function RecipesDetailsButton() {
  return (
    <div className="button-container">
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="button-start-recipes"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipesDetailsButton;
