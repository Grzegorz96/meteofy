import { useEffect, useRef } from 'react';
import {
  ScrollableContainer,
  NavigateButton,
  ScrollWrapper,
} from './ScrollContainer.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

/**
 * @component
 * Component for scrolling horizontally through content.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Child components to be scrolled.
 * @param {Array} props.listOfScrollContainers - List of scrollable containers.
 * @returns {JSX.Element} JSX element representing the scroll container.
 */
export default function ScrollContainer({ children, listOfScrollContainers }) {
  const scrollableContainerRef = useRef(null);
  listOfScrollContainers.push(scrollableContainerRef);

  /**
   * Handles scrolling left when the back button is clicked.
   */
  function handleBackButtonClick() {
    const scrollableContainer = scrollableContainerRef.current;
    scrollableContainer.style.scrollBehavior = 'smooth';
    scrollableContainer.scrollLeft -= 400;
  }

  /**
   * Handles scrolling right when the next button is clicked.
   */
  function handleNextButtonClick() {
    const scrollableContainer = scrollableContainerRef.current;
    scrollableContainer.style.scrollBehavior = 'smooth';
    scrollableContainer.scrollLeft += 400;
  }

  useEffect(() => {
    const scrollableContainer = scrollableContainerRef.current;
    /**
     * Handles the wheel event for scrolling.
     * @param {WheelEvent} evt - The wheel event.
     */
    const handleWheelScroll = (evt) => {
      evt.preventDefault();
      scrollableContainer.style.scrollBehavior = 'auto';
      scrollableContainer.scrollLeft += evt.deltaY;
    };
    scrollableContainer.addEventListener('wheel', handleWheelScroll, {
      passive: false,
    });
    return () => {
      scrollableContainer.removeEventListener('wheel', handleWheelScroll);
    };
  }, []);

  return (
    <ScrollWrapper>
      <NavigateButton onClick={handleBackButtonClick} $left="15px">
        <FaChevronLeft />
      </NavigateButton>
      <ScrollableContainer ref={scrollableContainerRef}>
        {children}
      </ScrollableContainer>
      <NavigateButton onClick={handleNextButtonClick} $right="15px">
        <FaChevronRight />
      </NavigateButton>
    </ScrollWrapper>
  );
}
