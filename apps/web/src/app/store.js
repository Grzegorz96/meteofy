import { configureStore } from '@reduxjs/toolkit';
import {
  cityDataReducer,
  themeDataReducer,
  themeStorageMiddleware,
} from '../state';

/**
 * The Redux store for managing the application state.
 */
const store = configureStore({
  reducer: {
    cityData: cityDataReducer,
    themeData: themeDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(themeStorageMiddleware),
});

export default store;
