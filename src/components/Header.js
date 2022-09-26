import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;

  let title = '';
  let iconSearch = true;

  if (pathname === '/meals') title = 'Meals';
  if (pathname === '/drinks') title = 'Drinks';
  if (pathname === '/profile') {
    title = 'Profile';
    iconSearch = false;
  }
  if (pathname === '/done-recipes') {
    title = 'Done Recipes';
    iconSearch = false;
  }
  if (pathname === '/favorite-recipes') {
    title = 'Favorite Recipes';
    iconSearch = false;
  }

  return (
    <div>
      <h1 data-testid="page-title">
        {title}
      </h1>

      <img
        src={ profileIcon }
        alt="Profile icon"
        data-testid="profile-top-btn"
      />

      {iconSearch && (
        <img
          src={ searchIcon }
          alt="Search icon"
          data-testid="search-top-btn"
        />
      )}
    </div>
  );
}

export default Header;
