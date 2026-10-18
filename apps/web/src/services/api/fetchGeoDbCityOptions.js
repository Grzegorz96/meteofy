import axios from 'axios';
import { API_DATA } from '../../utils/constants/api/geoDbApiData';
import { requestCityDelay } from '../../utils/helpers';

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
 * Loads city options for the search select from GeoDB Cities.
 *
 * @param {string} inputValue - The input value entered by the user.
 * @param {function} _loadOptions - The function to load options.
 * @param {object} options - Additional options.
 * @param {number} options.page - The current page number.
 * @returns {Promise<object>} A promise that resolves to an object containing the loaded options.
 */
export const fetchGeoDbCityOptions = async (
  inputValue,
  _loadOptions,
  { page }
) => {
  const currentTime = Date.now();
  if (
    // Check if the time elapsed since the last request is greater than the minimum request interval.
    currentTime - requestCityDelay.lastRequestTime >
    requestCityDelay.minRequestInterval
  ) {
    try {
      // Update the last request time.
      requestCityDelay.lastRequestTime = currentTime;
      // Make the API request.
      const response = await axios.request(
        geoDbCitiesOptions(inputValue, page)
      );

      // Return the options object.
      return {
        options: response.data.data.map((city) => {
          return {
            label: `${city.name}, ${city.countryCode}`,
            value: {
              latitude: city.latitude,
              longitude: city.longitude,
            },
          };
        }),
        hasMore:
          response.data.metadata.totalCount -
            (response.data.metadata.currentOffset + API_DATA.limit) >
          0,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page: page,
        },
      };
    }
    // If the time elapsed since the last request is less than the minimum request interval, return an empty options object.
  } else {
    return {
      options: [],
      hasMore: true,
      additional: {
        page: page,
      },
    };
  }
};
