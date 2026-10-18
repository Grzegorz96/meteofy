import { useState, useEffect } from 'react';
import { fetchOpenMeteoCitiesWeather } from '../services/api';

/**
 * Custom hook that fetches weather data for multiple cities and handles the data using maps.
 *
 * @param {Array} cityObjects - An array of city objects.
 * @returns {Object} An object containing the fetched data, loading state, and error state and setter to update the data.
 */
export const useDataWithMapsHandler = (cityObjects) => {
  const [data, setData] = useState({
    fetchedData: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, loading: true }));
      try {
        const fetchedData = await fetchOpenMeteoCitiesWeather(cityObjects);

        setData({ fetchedData, loading: false, error: null });
      } catch (error) {
        setData({
          fetchedData: null,
          loading: false,
          error: error.message,
        });
      }
    };
    fetchData();
  }, [cityObjects]);
  return { data, setData };
};
