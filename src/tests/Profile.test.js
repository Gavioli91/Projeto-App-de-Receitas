import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { USER_KEY } from '../utils/globalVariables';
import renderWithRouter from './helpers/renderWithRouter';

describe('Tests for Profile screen', () => {
  it('Expects to exist three buttons on screen', () => {
    renderWithRouter('/profile');

    const doneRecipesBtn = screen.getByRole('button', { name: /done Recipes/i });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite Recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipesBtn).toBeDefined();
    expect(favoriteRecipesBtn).toBeDefined();
    expect(logoutBtn).toBeDefined();
  });

  it('Expect "Done Recipes" button to redirect to "/done-recipes"', () => {
    const { history } = renderWithRouter('/profile');

    const doneRecipesBtn = screen.getByRole('button', { name: /done Recipes/i });

    userEvent.click(doneRecipesBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  it('Expect "Favorite Recipes" button to redirect to "/favorite-recipes"', () => {
    const { history } = renderWithRouter('/profile');

    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite Recipes/i });

    userEvent.click(favoriteRecipesBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('Expect "Logout" button to redirect to "/"', () => {
    const { history } = renderWithRouter('/profile');

    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logoutBtn);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Expect to show user email on screen', () => {
    localStorage.setItem(USER_KEY, JSON.stringify({ email: 'email@gmail.com' }));
    renderWithRouter('/profile');
    expect(screen.getByText('email@gmail.com')).toBeDefined();
  });
});
