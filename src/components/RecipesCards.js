import React from 'react';
import PropTypes from 'prop-types';

function RecipesCards({ thumb, name, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img width="100px" data-testid={ `${index}-card-img` } src={ thumb } alt={ name } />
      <h3 data-testid={ `${index}-card-name` }>
        { name }
      </h3>
    </div>
  );
}

RecipesCards.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipesCards;
