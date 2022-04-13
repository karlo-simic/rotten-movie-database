import c from "./styles/styles.module.scss";
import cx from "classnames";

import { Link } from "react-router-dom";
import PlayButton from "components/PlayButton";

const VideoCard = ({ video, to, state, className }) => {
  const { key, name, site } = video;

  if (site !== "YouTube") return <></>;

  return (
    <Link to={to || "#"} state={state} className={cx(c.card, className)}>
      <div className={c.thumbnailContainer}>
        <img
          src={`https://img.youtube.com/vi/${key}/mqdefault.jpg`}
          alt={name}
          className={c.thumbnail}
        />
        <PlayButton className={c.play} />
      </div>
      <p className={c.title}>{name}</p>
    </Link>
  );
};

export default VideoCard;
