import c from "./styles/Filters.module.scss";
import cx from "classnames";

import useSearch from "hooks/use-search";

import Button from "components/Button";

const Filters = () => {
  const { changeType } = useSearch();

  const handleChangeType = (e) => {
    const type = e.target.closest("button").dataset.type;

    changeType(type);
  };

  return (
    <div>
      <p className={c.label}>Types</p>
      <div className={c.buttons}>
        <Button
          variant="outline-secondary"
          data-type="multi"
          className={c.button}
          onClick={handleChangeType}
        >
          All
        </Button>
        <Button
          variant="outline-secondary"
          data-type="movie"
          className={c.button}
          onClick={handleChangeType}
        >
          Movies
        </Button>
        <Button
          variant="outline-secondary"
          data-type="tv"
          className={c.button}
          onClick={handleChangeType}
        >
          TV
        </Button>
      </div>
    </div>
  );
};

export default Filters;
