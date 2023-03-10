import React, { useContext } from 'react';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import '../styles/RecipesDetailsButton.css';

function RecipesDetailsButton() {
  const { startRecipeButtonVisible, continueRecipe,
    handleStartButtonClick } = useContext(RecipesDetailsContext);

  return (
    <div>
      { startRecipeButtonVisible && (
        <div className="button-container">
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="button-start-recipes"
            onClick={ handleStartButtonClick }
          >
            { continueRecipe ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>)}
    </div>
  );
}

export default RecipesDetailsButton;
