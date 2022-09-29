import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipesDetailsContext from '../context/RecipesDetailsContext';
import { MAX_CARDS_LENGTH } from '../utils/globalVariables';

function RecomendationsCard() {
  const { meals, drinks } = useContext(RecipesDetailsContext);
  const { url } = useRouteMatch();

  return (
    <div className="container">
      {url.includes('/drinks') && meals && meals.slice(0, MAX_CARDS_LENGTH)
        .map(({ strMeal, strMealThumb }, index) => (
          <div
            key={ index }
            className="recomendation-card"
          >
            <div>
              <img
                data-testid={ `${index}-recommendation-card` }
                src={ strMealThumb }
                alt="recipe card"
                width="200px"
                className="rec-img"
              />
              <h3
                data-testid={ `${index}-recommendation-title` }
                className="rec-card-title"
              >
                {strMeal}
              </h3>
            </div>
          </div>
        ))}

      {url.includes('/meals') && drinks && drinks.slice(0, MAX_CARDS_LENGTH)
        .map(({ strDrink, strDrinkThumb }, index) => (
          <div
            key={ index }
            className="recomendation-card"
          >
            <img
              data-testid={ `${index}-recommendation-card` }
              src={ strDrinkThumb }
              alt="recipe card"
              width="200px"
              className="rec-img"
            />
            <h3
              data-testid={ `${index}-recommendation-title` }
              className="rec-card-title"
            >
              {strDrink}
            </h3>
          </div>
        ))}
    </div>
  );
}

export default RecomendationsCard;
