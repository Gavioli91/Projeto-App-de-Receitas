import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [searchInput, setSearchInput] = useState(false);
  const [title, setTitle] = useState('');
  const [iconSearch, setIconSearch] = useState(true);

  const checkTitle = () => {
    if (pathname === '/meals') setTitle('Meals');
    if (pathname === '/drinks') setTitle('Drinks');
    if (pathname === '/profile') {
      setTitle('Profile');
      setIconSearch(false);
    }
    if (pathname === '/done-recipes') {
      setTitle('Done Recipes');
      setIconSearch(false);
    }
    if (pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
      setIconSearch(false);
    }
  };

  useEffect(() => {
    checkTitle();
  });

  return (
    <div>
      <h1 data-testid="page-title">
        {title}
      </h1>

      <input
        type="image"
        src={ profileIcon }
        alt="Profile icon"
        data-testid="profile-top-btn"
        onClick={ () => {
          history.push('/profile');
        } }
      />

      {iconSearch && (
        <input
          type="image"
          src={ searchIcon }
          alt="Search icon"
          data-testid="search-top-btn"
          onClick={ () => setSearchInput((prevState) => !prevState) }
        />
      )}

      {searchInput && (
        <input
          type="text"
          data-testid="search-input"
        />
      )}
    </div>
  );
}

export default Header;
