import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SearchBarProvider from './context/SearchBarProvider';

ReactDOM.render(
  <BrowserRouter>
    <SearchBarProvider>
      <App />
    </SearchBarProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
