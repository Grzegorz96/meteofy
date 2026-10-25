import { StyledAccordion, Title } from './Accordion.styles';

/**
 * @component
 * Custom accordion component.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.listOfScrollContainers - List of scrollable containers.
 * @param {ReactNode} props.children - Child components to be displayed.
 * @returns {JSX.Element} The accordion component.
 */
export default function CustomAccordion({ listOfScrollContainers, children }) {
  return (
    <StyledAccordion
      allowZeroExpanded
      onChange={(value) => {
        if (value.length) {
          listOfScrollContainers.forEach((scrollableContainerRef) => {
            if (scrollableContainerRef?.current) {
              scrollableContainerRef.current.style.scrollBehavior = 'auto';
              scrollableContainerRef.current.scrollLeft = 0;
            }
          });
        }
      }}
    >
      <Title>Daily</Title>
      {children}
    </StyledAccordion>
  );
}
