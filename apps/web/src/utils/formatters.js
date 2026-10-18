import * as THREE from 'three';
import {
  WEATHER_CODE_DESCRIPTION,
  WEATHER_CODE_ICON,
} from './constants/weatherCodes';

/**
 * Converts latitude and longitude coordinates to Cartesian coordinates.
 * @param {number} lat - The latitude value in degrees.
 * @param {number} lon - The longitude value in degrees.
 * @param {number} radius - The radius of the sphere.
 * @returns {THREE.Vector3} The Cartesian coordinates as a THREE.Vector3 object.
 */
export function convertLatLonToCartesian(lat, lon, radius) {
  var phi = (90 - lat) * (Math.PI / 180);
  var theta = (lon + 180) * (Math.PI / 180);
  var x = -(radius * Math.sin(phi) * Math.cos(theta));
  var z = radius * Math.sin(phi) * Math.sin(theta);
  var y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

/**
 * @param {number} weatherCode
 * @param {number} isDay 1 = day, 0 = night
 * @returns {string}
 */
export function toWeatherIcon(weatherCode, isDay) {
  const group = WEATHER_CODE_ICON[weatherCode];

  if (group == null) {
    return 'unknown';
  }

  const suffix = isDay === 0 ? 'n' : 'd';

  return `${group}${suffix}`;
}

/**
 * @param {number} weatherCode
 * @returns {string}
 */
export function toWeatherDescription(weatherCode) {
  return WEATHER_CODE_DESCRIPTION[weatherCode] ?? 'unknown';
}
