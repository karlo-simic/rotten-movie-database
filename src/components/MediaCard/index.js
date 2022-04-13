import c from "./styles/styles.module.scss";
import cx from "classnames";

import { POSTER_MEDIUM } from "utils/api-config";
import { getYear } from "utils/helpers";
import { Link } from "react-router-dom";
import Stamp from "components/Stamp";
import ImageFallback from "components/ImageFallback";

/* 

MediaCard

Component used to render movies and tv shows, since these will
always be links, it is by default a <link> and it will create
href based on given 'media' data and 'mediaType'.

*/

const MediaCard = ({ media, mediaType, hideTitle, className }) => {
  const {
    id,
    poster_path: posterPath,
    vote_average: voteAverage,
    popularity,
    media_type: arrivedType,
    name, // Tv specific
    first_air_date: firstAirDate,
    title, // Movie specific
    release_date: releaseDate,
  } = media;

  const mediaTitle = title || name; // Only one can be present

  const type = arrivedType || mediaType; // Check if API has returned a type, if not choose type from a prop

  const year = getYear(releaseDate || firstAirDate);

  return (
    <Link to={`/${type}/${id}`} className={cx(c.card, className)}>
      {posterPath && (
        <img src={`${POSTER_MEDIUM}${posterPath}`} alt={mediaTitle} />
      )}
      {!posterPath && <ImageFallback className={c.fallback} />}
      <div className={c.body}>
        <div className={c.meta}>
          <Stamp variant="primary">{voteAverage?.toFixed(1)}</Stamp>
          {year && <p className={c.year}>{year}</p>}
        </div>
        {!hideTitle && <p className={c.title}>{mediaTitle}</p>}
      </div>
    </Link>
  );
};

export default MediaCard;
