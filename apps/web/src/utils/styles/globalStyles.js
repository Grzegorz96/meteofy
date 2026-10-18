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

  ::-webkit-scrollbar {
    width: 8px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    margin-block: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 25px;
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: #575757;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #373737;
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

    @media (max-width: 768px) {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  }
`;

export const GlobalStyles = createGlobalStyle`${styles}`;
