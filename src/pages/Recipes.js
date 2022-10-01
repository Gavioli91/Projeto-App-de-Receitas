import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Meals from './Meals';

function Recipes() {
  return (
    <main>
      <Header />
      <Meals />
      <Footer />
    </main>
  );
}

export default Recipes;
