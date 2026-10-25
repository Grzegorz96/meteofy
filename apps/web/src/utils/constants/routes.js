/**
 * Application route paths.
 * @typedef {Object} Routes
 * @property {string} home - Home page path.
 * @property {string} poland - Poland map page path.
 * @property {string} europe - Europe map page path.
 * @property {string} world - World globe page path.
 * @property {string} longTermWeather - Long-term weather page path.
 * @property {string} airPollution - Air pollution page path.
 * @property {string} notFound - Catch-all path for unknown routes.
 */

/**
 * Absolute URLs for links and for `location.pathname`.
 * Home is `/` because that route is the layout index, not a path segment.
 * @type {Routes}
 */
export const ROUTES = {
  home: '/',
  poland: '/poland',
  europe: '/europe',
  world: '/world',
  longTermWeather: '/long-term-weather',
  airPollution: '/air-pollution',
  notFound: '/*',
};

/**
 * Child `path` under the layout route `/`.
 * `/poland` becomes `poland`. `*` is unchanged.
 *
 * @param {string} route
 * @returns {string}
 */
export const toLayoutPath = (route) => route.replace(/^\//, '');
