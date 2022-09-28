import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const [mockMeal, setMockMeal] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchMock = async () => {
      const request = await fetch(url);
      const response = await request.json();
      setMockMeal(response.meals);
    };

    fetchMock();
  }, []);

  const algoAcontece = ({ target }) => {
    if (target.checked) {
      const resposta = document.getElementById(`${target.id}`);
      resposta.style.textDecoration = 'line-through';
    } else {
      const resposta = document.getElementById(`${target.id}`);
      resposta.style.textDecoration = 'none';
    }
  };

  return (
    mockMeal && (
      <div>
        <img
          width="100px"
          data-testid="recipe-photo"
          src={ mockMeal[0]?.strMealThumb }
          alt={ mockMeal[0]?.strMeal }
        />
        <h2 data-testid="recipe-title">{ mockMeal[0]?.strMeal }</h2>
        <button type="button" data-testid="favorite-btn">favorite</button>
        <button type="button" data-testid="share-btn">share</button>
        <h3 data-testid="recipe-category">{ mockMeal[0]?.strCategory }</h3>

        <ul data-testid="instructions">
          {
            mockMeal.map((obj) => Object.keys(obj).map((key, index) => {
              if (key.startsWith('strIngredient') && mockMeal[0][key] !== '') {
                return (
                  <li>
                    <label
                      htmlFor={ mockMeal[0][key] }
                      id={ mockMeal[0][key] }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        key={ key }
                        type="checkbox"
                        id={ mockMeal[0][key] }
                        name={ key }
                        value={ mockMeal[0][key] }
                        onChange={ algoAcontece }
                      />
                      { mockMeal[0][key] }
                    </label>
                  </li>
                );
              }
            }))
          }
        </ul>
        <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
      </div>
    )
  );
}

export default RecipeInProgress;
