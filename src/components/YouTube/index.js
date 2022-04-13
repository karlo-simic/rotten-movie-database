import c from "./styles/styles.module.scss";
import cx from "classnames";

const YouTube = ({ embedId, className }) => {
  return (
    <div className={cx(c.youTube, className)}>
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTube;
