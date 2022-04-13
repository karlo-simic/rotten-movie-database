import c from "./styles/SeasonItem.module.scss";
import cx from "classnames";

import { POSTER_SMALL } from "utils/api-config";
import { getYear } from "utils/helpers";

const SeasonItem = ({ season, className }) => {
  const {
    id,
    name,
    overview,
    air_date: airDate,
    episode_count: episodeCount,
    poster_path: posterPath,
    season_number: seasonNumber,
  } = season;

  return (
    <div className={cx(c.card, className)}>
      {posterPath && (
        <img
          src={`${POSTER_SMALL}${posterPath}`}
          alt={name}
          className={c.poster}
        />
      )}
      <div className={c.info}>
        <div>
          {name && <h5>{name}</h5>}
          <p className={c.meta}>
            {seasonNumber > 0 && <span>{`Season ${seasonNumber}`}</span>}
            {episodeCount > 0 && <span>{`${episodeCount} episodes`}</span>}
            {airDate && <span>{getYear(airDate)}</span>}
          </p>
        </div>
        {overview && <p className={c.overview}>{overview}</p>}
      </div>
    </div>
  );
};

export default SeasonItem;
