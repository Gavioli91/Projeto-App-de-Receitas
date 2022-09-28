// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import mealsMock from '../../cypress/mocks/meals';
import mealsCategoryMock from '../../cypress/mocks/mealCategories';
// import { MEALS_CATEGORYS_END_POINT, MEALS_RECIPES_END_POINT } from '../utils/globalVariables';

describe('Tests Meals component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValue(mealsCategoryMock),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('expects meals to have 12 cards of foods', async () => {
    renderWithRouter('/meals');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    expect(screen.getByRole('heading', { level: 1, name: /meals/i })).toBeDefined();

    const mealsMockNames = mealsMock.meals.slice(0, 12).map(({ strMeal }) => strMeal);
    mealsMockNames.forEach((name, index) => {
      const mealScreenName = screen.getByTestId(`${index}-card-name`);
      expect(mealScreenName.innerHTML).toEqual(name);
    });
  });
});
