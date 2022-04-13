import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useEffect } from "react";
import useSearch from "hooks/use-search";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { adjustMediaType, resetScroll } from "utils/helpers";

import Container from "components/Container";
import Filters from "./Filters";
import Pagination from "components/Pagination";
import MediaList from "components/MediaList";
import LoadingSpinner from "components/LoadingSpinner";
import { CheckLg } from "react-bootstrap-icons";

const SearchPage = () => {
  const { type, query, page, nextPage, prevPage } = useSearch();

  // prettier-ignore
  const url = `${API}search/${type || "multi"}?api_key=${API_KEY}&include_adult=false&query=${query}&page=${page || 1}`

  const { loading, error, data, sendRequest } = useHttp();

  useEffect(() => {
    if (!query) return;

    sendRequest({ url });
    resetScroll();
  }, [sendRequest, query, url]);

  useEffect(() => {
    resetScroll();
  }, []);

  const getMessage = () => {
    if (!loading && !error && !data && !query) return "No search query";
    if (!loading && error && !data) return "Oops.. Something went wrong!";
    if (!loading && !error && data)
      return `Results for ${query} in ${adjustMediaType(type)} (${
        data.total_results
      } results)`;
  };

  const handleNext = () => nextPage();
  const handlePrev = () => prevPage();

  return (
    <Container>
      <div className={c.responsive}>
        <Filters />
        <div className={c.content}>
          <h4 className={c.title}>{getMessage()}</h4>
          {!loading && error && !data && (
            <p className={c.error}>{error.message}</p>
          )}

          {loading && (
            <div className={c.centerSpinner}>
              <LoadingSpinner />
            </div>
          )}

          {!loading && !error && data && (
            <MediaList
              media={data.results.filter((r) => r.media_type !== "person")}
              mediaType={type === "multi" ? null : type}
              className={c.list}
            />
          )}
        </div>
      </div>
      {!loading && !error && data && (
        <Pagination
          page={page || 1}
          totalPages={data.total_pages}
          onNext={handleNext}
          onPrev={handlePrev}
          className={c.pagination}
        />
      )}
    </Container>
  );
};

export default SearchPage;
