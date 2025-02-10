import c from "./styles/styles.module.scss";

import Container from "components/Container";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer className={c.footer}>
      <Container className={c.container}>
        <div>
          <p>Rotten Movie Database</p>
          <p>Project by Karlo Šimić</p>
          <div className={c.socials}>
            <a href="https://github.com/karlo445" target="_blank">
              <Github />
            </a>
            <a
              href="https://github.com/karlo445/rotten-movie-database"
              target="_blank"
            >
              Source Code
            </a>
          </div>
        </div>
        <div>
          <p className={c.credit}>
            All data provided by{" "}
            <a href="https://www.themoviedb.org/" target="_blank">
              The Movie Database
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
