import c from "./styles/styles.module.scss";
import cx from "classnames";

import { Link } from "react-router-dom";

const Section = ({ title, link, className, children }) => {
  return (
    <section className={cx(c.section, className)}>
      <div className={c.header}>
        <h4>{title}</h4>
        {link && (
          <Link to={link} className={c.link}>
            SEE ALL
          </Link>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
