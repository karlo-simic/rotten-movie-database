import c from "./styles/styles.module.scss";
import cx from "classnames";

import { Image } from "react-bootstrap-icons";

/* 
Fallback for movie posters and backdrops
*/

const ImageFallback = ({ className }) => {
  return (
    <div className={cx(c.fallback, className)}>
      <Image />
    </div>
  );
};

export default ImageFallback;
