/* eslint-disable react/prop-types */
import { useAppData } from "../AppContext";
import Bookmarks from "./Bookmarks";

function Nav() {
  const { setIsOpenModal } = useAppData();

  return (
    <nav className="nav">
      <ul className="nav__list">
        <NavItem
          btnClass="nav__btn--add-recipe"
          icon="icon-edit"
          label="Add recipe"
          onClick={() => setIsOpenModal(true)}
        />

        <NavItem
          btnClass="nav__btn--bookmarks"
          icon="icon-bookmark"
          label="Bookmarks"
        >
          <Bookmarks />
        </NavItem>
      </ul>
    </nav>
  );
}

export default Nav;

function NavItem({ btnClass, icon, label, children, onClick }) {
  return (
    <li className="nav__item">
      <button className={`nav__btn ${btnClass}`} onClick={onClick}>
        <svg className="nav__icon">
          <use href={`img/icons.svg#${icon}`}></use>
        </svg>
        <span>{label}</span>
      </button>
      {children}
    </li>
  );
}
