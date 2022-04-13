import c from "./styles/ImagesList.module.scss";
import cx from "classnames";

import { BACKDROP_MEDIUM } from "utils/api-config";
import { Link, useLocation } from "react-router-dom";

/* 

ImagesList

Takes an array of images and renders (backdrops) in a grid

*/

const ImagesList = ({ images }) => {
  const location = useLocation();

  const backdrops = images.backdrops;

  if (!backdrops || backdrops.length === 0) return <p>No results</p>;

  const elements = backdrops.map((img) => {
    return (
      <Link
        to={img.file_path.slice(1)}
        key={img.file_path}
        // Set the `backgroundLocation` in location state
        // so that when we open the modal we still see the current page in
        // the background.
        state={{ backgroundLocation: location }}
      >
        <img src={`${BACKDROP_MEDIUM}${img.file_path}`} alt="Movie Image" />
      </Link>
    );
  });

  return <div className={c.results}>{elements}</div>;
};

export default ImagesList;
