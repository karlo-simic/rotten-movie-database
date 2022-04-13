import c from "./styles/CardsCarouselBtn.module.scss";
import cx from "classnames";

import { forwardRef } from "react";
import { CaretRight, CaretLeft } from "react-bootstrap-icons";

const CardsCarouselBtn = ({ right, left, onClick, className }, ref) => {
  return (
    <button className={cx(c.btn, className)} onClick={onClick} ref={ref}>
      {right && <CaretRight />}
      {left && <CaretLeft />}
    </button>
  );
};

export default forwardRef(CardsCarouselBtn);
