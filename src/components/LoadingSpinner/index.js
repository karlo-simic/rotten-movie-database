import c from "./styles/styles.module.scss";
import cx from "classnames";

const LoadingSpinner = ({ className }) => {
  return (
    <div className={cx(c.spinner, className)}>
      <div className={c.glow} />
      <div className={c.glow} />
      <div className={c.glow} />
    </div>
  );
};

export default LoadingSpinner;
