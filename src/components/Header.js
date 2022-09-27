import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [searchInput, setSearchInput] = useState(false);
  const [title, setTitle] = useState('');
  const [iconSearch, setIconSearch] = useState(true);

  const checkTitle = () => {
    switch (pathname) {
    case '/meals': return setTitle('Meals');
    case '/drinks': return setTitle('Drinks');
    case '/profile': {
      setTitle('Profile');
      setIconSearch(false);
      return;
    }
    case '/done-recipes': {
      setTitle('Done Recipes');
      setIconSearch(false);
      return;
    }
    case '/favorite-recipes': {
      setTitle('Favorite Recipes');
      setIconSearch(false);
      return;
    }
    default: history.push('/notFound');
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

      {searchInput && <SearchBar />}
    </div>
  );
}

export default Header;
