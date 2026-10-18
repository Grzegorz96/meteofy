import axios from 'axios';
import { API_DATA } from '../../utils/constants/api/visualCrossingWeatherApiData';

/**
 * Creates options for the Visual Crossing current and forecast request.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Object} The options object for making the API request.
 */
const visualCrossingWeatherOptions = (latitude, longitude) => ({
  method: 'GET',
  url: `${API_DATA.url}/${latitude},${longitude}`,
  params: {
    key: import.meta.env.VITE_VISUAL_CROSSING_API_KEY,
    unitGroup: API_DATA.units.metric,
    include: API_DATA.forecast.include,
    contentType: API_DATA.forecast.contentType,
    iconSet: API_DATA.forecast.iconSet,
    elements: API_DATA.forecast.elements,
  },
});

/**
 * Fetches current and forecast weather from Visual Crossing.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object>} A promise that resolves to the weather data.
 * @throws {Error} If there is an error while fetching the weather data.
 */
export const fetchVisualCrossingWeather = async (latitude, longitude) => {
  try {
    const response = await axios.request(
      visualCrossingWeatherOptions(latitude, longitude)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting weather data: ${error.message}`);
  }
};
