import c from "./styles/styles.module.scss";
import cx from "classnames";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { sidebarActions } from "store/sidebar-slice";
import { XLg } from "react-bootstrap-icons";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { TRANSITION_TIMEOUT } from "utils/config";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";

const Sidebar = () => {
  const show = useSelector((state) => state.sidebar.show);
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideSidebar = () => {
    dispatch(sidebarActions.hideSidebar());
  };

  const handleLink = (e) => {
    if (!e.target.dataset.to) return;
    hideSidebar();
    setTimeout(() => {
      navigate(e.target.dataset.to);
    }, 0);
  };

  const handleEsc = (e) => {
    if (e.key === "Escape" && show) hideSidebar();
  };

  document.body.addEventListener("keydown", handleEsc);

  return createPortal(
    <CSSTransition
      classNames="slide-from-left"
      nodeRef={sidebarRef}
      timeout={TRANSITION_TIMEOUT}
      mountOnEnter
      unmountOnExit
      in={show}
    >
      <aside className={c.sidebar} ref={sidebarRef}>
        <div className={c.header}>
          <Button variant="shadow-primary" onClick={hideSidebar}>
            <XLg />
          </Button>
        </div>
        <div className={c.body}>
          <ul className={c.links}>
            <li>
              <button type="button" data-to="/home" onClick={handleLink}>
                HOME
              </button>
            </li>
            <li>
              <button
                type="button"
                data-to="/watchlist/movie"
                onClick={handleLink}
              >
                WATCHLIST
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Sidebar;
