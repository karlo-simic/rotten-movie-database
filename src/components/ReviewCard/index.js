import c from "./styles/styles.module.scss";
import cx from "classnames";

import { PROFILE_SMALL } from "utils/api-config";
import { getAvatarUrl } from "utils/helpers";

import { StarFill } from "react-bootstrap-icons";

const ReviewCard = ({ review, trunc, className }) => {
  /* 
  'trunc' - if true truncate the review
  */
  const {
    author,
    author_details: { avatar_path: avatarPath, rating },
    content,
  } = review;

  const imgPath = getAvatarUrl(PROFILE_SMALL, avatarPath);

  return (
    <article className={cx(c.review, className)}>
      <div className={c.header}>
        <img src={imgPath} alt="Avatar" className={c.avatar} />
        <div className={c.info}>
          <p>{author}</p>
          {rating && (
            <div className={c.vote}>
              <StarFill />
              <h5>{rating}</h5>
            </div>
          )}
        </div>
      </div>
      <div className={cx(c.body, trunc ? c.trunc : "")}>{content}</div>
    </article>
  );
};

export default ReviewCard;
