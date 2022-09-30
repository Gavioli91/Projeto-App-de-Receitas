import React, { useContext } from 'react';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function ShareAndFavoriteButton() {
  const { handleShareButtonClick, isLinkCopied } = useContext(RecipesDetailsContext);

  return (
    <div>
      <input
        type="image"
        src={ whiteHeartIcon }
        alt="whiteHeartIcon icon"
        data-testid="favorite-btn"
      />

      {' '}

      <input
        type="image"
        src={ shareIcon }
        alt="Share icon"
        data-testid="share-btn"
        onClick={ handleShareButtonClick }
      />
      {isLinkCopied && <p>Link copied!</p>}
    </div>
  );
}

export default ShareAndFavoriteButton;
