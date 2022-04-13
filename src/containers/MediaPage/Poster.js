import c from "./styles/Poster.module.scss";
import cx from "classnames";

import { POSTER_BIG } from "utils/api-config";
import ImageFallback from "components/ImageFallback";

const Poster = ({ posterPath, className }) => {
  return (
    <div className={cx(c.container, className)}>
      {posterPath && (
        <img
          className={c.img}
          src={`${POSTER_BIG}${posterPath}`}
          alt="Poster"
        />
      )}
      {!posterPath && <ImageFallback className={c.fallback} />}
    </div>
  );
};

export default Poster;
