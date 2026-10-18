import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCityData } from '../state';
import { ROUTES } from '../utils/constants';

/**
 * Clears selected city data from the store when leaving the home route.
 * Kept out of Home unmount cleanup so React Strict Mode remounts do not wipe cityData on `/`.
 */
export const useResetCityOnLeaveHome = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname !== ROUTES.home) {
      dispatch(resetCityData());
    }
  }, [pathname, dispatch]);
};
