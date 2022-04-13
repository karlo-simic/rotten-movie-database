import c from "./styles/Reviews.module.scss";
import cx from "classnames";

import Section from "components/Section";
import ReviewCard from "components/ReviewCard";
import { Link } from "react-router-dom";

const Reviews = ({ reviews }) => {
  if (!reviews.results || reviews.results?.length === 0) return <></>;

  const reviewsSlice = reviews.results.slice(0, 4);

  const reviewElements = reviewsSlice.map((r) => {
    return (
      <li key={r.id}>
        <Link to={`reviews/${r.id}`}>
          <ReviewCard review={r} trunc className={c.card} />
        </Link>
      </li>
    );
  });

  return (
    <Section title="reviews" link="reviews">
      <ul className={c.grid}>{reviewElements}</ul>
    </Section>
  );
};

export default Reviews;
