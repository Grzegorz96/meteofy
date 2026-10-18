import { THEME_DATA_KEY, toggleThemeMode } from './themeDataSlice';

/**
 * Redux middleware that, on `toggleThemeMode`, saves `isDarkMode` to
 * localStorage and syncs `color-scheme` on `<html>` with the new mode.
 *
 * @param {Object} store - The Redux store.
 * @returns {Function} The middleware.
 */
export const themeStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (toggleThemeMode.match(action)) {
    const { isDarkMode } = store.getState().themeData;
    localStorage.setItem(THEME_DATA_KEY, isDarkMode);

    const { style } = document.documentElement;
    style.colorScheme = isDarkMode ? 'dark' : 'light';
  }

  return result;
};
