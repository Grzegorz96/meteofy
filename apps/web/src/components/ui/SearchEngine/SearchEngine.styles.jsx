import { selectIndicatorStyles } from '@/utils/styles/reactSelectStyles';

/**
 * Builds shared react-select styles; callers only pass layout-specific bits.
 *
 * @param {Object} theme - Theme object.
 * @param {Object} options
 * @param {Function} options.container - Container style fn.
 * @param {Function} options.control - Control style fn.
 * @param {number|string} options.menuPortalZIndex - Portal z-index.
 * @param {boolean} [options.compactOnMobile=false] - Smaller font under 450px.
 * @returns {Object} Styles object for react-select.
 */
const createInputStyles = (
  theme,
  { container, control, menuPortalZIndex, compactOnMobile = false }
) => {
  const mobileFont = compactOnMobile
    ? { '@media (max-width: 450px)': { fontSize: '12px' } }
    : {};

  return {
    container,
    control,
    input: (styles) => ({
      ...styles,
      color: theme.textPrimary,
      transition: 'color 0.25s ease-in-out',
      ...mobileFont,
    }),
    placeholder: (styles) => ({
      ...styles,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: theme.textSecondary,
      transition: 'color 0.25s ease-in-out',
      ...mobileFont,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: theme.textPrimary,
      transition: 'color 0.25s ease-in-out',
      ...mobileFont,
    }),
    clearIndicator: (styles) => selectIndicatorStyles(styles, theme),
    dropdownIndicator: (styles) => selectIndicatorStyles(styles, theme),
    menu: (styles) => ({
      ...styles,
      backgroundColor: theme.secondary,
      color: theme.textPrimary,
      overflow: 'hidden',
      border: `1px solid ${theme.textSecondary}`,
      transition:
        'background-color 0.25s ease-in-out, border 0.25s ease-in-out, color 0.25s ease-in-out',
    }),
    menuPortal: (styles) => ({
      ...styles,
      zIndex: menuPortalZIndex,
    }),
    option: (styles, state) => ({
      ...styles,
      cursor: 'pointer',
      color: state.isSelected ? theme.textPrimary : styles.color,
      backgroundColor:
        state.isFocused || state.isSelected
          ? theme.textSecondary
          : styles.backgroundColor,

      ':active': {
        backgroundColor: theme.textSecondary,
      },

      ...mobileFont,
    }),
  };
};

/**
 * Global input styles (header search).
 *
 * @param {Object} theme - Theme object.
 * @returns {Object} Styles object.
 */
export const globalInputStyles = (theme) =>
  createInputStyles(theme, {
    compactOnMobile: true,
    menuPortalZIndex: '400',
    container: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      flexShrink: '2',
      minWidth: '146px',
      maxWidth: '400px',
      border: 'none',
    }),
    control: (styles, state) => ({
      ...styles,
      backgroundColor: theme.secondary,
      boxShadow: state.isFocused ? `0 0 0 2px ${theme.textSecondary}` : 'none',
      border: 'none',
      height: '40px',
      width: '100%',
      cursor: 'text',
      color: theme.textPrimary,
      transition:
        'box-shadow 0.25s ease-in-out, background-color 0.25s ease-in-out',
    }),
  });

/**
 * Local input styles (page overlays, e.g. air pollution / long-term).
 *
 * @param {Object} theme - Theme object.
 * @returns {Object} Styles object.
 */
export const localInputStyles = (theme) =>
  createInputStyles(theme, {
    menuPortalZIndex: '2',
    container: (styles) => ({
      ...styles,
      width: '100%',
      maxWidth: '400px',
      position: 'fixed',
      top: '60px',
      zIndex: '2',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    control: (styles, state) => ({
      ...styles,
      backgroundColor: theme.secondary,
      height: '40px',
      width: '100%',
      borderRadius: '0',
      marginInline: '20px',
      borderBottomRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      cursor: 'text',
      boxShadow: `0px ${state.isFocused ? '1.5px 1px 1.5px' : '1px 1px 1px'} ${theme.textSecondary}`,
      border: 'none',
      transition:
        'box-shadow 0.25s ease-in-out, background-color 0.25s ease-in-out',
    }),
  });
