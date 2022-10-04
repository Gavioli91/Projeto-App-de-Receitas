// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import drinksMock from '../../cypress/mocks/drinks';
import drinksCategoryMock from '../../cypress/mocks/drinkCategories';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
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

describe('Tests of filter buttons', () => {
  it('Tests filter buttons', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(drinksCategoryMock).mockResolvedValue(cocktailDrinks),
    });
    renderWithRouter('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    const cocktailFilterBtn = screen.getByRole('button', { name: /cocktail/i });
    const allFilterBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(cocktailFilterBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    expect(screen.getByText('155 Belmont')).toBeDefined();

    userEvent.click(allFilterBtn);
    expect(screen.getByText('GG')).toBeDefined();
  });
});
