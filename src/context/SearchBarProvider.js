import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from './SearchBarContext';
import { searchMealsByFirstLetter,
  searchMealsByIngridients,
  searchMealsByName } from '../utils/fetchMeals';

function SearchBarProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleChange = ({ target: { id } }) => {
    setFilterCategory(id);
  };

  const handleChangeSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleSearchButton = async (filter) => {
    if (filter === 'ingredientRadioButton') {
      const response = await searchMealsByIngridients(searchValue);
      setRecipes(response);
      console.log(recipes);
    }

    if (filter === 'nameRadioButton') {
      const response = await searchMealsByName(searchValue);
      setRecipes(response);
      console.log(recipes);
    }

    if (filter === 'firstLetterRadioButton') {
      const response = await searchMealsByFirstLetter(searchValue);
      setRecipes(response);
      console.log(recipes);
    }
  };

  const contextValue = {
    searchValue,
    filterCategory,
    handleChangeSearch,
    handleChange,
    handleSearchButton,
  };

  return (
    <SearchBarContext.Provider value={ contextValue }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
