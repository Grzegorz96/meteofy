import { useState, useEffect } from 'react';
import {
  fetchVisualCrossingWeather,
  fetchVisualCrossingAirPollution,
  fetchGeoApifyReverseGeocoding,
  fetchOpenMeteoSeasonalWeather,
} from '../services/api';
import { DEFAULT_CITY_COORDS } from '../utils/constants/defaultCityCoords';
import { DATA_TYPE } from '../utils/constants';

/** Hard limit when the browser never invokes geolocation callbacks (e.g. some WebViews). */
const GEOLOCATION_TIMEOUT_MS = 8000;

/**
 * Detects common in-app browsers where geolocation often hangs forever.
 * @returns {boolean}
 */
const isInAppBrowser = () =>
  /FBAN|FBAV|FB_IAB|Instagram|Messenger/i.test(navigator.userAgent);

/**
 * Wraps `navigator.geolocation.getCurrentPosition` with a real timeout and
 * an immediate reject for known broken in-app browsers.
 * @returns {Promise<GeolocationPosition>}
 */
const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation || isInAppBrowser()) {
      reject(new Error('Geolocation unavailable'));
      return;
    }

    const timer = setTimeout(
      () => reject(new Error('Geolocation timeout')),
      GEOLOCATION_TIMEOUT_MS
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timer);
        resolve(position);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
      {
        timeout: GEOLOCATION_TIMEOUT_MS - 1000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  });

/**
 * Retrieves the coordinates (latitude and longitude) for a given city or the user's current location.
 * If a city is provided, it returns the coordinates of that city. Otherwise, it attempts to retrieve the user's current location.
 * If the user's location cannot be retrieved, it returns default city coordinates.
 *
 * @param {Object} city - The city object containing latitude and longitude values.
 * @returns {Promise<{ latitude: number, longitude: number }>} The coordinates object containing latitude and longitude values.
 */
const getCoordinates = async (city) => {
  if (city) {
    return {
      latitude: city.value.latitude,
      longitude: city.value.longitude,
    };
  }

  try {
    const { coords } = await getCurrentPosition();
    return { latitude: coords.latitude, longitude: coords.longitude };
  } catch {
    return DEFAULT_CITY_COORDS;
  }
};

/**
 * Fetches data based on the given latitude, longitude, and data type.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {string} dataType - The type of data to fetch.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 * @throws {Error} If an invalid data type is provided.
 */
const fetchDataByType = async (latitude, longitude, dataType) => {
  switch (dataType) {
    case DATA_TYPE.weather:
      return fetchVisualCrossingWeather(latitude, longitude);
    case DATA_TYPE.airPollution:
      return fetchVisualCrossingAirPollution(latitude, longitude);
    case DATA_TYPE.longTermWeather:
      return fetchOpenMeteoSeasonalWeather(latitude, longitude);
    default:
      throw new Error('Invalid data type');
  }
};

/**
 * Custom hook that handles fetching data for a given city and data type.
 *
 * @param {string} city - The city for which to fetch the data.
 * @param {string} dataType - The type of data to fetch.
 * @returns {object} An object containing the fetched data, loading state, error, city and a setter to update the data.
 */
export const useDataWithCitiesHandler = (city, dataType) => {
  const [data, setData] = useState({
    city: null,
    fetchedData: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setData((prev) => ({ ...prev, loading: true }));

      try {
        const { latitude, longitude } = await getCoordinates(city);

        // City changed (or unmount) while waiting for geolocation — skip API calls.
        if (isCancelled) return;

        const [fetchedData, cityName] = await Promise.all([
          fetchDataByType(latitude, longitude, dataType),
          !city && fetchGeoApifyReverseGeocoding(latitude, longitude),
        ]);

        if (isCancelled) return;

        const place = cityName?.results?.[0];
        const label = city
          ? city.label
          : place?.city
            ? `${place.city}, ${place.country_code?.toUpperCase()}`
            : 'Unknown location';

        setData({
          city: label,
          fetchedData,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (isCancelled) return;

        setData({
          city: null,
          fetchedData: null,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [city, dataType]);

  return { data, setData };
};
