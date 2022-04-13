import c from "./styles/Trailer.module.scss";
import cx from "classnames";

import { BACKDROP_BIG } from "utils/api-config";
import { Link, useLocation } from "react-router-dom";

import PlayButton from "components/PlayButton";

const Trailer = ({ backdropPath, trailer, className }) => {
  const location = useLocation();

  return (
    <div className={cx(c.container, className)}>
      <div className={c.overlay} />
      {backdropPath && (
        <img
          src={`${BACKDROP_BIG}${backdropPath}`}
          alt="Trailer"
          className={c.img}
        />
      )}
      {!backdropPath && <div className={c.backdropFallback} />}
      {trailer && (
        <PlayButton
          as={Link}
          className={c.btn}
          to={`videos/${trailer.key}`}
          state={{ backgroundLocation: location }}
        />
      )}
      {!trailer && <p className={c.message}>Trailer Unavailable</p>}
    </div>
  );
};

export default Trailer;
