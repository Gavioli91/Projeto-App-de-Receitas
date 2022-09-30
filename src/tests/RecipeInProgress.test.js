// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import favoriteButtonIconActive from '../images/blackHeartIcon.svg';
import favoriteButtonIconDisabled from '../images/whiteHeartIcon.svg';

const mealObject = oneMeal.meals[0];
const drinkObject = oneDrink.drinks[0];

const mealRoute = `/meals/${mealObject.idMeal}/in-progress`;
const drinkRoute = `/drinks/${drinkObject.idDrink}/in-progress`;

const mockGlobalFetch = (json) => jest.spyOn(global, 'fetch').mockResolvedValue({
  json: jest.fn().mockResolvedValueOnce(json),
});

describe('Tests in RecipeInProgress component', () => {
  beforeEach(async () => {
    mockGlobalFetch(oneMeal);

    renderWithRouter(mealRoute);

    await waitFor(() => expect(global.fetch).toBeCalled());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('expects meal elements to be visible', async () => {
    const mealImage = screen.getByRole('img', { src: mealObject.strMealThumb, name: /Arrabiata/i });
    expect(mealImage).toBeDefined();

    const mealTitle = screen.getByRole('heading', { level: 2, name: mealObject.strMeal });
    expect(mealTitle).toBeDefined();

    const mealCategory = screen.getByRole('heading', { level: 3, name: mealObject.strCategory });
    expect(mealCategory).toBeDefined();

    const ingredientsListToDo = screen.getAllByRole('listitem');
    expect(ingredientsListToDo).toHaveLength(8);

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    const shareBtn = screen.getByRole('button', { name: /share/i });
    const finishRecipeBtn = screen.getByRole('button', { name: /finalizar/i });

    expect(favoriteBtn && shareBtn && finishRecipeBtn).toBeDefined();

    const mealParagraphText = /Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste/i;
    const mealPrepareInstructionText = screen.getByText(mealParagraphText);
    expect(mealPrepareInstructionText).toBeDefined();
  });
});

describe('Tests in RecipeInProgress component for drinks', () => {
  beforeEach(async () => {
    mockGlobalFetch(oneDrink);

    renderWithRouter(drinkRoute);

    await waitFor(() => expect(global.fetch).toBeCalled());
  });

  it('expects drink elements to be visible', async () => {
    const drinkImage = screen.getByRole('img', { src: drinkObject.strDrinkThumb, name: /aquamarine/i });
    expect(drinkImage).toBeDefined();

    const drinkTitle = screen.getByRole('heading', { level: 2, name: drinkObject.strDrink });
    expect(drinkTitle).toBeDefined();

    const drinkCategory = screen.getByRole('heading', { level: 3, name: drinkObject.strCategory });
    expect(drinkCategory).toBeDefined();

    const ingredientsListToDo = screen.getAllByRole('listitem');
    expect(ingredientsListToDo).toHaveLength(3);

    const drinkParagraphText = 'Shake well in a shaker with ice. Strain in a martini glass.';
    const drinkPrepareInstructionText = screen.getByText(drinkParagraphText);
    expect(drinkPrepareInstructionText).toBeDefined();
  });
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Tests functionalities of drinks in RecipeInProgress component', () => {
  beforeEach(async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    mockGlobalFetch(oneDrink);

    renderWithRouter(drinkRoute);
    await waitFor(() => expect(global.fetch).toBeCalled());
  });

  it('expect ingredient to be crossed when clicked', async () => {
    const ingredientsListToDo = screen.getAllByRole('checkbox');
    expect(ingredientsListToDo).toHaveLength(3);
    userEvent.click(ingredientsListToDo[0]);

    const ingredientClickedName = screen.getByText('Hpnotiq');
    expect(ingredientClickedName).toHaveAttribute('style', 'text-decoration: line-through;');

    userEvent.click(ingredientsListToDo[0]);
    expect(ingredientClickedName).toHaveAttribute('style', 'text-decoration: none;');
  });

  it('expect recipe link to be copied when share btn is clicked', async () => {
    const shareBtn = screen.getByRole('button', { name: 'share' });
    expect(shareBtn).toBeDefined();

    userEvent.click(shareBtn);
    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith(`http://localhost:3000/drinks/${drinkObject.idDrink}`);
  });

  it('expect recipe to be favorited when favorite btn is clicked', async () => {
    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteBtn).toBeDefined();
    expect(favoriteBtn).toHaveAttribute('src', favoriteButtonIconDisabled);

    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', favoriteButtonIconActive);
  });

  it('expect finish recipe btn to enable only after all ingredients are checked', async () => {
    const finishRecipeBtn = screen.getByRole('button', { name: /finalizar/i });
    expect(finishRecipeBtn).toBeDisabled();

    const ingredientsListToDo = screen.getAllByRole('checkbox');
    ingredientsListToDo.forEach((ingredient) => {
      userEvent.click(ingredient);
      expect(ingredient).toBeChecked();
    });
    expect(finishRecipeBtn).toBeEnabled();
    userEvent.click(finishRecipeBtn);
  });
});
