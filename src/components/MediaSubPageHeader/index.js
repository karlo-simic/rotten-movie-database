import c from "./styles/styles.module.scss";
import cx from "classnames";

import { POSTER_SMALL } from "utils/api-config";
import { getYear } from "utils/helpers";
import { Link } from "react-router-dom";

import Container from "components/Container";

const MediaSubPageHeader = ({ mediaData, pageTitle, resultsName }) => {
  const {
    posterPath,
    mediaType,
    mediaId,
    title,
    name,
    releaseDate,
    firstAirDate,
    totalResults,
  } = mediaData;

  const year = getYear(releaseDate || firstAirDate);

  const linkToMedia = `/${mediaType}/${mediaId}`;

  return (
    <header className={c.header}>
      <Container className={c.responsive}>
        <Link to={linkToMedia} className={c.posterContainer}>
          <img src={`${POSTER_SMALL}${posterPath}`} alt="Poster" />
        </Link>
        <div className={c.info}>
          <Link to={linkToMedia} className={c.mediaLink}>
            {title || name}
            <span>{` (${year})`}</span>
          </Link>
          <p className={c.title}>
            {pageTitle} <span>{` (${totalResults}  ${resultsName})`}</span>
          </p>
        </div>
      </Container>
    </header>
  );
};

export default MediaSubPageHeader;
