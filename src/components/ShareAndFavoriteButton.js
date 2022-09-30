import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function ShareAndFavoriteButton() {
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
      />
    </div>
  );
}

export default ShareAndFavoriteButton;
