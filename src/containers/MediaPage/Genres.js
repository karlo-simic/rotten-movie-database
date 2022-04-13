import c from "./styles/Genres.module.scss";
import cx from "classnames";

import Stamp from "components/Stamp";

const Genres = ({ genres }) => {
  if (!genres || genres?.length === 0) return <></>;

  const elements = genres.map((g) => {
    return (
      <li key={g.id}>
        <Stamp variant="outline-secondary">{g.name}</Stamp>
      </li>
    );
  });

  return <ul className={c.genres}>{elements}</ul>;
};

export default Genres;
