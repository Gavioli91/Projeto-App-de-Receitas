import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBarContext from './SearchBarContext';
import { searchMealsByFirstLetter,
  searchMealsByIngridients,
  searchMealsByName } from '../utils/fetchMeals';
import { searchDrinksByFirstLetter,
  searchDrinksByIngridients,
  searchDrinksByName } from '../utils/fetchDrinks';

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
    if (link === 'drinks') {
      if (arr.length === 1) {
        history.push(`/${link}/${arr[0].idDrink}`);
      }
    } else if (arr.length === 1) {
      history.push(`/${link}/${arr[0].idMeal}`);
    }
  };

  useEffect(() => console.log(recipes), [recipes]);

  const requestsMealsOrDrinks = async (filter) => {
    if (pathname === '/drinks') {
      if (filter === 'ingredientRadioButton') {
        const response = await searchDrinksByIngridients(searchValue);
        setRecipes(response);
        verifyLength(response.drinks, 'drinks');
      }

      if (filter === 'nameRadioButton') {
        const response = await searchDrinksByName(searchValue);
        setRecipes(response);
        verifyLength(response.drinks, 'drinks');
      }

      if (filter === 'firstLetterRadioButton') {
        const response = await searchDrinksByFirstLetter(searchValue);
        setRecipes(response);
      }
    }

    if (pathname === '/meals') {
      if (filter === 'ingredientRadioButton') {
        const response = await searchMealsByIngridients(searchValue);
        setRecipes(response);
        verifyLength(response.meals, 'meals');
      }

      if (filter === 'nameRadioButton') {
        const response = await searchMealsByName(searchValue);
        setRecipes(response);
        verifyLength(response.meals, 'meals');
      }

      if (filter === 'firstLetterRadioButton') {
        const response = await searchMealsByFirstLetter(searchValue);
        setRecipes(response);
      }
    }
  };

  const handleSearchButton = async (filter) => {
    await requestsMealsOrDrinks(filter);
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
