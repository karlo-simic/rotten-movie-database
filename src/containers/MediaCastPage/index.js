import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { resetScroll } from "utils/helpers";

import Container from "components/Container";
import MediaSubPageHeader from "components/MediaSubPageHeader";
import PersonCard from "components/PersonCard";

const MediaCastPage = () => {
  const { mediaType, mediaId } = useParams();

  const appendTypes = {
    movie: "credits",
    tv: "aggregate_credits",
  };

  const url = `${API}${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=${appendTypes[mediaType]}`;

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
    const cast = data.credits?.cast || data.aggregate_credits?.cast;
    const totalResults = cast.length;

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

    const elements = cast.map((person) => {
      return (
        <li key={person.id}>
          <PersonCard person={person} />
        </li>
      );
    });

    return (
      <>
        <MediaSubPageHeader
          mediaData={headerData}
          pageTitle="Cast"
          resultsName="results"
        />
        <Container>
          <ul className={c.list}>{elements}</ul>
        </Container>
      </>
    );
  }
};

export default MediaCastPage;
