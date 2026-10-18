import axios from 'axios';
import { API_DATA } from '../../utils/constants/api/openMeteoApiData';

/**
 * Creates options for the Open-Meteo seasonal request.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {object} The options object for the GET request.
 */
const openMeteoSeasonalOptions = (latitude, longitude) => ({
  method: 'GET',
  url: API_DATA.seasonal.url,
  params: {
    latitude,
    longitude,
    past_days: API_DATA.seasonal.pastDays,
    forecast_days: API_DATA.seasonal.forecastDays,
    daily: API_DATA.seasonal.daily,
  },
});

/**
 * Fetches seasonal weather data from Open-Meteo for a given location.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise} A promise that resolves to the seasonal weather data.
 * @throws {Error} If there is an error while fetching the data.
 */
export const fetchOpenMeteoSeasonalWeather = async (latitude, longitude) => {
  try {
    const response = await axios.request(
      openMeteoSeasonalOptions(latitude, longitude)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting seasonal weather data: ${error.message}`);
  }
};
