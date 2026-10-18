import axios from 'axios';
import { API_DATA } from '../../utils/constants/api/openMeteoApiData';
import { toWeatherIcon, toWeatherDescription } from '../../utils/formatters';

/**
 * Maps one Open-Meteo `current` block onto the city shown on the maps.
 *
 * @param {{ name: string, coord: { lat: number, lon: number } }} city
 * @param {Object} current
 * @returns {Object}
 */
const toCityWeather = (city, current = {}) => ({
  name: city.name,
  coord: city.coord,
  main: {
    temp: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    pressure: current.pressure_msl,
    windSpeed: current.wind_speed_10m,
    cloudCover: current.cloud_cover,
    description: toWeatherDescription(current.weather_code),
    icon: toWeatherIcon(current.weather_code, current.is_day),
  },
});

/**
 * Checks that a map city has a name and finite coordinates.
 *
 * @param {Object} city
 * @returns {{ name: string, coord: { lat: number, lon: number } }}
 */
const toLocation = (city) => {
  if (
    !city.name ||
    !Number.isFinite(city.coord?.lat) ||
    !Number.isFinite(city.coord?.lon)
  ) {
    throw new Error(`Missing coordinates for ${city.name || 'a map city'}`);
  }

  return {
    name: city.name,
    coord: city.coord,
  };
};

/**
 * Creates options for the Open-Meteo forecast request.
 * One request covers every location.
 *
 * @param {Array<{ coord: { lat: number, lon: number } }>} locations
 * @returns {Object} The options object for the GET request.
 */
const openMeteoForecastOptions = (locations) => ({
  method: 'GET',
  url: API_DATA.forecast.url,
  params: {
    latitude: locations.map((city) => city.coord.lat).join(','),
    longitude: locations.map((city) => city.coord.lon).join(','),
    current: API_DATA.forecast.current,
  },
});

/**
 * Fetches current weather for the given cities from Open-Meteo.
 * One request covers every city in `cityObjects`.
 *
 * @param {Array<Object>} cityObjects
 * @returns {Promise<Object[]>}
 */
export const fetchOpenMeteoCitiesWeather = async (cityObjects) => {
  const locations = cityObjects.map(toLocation);

  try {
    const response = await axios.request(openMeteoForecastOptions(locations));

    const rows = Array.isArray(response.data) ? response.data : [response.data];

    return rows.map((row, index) =>
      toCityWeather(locations[index], row.current)
    );
  } catch (error) {
    throw new Error(`Error getting weather data: ${error.message}`);
  }
};

// /**
//  * TEMP mock — Open-Meteo 429. Delete this and uncomment the real block above to restore.
//  *
//  * @param {Array<Object>} cityObjects
//  * @returns {Promise<Object[]>}
//  */
// export const fetchOpenMeteoCitiesWeather = async (cityObjects) => {
//   const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d'];

//   return cityObjects.map((city, index) => ({
//     name: city.name,
//     coord: city.coord,
//     main: {
//       temp: Math.round(5 + ((index * 7) % 28)),
//       feelsLike: Math.round(3 + ((index * 5) % 26)),
//       humidity: 40 + (index % 50),
//       pressure: 1000 + (index % 30),
//       windSpeed: 5 + (index % 15),
//       cloudCover: (index * 13) % 100,
//       description: 'Mock weather',
//       icon: icons[index % icons.length],
//     },
//   }));
// };
