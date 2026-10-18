import styled from 'styled-components';

/**
 * @component
 * Styled component for the navigation bar.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 * @prop {boolean} $isMobile - Determines the flex direction and alignment based on the device screen size.
 */
export const Navigate = styled.nav`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => $isMobile && 'center'};
  max-width: 1000px;
  width: 100%;
  flex-shrink: 3;

  a {
    text-decoration: none;
    width: 100%;
    max-width: ${({ $isMobile }) => ($isMobile ? '100%' : '200px')};
    height: ${({ $isMobile }) => !$isMobile && '60px'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    position: relative;
    background-color: ${({ theme }) => theme.navLink};
    font-weight: bold;
    white-space: nowrap;
    padding: 5px;
    transition: background-color 0.25s ease-in-out;

    &:focus-visible {
      outline: none;
      background-color: ${({ theme }) => theme.backgroundFocus};
    }

    &:hover {
      background-color: ${({ theme }) => theme.navLinkHover};
    }

    svg {
      font-size: 1.3rem;
    }

    &.active::before {
      content: '';
      background-color: #03dac6;
      position: absolute;
      height: ${({ $isMobile }) => ($isMobile ? '100%' : '5px')};
      width: ${({ $isMobile }) => ($isMobile ? '5px' : '100%')};
      ${({ $isMobile }) => ($isMobile ? 'left: 0;' : 'bottom: 0;')}
    }

    @media (max-width: 1000px) {
      font-size: 0.9rem;
    }

    @media (max-width: 900px) {
      font-size: 0.8rem;
    }

    @media (max-width: 850px) {
      font-size: 0.7rem;
    }

    @media (max-width: 800px) {
      font-size: 0.6rem;
    }

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;
