import c from "./styles/styles.module.scss";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";

import Container from "components/Container";
import MediaSubPageHeader from "components/MediaSubPageHeader";
import VideoCard from "components/VideoCard";
import { resetScroll } from "utils/helpers";

const MediaVideosPage = () => {
  const { mediaType, mediaId } = useParams();

  const location = useLocation();

  const url = `${API}${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=videos`;

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
    const totalResults = data.videos.results.length;

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

    const elements = data.videos.results.map((v) => {
      return (
        <VideoCard
          video={v}
          to={v.key}
          state={{ backgroundLocation: location }}
          key={v.key}
        />
      );
    });

    return (
      <>
        <MediaSubPageHeader
          mediaData={headerData}
          pageTitle="videos"
          resultsName="results"
        />
        <Container className={c.results}>{elements}</Container>
      </>
    );
  }
};

export default MediaVideosPage;
