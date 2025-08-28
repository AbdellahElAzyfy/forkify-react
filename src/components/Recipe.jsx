import { useAppData } from "../AppContext";
import Error from "./Error";
import Message from "./Message";
import Spinner from "./Spinner";
import Fraction from "fraction.js";

function Recipe() {
  const {
    isLoadingRecipe,
    recipe,
    setRecipe,
    bookmark,
    unbookmark,
    getRecipeError,
    uplodRecipeError,
  } = useAppData();

  function updateServings(newServings) {
    if (newServings <= 0) return;
    setRecipe((recipe) => {
      return {
        ...recipe,
        servings: newServings,
        ingredients: recipe.ingredients.map((ing) => {
          return {
            ...ing,
            quantity: ing.quantity * (newServings / recipe.servings),
          };
        }),
      };
    });
  }

  function handleBookmark() {
    recipe.isBookmarked ? unbookmark(recipe.id) : bookmark(recipe);
  }

  if (isLoadingRecipe)
    return (
      <div className="recipe">
        <Spinner />
      </div>
    );

  if (getRecipeError)
    return (
      <div className="recipe">
        <Error message="There was an error while loading this recipe. Please try again!" />
      </div>
    );

  if (uplodRecipeError)
    return (
      <div className="recipe">
        <Error message="There was an error while uploading your recipe. Please try again!" />
      </div>
    );

  if (!recipe?.id)
    return (
      <div className="recipe">
        <Message message="Start by searching for a recipe or an ingredient. Have fun!" />
      </div>
    );

  return (
    <div className="recipe">
      <figure className="recipe__fig">
        <img src={recipe.image} alt={recipe.title} className="recipe__img" />
        <h1 className="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-clock"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {recipe.cookingTime}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-users"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {recipe.servings}
          </span>
          <span className="recipe__info-text">servings</span>

          <div className="recipe__info-buttons">
            <button
              className="btn--tiny btn--update-servings"
              onClick={() => {
                updateServings(recipe.servings - 1);
              }}
            >
              <svg>
                <use href="img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button
              className="btn--tiny btn--update-servings"
              onClick={() => {
                updateServings(recipe.servings + 1);
              }}
            >
              <svg>
                <use href="img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={`recipe__user-generated ${recipe.key ? "" : "hidden"}`}>
          <svg>
            <use href="img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button className="btn--round" onClick={handleBookmark}>
          <svg className="">
            <use
              href={`img/icons.svg#icon-bookmark${
                recipe.isBookmarked ? "-fill" : ""
              }`}
            ></use>
          </svg>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {recipe.ingredients.map((ingredient) => (
            <li
              key={ingredient.description + String(Math.random()).slice(-5)}
              className="recipe__ingredient"
            >
              <svg className="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
              </svg>
              <div className="recipe__quantity">
                {ingredient.quantity
                  ? new Fraction(ingredient.quantity).toFraction(true)
                  : ""}
              </div>
              <div className="recipe__description">
                <span className="recipe__unit">{ingredient.unit}</span>&nbsp;
                {ingredient.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by&nbsp;
          <span className="recipe__publisher">{recipe.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          className="btn--small recipe__btn"
          href={recipe.sourceUrl}
          target="_blank"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Recipe;
