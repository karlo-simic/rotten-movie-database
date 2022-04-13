import c from "./styles/styles.module.scss";
import cx from "classnames";

import { PROFILE_MEDIUM } from "utils/api-config";
import { formatArrToStr } from "utils/helpers";
import avatar from "assets/avatar.svg";

const PersonCard = ({ person }) => {
  const {
    name: personName,
    profile_path: profilePath,
    character: character,
    roles: roles,
    total_episode_count: totalEpisodeCount,
  } = person;

  // Check if there is profile path, if not return fallback profile path
  const profilePicture = profilePath
    ? `${PROFILE_MEDIUM}${profilePath}`
    : avatar;

  // Create a readable string from roles object, available only on TV shows, will return null if empty
  const rolesStr =
    roles?.length > 0 ? formatArrToStr(roles, "character") : null;

  // Determine which data is available and assign it to the variable
  const playedAs = character || rolesStr;

  return (
    <div className={c.card}>
      <img src={profilePicture} alt="Cast member" />
      <div className={c.body}>
        {personName && <h6>{personName}</h6>}
        {playedAs && <p>{playedAs}</p>}
        {totalEpisodeCount && <p>{`${totalEpisodeCount} Episodes`}</p>}
      </div>
    </div>
  );
};

export default PersonCard;
