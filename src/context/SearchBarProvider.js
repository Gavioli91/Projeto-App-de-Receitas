import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBarContext from './SearchBarContext';
import { searchMealsByFirstLetter,
  searchMealsByIngridients,
  searchMealsByName } from '../utils/fetchMeals';
import { searchDrinksByFirstLetter,
  searchDrinksByIngridients,
  searchDrinksByName } from '../utils/fetchDrinks';
import { ERROR_MESSAGE } from '../utils/globalVariables';

function SearchBarProvider({ children }) {
  const history = useHistory();
  const { location: { pathname } } = history;

  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleChange = ({ target: { id } }) => {
    setFilterCategory(id);
  };

  const handleChangeSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const verifyLength = (arr, link) => {
    if (link === 'drinks' && arr) {
      if (arr.length === 1) {
        history.push(`/${link}/${arr[0].idDrink}`);
      }
    } else if (link === 'meals' && arr) {
      if (arr.length === 1) {
        history.push(`/${link}/${arr[0].idMeal}`);
      }
    } else {
      return false;
    }
  };

  const verifyIfExistsError = ((response, route) => {
    if (response === null) {
      global.alert(ERROR_MESSAGE);
      setRecipes([]);
    } else {
      setRecipes(response);
      verifyLength(response, route);
    }
  });

  const requestsMealsOrDrinks = async (filter) => {
    if (pathname === '/drinks') {
      if (filter === 'ingredientRadioButton') {
        const response = await searchDrinksByIngridients(searchValue);
        verifyIfExistsError(response, 'drinks');
      }

      if (filter === 'nameRadioButton') {
        const response = await searchDrinksByName(searchValue);
        verifyIfExistsError(response, 'drinks');
      }

      if (filter === 'firstLetterRadioButton') {
        const response = await searchDrinksByFirstLetter(searchValue);
        setRecipes(response);
        verifyLength(response, 'drinks');
      }
    }

    if (pathname === '/meals') {
      if (filter === 'ingredientRadioButton') {
        const response = await searchMealsByIngridients(searchValue);
        verifyIfExistsError(response, 'meals');
      }

      if (filter === 'nameRadioButton') {
        const response = await searchMealsByName(searchValue);
        verifyIfExistsError(response, 'meals');
      }

      if (filter === 'firstLetterRadioButton') {
        const response = await searchMealsByFirstLetter(searchValue);
        verifyIfExistsError(response, 'meals');
      }
    }
  };

  const handleSearchButton = async (filter) => {
    await requestsMealsOrDrinks(filter);
  };

  const contextValue = {
    recipes,
    setRecipes,
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
