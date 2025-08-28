import { useAppData } from "../AppContext";

/* eslint-disable react/prop-types */
function Pagination() {
  const { setCurPage, curPage, numPages } = useAppData();

  // only one page or no results
  if ((curPage === 1 && numPages === 1) || !numPages)
    return <div className="pagination"></div>;

  // first page
  if (curPage === 1 && numPages > 1)
    return (
      <div className="pagination">
        <PaginationBtn type="next" num={2} setCurPage={setCurPage} />
      </div>
    );

  // last page
  if (curPage === numPages)
    return (
      <div className="pagination">
        <PaginationBtn type="prev" num={curPage - 1} setCurPage={setCurPage} />
      </div>
    );

  return (
    <div className="pagination">
      <PaginationBtn type="prev" num={curPage - 1} setCurPage={setCurPage} />
      <PaginationBtn type="next" num={curPage + 1} setCurPage={setCurPage} />
    </div>
  );
}

function PaginationBtn({ type = "next", num, setCurPage }) {
  return (
    <button
      className={`btn--inline pagination__btn--${type}`}
      onClick={() => setCurPage(num)}
    >
      {type === "next" ? (
        <>
          <span>Page {num}</span>
          <svg className="search__icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
          </svg>
        </>
      ) : (
        <>
          <svg className="search__icon">
            <use href="img/icons.svg#icon-arrow-left"></use>
          </svg>
          <span>Page {num}</span>
        </>
      )}
    </button>
  );
}

export default Pagination;
