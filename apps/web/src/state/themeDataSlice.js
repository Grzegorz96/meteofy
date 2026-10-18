import { createSlice } from '@reduxjs/toolkit';

export const THEME_DATA_KEY = 'meteofy-is-dark-theme';

/**
 * Reads the saved theme. Only the strings "true" and "false" are accepted.
 * A missing or broken value falls back to the system preference and is saved.
 * @returns {boolean} The initial theme mode (true for dark mode, false for light mode).
 */
const getInitialThemeMode = () => {
  try {
    const storedIsDarkMode = localStorage.getItem(THEME_DATA_KEY);

    if (storedIsDarkMode === 'true') return true;
    if (storedIsDarkMode === 'false') return false;
  } catch (e) {
    console.warn('Error getting initial theme mode:', e);
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initialState = {
  isDarkMode: getInitialThemeMode(),
};

/**
 * Represents a slice of theme data.
 *
 * @typedef {Object} ThemeDataSlice
 * @property {string} name - The name of the theme data slice.
 * @property {Object} initialState - The initial state of the theme data slice.
 * @property {Object} reducers - The reducers for the theme data slice.
 * @property {Function} reducers.toggleThemeMode - A reducer function that toggles the theme mode.
 */
const themeDataSlice = createSlice({
  name: 'themeData',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleThemeMode } = themeDataSlice.actions;
export default themeDataSlice.reducer;
