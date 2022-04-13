import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useEffect } from "react";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { useParams } from "react-router-dom";
import { resetScroll } from "utils/helpers";

import ReviewCard from "components/ReviewCard";
import Container from "components/Container";

const SingleReviewPage = () => {
  const { reviewId } = useParams();

  const url = `${API}review/${reviewId}?api_key=${API_KEY}`;

  const { loading, error, data, sendRequest } = useHttp(true);

  useEffect(() => {
    sendRequest({ url });
  }, [sendRequest, url]);

  useEffect(() => {
    resetScroll();
  }, []);

  if (loading) return <div className="full-height" />;

  if (!loading && error && !data) return <p>{error.message}</p>;

  if (!loading && !error && data) {
    return (
      <Container>
        <ReviewCard review={data} className={c.review} />
      </Container>
    );
  }
};

export default SingleReviewPage;
