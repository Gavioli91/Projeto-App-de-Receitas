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

    const bottomMealsBtn = screen.getByRole('button', { name: 'meals screen' });
    const bottomDrinksBtn = screen.getByRole('button', { name: 'drinks screen' });
    expect(bottomDrinksBtn && bottomMealsBtn).toBeDefined();
    expect(bottomDrinksBtn).toHaveAttribute('src', DrinkIcon);
    expect(bottomMealsBtn).toHaveAttribute('src', MealIcon);
  });

  it('expects footer to have data-testid "footer"', () => {
    renderWithRouter('/meals');

    expect(screen.getByTestId('footer')).toBeDefined();
  });

  it('tests if drinks button when clicked redirect to "/drinks"', async () => {
    const { history } = renderWithRouter('/meals');

    const bottomDrinksBtn = screen.getByRole('button', { name: 'drinks screen' });
    expect(screen.getByText('Meals')).toBeDefined();

    userEvent.click(bottomDrinksBtn);

    expect(screen.getByText('Drinks')).toBeDefined();
    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');
  });

  it('tests if meals button when clicked redirect to "/meals"', async () => {
    const { history } = renderWithRouter('/drinks');

    const bottomMealsBtn = screen.getByRole('button', { name: 'meals screen' });
    expect(screen.getByText('Drinks')).toBeDefined();

    userEvent.click(bottomMealsBtn);

    expect(screen.getByText('Meals')).toBeDefined();
    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');
  });
});
