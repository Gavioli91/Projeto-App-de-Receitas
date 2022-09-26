import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id-da-receita" />
      <Route exact path="/drinks/:id-da-receita" />
      <Route exact path="/meals/:id-da-receita:/in-progress" />
      <Route exact path="/drinks/:id-da-receita/in-progress" />
      <Route exact path="/profile" component={ Meals } />
      <Route exact path="/done-recipes" />
      <Route exact path="/favorite-recipes" />
    </Switch>
  );
}

export default App;
