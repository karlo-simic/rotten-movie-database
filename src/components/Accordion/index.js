import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useState, useRef } from "react";
import { CaretDown } from "react-bootstrap-icons";

const Accordion = ({ title, children, className }) => {
  const [collapse, setCollapse] = useState(false);

  const contentRef = useRef();

  const handleToggleCollapse = () => {
    setCollapse((state) => !state);
  };

  const contentHight = contentRef.current?.clientHeight;

  const collapseStyles = {
    height: collapse ? `${contentHight}px` : 0,
  };

  return (
    <div className={cx(c.accordion, className)}>
      <button type="button" className={c.button} onClick={handleToggleCollapse}>
        <span className={c.title}>{title}</span>
        <CaretDown className={cx(c.caret, collapse ? c.up : "")} />
      </button>
      <div className={c.collapse} style={collapseStyles}>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
