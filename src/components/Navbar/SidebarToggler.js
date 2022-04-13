import c from "./styles/SidebarToggler.module.scss";
import cx from "classnames";
import { List } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { sidebarActions } from "store/sidebar-slice";
import Button from "components/Button";

const SidebarToggler = ({ className }) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(sidebarActions.showSidebar());
  };

  return (
    <Button
      type="button"
      className={cx(c.button, className)}
      onClick={handleOpen}
      variant="shadow-primary"
    >
      <List />
    </Button>
  );
};

export default SidebarToggler;
