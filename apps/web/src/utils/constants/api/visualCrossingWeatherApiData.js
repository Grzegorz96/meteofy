/**
 * API data for Visual Crossing Weather API.
 * @typedef {Object} ApiData
 * @property {string} url - The URL of the Visual Crossing Weather API.
 * @property {Object} units - The units of measurement for the API.
 * @property {string} units.metric - The metric unit.
 * @property {string} units.imperial - The imperial unit.
 * @property {string} units.standard - The standard unit.
 * @property {Object} airPollution - Query params for the air pollution request.
 * @property {string} airPollution.include - Sections included in the response.
 * @property {string} airPollution.contentType - Response format.
 * @property {string} airPollution.elements - Fields requested from the API.
 * @property {string} airPollution.period - Dynamic date period in the request path.
 * @property {Object} forecast - Query params for the current and forecast request.
 * @property {string} forecast.include - Sections included in the response.
 * @property {string} forecast.contentType - Response format.
 * @property {string} forecast.iconSet - Icon set used in the response.
 * @property {string} forecast.elements - Fields requested from the API.
 */

/**
 * API data for Visual Crossing Weather API.
 * @type {ApiData}
 */
export const API_DATA = {
  url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
  units: {
    metric: 'metric',
    imperial: 'imperial',
    standard: 'standard',
  },
  airPollution: {
    include: 'days,hours,current',
    contentType: 'json',
    elements: 'datetime,pm1,pm2p5,pm10,o3,no2,so2,co,aqius,aqieur',
    // Today plus the next 4 days: the window with complete hourly AQI.
    period: 'next4days',
  },
  forecast: {
    include: 'days,hours,current',
    contentType: 'json',
    iconSet: 'icons2',
    elements:
      'datetime,temp,tempmax,tempmin,precipprob,windspeed,feelslike,conditions,icon,sunrise,sunset,humidity,pressure,visibility,dew,cloudcover',
  },
};
