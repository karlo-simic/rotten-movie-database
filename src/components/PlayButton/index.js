import c from "./styles/styles.module.scss";
import cx from "classnames";

import React from "react";

import { PlayCircleFill } from "react-bootstrap-icons";

const PlayButton = (props) => {
  const { as } = props; // Select as which component to render the button

  return React.createElement(
    as || "button",
    { ...props, className: cx(c.btn, props.className) },
    React.createElement(PlayCircleFill)
  );
};

export default PlayButton;
