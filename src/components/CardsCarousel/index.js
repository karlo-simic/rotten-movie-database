import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useRef, useState, useEffect } from "react";
import { TRANSITION_TIMEOUT } from "utils/config";
import { CSSTransition } from "react-transition-group";
import CardCarouselBtn from "./CardsCarouselBtn";

/* 

CardsCarousel

Can take an array of any kind of card-line elements as children and
it will render them in a horizontal carousel with buttons.

*/

const CardsCarousel = ({ children }) => {
  const carouselRef = useRef();

  const leftBtnRef = useRef();
  const rightBtnRef = useRef();

  const [scroll, setScroll] = useState({ curScroll: 0, maxScroll: 1 });
  const { curScroll, maxScroll } = scroll;

  const updateScroll = (left = false) => {
    /* 
    Will be called when one of the buttons is clicked and will update scroll state
    with new values based already existing scrolling position and width of the carousel
    */
    setScroll((scroll) => {
      const contentWidth = carouselRef.current.scrollWidth; // Width of scrollable content
      const carouselWidth = carouselRef.current.offsetWidth; // Visible width of the content
      const curScroll = carouselRef.current.scrollLeft; // Current scroll on X axis
      const newMaxScroll = contentWidth - carouselWidth; // Maximum scroll on X axis

      let newCurScroll;

      // Right
      if (!left) {
        // 1. Calc new X-axis scroll
        newCurScroll = curScroll + (carouselWidth - 50); // 50 = scroll 50px bellow total width

        // 2. If at end => return prev scroll but update max scroll
        if (curScroll === newMaxScroll)
          return { curScroll, maxScroll: newMaxScroll };

        // 3. If NEW scroll surpasses MAX => return max
        if (newCurScroll > newMaxScroll) newCurScroll = newMaxScroll;
      }

      // Left
      if (left) {
        newCurScroll = curScroll - (carouselWidth - 50);
        if (curScroll === 0) return { curScroll, maxScroll: newMaxScroll };
        if (newCurScroll < 0) newCurScroll = 0;
      }

      // 4. Finally, update the state with the new calculated values
      return { curScroll: newCurScroll, maxScroll: newMaxScroll };
    });
  };

  /* 
  Fires when 'curScroll' state changes and calls the built in 'scrollTo' function
  on carousel with the new value
  */

  useEffect(() => {
    carouselRef.current.scrollTo({
      top: 0,
      left: curScroll,
      behavior: "smooth",
    });
  }, [curScroll]);

  // Is called initially to hide the right button if there is not enough scrollable content
  useEffect(() => {
    updateScroll(true);
  }, []);

  const handleScrollLeft = () => {
    updateScroll(true);
  };
  const handleScrollRight = () => {
    updateScroll();
  };
  const showScrollLeft = curScroll > 0;
  const showScrollRight = curScroll < maxScroll;

  return (
    <div className={c.container}>
      {/* Content */}
      <div className={c.carousel} ref={carouselRef}>
        <div className={c.content}>{children}</div>
      </div>

      {/* Left button */}
      <CSSTransition
        in={showScrollLeft}
        timeout={TRANSITION_TIMEOUT}
        classNames="fade"
        mountOnEnter
        unmountOnExit
        nodeRef={leftBtnRef}
      >
        <CardCarouselBtn
          left
          className={cx(c.btn, c.leftBtn)}
          onClick={handleScrollLeft}
          ref={leftBtnRef}
        />
      </CSSTransition>

      {/* Right button */}
      <CSSTransition
        in={showScrollRight}
        timeout={TRANSITION_TIMEOUT}
        classNames="fade"
        mountOnEnter
        unmountOnExit
        nodeRef={rightBtnRef}
      >
        <CardCarouselBtn
          right
          className={cx(c.btn, c.rightBtn)}
          onClick={handleScrollRight}
          ref={rightBtnRef}
        />
      </CSSTransition>
    </div>
  );
};

export default CardsCarousel;
