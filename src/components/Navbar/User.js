import c from "./styles/User.module.scss";
import cx from "classnames";
import { useContext } from "react";
import { getAvatarUrl } from "utils/helpers";
import { PROFILE_SMALL } from "utils/api-config";
import { CaretDownFill } from "react-bootstrap-icons";
import DropdownMenu from "components/DropdownMenu";
import AuthContext from "context/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
import { APP } from "utils/config";
import Button from "components/Button";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const authContext = useContext(AuthContext);

  const avatar = getAvatarUrl(
    PROFILE_SMALL,
    authContext.user?.avatar.tmdb.avatar_path
  );

  const handleLogIn = () => {
    navigate(`/login?redirect_to=${APP.slice(0, -1)}${location.pathname}`);
  };
  const handleLogOut = () => {
    authContext.logOut();
  };

  return (
    <DropdownMenu
      dropBtn={
        <Button variant="shadow-ternary" type="button" className={c.button}>
          <img src={avatar} alt="User" className={c.avatar} />
          <CaretDownFill />
        </Button>
      }
    >
      <p className={c.username}>
        {authContext.user?.username || "Not logged in"}
      </p>
      {!authContext.user && (
        <button data-button onClick={handleLogIn} type="button">
          Log In
        </button>
      )}
      {authContext.user && (
        <button data-button onClick={handleLogOut} type="button">
          Log Out
        </button>
      )}
    </DropdownMenu>
  );
};

export default User;
