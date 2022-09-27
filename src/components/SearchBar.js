import React, { useContext } from 'react';
import SearchBarContext from '../context/SearchBarContext';

function SearchBar() {
  const { searchValue, handleChangeSearch,
    handleChange, filterCategory, handleSearchButton } = useContext(SearchBarContext);

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        value={ searchValue }
        onChange={ handleChangeSearch }
      />

      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredientRadioButton"
          name="filtersCategory"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="nameRadioButton"
          name="filtersCategory"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="firstLetterRadioButton"
          name="filtersCategory"
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearchButton(filterCategory) }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
