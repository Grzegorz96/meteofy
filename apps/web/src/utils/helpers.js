import { AQI_US_DATA } from './constants/aqiUSData';
import { startOfDay, addDays, subDays } from 'date-fns';

/**
 * Retrieves the AQI US data based on the given AQI value.
 * @param {number} aqiValue - The AQI value to retrieve the data for.
 * @returns {object|null} The AQI US data object that matches the given AQI value, or null if the value is invalid.
 */
export function getAqiUSData(aqiValue) {
  if (aqiValue === null || isNaN(aqiValue)) {
    return null;
  }

  const lastIndex = AQI_US_DATA.length - 1;

  // Check if the AQI value is greater than the highest value in the data.
  if (aqiValue >= AQI_US_DATA[lastIndex].aqiUSLevel[0]) {
    return AQI_US_DATA[lastIndex];
  }

  // Find the AQI data that matches the given value.
  return AQI_US_DATA.find((data) => {
    return aqiValue >= data.aqiUSLevel[0] && aqiValue <= data.aqiUSLevel[1];
  });
}

/**
 * Returns the default date range.
 * @returns {Array<Date>} An array containing the start and end dates of the default range.
 */
export const getDefaultDateRange = () => {
  return [startOfDay(new Date()), startOfDay(addDays(new Date(), 44))];
};

/**
 * Object representing the delay settings for requesting a city.
 * @typedef {Object} RequestCityDelay
 * @property {number} lastRequestTime - The timestamp of the last request.
 * @property {number} minRequestInterval - The minimum interval between requests in milliseconds.
 */

/**
 * The requestCityDelay object stores the delay settings for requesting a city.
 * @type {RequestCityDelay}
 */
export const requestCityDelay = {
  lastRequestTime: 0,
  minRequestInterval: 1300,
};

/**
 * Returns an array of date ranges.
 * @param {boolean} moveRangesToBottom Indicates whether to move the ranges to the bottom or left.
 * @returns {Array} An array of date ranges.
 */
export const getRanges = (moveRangesToBottom) => {
  return [
    {
      label: 'last 7 Days',
      value: [startOfDay(subDays(new Date(), 6)), startOfDay(new Date())],
      placement: moveRangesToBottom ? 'bottom' : 'left',
    },
    {
      label: 'last 30 Days',
      value: [startOfDay(subDays(new Date(), 29)), startOfDay(new Date())],
      placement: moveRangesToBottom ? 'bottom' : 'left',
    },
    {
      label: 'last 90 Days',
      value: [startOfDay(subDays(new Date(), 89)), startOfDay(new Date())],
      placement: moveRangesToBottom ? 'bottom' : 'left',
    },
    {
      label: 'next 7 Days',
      value: [startOfDay(new Date()), startOfDay(addDays(new Date(), 6))],
      placement: moveRangesToBottom ? 'bottom' : 'left',
    },
    {
      label: 'next 30 Days',
      value: [startOfDay(new Date()), startOfDay(addDays(new Date(), 29))],
      placement: moveRangesToBottom ? 'bottom' : 'left',
    },
    {
      label: 'next 90 Days',
      value: [startOfDay(new Date()), startOfDay(addDays(new Date(), 89))],
      placement: moveRangesToBottom ? 'bottom' : 'left',
    },
  ];
};

/**
 * Blurs the focused element when it sits inside `container`.
 * Avoids Chrome warning when a parent gets `aria-hidden` while a descendant keeps focus.
 *
 * @param {Element | null | undefined} container
 */
export const releaseFocusWithin = (container) => {
  const activeElement = document.activeElement;

  if (
    activeElement instanceof HTMLElement &&
    container?.contains(activeElement)
  ) {
    activeElement.blur();
  }
};

/**
 * Sets or clears `inert` on `#root` (for overlays rendered outside the app root).
 *
 * @param {boolean} isInert
 */
export const setRootInert = (isInert) => {
  const root = document.getElementById('root');
  if (!root) return;

  if (isInert) {
    releaseFocusWithin(root);
    root.setAttribute('inert', '');
  } else {
    root.removeAttribute('inert');
  }
};

/**
 * Locks `#root` with `inert` + `aria-hidden` for custom modals (not SweetAlert).
 *
 * @param {boolean} isLocked
 */
export const setRootLocked = (isLocked) => {
  const root = document.getElementById('root');
  if (!root) return;

  setRootInert(isLocked);

  if (isLocked) {
    root.setAttribute('aria-hidden', 'true');
  } else {
    root.removeAttribute('aria-hidden');
  }
};
