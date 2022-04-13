import c from "./styles/ImageItem.module.scss";
import cx from "classnames";

import { BACKDROP_MEDIUM } from "utils/api-config";
import { Link, useLocation } from "react-router-dom";

const ImageItem = ({ imgPath }) => {
  const location = useLocation();

  return (
    <Link
      to={`images${imgPath}`}
      state={{ backgroundLocation: location }}
      className={c.image}
    >
      <img src={`${BACKDROP_MEDIUM}${imgPath}`} alt="Movie Image" />
    </Link>
  );
};

export default ImageItem;
