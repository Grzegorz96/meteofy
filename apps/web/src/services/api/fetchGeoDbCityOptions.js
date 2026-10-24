import axios from 'axios';
import {
  API_DATA,
  MIN_REQUEST_INTERVAL,
} from '@/utils/constants/api/geoDbApiData';

/**
 * Creates options for the GeoDB Cities search request.
 *
 * @param {string} inputValue - The input value to filter cities by name.
 * @param {number} page - The page number of the results to fetch.
 * @returns {Object} The options object for the API request.
 */
const geoDbCitiesOptions = (inputValue, page) => ({
  method: 'GET',
  url: API_DATA.url,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_GEO_DB_API_KEY,
    'X-RapidAPI-Host': API_DATA.host,
  },
  params: {
    namePrefix: inputValue,
    types: API_DATA.types,
    offset: API_DATA.limit * (page - 1),
    limit: API_DATA.limit,
    sort: API_DATA.sort,
  },
});

/**
 * Resolves after the given delay.
 *
 * @param {number} ms - Delay in milliseconds.
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A request starts only after the previous one has finished plus the minimum
// interval, so network jitter can never shrink the gap seen by the API gateway.
// Module-level, so every select in the app shares one queue.
let queue = Promise.resolve();

const enqueue = (task) => {
  const result = queue.then(task);
  queue = result.catch(() => {}).then(() => sleep(MIN_REQUEST_INTERVAL));
  return result;
};

// One retry on 429 (per-second rate limit); other errors go to the caller.
const requestCities = async (inputValue, page) => {
  try {
    return await axios.request(geoDbCitiesOptions(inputValue, page));
  } catch (error) {
    if (error.response?.status !== 429) throw error;
    await sleep(MIN_REQUEST_INTERVAL);
    return axios.request(geoDbCitiesOptions(inputValue, page));
  }
};

/**
 * Loads city options for the search select from GeoDB Cities.
 *
 * @param {string} inputValue - The input value entered by the user.
 * @param {function} _loadOptions - The function to load options.
 * @param {object} options - Additional options.
 * @param {number} options.page - The current page number.
 * @returns {Promise<object>} Loaded options for the select.
 */
export const fetchGeoDbCityOptions = (inputValue, _loadOptions, { page }) =>
  enqueue(async () => {
    try {
      const response = await requestCities(inputValue, page);

      return {
        options: response.data.data.map((city) => ({
          label: `${city.name}, ${city.countryCode}`,
          value: {
            latitude: city.latitude,
            longitude: city.longitude,
          },
        })),
        hasMore:
          response.data.metadata.totalCount -
            (response.data.metadata.currentOffset + API_DATA.limit) >
          0,
        additional: { page: page + 1 },
      };
    } catch {
      return { options: [], hasMore: false, additional: { page } };
    }
  });
