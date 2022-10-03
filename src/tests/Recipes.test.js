// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import mealsMock from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import mealsCategoryMock from '../../cypress/mocks/mealCategories';
import drinks from '../../cypress/mocks/drinks';
// import { MEALS_CATEGORYS_END_POINT, MEALS_RECIPES_END_POINT } from '../utils/globalVariables';

describe('Tests Meals component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('expects meals to have 12 cards of foods', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValue(mealsCategoryMock),
    });
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

  it('Expects to be redirect to meal detail when clicks in one of them', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(mealsCategoryMock)
        .mockResolvedValueOnce(oneMeal)
        .mockResolvedValue(drinks),
    });

    const { history } = renderWithRouter('/meals');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    const corbaRecipe = screen.getByRole('img', { name: 'Corba' });
    userEvent.click(corbaRecipe);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52977');
  });
});
