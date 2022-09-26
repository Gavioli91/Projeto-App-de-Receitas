import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <>
      {pathname === '/meals' && <Header />}
      {pathname === '/drinks' && <Header />}
      {pathname === '/profile' && <Header />}
      {pathname === '/done-recipes' && <Header />}
      {pathname === '/favorite-recipes' && <Header />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
      </Switch>
    </>
  );
}

export default App;
