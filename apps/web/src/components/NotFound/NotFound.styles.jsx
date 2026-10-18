import styled from 'styled-components';
import { Link } from 'react-router-dom';

/**
 * @component
 * A styled wrapper for the 404 Not Found page.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const NotFoundWrapper = styled.div`
  padding: 25px;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textPrimary};
  box-shadow: 0 0 10px ${({ theme }) => theme.shadow};
  transition:
    color 0.25s ease-in-out,
    background-color 0.25s ease-in-out,
    box-shadow 0.25s ease-in-out;
`;

/**
 * @component
 * Styled component for the title of the 404 Not Found page.
 */
export const Title = styled.h1`
  text-align: center;

  @media (max-width: 350px) {
    font-size: 24px;
  }
`;

/**
 * @component
 * Styled link component for navigation in the 404 Not Found page.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const LinkStyled = styled(Link)`
  text-decoration: none;
  background-color: #7066e0;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.textPrimary};
  transition: color 0.25s ease-in-out;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  text-align: center;

  &:focus {
    outline: 3px solid #7066e099;
  }

  &:hover {
    background-color: #655cc9;
  }
`;
