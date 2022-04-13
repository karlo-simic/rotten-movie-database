import c from "./styles/styles.module.scss";
import cx from "classnames";

import Button from "components/Button";
import { CaretLeft, CaretRight } from "react-bootstrap-icons";

const Pagination = ({ page, totalPages, onNext, onPrev, className }) => {
  const disableNext = +page >= totalPages;
  const disablePrev = +page <= 1;

  return (
    <div className={cx(c.pagination, className)}>
      <Button
        variant="outline-secondary"
        disabled={disablePrev}
        onClick={onPrev}
      >
        <CaretLeft />
      </Button>
      <h6>
        <span>{page}</span> / <span>{totalPages}</span>
      </h6>
      <Button
        variant="outline-secondary"
        onClick={onNext}
        disabled={disableNext}
      >
        <CaretRight />
      </Button>
    </div>
  );
};

export default Pagination;
