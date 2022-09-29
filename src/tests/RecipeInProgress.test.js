// import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const mealObject = oneMeal.meals[0];
const drinkObject = oneDrink.drinks[0];

const mealRoute = `/meals/${mealObject.idMeal}/in-progress`;
const drinkRoute = `/drinks/${drinkObject.idDrink}/in-progress`;

describe('Tests in RecipeInProgress component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('expects meal elements to be visible', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneMeal),
    });

    renderWithRouter(mealRoute);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const mealImage = screen.getByRole('img', { src: mealObject.strMealThumb });
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
  it('expects drink elements to be visible', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    });

    renderWithRouter(drinkRoute);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const drinkImage = screen.getByRole('img', { src: drinkObject.strDrinkThumb });
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

describe('Tests functionalities in RecipeInProgress component', () => {
  it('expect ingredient to be crossed when clicked', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    });

    renderWithRouter(drinkRoute);

    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });

    const ingredientsListToDo = screen.getAllByRole('checkbox');
    expect(ingredientsListToDo).toHaveLength(3);
    userEvent.click(ingredientsListToDo[0]);

    const ingredientClickedName = screen.getByText('Hpnotiq');
    expect(ingredientClickedName).toHaveAttribute('style', 'text-decoration: line-through;');

    userEvent.click(ingredientsListToDo[0]);
    expect(ingredientClickedName).toHaveAttribute('style', 'text-decoration: none;');
  });
});
