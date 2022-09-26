import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DrinkIcon from '../images/drinkIcon.svg';
import MealIcon from '../images/mealIcon.svg';

describe('Tests on Footer component', () => {
  it('checks if there is two elements on footer', () => {
    const { history } = renderWithRouter('/meals');

    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');

    const bottomBtn = screen.getAllByRole('button', { type: 'image' });
    expect(bottomBtn[0]).toHaveAttribute('src', DrinkIcon);
    expect(bottomBtn[1]).toHaveAttribute('src', MealIcon);
  });

  it('expects footer to have data-testid "footer"', () => {
    renderWithRouter('/meals');

    expect(screen.getByTestId('footer')).toBeDefined();
  });

  it('tests if drinks button when clicked redirect to "/drinks"', async () => {
    const { history } = renderWithRouter('/meals');

    const bottomBtn = screen.getAllByRole('button', { type: 'image' });
    expect(screen.getByText('Meals')).toBeDefined();

    userEvent.click(bottomBtn[0]);

    expect(screen.getByText('Drinks')).toBeDefined();
    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');
  });

  it('tests if meals button when clicked redirect to "/meals"', async () => {
    const { history } = renderWithRouter('/drinks');

    const bottomBtn = screen.getAllByRole('button', { type: 'image' });
    expect(screen.getByText('Drinks')).toBeDefined();

    userEvent.click(bottomBtn[1]);

    expect(screen.getByText('Meals')).toBeDefined();
    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');
  });
});
