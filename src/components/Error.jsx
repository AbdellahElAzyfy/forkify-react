/* eslint-disable react/prop-types */
function Error({ message }) {
  return (
    <div className="error">
      <div>
        <svg>
          <use href="img/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Error;
