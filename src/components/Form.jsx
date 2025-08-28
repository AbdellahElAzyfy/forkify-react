import { useState } from "react";
import { useAppData } from "../AppContext";
import Error from "./Error";
import Spinner from "./Spinner";

/* eslint-disable react/prop-types */
function Form() {
  const { uploadRecipe, isUploadingRecipe } = useAppData();
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [image, setImage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");

  const [ing1, setIng1] = useState("");
  const [ing2, setIng2] = useState("");
  const [ing3, setIng3] = useState("");
  const [ing4, setIng4] = useState("");
  const [ing5, setIng5] = useState("");
  const [ing6, setIng6] = useState("");

  function clearForm() {
    setTitle("");
    setCookingTime("");
    setServings("");
    setSourceUrl("");
    setImage("");
    setPublisher("");

    setIng1("");
    setIng2("");
    setIng3("");
    setIng4("");
    setIng5("");
    setIng6("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ingsArr = [ing1, ing2, ing3, ing4, ing5, ing6].filter(
      (ingredient) => ingredient
    );
    let formError;
    const ingredients = ingsArr.map((ing) => {
      const ingArr = ing.split(",");
      if (ingArr.length !== 3)
        return (formError =
          "Ingredient format is wrong! please follow the provided format.");

      const [quantity, unit, description] = ingArr.map((ingProperty) =>
        ingProperty.trim()
      );

      if (!description)
        return (formError = "Ingredients must include description!");

      return { quantity: quantity ? +quantity : null, unit, description };
    });

    if (formError) {
      setError(formError);
      return setTimeout(() => setError(""), 2000);
    }

    const newRecipe = {
      title,
      publisher,
      servings,
      ingredients,
      source_url: sourceUrl,
      image_url: image,
      cooking_time: cookingTime,
    };

    clearForm();
    uploadRecipe(newRecipe);
  }

  if (error) return <Error message={error} />;

  if (isUploadingRecipe) return <Spinner />;

  return (
    <form className="upload" onSubmit={(e) => handleSubmit(e)}>
      <div className="upload__column">
        <h3 className="upload__heading">Recipe data</h3>
        <FormInput
          label="Title"
          name="title"
          type="text"
          state={title}
          setState={setTitle}
        />

        <FormInput
          label="URL"
          name="sourceUrl"
          type="text"
          state={sourceUrl}
          setState={setSourceUrl}
        />

        <FormInput
          label="Image URL"
          name="image"
          type="text"
          state={image}
          setState={setImage}
        />

        <FormInput
          label="Publisher"
          name="publisher"
          type="text"
          state={publisher}
          setState={setPublisher}
        />

        <FormInput
          label="Prep time"
          name="cookingTime"
          type="number"
          state={cookingTime}
          setState={setCookingTime}
        />

        <FormInput
          label="Servings"
          name="servings"
          type="number"
          state={servings}
          setState={setServings}
        />
      </div>

      <div className="upload__column">
        <h3 className="upload__heading">Ingredients</h3>
        <IngredientInput num={1} ing={ing1} setIng={setIng1} />
        <IngredientInput num={2} ing={ing2} setIng={setIng2} />
        <IngredientInput num={3} ing={ing3} setIng={setIng3} />
        <IngredientInput num={4} ing={ing4} setIng={setIng4} />
        <IngredientInput num={5} ing={ing5} setIng={setIng5} />
        <IngredientInput num={6} ing={ing6} setIng={setIng6} />
      </div>

      <button className="btn upload__btn">
        <svg>
          <use href="img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
    </form>
  );
}

export default Form;

function FormInput({ label, name, type, state, setState }) {
  function handleChange(e) {
    if (type === "number")
      setState((state) => (e.target.value <= 0 ? state : e.target.value));
    else setState(e.target.value);
  }
  return (
    <>
      <label>{label}</label>
      <input
        value={state}
        required
        name={name}
        type={type}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}

function IngredientInput({ num, ing, setIng }) {
  return (
    <>
      <label>Ingredient {num}</label>
      <input
        value={ing}
        type="text"
        required={num === 1 || num === 2 ? true : false}
        name={`ingredient-${num}`}
        placeholder="Format: 'Quantity,Unit,Description'"
        onChange={(e) => setIng(e.target.value)}
      />
    </>
  );
}
