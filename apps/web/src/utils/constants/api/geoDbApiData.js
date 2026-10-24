/**
 * GeoDB Cities endpoint used by the city search.
 * @see https://rapidapi.com/wirefreethought/api/geodb-cities
 */
export const API_DATA = {
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  host: 'wft-geo-db.p.rapidapi.com',
  types: 'CITY',
  limit: 10,
  sort: '-population',
};

/**
 * Minimum gap between GeoDB requests, counted from the moment the previous
 * request finishes (ms). The RapidAPI Basic plan allows 1 request per second.
 */
export const MIN_REQUEST_INTERVAL = 1300;
