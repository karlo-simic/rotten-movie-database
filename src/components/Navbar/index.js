import c from "./styles/styles.module.scss";
import cx from "classnames";
import logo from "assets/logo.svg";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "components/Container";
import SearchBar from "./SearchBar";
import { Search } from "react-bootstrap-icons";
import SidebarToggler from "./SidebarToggler";
import User from "./User";
import Button from "components/Button";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false); // for mobile search bar

  const searchRef = useRef();

  const handleShowSearch = () => {
    setShowSearch(true);
    setTimeout(() => searchRef.current?.focus(), 0);
  };
  const handleHideSearch = () => {
    setTimeout(() => setShowSearch(false), 0);
  };

  return (
    <nav className={c.navbar}>
      <Container className={c.responsive}>
        <div className={c.left}>
          <SidebarToggler className={c.sidebarToggle} />
          <Link to="/home" className={c.logo}>
            <img src={logo} alt="Movies Logo" />
          </Link>
        </div>
        <div className={c.middle}>
          <SearchBar variant="desktop" />
        </div>
        <div className={c.right}>
          <div className={c.links}>
            <Button as={Link} to="/watchlist/movie" variant="shadow-ternary">
              WATCHLIST
            </Button>
          </div>
          <button
            type="button"
            className={c.searchBtn}
            onClick={handleShowSearch}
          >
            <Search />
          </button>
          <User />
        </div>
      </Container>
      {showSearch && (
        <SearchBar variant="mobile" ref={searchRef} onBlur={handleHideSearch} />
      )}
    </nav>
  );
};

export default Navbar;
