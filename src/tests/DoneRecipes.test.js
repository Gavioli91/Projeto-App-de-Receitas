import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { DONE_RECIPES_KEY } from '../utils/globalVariables';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

beforeEach(() => {
  localStorage.setItem(DONE_RECIPES_KEY, JSON.stringify(doneRecipes));

  renderWithRouter('/done-recipes');
});

afterEach(() => {
  localStorage.clear();
});

describe('Tests in DoneRecipes component', () => {
  it('Expects to exists three filter buttons on screen', () => {
    const buttonFilterAll = screen.getByRole('button', { name: /all/i });
    const buttonFilterMeals = screen.getByRole('button', { name: /meals/i });
    const buttonFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    expect(buttonFilterAll).toBeDefined();
    expect(buttonFilterMeals).toBeDefined();
    expect(buttonFilterDrinks).toBeDefined();
  });

  it('Expects to exists one meal done recipe card on screen', () => {
    const mealObject = doneRecipes[0];
    const mealRecipeCard = screen.getAllByRole('img', { name: /recipe/i })[0];
    expect(mealRecipeCard).toHaveAttribute('src', mealObject.image);
    const mealRecipeTitle = screen.getByText(mealObject.name);
    expect(mealRecipeTitle).toBeDefined();
    const mealRecipeInfo = screen
      .getByText(`${mealObject.nationality} - ${mealObject.category}`);
    expect(mealRecipeInfo).toBeDefined();
    const mealRecipeDoneDate = screen.getAllByText(mealObject.doneDate)[0];
    expect(mealRecipeDoneDate).toBeDefined();
  });

  it('Expects to exists one meal done recipe card on screen', () => {
    const drinkObject = doneRecipes[1];
    const drinkRecipeCard = screen.getAllByRole('img', { name: /recipe/i })[1];
    expect(drinkRecipeCard).toHaveAttribute('src', drinkObject.image);
    const drinkRecipeTitle = screen.getByText(drinkObject.name);
    expect(drinkRecipeTitle).toBeDefined();
    const drinkRecipeInfo = screen
      .getByText(`${drinkObject.alcoholicOrNot} - ${drinkObject.category}`);
    expect(drinkRecipeInfo).toBeDefined();
    const drinkRecipeDoneDate = screen.getAllByText(drinkObject.doneDate)[1];
    expect(drinkRecipeDoneDate).toBeDefined();
  });

  it('Expects to exists two share button on the screen', () => {
    const shareBtns = screen.getAllByRole('img', { name: 'share' });
    expect(shareBtns).toHaveLength(2);
  });
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testing buttons functionalities of DoneRecipes', () => {
  it('Tests if when meals button is clicked show only meals recipes', () => {
    const buttonFilterMeals = screen.getByRole('button', { name: /meals/i });
    userEvent.click(buttonFilterMeals);

    const recipeCardImages = screen.getAllByRole('img', { name: /recipe/i });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', doneRecipes[0].image);
  });

  it('Tests if when drinks button is clicked show only drinks recipes', () => {
    const buttonFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(buttonFilterDrinks);

    const recipeCardImages = screen.getAllByRole('img', { name: /recipe/i });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', doneRecipes[1].image);
  });

  it('Tests if when drinks button is clicked show only drinks recipes', async () => {
    const buttonFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    const buttonFilterAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonFilterDrinks);

    const recipeCardImages = screen.getAllByRole('img', { name: /recipe/i });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', doneRecipes[1].image);

    userEvent.click(buttonFilterAll);

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: /share/i })).toHaveLength(2);
    });

    const drinkRecipeTitle = screen.getByText(doneRecipes[1].name);
    const mealRecipeTitle = screen.getByText(doneRecipes[0].name);
    expect(drinkRecipeTitle && mealRecipeTitle).toBeDefined();
  });

  it('Tests if when share button is clicked copy recipe url', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const shareBtns = screen.getAllByRole('img', { name: 'share' });
    userEvent.click(shareBtns[0]);

    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith(`http://localhost:3000/meals/${doneRecipes[0].id}`);
  });
});

describe('Test if redirect to recipe page when click on recipe card', () => {
  it('Tests if when click meal recipe card, redirect to meal recipe page', () => {
    const { history } = renderWithRouter('/done-recipes');

    const mealRecipeCard = screen.getAllByRole('img', { name: /recipe/i })[0];
    userEvent.click(mealRecipeCard);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/meals/${doneRecipes[0].id}`);
  });
});
