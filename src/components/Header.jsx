import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";

function Header() {
  return (
    <header className="header">
      <Logo />
      <Search />
      <Nav />
    </header>
  );
}

export default Header;
