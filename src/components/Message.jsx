/* eslint-disable react/prop-types */
function Message({ message }) {
  return (
    <div className="message">
      <div>
        <svg>
          <use href="img/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Message;
