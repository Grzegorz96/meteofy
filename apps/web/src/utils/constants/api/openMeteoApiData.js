/**
 * Open-Meteo endpoints used by the app.
 * @see https://open-meteo.com/en/docs
 */
export const API_DATA = {
  seasonal: {
    url: 'https://seasonal-api.open-meteo.com/v1/seasonal',
    pastDays: 396,
    forecastDays: 217,
    daily:
      'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max',
  },
  forecast: {
    url: 'https://api.open-meteo.com/v1/forecast',
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,cloud_cover,pressure_msl,wind_speed_10m',
  },
};
