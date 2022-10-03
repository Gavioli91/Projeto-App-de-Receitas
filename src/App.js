import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
// import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import SearchBarProvider from './context/SearchBarProvider';
import Recipes from './pages/Recipes';
import RecipeDetails from './components/RecipeDetails';
import RecipesDetailsProvider from './context/RecipesDetailsProvider';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <SearchBarProvider>
      <RecipesDetailsProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/profile" component={ Profile }>
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        </Switch>
      </RecipesDetailsProvider>
    </SearchBarProvider>
  );
}

export default App;
