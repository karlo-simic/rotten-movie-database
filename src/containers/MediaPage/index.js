import c from "./styles/styles.module.scss";

import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { parseCertificate, parseTrailer, resetScroll } from "utils/helpers";

import Container from "components/Container";
import Header from "./Header";
import Videos from "./Videos";
import About from "./About";
import Seasons from "./Seasons";
import Reviews from "./Reviews";
import Images from "./Images";
import Cast from "./Cast";
import Recommended from "./Recommended";
import Providers from "./Providers";

/* 

MediaPage

This page serves as a main page of each movie or tv show, it uses
url to get 'mediaType' and 'mediaId' parameters and make a request
to the TMDb API. When the data has arrived MediaPage will sort
and spread the data across it's components which will act on their
own if certain data is unavailable.

*/

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const navigate = useNavigate();

  const urls = {
    movie: `${API}${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=credits,release_dates,images,external_ids,reviews,watch/providers,videos,recommendations`,
    tv: `${API}${mediaType}/${mediaId}?api_key=${API_KEY}&append_to_response=aggregate_credits,external_ids,images,reviews,videos,watch/providers,content_ratings,recommendations`,
  };

  const url = urls[mediaType];

  const { data, loading, error, sendRequest } = useHttp(true);

  useEffect(() => {
    if (mediaType !== "movie" && mediaType !== "tv") navigate("/home");
    resetScroll();
    sendRequest({ url });
  }, [sendRequest, url]);

  useEffect(() => {
    resetScroll();
  }, []);

  if (loading) return <div className="full-height" />;

  if (!loading && error && !data)
    return (
      <div className="full-height">
        <p>{error.message}</p>
      </div>
    );

  if (!loading && !error && data) {
    const {
      backdrop_path: backdropPath,
      genres,
      homepage,
      overview,
      popularity,
      poster_path: posterPath,
      spoken_languages: spokenLanguages,
      tagline,
      vote_average: voteAverage,
      production_companies: productionCompanies,
      production_countries: productionCountries,
      title,
      original_title: originalTitle,
      budget,
      revenue,
      runtime,
      release_date: releaseDate,
      created_by: createdBy,
      episode_run_time: episodeRuntime,
      first_air_date: firstAirDate,
      last_air_date: lastAirDate,
      name,
      number_of_episodes: numberOfEpisodes,
      number_of_seasons: numberOfSeasons,
      original_name: originalName,
      seasons,
      external_ids: externalIds,
      images,
      reviews,
      videos,
      recommendations,
      credits,
      aggregate_credits: aggregateCredits,
      ["watch/providers"]: providers,
    } = data;

    const certificate = parseCertificate(
      data.release_dates || data.content_ratings,
      mediaType
    );

    const trailer = parseTrailer(videos);

    const headerData = {
      backdropPath,
      genres,
      posterPath,
      voteAverage,
      certificate,
      popularity,
      title,
      releaseDate,
      runtime,
      episodeRuntime,
      firstAirDate,
      name,
      numberOfSeasons,
      mediaType,
      mediaId,
      externalIds,
      homepage,
      voteAverage,
      trailer,
    };

    const aboutData = {
      spokenLanguages,
      overview,
      productionCompanies,
      productionCountries,
      genres,
      budget,
      title,
      releaseDate,
      revenue,
      runtime,
      originalTitle,
      createdBy,
      episodeRuntime,
      firstAirDate,
      lastAirDate,
      name,
      numberOfEpisodes,
      numberOfSeasons,
      originalName,
      tagline,
    };

    return (
      <>
        <Header data={headerData} />
        <Container className={c.grid}>
          <div>
            <Providers providers={providers} />
            <About data={aboutData} />
            <Cast cast={credits || aggregateCredits} />
            <Seasons seasons={seasons} />
            <Reviews reviews={reviews} />
          </div>
          <div>
            <Images images={images} />
            <Videos videos={videos} />
            <Recommended recommended={recommendations} mediaType={mediaType} />
          </div>
        </Container>
      </>
    );
  }
};

export default MediaDetail;
