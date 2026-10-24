/**
 * Shared react-select styles for clear (X) and dropdown (chevron) indicators.
 *
 * @param {Object} styles - Base react-select styles.
 * @param {Object} theme - Theme object.
 * @returns {Object} Indicator styles.
 */
export const selectIndicatorStyles = (styles, theme) => ({
  ...styles,
  color: theme.textSecondary,
  cursor: 'pointer',
  transition: 'color 0.25s ease-in-out',
  ':hover': {
    color: theme.textPrimary,
  },
});
