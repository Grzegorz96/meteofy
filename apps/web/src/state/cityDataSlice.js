import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

/**
 * Slice for managing city data.
 *
 * @typedef {Object} CityDataSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for the slice.
 * @property {Function} reducers.setCityData - Reducer function for setting city data.
 * @property {Function} reducers.resetCityData - Reducer function for resetting city data.
 */
const cityDataSlice = createSlice({
  name: 'cityData',
  initialState,
  reducers: {
    setCityData: (_state, { payload }) => payload,
    resetCityData: () => initialState,
  },
});

export const { setCityData, resetCityData } = cityDataSlice.actions;
export default cityDataSlice.reducer;
