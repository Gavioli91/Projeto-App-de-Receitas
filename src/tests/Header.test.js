import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Tests in Header component', () => {
  test('Header title is rendered', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const headerTitle = screen.getByRole('heading', { level: 1, name: /Meals/i });
    const profileButton = screen.getByRole('button', { name: /profile icon/i });
    const searchIcon = screen.getByRole('button', { name: /search icon/i });

    expect(headerTitle).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  test('Profile page is rendered after clicking on profile button', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const profileButton = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(profileButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });

  test('Search input is rendered after clicking on search button', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const searchIcon = screen.getByRole('button', { name: /search icon/i });
    userEvent.click(searchIcon);
    const searchInput = screen.getByRole('textbox');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
    expect(searchInput).toBeInTheDocument();
  });

  test('"Done Recipes" title is rendered', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const headerTitle = screen.getByRole('heading', { level: 1, name: /Done Recipes/i });
    const profileButton = screen.getByRole('button', { name: /profile icon/i });

    expect(headerTitle).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });

  test('"Favorite Recipes" title is rendered', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });
    const headerTitle = screen.getByRole('heading', { level: 1, name: /Favorite Recipes/i });
    const profileButton = screen.getByRole('button', { name: /profile icon/i });

    expect(headerTitle).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });

  test('"Favorite Recipes" title is rendered', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const headerTitle = screen.getByRole('heading', { level: 1, name: /Drinks/i });
    const profileButton = screen.getByRole('button', { name: /profile icon/i });
    const searchIcon = screen.getByRole('button', { name: /search icon/i });

    expect(headerTitle).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
});
