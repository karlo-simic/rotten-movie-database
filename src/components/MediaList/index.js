import c from "./styles/styles.module.scss";
import cx from "classnames";

import MediaCard from "components/MediaCard";

const MediaList = ({ media, mediaType, className }) => {
  const cardElements = media.map((m) => {
    return (
      <li key={m.id}>
        <MediaCard media={m} mediaType={mediaType} />
      </li>
    );
  });

  return <ul className={cx(c.list, className)}>{cardElements}</ul>;
};

export default MediaList;
