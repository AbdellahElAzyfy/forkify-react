import { useAppData } from "../AppContext";

/* eslint-disable react/prop-types */
function Preview({ recipe }) {
  const { curRecipeId } = useAppData();
  const isSelected = curRecipeId === recipe.id;

  return (
    <li className="preview">
      <a
        className={`preview__link preview__link${isSelected ? "--active" : ""}`}
        href={`#${recipe.id}`}
      >
        <figure className="preview__fig">
          <img src={recipe.image} alt={recipe.title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{recipe.title}</h4>
          <p className="preview__publisher">{recipe.publisher}</p>
          <div
            className={`preview__user-generated ${recipe.key ? "" : "hidden"}`}
          >
            <svg>
              <use href="img/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
}

export default Preview;
