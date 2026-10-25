/**
 * Visual Crossing Weather API endpoints used by the app.
 * @see https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/
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
