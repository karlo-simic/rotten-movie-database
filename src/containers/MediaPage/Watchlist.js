import c from "./styles/Watchlist.module.scss";
import cx from "classnames";
import { BookmarkPlusFill, BookmarkCheckFill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import useWatchlist from "hooks/use-watchlist";

const Watchlist = ({ className }) => {
  const { mediaType, mediaId } = useParams();

  const { watchlisted, loading, error, toggleWatchlist } = useWatchlist(
    mediaType,
    mediaId
  );

  if (error) alert(error);

  return (
    <button
      onClick={toggleWatchlist}
      type="button"
      className={cx(c.watchlist, watchlisted ? c.active : "", className)}
      disabled={loading}
    >
      {watchlisted && <BookmarkCheckFill />}
      {!watchlisted && <BookmarkPlusFill />}
      {loading && <p>loading...</p>}
      {!loading && !watchlisted && <p>WATCHLIST</p>}
      {!loading && watchlisted && <p>WATCHLISTED</p>}
    </button>
  );
};

export default Watchlist;
