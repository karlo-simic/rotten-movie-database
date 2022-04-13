import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { resetScroll } from "utils/helpers";

import Container from "components/Container";
import ImagesList from "./ImagesList";
import MediaSubPageHeader from "components/MediaSubPageHeader";

const MediaImagesPage = () => {
  const { mediaType, mediaId } = useParams();

  const url = `${API}${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=images`;

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
    const totalResults = data.images.backdrops.length;

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

    return (
      <>
        <MediaSubPageHeader
          mediaData={headerData}
          pageTitle="image gallery"
          resultsName="photos"
        />
        <Container>
          <ImagesList images={data.images} />
        </Container>
      </>
    );
  }
};

export default MediaImagesPage;
