import c from "./styles/styles.module.scss";
import cx from "classnames";
import { XLg } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "store/alert-slice";
import { CSSTransition } from "react-transition-group";
import { useRef, useEffect } from "react";
import { TRANSITION_TIMEOUT } from "utils/config";
import { createPortal } from "react-dom";

let timeout;

const Alert = () => {
  const dispatch = useDispatch();
  const alertRef = useRef();
  const { show, message } = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(alertActions.hideAlert());
  };

  // Auto hide alert after 10 seconds
  useEffect(() => {
    if (!show) return;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      handleClose();
    }, 10000);
  }, [show]);

  return createPortal(
    <CSSTransition
      classNames="alert"
      nodeRef={alertRef}
      timeout={TRANSITION_TIMEOUT}
      mountOnEnter
      unmountOnExit
      in={show}
    >
      <div className={c.alert} ref={alertRef}>
        <div className={c.progress}>
          <div />
        </div>
        <div className={c.header}>
          <button type="button" onClick={handleClose}>
            <XLg />
          </button>
        </div>
        <div className={c.body}>{message}</div>
      </div>
    </CSSTransition>,

    document.getElementById("root")
  );
};

export default Alert;
