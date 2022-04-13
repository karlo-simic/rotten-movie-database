import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";

import Container from "components/Container";
import MediaSubPageHeader from "components/MediaSubPageHeader";
import ReviewCard from "components/ReviewCard";
import { resetScroll } from "utils/helpers";

const MediaReviewsPage = () => {
  const { mediaType, mediaId } = useParams();

  const url = `${API}${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=reviews`;

  const { data, loading, error, sendRequest } = useHttp(true);

  useEffect(() => {
    sendRequest({ url });
  }, [sendRequest, url]);

  useEffect(() => {
    resetScroll();
  }, []);

  if (loading) return <div className="full-height" />;

  if (!loading && error && !data) return <p>{error.message}</p>;

  if (!loading && !error && data) {
    const {
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    } = data.reviews;

    const headerData = {
      title: data.title,
      name: data.name,
      posterPath: data.poster_path,
      releaseDate: data.release_date,
      firstAirDate: data.first_air_date,
      totalResults,
      mediaId,
      mediaType,
    };

    const elements = results.map((r) => {
      return (
        <li key={r.id}>
          <Link to={r.id}>
            <ReviewCard review={r} trunc />
          </Link>
        </li>
      );
    });

    return (
      <>
        <MediaSubPageHeader
          mediaData={headerData}
          pageTitle="reviews"
          resultsName="reviews"
        />
        <Container>
          <ul className={c.list}>{elements}</ul>
        </Container>
      </>
    );
  }
};

export default MediaReviewsPage;
