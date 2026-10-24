import { createGlobalStyle, css } from 'styled-components';

/**
 * @component
 * Global styles for the application.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
const styles = css`
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    background: ${({ theme }) => theme.primary};
    transition: background-color 0.25s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fontFamily};
    -webkit-tap-highlight-color: transparent;
    scrollbar-width: thin;
    scrollbar-color: rgba(87, 87, 87, 0.55) transparent;

    @media (max-width: 768px) {
      scrollbar-width: none;
    }
  }
`;

export const GlobalStyles = createGlobalStyle`${styles}`;
