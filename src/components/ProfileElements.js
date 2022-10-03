import React from 'react';
import { useHistory } from 'react-router-dom';
import { DONE_RECIPES_KEY,
  DRINKS_TOKEN_KEY,
  FAVORITE_RECIPES_KEY,
  IN_PROGRESS_RECIPES_KEY,
  MEALS_TOKEN_KEY,
  USER_KEY,
} from '../utils/globalVariables';

function ProfileElements() {
  const history = useHistory();

  const handleClickLogout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(MEALS_TOKEN_KEY);
    localStorage.removeItem(DRINKS_TOKEN_KEY);
    localStorage.removeItem(IN_PROGRESS_RECIPES_KEY);
    localStorage.removeItem(FAVORITE_RECIPES_KEY);
    localStorage.removeItem(DONE_RECIPES_KEY);
    history.push('/');
  };

  return (
    <div>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileElements;
