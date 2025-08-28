import { useAppData } from "../AppContext";
import Copyright from "./Copyright";
import Pagination from "./Pagination";
import Preview from "./Preview";
import Spinner from "./Spinner";
import { RES_PER_PAGE } from "../config";
import Error from "./Error";

function Results() {
  const { curPage, results, isLoadingResults, getResultsError } = useAppData();

  function getResultsPerPage(page) {
    const start = (page - 1) * RES_PER_PAGE;
    const end = page * RES_PER_PAGE;
    return results.slice(start, end);
  }

  if (isLoadingResults) return <Spinner />;

  if (getResultsError) {
    if (!results?.length) return <Error message={getResultsError.message} />;
    return (
      <Error message="There was an error while loading results. Please try again!" />
    );
  }

  return (
    <div className="search-results">
      {
        <ul className="results">
          {results.length
            ? getResultsPerPage(curPage).map((recipe) => (
                <Preview key={recipe.id} recipe={recipe} />
              ))
            : ""}
        </ul>
      }

      <Pagination />

      <Copyright />
    </div>
  );
}

export default Results;
