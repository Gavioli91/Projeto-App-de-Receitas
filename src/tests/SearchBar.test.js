import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

const searchButtonId = 'exec-search-btn';

beforeEach(async () => {
  renderWithRouter('/meals');

  const searchBarIcon = screen.getByRole('button', { name: /search/i });
  expect(searchBarIcon).toBeDefined();
  userEvent.click(searchBarIcon);
});

describe('Testing searchBar component', () => {
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
