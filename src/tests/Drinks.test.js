// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import drinksMock from '../../cypress/mocks/drinks';
import drinksCategoryMock from '../../cypress/mocks/drinkCategories';
// import { MEALS_CATEGORYS_END_POINT, MEALS_RECIPES_END_POINT } from '../utils/globalVariables';

describe('Tests Drinks component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinksMock)
        .mockResolvedValue(drinksCategoryMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('expects drinks to have 12 cards of drinks', async () => {
    renderWithRouter('/drinks');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    expect(screen.getByRole('heading', { level: 1, name: /drinks/i })).toBeDefined();
    expect(screen.getByText('AT&T')).toBeDefined();

    const drinksMockNames = drinksMock.drinks.slice(0, 12)
      .map(({ strDrink }) => strDrink);

    drinksMockNames.forEach((name, index) => {
      const drinkScreenName = screen.getByTestId(`${index}-card-name`);
      expect(drinkScreenName.innerHTML.replace(/&amp;/g, '&')).toBe(name);
    });
  });
});
