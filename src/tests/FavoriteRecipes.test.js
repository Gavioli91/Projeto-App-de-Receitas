import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { FAVORITE_RECIPES_KEY } from '../utils/globalVariables';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

beforeEach(() => {
  localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(favoriteRecipes));

  renderWithRouter('/favorite-recipes');
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
    const mealObject = favoriteRecipes[0];
    const mealRecipeCard = screen.getAllByRole('img', { name: 'Recipe' })[0];
    expect(mealRecipeCard).toHaveAttribute('src', mealObject.image);
    const mealRecipeTitle = screen.getByText(mealObject.name);
    expect(mealRecipeTitle).toBeDefined();
    const mealRecipeInfo = screen
      .getByText(`${mealObject.nationality} - ${mealObject.category}`);
    expect(mealRecipeInfo).toBeDefined();
  });

  it('Expects to exists one meal done recipe card on screen', () => {
    const drinkObject = favoriteRecipes[1];
    const drinkRecipeCard = screen.getAllByRole('img', { name: 'Recipe' })[1];
    expect(drinkRecipeCard).toHaveAttribute('src', drinkObject.image);
    const drinkRecipeTitle = screen.getByText(drinkObject.name);
    expect(drinkRecipeTitle).toBeDefined();
    const drinkRecipeInfo = screen
      .getByText(`${drinkObject.alcoholicOrNot} - ${drinkObject.category}`);
    expect(drinkRecipeInfo).toBeDefined();
  });

  it('Expects to exists two share buttons on the screen', () => {
    const shareBtns = screen.getAllByRole('img', { name: 'share' });
    expect(shareBtns).toHaveLength(2);
  });

  it('Expects to exists two favorite buttons on the screen', () => {
    const favoriteBtns = screen.getAllByRole('img', { name: /favorite/i });
    expect(favoriteBtns).toHaveLength(2);
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

    const recipeCardImages = screen.getAllByRole('img', { name: 'Recipe' });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', favoriteRecipes[0].image);
  });

  it('Tests if when drinks button is clicked show only drinks recipes', () => {
    const buttonFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(buttonFilterDrinks);

    const recipeCardImages = screen.getAllByRole('img', { name: 'Recipe' });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', favoriteRecipes[1].image);
  });

  it('Tests if when all button is clicked show all recipes', async () => {
    const buttonFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    const buttonFilterAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonFilterDrinks);

    const recipeCardImages = screen.getAllByRole('img', { name: 'Recipe' });
    expect(recipeCardImages).not.toHaveLength(2);
    expect(recipeCardImages[0]).toHaveAttribute('src', favoriteRecipes[1].image);

    userEvent.click(buttonFilterAll);

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: /share/i })).toHaveLength(2);
    });

    const drinkRecipeTitle = screen.getByText(favoriteRecipes[1].name);
    const mealRecipeTitle = screen.getByText(favoriteRecipes[0].name);
    expect(drinkRecipeTitle && mealRecipeTitle).toBeDefined();
  });

  it('Tests if when share button is clicked copy recipe url', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const shareBtns = screen.getAllByRole('img', { name: 'share' });
    userEvent.click(shareBtns[0]);

    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith(`http://localhost:3000/meals/${favoriteRecipes[0].id}`);
  });
});

describe('Continue to test buttons functionalities of DoneRecipes', () => {
  it('Tests if when click meal recipe card, redirect to meal recipe page', async () => {
    const mealCard = screen.getAllByText('Spicy Arrabiata Penne')[0];
    userEvent.click(mealCard);
  });

  it('Test if when click to unfavorite an recipe it removes it from the screen', () => {
    const favoriteBtns = screen.getAllByRole('img', { name: /favorite/i });
    userEvent.click(favoriteBtns[0]);
    expect(favoriteBtns).toHaveLength(2);
  });
});
