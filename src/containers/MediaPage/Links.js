import c from "./styles/Links.module.scss";
import cx from "classnames";

// prettier-ignore
import {  Facebook, Instagram, Twitter, } from "react-bootstrap-icons";

const Links = ({ data }) => {
  const {
    imdb_id: imdbId,
    homepage,
    facebook_id: facebookId,
    instagram_id: instagramId,
    twitter_id: twitterId,
  } = data;

  return (
    <div className={c.links}>
      <ul>
        {facebookId && (
          <li>
            <a
              className={c.social}
              target="_blank"
              href={`https://www.facebook.com/${facebookId}`}
            >
              <Facebook />
            </a>
          </li>
        )}
        {instagramId && (
          <li>
            <a
              className={c.social}
              target="_blank"
              href={`https://www.instagram.com/${instagramId}`}
            >
              <Instagram />
            </a>
          </li>
        )}
        {twitterId && (
          <li>
            <a
              className={c.social}
              target="_blank"
              href={`https://www.twitter.com/${twitterId}`}
            >
              <Twitter />
            </a>
          </li>
        )}
        {homepage && (
          <li>
            <a className={c.text} target="_blank" href={homepage}>
              Homepage
            </a>
          </li>
        )}
        {imdbId && (
          <li>
            <a
              className={c.text}
              target="_blank"
              href={`https://www.imdb.com/title/${imdbId}`}
            >
              IMDb
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Links;
