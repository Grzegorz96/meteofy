import axios from 'axios';
import { API_DATA } from '../../utils/constants/api/geoApifyApiData';

/**
 * Creates options for the GeoApify reverse geocoding request.
 *
 * @param {number} latitude - The latitude coordinate.
 * @param {number} longitude - The longitude coordinate.
 * @returns {Object} The options object for the API request.
 */
const geoApifyReverseGeocodingOptions = (latitude, longitude) => ({
  method: 'GET',
  url: API_DATA.url,
  params: {
    lat: latitude,
    lon: longitude,
    apiKey: import.meta.env.VITE_GEO_APIFY_API_KEY,
    format: API_DATA.format,
  },
});

/**
 * Fetches reverse geocoding data from GeoApify for the given coordinates.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object>} The reverse geocoding response data.
 * @throws {Error} If there is an error while fetching the city name.
 */
export const fetchGeoApifyReverseGeocoding = async (latitude, longitude) => {
  try {
    const response = await axios.request(
      geoApifyReverseGeocodingOptions(latitude, longitude)
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting city name: ${error.message}`);
  }
};
