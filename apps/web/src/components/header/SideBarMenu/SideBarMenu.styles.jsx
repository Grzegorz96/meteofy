import styled from 'styled-components';

/**
 * @component
 * Styled component for a burger menu. Overwrites the classes inside it depending on the supplied theme object.
 *
 * @prop {Object} theme - The theme object containing color configurations.
 */
export const StyledBurgerMenu = styled.div`
  margin-right: 10px;

  .bm-burger-button {
    position: relative;
    width: 35px;
    height: 30px;

    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.textPrimary};
      outline-offset: 5px;
      border-radius: 3px;
    }
  }

  .bm-burger-bars {
    background-color: ${({ theme }) => theme.textPrimary};
    transition: background-color 0.25s ease-in-out;
  }

  .bm-cross-button {
    top: 10px !important;
    right: 10px !important;
    height: 40px !important;
    width: 40px !important;

    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.textPrimary};
      border-radius: 6px;
    }
  }

  .bm-cross {
    top: -1px;
    right: 4.5px;
    background-color: ${({ theme }) => theme.textPrimary};
    transition: background-color 0.25s ease-in-out;
    height: 30px !important;
  }

  .bm-menu-wrap {
    top: 0;
    position: fixed;
    height: 100%;
  }

  .bm-menu {
    background-color: ${({ theme }) => theme.secondary};
    transition: background-color 0.25s ease-in-out;
    padding-top: 60px;
  }

  .bm-overlay {
    background: ${({ theme }) => theme.overlay};
    left: 0;
    top: 0;
    z-index: 1070 !important;
  }
`;
