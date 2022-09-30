import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareButtonIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ recipe, index }) {
  const [visibleItem, setVisibleItem] = useState({ share: false });

  const history = useHistory();

  const shareRecipe = (recipeId, recipeType) => {
    navigator
      .clipboard
      .writeText(`http://localhost:3000/${recipeType}s/${recipeId}`);
    setVisibleItem({ share: true });
  };

  const redirectToDetails = (recipeId, recipeType) => {
    history.push(`/${recipeType}s/${recipeId}`);
  };

  return (
    <section>
      <div>
        <button type="button" onClick={ () => redirectToDetails(recipe.id, recipe.type) }>
          <img
            src={ recipe.image }
            alt="Recipe"
            width="200px"
            data-testid={ `${index}-horizontal-image` }
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            {
              recipe.alcoholicOrNot
                ? `${recipe.alcoholicOrNot} ${recipe.nationality} - ${recipe.category}`
                : `${recipe.nationality} - ${recipe.category}`
            }
          </span>
          <span data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </span>
        </button>
        <span>
          Feita em
          <span data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </span>
        </span>
        <div>
          {
            recipe.tags && recipe.tags
              .map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `0-${tag}-horizontal-tag` }
                >
                  {`${tag} `}
                </span>
              ))
          }
        </div>
        <button
          type="button"
          src={ shareButtonIcon }
          name="share-btn"
          onClick={ () => shareRecipe(recipe.id, recipe.type) }
          data-testid={ `${index}-horizontal-share-btn` }
        >
          {
            visibleItem.share
              ? 'Link copied!'
              : (<img src={ shareButtonIcon } alt="share" />)
          }
        </button>
      </div>

    </section>
  );
}

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipesCard;
