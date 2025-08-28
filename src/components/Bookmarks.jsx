import { useAppData } from "../AppContext";
import Message from "./Message";
import Preview from "./Preview";

function Bookmarks() {
  const { bookmarks } = useAppData();

  return (
    <div className="bookmarks">
      <ul className="bookmarks__list">
        {!bookmarks?.length && (
          <Message message="No bookmarks yet. Find a nice recipe and bookmark it :)!" />
        )}

        {bookmarks?.length > 0 &&
          bookmarks.map((recipe) => (
            <Preview key={recipe.id} recipe={recipe} />
          ))}
      </ul>
    </div>
  );
}

export default Bookmarks;
