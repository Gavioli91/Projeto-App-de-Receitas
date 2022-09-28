import RecipesCards from '../components/RecipesCards';
import { MAX_FOOD_CARDS } from './globalVariables';

const createMenu = (array) => array && array.slice(0, MAX_FOOD_CARDS)
  .map((item, index) => (
    <section key={ item.idMeal || item.idDrink }>
      <RecipesCards
        thumb={ item.strMealThumb || item.strDrinkThumb }
        name={ item.strMeal || item.strDrink }
        index={ index }
      />
    </section>
  ));

export default createMenu;
