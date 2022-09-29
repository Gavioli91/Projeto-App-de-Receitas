import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
// import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';
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
          <Route exact path="/meals" component={ Recipes }>
            <Header />
            <Recipes />
            <Footer />
          </Route>

          <Route exact path="/profile" component={ Profile }>
            <Header />
            <Footer />
          </Route>

          <Route exact path="/drinks" component={ Drinks }>
            <Header />
            <Drinks />
            <Footer />
          </Route>

          <Route exact path="/done-recipes" component={ DoneRecipes }>
            <Header />
          </Route>

          <Route exact path="/favorite-recipes" component={ FavoriteRecipes }>
            <Header />
          </Route>

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
