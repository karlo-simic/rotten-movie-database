import { createContext, useState, useEffect } from "react";
import { API, API_KEY } from "utils/api-config";
import { APP } from "utils/config";
import { useDispatch } from "react-redux";
import { alertActions } from "store/alert-slice";

/* 

AuthContext

How it works:

   When user clicks the login button, we create a new request token and
   redirect the user with that token to TMDB to approve it. We also store
   the token in localStorage, so that when they are redirected back, we
   can request a sessionId and user data. Then after that data has been
   fetched we delete the token from localStorage.

   Token can only be used once and it's not safe to store the session Id
   in localStorage so user will be logged out every time they leave the
   site.

*/

const AuthContext = createContext({
  sessionId: null,
  user: {},
  loading: false,
  logIn: () => {},
  logOut: () => {},
});

let logOutTimer;

export const AuthContextProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logOut = () => {
    if (logOutTimer) clearTimeout(logOutTimer);
    setSessionId(null);
    setUser(null);
    window.location.reload();
  };

  /* 
  This useEffect is fired on page load and it checks if there is
  a token stored on localStorage. If it is not the useEffect won't do
  anything. But if it is, then that means that we've previously created
  a token, stored it in localStorage, and redirected the user to TMDB
  to approve our token. Now that the user has been redirected back we
  will try to fetch sessionId and users data. If the user has declined
  our token, they will be notified with an alert.
  */
  useEffect(() => {
    // 1. Check if token is stored in localStorage
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (!localToken) return;
    const { token, expiresAt } = localToken;
    localStorage.removeItem("token");

    // 3. Check if token is expired
    const expTime = new Date(expiresAt).getTime();
    const curTime = Date.now();
    const expiresIn = Math.round(expTime - curTime);

    if (expiresIn <= 0) return;

    // 4. Set a timer to automatically log the user out when the
    //    token expires
    logOutTimer = setTimeout(expiresIn);

    fetchSessionIdAndUserData(token);
  }, []);

  const fetchSessionIdAndUserData = async (token) => {
    setLoading(true);
    try {
      // 1. Request session Id
      const sessionIdRes = await fetch(
        `${API}authentication/session/new?api_key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request_token: token }),
        }
      );
      const sessionIdData = await sessionIdRes.json();

      if (sessionIdData.failure)
        throw new Error(
          `Failed to log in! ${sessionIdData.status_message} (${sessionIdData.status_code})`
        );

      // 2.  Request user data
      const userRes = await fetch(
        `${API}account?api_key=${API_KEY}&session_id=${sessionIdData.session_id}`
      );

      if (!userRes.ok)
        throw new Error(
          `Failed to log in! ${userRes.status_message} (${userRes.status_code})`
        );

      const userData = await userRes.json();

      // 3. Update state
      setSessionId(sessionIdData.session_id);
      setUser(userData);
      setLoading(false);
    } catch (err) {
      dispatch(alertActions.showAlert(err.message));
      console.error(err);
      setLoading(false);
    }
  };

  /* 
  This function is called when the user clicks the login button.
  It creates a new token and redirects the user to TMDB with that
  token to approve it. Token is stored in localStorage so when
  the user is redirected back the useEffect above will read the
  locally stored token and try to request sessionId and user's data.

  'redirectTo' - where should TMDB redirect the user after they
                 authorize our token.
  */
  const createToken = async (redirectTo = `${APP}home`) => {
    try {
      // 1. Create a new request token
      const res = await fetch(
        `${API}authentication/token/new?api_key=${API_KEY}`
      );
      const data = await res.json();

      if (!data.success)
        throw new Error(`${data.status_message} (${data.status_code})`);

      // 2. Store the token in localStorage
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: data.request_token,
          expiresAt: data.expires_at,
        })
      );

      // 3. Redirect the user to TMDB to approve our token
      window.location.replace(
        `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectTo}`
      );
    } catch (err) {
      dispatch(alertActions.showAlert(err.message));
      console.error(err);
    }
  };

  const logIn = (redirectTo) => {
    createToken(redirectTo);
  };

  return (
    <AuthContext.Provider
      value={{
        sessionId,
        user,
        loading,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
