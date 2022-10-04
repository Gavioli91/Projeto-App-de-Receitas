import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import { FAVORITE_RECIPES_KEY, IN_PROGRESS_RECIPES_KEY, MAX_CARDS_LENGTH } from '../utils/globalVariables';
import oneDrink from '../../cypress/mocks/oneDrink';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const mealObject = oneMeal.meals[0];
const drinkObject = oneDrink.drinks[0];

const localStorageInProgressItem = {
  drinks: {
    178319: [
      'Pineapple Juice-1',
      'Hpnotiq-0',
    ],
  },
  meals: {
    52771: [
      'garlic',
      'olive oil',
    ],
  },
};

const localStorageFavoriteItem = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}];

const mealRoute = `/meals/${mealObject.idMeal}`;
const drinkRoute = `/drinks/${drinkObject.idDrink}`;

afterEach(() => jest.resetAllMocks(), localStorage.clear());

describe('Recipe Details Page with Meal', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneMeal)
        .mockResolvedValueOnce(drinks).mockResolvedValueOnce(oneMeal),
    });
    localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON
      .stringify({ drinks: {}, meals: {} }));
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));
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
    const buttonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(buttonStart).toBeDefined();
    userEvent.click(buttonStart);
  });
});

describe('Recipe Details Page with Drinks', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals).mockResolvedValueOnce(oneDrink),
    });

    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));

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

  it('Expect button start recipe to be on the page', () => {
    const recipeButtonStart = screen.getByRole('button', { name: /start recipe/i });
    expect(recipeButtonStart).toBeDefined();
    userEvent.click(recipeButtonStart);
  });
});

describe('Recipe details with continue button tests', () => {
  it('Expect meal recipe to have continue button', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneMeal)
        .mockResolvedValueOnce(drinks).mockResolvedValueOnce(oneMeal),
    });

    localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON
      .stringify(localStorageInProgressItem));
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));

    renderWithRouter(mealRoute);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const continueBtn = screen.getByTestId('start-recipe-btn');
    expect(continueBtn).toHaveTextContent('Continue Recipe');
    userEvent.click(continueBtn);
  });

  it('Expect drink recipe to have continue button', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals).mockResolvedValueOnce(oneDrink),
    });

    localStorage.setItem(IN_PROGRESS_RECIPES_KEY, JSON
      .stringify(localStorageInProgressItem));
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));

    renderWithRouter(drinkRoute);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const continueBtn = screen.getByTestId('start-recipe-btn');
    expect(continueBtn).toHaveTextContent('Continue Recipe');
    userEvent.click(continueBtn);
  });
});

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Recipe details favorite and share buttons tests', () => {
  it('Tests if favorite and share buttons work properly', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals).mockResolvedValueOnce(oneDrink),
    });

    jest.spyOn(navigator.clipboard, 'writeText');
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify([]));
    renderWithRouter(drinkRoute);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(favoriteBtn && shareBtn).toBeDefined();

    userEvent.click(shareBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
  });

  it('Expect recipe to have black heart icon when already is favorited to have', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneMeal)
        .mockResolvedValueOnce(drinks).mockResolvedValueOnce(oneMeal),
    });
    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(localStorageFavoriteItem));
    renderWithRouter(mealRoute);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favoriteBtn);
  });

  it('Expect recipe to have white hear icon when is not favorited', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals).mockResolvedValueOnce(oneDrink),
    });

    localStorage.setItem(FAVORITE_RECIPES_KEY, JSON.stringify(localStorageFavoriteItem));
    renderWithRouter(drinkRoute);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
  });
});
