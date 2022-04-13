import c from "./styles/styles.module.scss";
import cx from "classnames";
import { useContext, useEffect, useRef } from "react";
import AuthContext from "context/auth-context";
import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { useParams, useSearchParams } from "react-router-dom";
import Container from "components/Container";
import Links from "./Links";
import Pagination from "components/Pagination";
import MediaList from "components/MediaList";
import LoadingSpinner from "components/LoadingSpinner";

const types = {
  movie: "movies",
  tv: "tv",
};

const WatchlistPage = () => {
  const { sessionId, user, loading: authLoading } = useContext(AuthContext);
  const { mediaType } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const sortBy = searchParams.get("sort_by");

  const sortRef = useRef();

  const url = `${API}account/${user?.id}/watchlist/${
    types[mediaType]
  }?api_key=${API_KEY}&session_id=${sessionId}&page=${page || 1}&${
    sortBy ? `sort_by=${sortBy}` : ""
  }`;

  const {
    data,
    error,
    loading: watchlistLoading,
    sendRequest,
  } = useHttp(false);

  useEffect(() => {
    if (!user || !sessionId) return;
    sendRequest({ url });
  }, [url, user, sessionId]);

  const handleSort = (e) => {
    const sort_by = e.target.value;
    setSearchParams({
      ...(page && { page: 1 }),
      ...(sort_by !== "default" && { sort_by }),
    });
  };

  const handleNextPage = () => {
    setSearchParams({
      page: page ? +page + 1 : 2,
      ...(sortBy && { sort_by: sortBy }),
    });
  };
  const handlePrevPage = () => {
    setSearchParams({
      page: +page - 1,
      ...(sortBy && { sort_by: sortBy }),
    });
  };

  const loading = watchlistLoading || authLoading;

  return (
    <Container className={c.container}>
      <h1>Your Watchlist</h1>
      <Links className={c.links} />
      <select ref={sortRef} onChange={handleSort} className={c.sort}>
        <option value="default">Sort</option>
        <option value="created_at.asc">Latest</option>
        <option value="created_at.desc">Oldest</option>
      </select>

      {loading && (
        <div className={c.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}

      {!loading && !error && data && (
        <MediaList
          media={data.results}
          mediaType={mediaType}
          className={c.results}
        />
      )}

      {!loading && !sessionId && (
        <p className={c.fallback}>Log in to manage watchlist</p>
      )}

      {!loading && !error && !data?.results[0] && sessionId && (
        <p className={c.fallback}>{`${mediaType} watchlist empty`}</p>
      )}

      {!loading && !error && data?.results[0] && (
        <Pagination
          className={c.pagination}
          page={data.page}
          totalPages={data.total_pages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      )}
    </Container>
  );
};

export default WatchlistPage;
