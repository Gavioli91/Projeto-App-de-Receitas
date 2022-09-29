import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';

const MEAL_ID = '52771';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve(oneMeal),
  }));
});

afterEach(() => jest.resetAllMocks());

describe('Recipe Details Page', () => {
  test('Recipe image is on the page', async () => {
    renderWithRouter(`/meals/${MEAL_ID}`);

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const recipeImage = screen.getAllByRole('img', { name: /recipe/i })[0];
    expect(recipeImage).toBeInTheDocument();
  });
});
