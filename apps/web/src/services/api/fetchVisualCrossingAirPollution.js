import axios from 'axios';
import { API_DATA } from '../../utils/constants/api/visualCrossingWeatherApiData';

/**
 * Creates options for the Visual Crossing air pollution request.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Object} The options object for making the API request.
 */
const visualCrossingAirPollutionOptions = (latitude, longitude) => ({
  method: 'GET',
  url: `${API_DATA.url}/${latitude},${longitude}/${API_DATA.airPollution.period}`,
  params: {
    key: import.meta.env.VITE_VISUAL_CROSSING_API_KEY,
    unitGroup: API_DATA.units.metric,
    include: API_DATA.airPollution.include,
    contentType: API_DATA.airPollution.contentType,
    elements: API_DATA.airPollution.elements,
  },
});

/**
 * Fetches air pollution data from Visual Crossing for a given location.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object>} A promise that resolves to the air pollution data.
 * @throws {Error} If there is an error while fetching the data.
 */
export const fetchVisualCrossingAirPollution = async (latitude, longitude) => {
  try {
    const response = await axios.request(
      visualCrossingAirPollutionOptions(latitude, longitude)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting air pollution data: ${error.message}`);
  }
};
