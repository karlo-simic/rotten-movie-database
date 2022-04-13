import c from "./styles/Header.module.scss";
import cx from "classnames";

import Stamp from "components/Stamp";
import Poster from "./Poster";
import Trailer from "./Trailer";
import Genres from "./Genres";
import Links from "./Links";
import VoteAverage from "./VoteAverage";
import Container from "components/Container";
import Watchlist from "./Watchlist";
import { getYear, formatRuntime } from "utils/helpers";

const Header = ({ data }) => {
  const {
    backdropPath,
    genres,
    posterPath,
    voteAverage,
    certificate,
    popularity,
    title,
    releaseDate,
    runtime,
    episodeRuntime,
    firstAirDate,
    name,
    numberOfSeasons,
    mediaType,
    mediaId,
    externalIds,
    homepage,
    trailer,
  } = data;

  const year = getYear(releaseDate || firstAirDate);

  const length = formatRuntime(episodeRuntime ? episodeRuntime[0] : runtime);

  return (
    <header className={c.header}>
      <Container className={c.container}>
        {/* Poster and trailer */}
        <div className={c.multimedia}>
          <Poster
            posterPath={posterPath}
            className={c.poster}
            mediaType={mediaType}
            mediaId={mediaId}
          />
          <Trailer
            backdropPath={backdropPath}
            trailer={trailer}
            className={c.trailer}
          />
        </div>

        {/* Main  */}
        <div className={c.main}>
          {/* Title, info, genres..*/}
          <div className={c.titleMetaCont}>
            <h1 className={c.title}>{title || name}</h1>
            <div className={c.metaContainer}>
              <div className={c.meta}>
                {length && (
                  <Stamp variant="outline-primary" className={c.year}>
                    {length}
                  </Stamp>
                )}
                {year && <p>{year}</p>}
                {numberOfSeasons && (
                  <p className={c.seasons}>
                    <span>{numberOfSeasons}</span>
                    <span> seasons</span>
                  </p>
                )}
                {certificate && <p>{certificate}</p>}
              </div>
              {genres && <Genres genres={genres} />}
            </div>
          </div>

          {/* Stats & Links*/}
          <div className={c.statsLinksCont}>
            <div className={c.stats}>
              <VoteAverage voteAverage={voteAverage} />
              <Watchlist />
            </div>
            <Links data={{ ...externalIds, homepage }} className={c.links} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
