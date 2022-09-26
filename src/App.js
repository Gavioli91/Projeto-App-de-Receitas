import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/meals" component={ Meals }>
        <Header />
      </Route>

      <Route exact path="/profile" component={ Profile }>
        <Header />
      </Route>

      <Route exact path="/drinks" component={ Drinks }>
        <Header />
      </Route>

      <Route exact path="/done-recipes" component={ DoneRecipes }>
        <Header />
      </Route>

      <Route exact path="/favorite-recipes" component={ FavoriteRecipes }>
        <Header />
      </Route>
    </Switch>
  );
}

export default App;
