import c from "./styles/styles.module.scss";
import cx from "classnames";
import { useState, cloneElement, useRef } from "react";

/* 

DropdownMenu

'dropBtn'  - element that will serve as button toggler.

--- CHILDREN
  Children passed to <DropdownMenu> will be displayed inside of the toggleable
  dropdown element.
  Children that should be clickable need 'data-button' attribute.
---
*/

let timeout;

const DropdownMenu = ({ dropBtn, className, children }) => {
  const [show, setShow] = useState(false);
  const contentRef = useRef();

  const hideContent = () => {
    setShow(false);
  };

  const handleToggle = () => {
    setShow((state) => !state);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      hideContent();
    }, 250);
  };

  const handleMouseEnter = () => {
    if (timeout) clearTimeout(timeout);
  };

  const handleClick = (e) => {
    if (e.target.closest("[data-button]")) hideContent();
  };

  return (
    <div
      className={cx(c.dropdown, className)}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {cloneElement(dropBtn, { onClick: handleToggle })}
      <div
        className={cx(c.dropdownContent, show ? c.show : "")}
        ref={contentRef}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownMenu;
