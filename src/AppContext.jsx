/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AJAX } from "./helpers";
import { API_KEY, API_URL, RES_PER_PAGE } from "./config";

const AppContext = createContext();

function AppProvider({ children }) {
  const [recipe, setRecipe] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [curRecipeId, setCurRecipeId] = useState("");
  const [curPage, setCurPage] = useState(1);
  const numPages = Math.ceil(results.length / RES_PER_PAGE);

  // Loading State
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [isUploadingRecipe, setIsUploadingRecipe] = useState(false);

  // Error State
  const [getResultsError, setGetResultsError] = useState("");
  const [getRecipeError, setGetRecipeError] = useState("");
  const [uplodRecipeError, setUplodRecipeError] = useState("");

  useEffect(function () {
    if (localStorage.getItem("bookmarks"))
      setBookmarks(JSON.parse(localStorage.getItem("bookmarks")));
  }, []);

  async function getResults(query) {
    try {
      setGetResultsError("");
      setIsLoadingResults(true);
      const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
      const { recipes } = data.data;
      if (!data.results)
        throw new Error(
          "There are no results for this query! Please try again with another one!"
        );

      const results = recipes.map((recipe) => {
        return {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          image: recipe.image_url.slice(0, 4) + "s" + recipe.image_url.slice(4),
          ...(recipe.key && { key: recipe.key }),
        };
      });
      setResults(results);
    } catch (err) {
      setGetResultsError(err);
    } finally {
      setIsLoadingResults(false);
    }
  }

  const getRecipe = useCallback(
    async function getRecipe(id) {
      if (recipe.id === id) return;
      try {
        setGetRecipeError("");
        setIsLoadingRecipe(true);
        const data = await AJAX(`${API_URL}${id}`);
        const { recipe } = data.data;
        const recipeData = {
          cookingTime: recipe.cooking_time,
          id: recipe.id,
          servings: recipe.servings,
          ingredients: recipe.ingredients,
          publisher: recipe.publisher,
          title: recipe.title,
          image: recipe.image_url.slice(0, 4) + "s" + recipe.image_url.slice(4),
          sourceUrl: recipe.source_url,
          isBookmarked: bookmarks?.some((rec) => rec.id === recipe.id),
          ...(recipe.key && { key: recipe.key }),
        };

        setRecipe(recipeData);
      } catch (err) {
        setGetRecipeError(err);
        console.log(err);
      } finally {
        setIsLoadingRecipe(false);
      }
    },
    [bookmarks, recipe.id]
  );

  async function uploadRecipe(recipeObj) {
    try {
      setUplodRecipeError("");
      setIsUploadingRecipe(true);
      const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipeObj);

      const recipe = {
        cookingTime: data.data.recipe.cooking_time,
        id: data.data.recipe.id,
        servings: data.data.recipe.servings,
        ingredients: data.data.recipe.ingredients,
        publisher: data.data.recipe.publisher,
        title: data.data.recipe.title,
        image:
          data.data.recipe.image_url.image_url.slice(0, 4) +
          "s" +
          data.data.recipe.image_url.image_url.slice(4),
        sourceUrl: data.data.recipe.source_url,
        isBookmarked: true,
        key: data.data.recipe.key,
      };

      window.location.hash = `#${recipe.id}`;
      bookmark(recipe);
    } catch (err) {
      setUplodRecipeError(err);
    } finally {
      setIsUploadingRecipe(false);
      setIsOpenModal(false);
    }
  }

  function bookmark(recipe) {
    const recipeObj = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image,
    };

    setBookmarks((bookmarks) => [...bookmarks, recipeObj]);
    setRecipe((recipe) => {
      return { ...recipe, isBookmarked: true };
    });
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, recipeObj])
    );
  }

  function unbookmark(recipeId) {
    setBookmarks((bookmarks) => {
      return bookmarks.filter((recipe) => recipe.id !== recipeId);
    });
    setRecipe((recipe) => {
      return { ...recipe, isBookmarked: false };
    });
    localStorage.setItem(
      "bookmarks",
      JSON.stringify(bookmarks.filter((recipe) => recipe.id !== recipeId))
    );
  }

  useEffect(function () {
    window.addEventListener("load", function () {
      const id = window.location.hash.slice(1);
      setCurRecipeId(id);
    });
  }, []);

  useEffect(function () {
    window.addEventListener("hashchange", function () {
      const id = window.location.hash.slice(1);
      setCurRecipeId(id);
    });
  }, []);

  useEffect(
    function () {
      if (!curRecipeId) return;
      getRecipe(curRecipeId);
    },
    [curRecipeId, getRecipe]
  );

  return (
    <AppContext.Provider
      value={{
        recipe,
        setRecipe,
        searchQuery,
        setSearchQuery,
        results,
        setResults,
        bookmarks,
        setBookmarks,
        getResults,
        isLoadingResults,
        setIsLoadingResults,
        curPage,
        setCurPage,
        numPages,
        isLoadingRecipe,
        setIsLoadingRecipe,
        curRecipeId,
        bookmark,
        unbookmark,
        isUploadingRecipe,
        setIsUploadingRecipe,
        uploadRecipe,
        isOpenModal,
        setIsOpenModal,
        getResultsError,
        getRecipeError,
        uplodRecipeError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppData() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext was used outside of AppProvider");

  return context;
}

export { AppProvider, useAppData };
