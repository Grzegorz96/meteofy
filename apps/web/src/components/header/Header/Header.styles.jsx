import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo-meteofy.svg?react';

/**
 * @component
 * Styled component for the header.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const Header = styled.header`
  background-color: ${({ theme }) => theme.header};
  width: 100%;
  height: 60px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for a link. This component provides styling for a link using the Link component from React Router.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  flex-shrink: 1;
  margin-left: 10px;
  transition: background-color 0.25s ease-in-out;
  border-radius: 6px;

  &:focus-visible {
    outline: none;
    background-color: ${({ theme }) => theme.backgroundFocus};
  }
`;

/**
 * @component
 * Styled component for the logo of Meteofy.
 */
export const StyledLogo = styled(Logo)`
  height: auto;
  width: 100%;

  g {
    stroke: none;
    fill: ${({ theme }) => theme.textPrimary};
    transition: fill 0.25s ease-in-out;
  }
`;
