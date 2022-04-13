import c from "./styles/styles.module.scss";
import cx from "classnames";

import React from "react";

const Button = (props) => {
  const { variant, as, className, ...rest } = props;
  // AVAILABLE VARIANTS:
  // - primary
  // - secondary
  // - ternary
  // - outline-primary
  // - outline-secondary
  // - outline-ternary
  // - shadow-primary
  // - shadow-secondary
  // - shadow-ternary

  // 'as' prop = choose as which component to render the button, can be built in or custom
  // Default is 'button'

  // Any other props will be passed on to the element automatically

  return React.createElement(as || "button", {
    ...rest,
    className: cx(c.button, c[variant || "primary"], className),
  });
};

export default Button;
