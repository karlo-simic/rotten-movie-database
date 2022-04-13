import c from "./styles/Links.module.scss";
import cx from "classnames";
import { NavLink } from "react-router-dom";

const Links = ({ className }) => {
  return (
    <div className={cx(c.links, className)}>
      <NavLink
        className={(link) => (link.isActive ? cx(c.link, c.active) : c.link)}
        to="/watchlist/movie"
      >
        MOVIES
      </NavLink>
      <NavLink
        className={(link) => (link.isActive ? cx(c.link, c.active) : c.link)}
        to="/watchlist/tv"
      >
        TV
      </NavLink>
    </div>
  );
};

export default Links;
