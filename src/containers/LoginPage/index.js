import c from "./styles/styles.module.scss";
import cx from "classnames";
import Container from "components/Container";
import Button from "components/Button";
import { useContext } from "react";
import AuthContext from "context/auth-context";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect_to");

  const handleLogin = () => {
    authContext.logIn(redirectTo?.trim());
  };

  return (
    <Container className={c.container}>
      <h1>Log In</h1>
      <p>
        You can log in with your{" "}
        <a target="_blank" href="https://www.themoviedb.org/">
          TMDB
        </a>{" "}
        account to manage your watchlist here!
      </p>
      <Button variant="outline-ternary" onClick={handleLogin}>
        Log In
      </Button>
    </Container>
  );
};

export default LoginPage;
