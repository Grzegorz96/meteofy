/**
 * Represents the theme object containing various style properties.
 *
 * @typedef {Object} Theme
 * @property {string} header - The color value for the header.
 * @property {string} footer - The color value for the footer.
 * @property {string} fontFamily - The font family for the text.
 * @property {string} backgroundFocus - The color value for the focused background.
 * @property {string} overlay - The color value for the overlay.
 * @property {string} textSecondary - The color value for the secondary text.
 */

/**
 * The theme object containing various style properties.
 *
 * @type {Theme}
 */
const theme = {
  header: 'rgba(102, 102, 102, 0.40)',
  footer: 'rgba(102, 102, 102, 0.40)',
  fontFamily: 'Arial, Helvetica, sans-serif',
  backgroundFocus: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.4) !important',
  textSecondary: '#818181',
};

/**
 * Dark theme object.
 * @typedef {Object} DarkTheme
 * @property {boolean} isDarkMode - Indicates if the theme is in dark mode.
 * @property {string} primary - The primary color.
 * @property {string} secondary - The secondary color.
 * @property {string} textPrimary - The primary text color.
 * @property {string} navLink - The color of navigation links.
 * @property {string} navLinkHover - The color of navigation links on hover.
 * @property {string} shadow - The shadow color.
 * @property {string} tooltip - The tooltip color.
 * @property {string} europeMarker - The color of the marker in Europe.
 * @property {string} chartBackgroundStart - The start color of the chart background.
 * @property {string} chartBackgroundEnd - The end color of the chart background.
 */

/**
 * Dark theme configuration.
 * @type {DarkTheme}
 */
export const darkTheme = {
  ...theme,
  isDarkMode: true,
  primary: '#121212',
  secondary: '#1e1e1e',
  textPrimary: '#e3e3e3',
  navLink: '#bb86fc',
  navLinkHover: 'rgba(187, 134, 252, 0.7);',
  shadow: 'rgb(255 255 255 / 30%)',
  tooltip: 'rgba(255, 255, 255, 0.75)',
  europeMarker: 'rgba(0, 0, 0, 0.75)',
  chartBackgroundStart: 'rgba(255, 255, 255, 0.01)',
  chartBackgroundEnd: 'rgba(255, 255, 255, 0.5)',
};

/**
 * Light theme object.
 * @typedef {Object} LightTheme
 * @property {boolean} isDarkMode - Indicates if the theme is in dark mode.
 * @property {string} primary - The primary color of the theme.
 * @property {string} secondary - The secondary color of the theme.
 * @property {string} textPrimary - The primary text color of the theme.
 * @property {string} navLink - The color of the navigation link.
 * @property {string} navLinkHover - The color of the navigation link on hover.
 * @property {string} shadow - The color of the shadow.
 * @property {string} tooltip - The color of the tooltip.
 * @property {string} europeMarker - The color of the marker in Europe.
 * @property {string} chartBackgroundStart - The start color of the chart background.
 * @property {string} chartBackgroundEnd - The end color of the chart background.
 */

/**
 * Light theme configuration.
 * @type {LightTheme}
 */
export const lightTheme = {
  ...theme,
  isDarkMode: false,
  primary: '#ffffff',
  secondary: '#f1f1f1',
  textPrimary: '#000000',
  navLink: '#6200ee',
  navLinkHover: 'rgba(99, 0, 238, 0.7)',
  shadow: 'rgb(0 0 0 / 30%)',
  tooltip: 'rgba(0, 0, 0, 0.75)',
  europeMarker: 'rgba(255, 255, 255, 0.75)',
  chartBackgroundStart: 'rgba(0, 0, 0, 0.01)',
  chartBackgroundEnd: 'rgba(0, 0, 0, 0.5)',
};
