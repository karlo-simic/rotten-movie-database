import c from "./styles/styles.module.scss";
import cx from "classnames";

import { API, API_KEY } from "utils/api-config";
import Container from "components/Container";
import MediaGroup from "./MediaGroup";
import Section from "components/Section";
import { useEffect } from "react";
import { resetScroll } from "utils/helpers";

const HomePage = () => {
  const trendingMoviesUrl = `${API}trending/movie/week?api_key=${API_KEY}`;
  const trendingTvUrl = `${API}trending/tv/week?api_key=${API_KEY}`;
  const moviesUpcoming = `${API}movie/upcoming?api_key=${API_KEY}`;
  const moviesTopRated = `${API}movie/top_rated?api_key=${API_KEY}`;
  const tvTopRated = `${API}tv/top_rated?api_key=${API_KEY}`;
  const tvPopular = `${API}tv/popular?api_key=${API_KEY}`;

  useEffect(() => {
    resetScroll();
  }, []);

  return (
    <Container className={c.home}>
      <Section title="trending this week">
        <MediaGroup title="movies" url={trendingMoviesUrl} mediaType="movie" />
        <MediaGroup title="tv" url={trendingTvUrl} mediaType="tv" />
      </Section>
      <Section title="Movie Library">
        <MediaGroup title="upcoming" url={moviesUpcoming} mediaType="movie" />
        <MediaGroup title="top rated" url={moviesTopRated} mediaType="movie" />
      </Section>
      <Section title="TV Shows">
        <MediaGroup title="top rated" url={tvTopRated} mediaType="tv" />
        <MediaGroup title="popular" url={tvPopular} mediaType="tv" />
      </Section>
    </Container>
  );
};

export default HomePage;
