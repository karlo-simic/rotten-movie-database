import c from "./styles/styles.module.scss";
import cx from "classnames";

import { createElement } from "react";

/* 

Container

Wrapper used globally to center app content and keep horizontal
padding, can take 'as' prop to render it as any built in or
custom component

*/

const Container = (props) => {
  const { as, className, ...rest } = props;

  return createElement(as || "div", {
    className: cx(c.container, className),
    ...rest,
  });
};

export default Container;
