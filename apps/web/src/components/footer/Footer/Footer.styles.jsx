import styled from 'styled-components';
import PageName from '../../../assets/images/page-name.svg?react';

/**
 * @component
 * Styled component for the footer.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.footer};
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for the page name logo of Meteofy.
 */
export const StyledPageName = styled(PageName)`
  height: 100%;
  width: auto;

  g {
    stroke: none;
    fill: ${({ theme }) => theme.textPrimary};
    transition: fill 0.25s ease-in-out;
  }
`;
