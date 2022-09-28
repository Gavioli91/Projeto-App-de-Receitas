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
<<<<<<< HEAD
// import SearchBarProvider from './context/SearchBarProvider';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals }>
        <Header />
        <Meals />
        <Footer />
      </Route>
=======
import Recipes from './pages/Recipes';
import SearchBarProvider from './context/SearchBarProvider';

function App() {
  return (
    <SearchBarProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes }>
          <Header />
          <Recipes />
          <Footer />
        </Route>
>>>>>>> 6bcf9116bca7da7268ac1ab2fe8fe75ef7b62a12

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

      <Route exact path="/meals/:id-da-receita" />
      <Route exact path="/drinks/:id-da-receita" />
      <Route exact path="/meals/:id-da-receita:/in-progress" />
      <Route exact path="/drinks/:id-da-receita/in-progress" />
    </Switch>
  );
}

export default App;
