import useHttp from "hooks/use-http";
import { API, API_KEY } from "utils/api-config";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "context/auth-context";
import { useNavigate } from "react-router-dom";

const useWatchlist = (mediaType, mediaId) => {
  const { sessionId, user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    loading: userLoading,
    data: userData,
    error: userError,
    sendRequest: fetchUser,
  } = useHttp();
  const {
    loading: watchlistLoading,
    data: watchlistData,
    error: watchlistError,
    sendRequest: sendWatchlist,
  } = useHttp();

  useEffect(() => {
    if (!user) return;
    const userUrl = `${API}${mediaType}/${mediaId}/account_states?api_key=${API_KEY}&session_id=${sessionId}`;
    fetchUser({ url: userUrl });
  }, [API, mediaType, mediaId, API_KEY, user, watchlistData]);

  const toggleWatchlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const watchlistUrl = `${API}account/${user?.id}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`;
    sendWatchlist({
      url: watchlistUrl,
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: {
        media_type: mediaType,
        media_id: mediaId,
        watchlist: !watchlisted,
      },
    });
  };

  const watchlisted = userData?.watchlist;

  return {
    watchlisted,
    loading: userLoading || watchlistLoading || authLoading,
    error: userError || watchlistError,
    toggleWatchlist,
  };
};

export default useWatchlist;
