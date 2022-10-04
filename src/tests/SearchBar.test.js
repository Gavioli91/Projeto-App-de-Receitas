import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import mealsCategoryMock from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import { drinks } from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import oneDrink from '../../cypress/mocks/oneDrink';

const searchButtonId = 'exec-search-btn';

describe('Testing searchBar component', () => {
  beforeEach(async () => {
    renderWithRouter('/meals');

    const searchBarIcon = screen.getByRole('button', { name: /search/i });
    expect(searchBarIcon).toBeDefined();
    userEvent.click(searchBarIcon);
  });

  it('Expects to exist an input, button and radio buttons on searchBar', () => {
    const searchInputText = screen.getByRole('textbox');
    expect(searchInputText).toBeDefined();
    const searchButton = screen.getByTestId(searchButtonId);
    expect(searchButton).toBeDefined();
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
  });

  it('Expects to filter an meal by ingredient', () => {
    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);

    userEvent.type(searchInputText, 'milk');
    userEvent.click(radioButtons[0]);
    userEvent.click(searchButton);
  });

  it('Expects to filter an meal by name', () => {
    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);

    userEvent.type(searchInputText, 'spicy');
    userEvent.click(radioButtons[1]);
    userEvent.click(searchButton);
  });

  it('Expects to filter an meal by letter', () => {
    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);

    userEvent.type(searchInputText, 's');
    userEvent.click(radioButtons[2]);
    userEvent.click(searchButton);
  });
});

describe('Tests search bar functionalities', () => {
  it('Expects to search rigth itens', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealsCategoryMock)
        .mockResolvedValueOnce(mealsByIngredient),
    });
    renderWithRouter('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const searchBarIcon = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarIcon);

    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);

    userEvent.type(searchInputText, 'chicken');
    userEvent.click(radioButtons[0]);
    expect(radioButtons[0]).toBeChecked();
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    });
    expect(screen.getByText('Brown Stew Chicken')).toBeDefined();
  });

  it('Expect to show alert if ingredient does not exist', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealsCategoryMock)
        .mockResolvedValue({}),
    });
    renderWithRouter('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const searchBarIcon = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarIcon);

    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);

    userEvent.click(radioButtons[2]);
    userEvent.type(searchInputText, 'aaa');
    userEvent.click(searchButton);
  });
});

describe('Search bar fucntionalities', () => {
  it('Expect to redirect to meal page if only exists one of the type searched', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealsCategoryMock)
        .mockResolvedValue(oneMeal),
    });

    const { history } = renderWithRouter('/meals');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const searchBarIcon = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarIcon);

    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);
    userEvent.click(radioButtons[1]);
    userEvent.type(searchInputText, 'Arrabiata');
    userEvent.click(searchButton);

    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/meals/52771');
    });
    expect(screen.getByRole('heading', { level: 3 })).toBeDefined();
  });

  it('Expect to redirect to drink page if only exists one of the type searched', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValue(oneDrink),
    });

    const { history } = renderWithRouter('/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const searchBarIcon = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchBarIcon);

    const searchInputText = screen.getByRole('textbox');
    const radioButtons = screen.getAllByRole('radio');
    const searchButton = screen.getByTestId(searchButtonId);
    userEvent.click(radioButtons[1]);
    userEvent.type(searchInputText, 'Aquamarine');
    userEvent.click(searchButton);
    await waitFor(() => {
      const { location: { pathname } } = history;
      expect(pathname).toBe('/drinks/178319');
    });
    expect(screen.getByRole('heading', { level: 3 })).toBeDefined();
  });
});
