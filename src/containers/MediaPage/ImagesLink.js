import c from "./styles/ImagesLink.module.scss";
import cx from "classnames";

import { Link } from "react-router-dom";
import { BACKDROP_MEDIUM } from "utils/api-config";

const ImagesLink = ({ totalImages, imgPath }) => {
  return (
    <Link to="images" className={c.galleryLink}>
      <h4>{`+ ${totalImages}`}</h4>
      <div className={c.overlay} />
      <img src={`${BACKDROP_MEDIUM}${imgPath}`} alt="Movie Image" />
    </Link>
  );
};

export default ImagesLink;
