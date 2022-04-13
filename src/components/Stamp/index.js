import c from "./styles/styles.module.scss";
import cx from "classnames";

import React from "react";

/* 

Stamp

AVAILABLE VARIANTS:
'primary'
'secondary'
'outline-primary'
'outline-secondary'

'as' - as which component to render the stamp

All other props passed automatically

*/

const Stamp = (props) => {
  const { variant, as } = props;

  return React.createElement(as || "div", {
    ...props,
    className: cx(c.stamp, c[variant || "primary"], props.className),
  });
};

export default Stamp;
