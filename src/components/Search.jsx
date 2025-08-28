import { useAppData } from "../AppContext";

function Search() {
  const { searchQuery, setSearchQuery, getResults, setCurPage } = useAppData();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery("");
    getResults(searchQuery);
    setCurPage(1);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="img/icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}

export default Search;
