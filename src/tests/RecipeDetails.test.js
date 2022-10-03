import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import { IN_PROGRESS_RECIPES_KEY, MAX_CARDS_LENGTH } from '../utils/globalVariables';
import oneDrink from '../../cypress/mocks/oneDrink';

const mealObject = oneMeal.meals[0];
const drinkObject = oneDrink.drinks[0];

const mealRoute = `/meals/${mealObject.idMeal}`;
const drinkRoute = `/drinks/${drinkObject.idDrink}`;

afterEach(() => jest.resetAllMocks(), localStorage.clear());

describe('Recipe Details Page with Meal', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneMeal)
        .mockResolvedValue(drinks),
    });

    renderWithRouter(mealRoute);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('Expect recipe image to be on the page', async () => {
    const recipeImage = screen.getAllByRole('img', { name: /recipe/i })[0];
    expect(recipeImage).toBeInTheDocument();
  });

  it('Expect recipe title and category to be on the page', async () => {
    const recipeTitle = screen.getByRole('heading', { name: mealObject.strMeal, level: 3 });
    const recipeCategory = screen.getByRole('heading', { name: mealObject.strCategory, level: 5 });
    expect(recipeTitle).toBeDefined();
    expect(recipeCategory).toBeDefined();
  });

  it('Expect recipe ingredients list to be on the page', async () => {
    const recipeIngredientsList = screen.getAllByRole('listitem');
    expect(recipeIngredientsList).toHaveLength(8);
  });

  it('Expect recipe instructions to be on the page', async () => {
    const recipeInstructions = screen.getByText(/Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste./i);
    expect(recipeInstructions).toBeDefined();
  });

  it('Expect recipe video to be on the page', async () => {
    const recipeVideo = screen.getByTestId('video');
    expect(recipeVideo).toBeDefined();
    expect(recipeVideo).toHaveAttribute('src', 'https://www.youtube.com/embed/1IszT_guI08');
  });

  it('Expect recipe recomendations to be on the page', async () => {
    const recipeRecomendationCards = screen.getAllByRole('img', { name: 'recipe card' });
    expect(recipeRecomendationCards).toHaveLength(MAX_CARDS_LENGTH);
  });

  it('Expect recipe button start/continue to be on the page', () => {
    const recipeButtonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(recipeButtonStart).toBeDefined();
  });
});

describe('Testing button in recipe details page', () => {
  const localStorageInProgressItem = {
    drinks: {
      178319: [
        'Pineapple Juice-1',
        'Hpnotiq-0',
      ],
    },
    meals: {},
  };

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValue(meals),
    });

    localStorage
      .setItem(IN_PROGRESS_RECIPES_KEY, JSON.stringify(localStorageInProgressItem));

    renderWithRouter(drinkRoute);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('tests if start recipe button is now, continue recipe', () => {
    const continueBtn = screen.getByTestId('start-recipe-btn');
    expect(continueBtn).toHaveTextContent('Continue Recipe');
  });
});

describe('Recipe Details Page with Drinks', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValue(meals),
    });

    renderWithRouter(drinkRoute);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('Expect recipe image to be on the page', async () => {
    const recipeImage = screen.getAllByRole('img', { name: /recipe/i })[0];
    expect(recipeImage).toBeInTheDocument();
  });

  it('Expect recipe title and "alcoholic" to be on the page', async () => {
    const recipeTitle = screen.getByRole('heading', { name: drinkObject.strDrink, level: 3 });
    const recipeCategory = screen.getByRole('heading', { name: drinkObject.strAlcoholic, level: 5 });
    expect(recipeTitle).toBeDefined();
    expect(recipeCategory).toBeDefined();
  });

  it('Expect recipe ingredients list to be on the page', async () => {
    const recipeIngredientsList = screen.getAllByRole('listitem');
    expect(recipeIngredientsList).toHaveLength(3);
  });

  it('Expect recipe instructions to be on the page', async () => {
    const recipeInstructions = drinkObject.strInstructions;
    expect(recipeInstructions).toBeDefined();
  });

  it('Expect recipe recomendations to be on the page', async () => {
    const recipeRecomendationCards = screen.getAllByRole('img', { name: 'recipe card' });
    expect(recipeRecomendationCards).toHaveLength(MAX_CARDS_LENGTH);
  });

  it('Expect recipe button start not to be on the page', () => {
    const allButtonsOnPage = screen.getAllByRole('button');
    allButtonsOnPage.forEach((button) => {
      expect(button).not.toHaveTextContent(/start recipe/i);
    });
  });
});
