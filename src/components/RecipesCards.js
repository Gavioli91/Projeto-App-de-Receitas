import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesDetailsContext from '../context/RecipesDetailsContext';

function RecipesCards({ thumb, name, index, route, itemId }) {
  const { setId, setRoute } = useContext(RecipesDetailsContext);
  const history = useHistory();

  const redirectToCardDetails = (routeParam, id) => {
    setId(id);
    setRoute(routeParam);
    history.push(`/${routeParam}/${id}`);
  };

  return (
    <button type="button" onClick={ () => redirectToCardDetails(route, itemId) }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          width="100px"
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ name }
        />
        <h3 data-testid={ `${index}-card-name` }>
          { name }
        </h3>
      </div>
    </button>
  );
}

RecipesCards.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default RecipesCards;
