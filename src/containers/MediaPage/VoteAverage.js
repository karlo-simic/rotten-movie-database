import c from "./styles/VoteAverage.module.scss";
import cx from "classnames";

const VoteAverage = ({ voteAverage, className }) => {
  return (
    <div className={cx(c.voteAverage, className)}>
      <div>
        <h1>{voteAverage}</h1>
      </div>
      <p>RMDb</p>
    </div>
  );
};

export default VoteAverage;
